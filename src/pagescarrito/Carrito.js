import { useState, useEffect } from 'react'
import { getStorage,
         ref, 
         uploadBytes,
         uploadBytesResumable,
         getDownloadURL,
         getMetadata } from 'firebase/storage'	
import { doc, updateDoc, arrayUnion, collection, addDoc } from 'firebase/firestore';
import {useNavigate}  from 'react-router-dom'
import {db,app} from '../Configfirebase/Configfirebase'
import { useUserAuth } from "../context/UsuarioContext"
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const storage=getStorage(app)
const MySwal = withReactContent(Swal)

export const Carrito = (listaCompras,calcularTotal) => {

  const { user } = useUserAuth();
  const email=user.email
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState({});
  const [errorUpload, setErrorUpload] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate()
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const productId = event.target.id.split('-')[2];

    setImagenesSeleccionadas(prev => ({
      ...prev,
      [productId]: file || null
    }));

    setErrorUpload('');
    setStatusMessage('');
  };

  const uploadProductImages = async (productsToProcess, purchaseId = null) => { // Agregamos purchaseId como parámetro
    setErrorUpload('');
    setStatusMessage('');
    setIsUploading(true);

    try {
      // 1. **Validación**: Verificar que todos los inputs tengan un archivo
      let allFilesPresent = true;
      const missingProducts = [];

      if (!productsToProcess || productsToProcess.length === 0) {
        throw new Error('No hay productos en la lista para procesar.');
      }

      productsToProcess.forEach(item => {
        if (!imagenesSeleccionadas[item.id]) {
          allFilesPresent = false;
          missingProducts.push(item.nombre_productos);
        }
      });

      if (!allFilesPresent) {
        throw new Error(`Debes subir una imagen para los siguientes productos: ${missingProducts.join(', ')}.`);
      }

      // 2. **Subida a Firebase Storage**
      const uploadPromises = [];
      const uploadedFileDetails = [];

      for (const item of productsToProcess) {
        const file = imagenesSeleccionadas[item.id];
        if (file) {
          const storageRef = ref(storage, `comprobante_pago/${item.id}/${file.name}`);
          const negocio=listaCompras.map(item => item.nombre_negocio);
          const nombresProductos =  listaCompras.map(item => item.nombre_productos);
          const cantidad =  listaCompras.map(item => item.cantidad);
          const totalDelPedido =calcularTotal()
          let fechas=new Date()
          const fecha=new Date().toLocaleDateString()
          const uploadTaskPromise = uploadBytes(storageRef, file)
            .then(snapshot => getDownloadURL(snapshot.ref))
            .then(downloadURL => {
              // Guardamos los detalles para persistirlos en Firestore después
              uploadedFileDetails.push({
                productId: item.id,
                productName: item.nombre_productos,
                fileName: file.name,
                url: downloadURL,
                nombre_producto: nombresProductos,
                cantidad_producto:cantidad,
                nombre_negocio:negocio,
                tipo_operacion:"compra",
                mensaje_pago:'',                                    fecha_pago:fecha,
                correo:email,
                total:parseFloat(totalDelPedido)
              });
              return downloadURL;
            })
            .catch(error => {
              console.error(`Error al subir la imagen para ${item.nombre_productos}:`, error);
              throw new Error(`Fallo al subir imagen para ${item.nombre_productos}.`);
            });
          uploadPromises.push(uploadTaskPromise);
        }
      }

      
      await Promise.all(uploadPromises);
      
     
      if (uploadedFileDetails.length > 0) {
       
        if (purchaseId) {
          const purchaseRef = doc(db, 'compras', purchaseId);
    
          
          const updatedProductsForFirestore = productsToProcess.map(prod => {
            const uploadedDetail = uploadedFileDetails.find(detail => detail.productId === prod.id);
            if (uploadedDetail) {
              return {
                ...prod,
                imagenUrl: uploadedDetail.url, // O podrías tener un array 'archivos'
                archivos: arrayUnion(uploadedDetail.url) // Si es un array de archivos por producto
              };
            }
            return prod;
          });

          await updateDoc(purchaseRef, {
            productos: updatedProductsForFirestore
          });
          console.log(`Documento de compra ${purchaseId} actualizado con URLs de imágenes.`);
          
        } else {
          // Opción B: Crear un nuevo documento en una colección de "imágenes subidas"
          // Esto es útil si quieres un registro separado de todas las imágenes que se suben.
         

          const imagesCollectionRef = collection(db, 'imagenes_subidas_comprobante');
          for (const detail of uploadedFileDetails) {
            await addDoc(imagesCollectionRef, {
              ...detail,
              timestamp: new Date() // Opcional: añadir la fecha de subida
            });
          }
          console.log('Detalles de imágenes guardados en Firestore (colección imagenes_subidas_productos).');
         MySwal.fire({
                         title: "Felicitaciones!",
                         text: "Compra completado con Exito!",
                          icon: "danger",
                          button: "Felicitaciones!"
                        });
        }
        navigate('/MensajePago')
      }
      // --- FIN NUEVO CÓDIGO ---
      
      setStatusMessage('¡Pago procesado y todas las imágenes subidas y registradas exitosamente!');
      setErrorUpload('');
      
      return { success: true, uploadedFiles: uploadedFileDetails }; 

    } catch (error) {
      console.error('Error en useProductImageUpload:', error);
      setErrorUpload(error.message || 'Ocurrió un error inesperado al procesar las imágenes.');
      return { success: false, error: error.message };
    } finally {
      setIsUploading(false);
    }}


   

  return {
           imagenesSeleccionadas,
           errorUpload,
           statusMessage,
           isUploading,
           handleImageChange,
            uploadProductImages
          };
};

