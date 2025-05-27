import React,{useState}from 'react'
import {useNavigate}  from 'react-router-dom'
import { useUserAuth } from "../../context/UsuarioContext";		
import { collection, addDoc,getDocs } from 'firebase/firestore'
import {db,app} from '../../Configfirebase/Configfirebase'	
import {  doc } from "firebase/firestore"
import { getStorage,
         ref, 
         uploadBytes,
     uploadBytesResumable,
         getDownloadURL,
     getMetadata } from 'firebase/storage'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CryptoJS from 'crypto-js';
const MySwal = withReactContent(Swal)
const storage=getStorage(app)

export const RegistroHook=()=>{
   
    const [imagen, setImagen] = useState(null);
    const [errorImagen, setErrorImagen] = useState(null);
    const navigate = useNavigate()
    let urlDescarga;
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
    const { user } = useUserAuth();
    let correo=user.email
    const fecha=new Date().toLocaleDateString()
    const empresaCollection = collection(db, "pago_administrador")
  

   
   

    const manejarCambioImagen = (evento) => 
    {
        const archivo = evento.target.files[0];
    
        // Validar el tamaño del archivo
      if (archivo.size > maxSize) {
        setImagen(null);
        setErrorImagen("El archivo es demasiado grande. El tamaño máximo permitido es 5 MB.");
        return;
      } 

        if (archivo)
        {
            if (!archivo.type.startsWith("image/")) 
            {
                setErrorImagen("Por favor, selecciona un archivo de imagen válido.")
                return;
             }

             const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(archivo.type)) {
                 setErrorImagen("Solo se permiten imágenes JPG, PNG y WebP.");
                return;
             }
             if (archivo.size > 1024 * 1024) { // 1MB
              setErrorImagen("La imagen es demasiado grande maximi 1M.");
              return;
           }
          else {
            setImagen(null);
            setErrorImagen("Por favor, selecciona una imagen.");
          }
      
             
        }//fin del if principal
        
        else 
        {
                setImagen(null);
                setErrorImagen("Por favor, selecciona una imagen.");
        }//fin del else principal

        setImagen(archivo);
        setErrorImagen(null); // Limpiar errores anteriores

    }//fin de la funion mensaje
  
  const existeImagenEnStorage=async(nombreArchivo)=> {
     
    try {
          const imageRef = ref(storage,`comprobante_pago/${nombreArchivo}`); // Reemplaza 'images' con tu ruta de almacenamiento
          await getDownloadURL(imageRef);
          return true; // La imagen existe
          } catch (error) {
          if (error.code === "storage/object-not-found") {
            return false; // La imagen no existe
          } else {
            console.error("Error al verificar la imagen:", error);
            return false; // Ocurrió un error
          }
          }

      }

  const subirImagen = async () => {
          
          if (!imagen)
          {
              setErrorImagen("Debes seleccionar una imagen.");
              return;
          }//fin del if de negacion de imagen
       
      
           setErrorImagen(null);
           
           const nombreArchivo = imagen.name; // O un nombre generado
           const existe = await existeImagenEnStorage(nombreArchivo);
           if (existe) {
            setErrorImagen("La imagen ya existe");
           return;
           }
           try
           {
           
             const archivoRef=ref(storage,`comprobante_pago/${imagen.name}`)
             const uplo=await uploadBytes(archivoRef,imagen)
             urlDescarga=await getDownloadURL(archivoRef)
            
             await addDoc( empresaCollection, {
               correo:correo,
               estado:"cancelado", 
               fecha_pago:fecha,
               foto_pago:urlDescarga,
               status:1
              
              } )
              setImagen('')
              MySwal.fire({
                      title: "Bien hecho!",
                      text: "Registro con Exito!",
                      icon: "success",
                      button: "Felicitaciones!",
                      });
               //     }        
              navigate('/ModuloAdministrador/PagosAdministrador')
           } catch (error) {
             console.error("Error al subir imagen:", error);
           }
           
   
       }//fin del metodo subir imagen   
     
    

    return{
        
        errorImagen,
        manejarCambioImagen,
        subirImagen
     
    }
}