import React,{useState,useEffect}from 'react'
import {Link,useNavigate}  from 'react-router-dom'
import { collection,
         doc,
         addDoc,
         updateDoc, 
         query, 
         where,
         getDocs } from 'firebase/firestore'
import { getStorage,
         ref, 
       uploadBytes,
         uploadBytesResumable,
       getDownloadURL,
        getMetadata } from 'firebase/storage'
import {db,app} from '../Configfirebase/Configfirebase'	
import "./Carrito.css"
import {Metodopago} from  "./Metodopago"
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useUserAuth } from "../context/UsuarioContext";
const MySwal = withReactContent(Swal)


const storage=getStorage(app)

export const Cupon = ({t,metodo}) => {

const [ i,setI ] = useState(null)

 const navigate = useNavigate()
 const [imagen, setImagen] = useState(null);
 const [errorImagen, setErrorImagen] = useState(null);
 let urlDescarga
 let neg
 const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
 let fechas=new Date()
 const fecha=new Date().toLocaleDateString()
 const [nombreNegocio, setNombreNegocio] = useState('')
 const { user } = useUserAuth();
 let nom=user.email

 const manejarCambioImagen = (evento) => 
     {
         const archivo = evento.target.files[0];
        
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
           const imagenRef = ref(storage, `comprobante_pago/${nombreArchivo}`); // Ruta a tu carpeta de imágenes
           urlDescarga=await getDownloadURL(imagenRef)
          // await getMetadata(imagenRef); // Intenta obtener metadatos
           return true; // Si no hay error, la imagen existe
         } catch (error) {
           if (error.code === 'storage/object-not-found') {
             return false; // La imagen no existe
           }
           console.error("Error al comprobar imagen:", error);
           return false; // Otro error, asumimos que no existe para evitar bloqueos
         }
       }        

        const subirImagen = async () =>
         {
                    
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
                return;}
          
              
              const usuariosRef = collection(db, 'negocios');
              const q = query(usuariosRef, where('correo', '==',nom));
              const querySnapshot = await getDocs(q);

                            
               if(!querySnapshot.empty) 
               {
                 
                  querySnapshot.forEach((doc) => {
                  setNombreNegocio(doc.data().nombre_negocio);
                })

       
                   try
                   {
     
                      const archivoRef=ref(storage,`comprobante_pago/${imagen.name}`)
                      const uplo=await uploadBytes(archivoRef,imagen)
                      urlDescarga=await getDownloadURL(archivoRef)
                      const existe = await existeImagenEnStorage(nombreArchivo);
                      const nombresProductos = metodo.map(item => item.nombre_productos);
                      const empresaCollection = collection(db,"pago_producto") 
                      const totalDelPedido = t;
                      await addDoc( empresaCollection, {
                                       nombre_negocio:nombreNegocio,
                                       fecha_pago:fecha,
                                       imagen:urlDescarga,
                                       tipo_operacion:"compra",
                                       nombre_producto:nombresProductos,
                                       imagena:'',
                                       mensaje_pago:'',
                                       total: parseFloat(totalDelPedido)

                                   } )
                     
                        MySwal.fire({
                                title: "Felicitaciones!",
                                text: "Compra completado con Exito!",
                                icon: "danger",
                                button: "Felicitaciones!"
                          });
                           navigate('/MensajePago')
                   }catch(error)
                   {
                      console.error("Error al actualizar datos:", error);
                   }              
              }
             
     
                   
         }//fin del metodo subir imagen 
     

  return (
    <>
      <div class="row">
                <div class="col-md-6">
                  <div class="row mb-5">
                    {/* <div class="col-md-6 mb-3 mb-md-0">
                      <button class="btn btn-black btn-sm btn-block">Update Cart</button>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-outline-black btn-sm btn-block">Continue Shopping</button>
                    </div> */}
                  </div>

                  {/* <div class="row">
                    <div class="col-md-12">
                      <label class="text-black h4" for="coupon">Cup&oacute;n</label>
                      <p>Ingrese codigo de su cup&oacute;n.</p>
                    </div>
                    <div class="col-md-8 mb-3 mb-md-0">
                      <input type="text" class="form-control py-3" id="coupon" placeholder="Codigo de cup&oacute;n" required/>
                    </div>
                    <div class="col-md-4">
                      <button class="botoncc">Aplicar Cup&oacute;n</button>
                    </div>
                  </div> */}
                  
                  <div class="row">
                   <Metodopago 
                    nombrenegocio={nom}
                    />
              
                   
                  
                  </div>

                 
                  <div class="row">
                    <div class="col-md-12">
                      <label class="text-black h4" for="coupon">Comprobante de pago</label>
                      <p>Ingrese Comprobante de pago.</p>
                    </div>
                  
                  <form>
                    <div class="col-md-8 mb-3 mb-md-0">
                     
                        <input
                        type="file" 
                        className="form-control py-3" 
                        id="coupon" 
                        onChange={manejarCambioImagen}   
                        accept="image/*"
                      />
                      {errorImagen && <p style={{ color: 'red' ,textAlign:"center"}}>{errorImagen}</p>}    

                   </div>

                    <div class="col-md-4">
                      <button    
                      type="button"
                      onClick={subirImagen} 
                      className="botoncc">Procesar Pago</button>
                    </div>
                  </form>
                  </div>
                

                </div>
                <div class="col-md-6 pl-5">
                  <div class="row justify-content-end">
                    <div class="col-md-7">
                      <div class="row">
                        <div class="col-md-12 text-right border-bottom mb-5">
                          <h3 class="text-black h4 text-uppercase">Total del Carrito</h3>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-md-6">
                          <span className="text-black">Subtotal</span>
                        </div>
                        <div class="col-md-6 text-right">
                          <strong class="text-black">{t}</strong>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-md-6">
                          <span class="text-black">Total</span>
                        </div>
                        <div class="col-md-6 text-right">
                          <strong class="text-black">{t}</strong>
                        </div>
                      </div>
        
                      {/* <div class="row">
                        <div class="col-md-12">
                          <button class="botoncc btn-lg py-3 btn-block" onclick="window.location='checkout.html'">Proceder al  Pago </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}


