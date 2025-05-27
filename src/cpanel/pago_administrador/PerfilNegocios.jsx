import React,{useContext,useState,useEffect}from 'react'
import { useUserAuth } from '../../context/UsuarioContext'
import { collection,query,where,getDocs,getDoc,doc, updateDoc} from 'firebase/firestore'
import {app,db} from '../../Configfirebase/Configfirebase'	
import {Link} from 'react-router-dom'
import Aside1 from '../Aside1'
import Footer from '../Footer'
import CryptoJS from 'crypto-js'
import { getStorage,
         ref, 
         uploadBytes,
         getDownloadURL } from 'firebase/storage'
         
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
         
const storage=getStorage(app)
const MySwal = withReactContent(Swal)
export const PerfilNegocios=()=> {
     const [ nombre_usuario,setCodigoempresa ] = useState('')
     const [ email_usuario,setNombreempresa ] = useState('')
     const [ clave_usuario,setDireccionempresa ] = useState('')
     const [ descripcion,setDescripcion] = useState('')
     const [ telefono,setTelefono]=useState('')
     const [ redsocial1,setRedsocial1]=useState('')
     const [ redsocial2,setRedsocial2]=useState('')
     const [ redsocial3,setRedsocial3]=useState('')
     const [ i,setI ] = useState(null)
     const [idProducto, setIdProducto] = useState(null)
     const {user,editarEmail}=useUserAuth();
     const [errorImagen, setErrorImagen] = useState(null);
     const [errorNombre, setErrorNombre] = useState(null);
     const [errorDireccion, setErrorDireccion] = useState(null);
     const [errorDescripcion, setErrorDescripcion] = useState(null);
     const [errorTelefono, setErrorTelefono] = useState(null);
     let urlDescarga;    
     let nom=user.email
    const [imagen, setImagen] = useState(null);
       
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes   
        const getUsuarios=async()=>{
        try
         {
             const productosRef = collection(db,'negocios');
             const q=query(productosRef,where('correo', '==',nom));
             const querySnapshot=await getDocs(q);
                if (!querySnapshot.empty) 
                {
                  const producto = querySnapshot.docs[0]
                  const productoData = producto.data();
                  setIdProducto(producto.id);
                  setCodigoempresa(productoData.nombre_negocio || ''); // Asegúrate de que el campo exista
                  setNombreempresa(productoData.correo || ''); // Asegúrate de que el campo exista
                  setDireccionempresa(productoData.direccion || '')
                  setDescripcion(productoData.descripcion || '') 
                  setRedsocial1(productoData.rede_social || '')
                  setRedsocial2(productoData.rede_social1 || '')
                  setRedsocial3(productoData.rede_social2 || '')   
                  setTelefono(productoData.telefono || '')   
                  setI(productoData.foto)		
                }
            
              } catch (error) {
                console.error('Error al buscar el producto:', error);
                
                
              }		   
        }
        
         useEffect( () => {
            getUsuarios()
                // eslint-disable-next-line
            }, [])
    
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
  
     const manejarCambioNombre = (evento) => 
    {
       setCodigoempresa(evento.target.value);
       setErrorNombre(null);
    }

    const manejarCambioDireccion = (evento) => 
    {
       setDireccionempresa(evento.target.value);
       setErrorDireccion(null);
    }


   const manejarCambioDes = (evento) => 
    {
       setDescripcion(evento.target.value);
       setErrorDescripcion(null);
    }

    const manejarCambiosTel= (evento) => 
    {
       const tel=evento.target.value
       const telef=tel.replace(/\D/g, '')
       setTelefono(telef);
       setErrorTelefono(null);
    }

   const manejarCambiosf= (evento) => 
    {
      setRedsocial1(evento.target.value);
      
    }

    const manejarCambiosi= (evento) => 
    {
       
      setRedsocial2(evento.target.value);
      
    }


    const manejarCambiost= (evento) => 
    {
       setRedsocial3(evento.target.value);
      
    }
    
  
     const existeImagenEnStorage=async(nombreArchivo)=> {
            try {
              const imagenRef = ref(storage, `negocios/${nombreArchivo}`); // Ruta a tu carpeta de imágenes
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
    
       const  subirImagen=async()=>
       {

          if (!nombre_usuario)
        {
            setErrorNombre("Debes ingresar un nombre.");
            return;
        }//fin del if de negacion de imagen
        
        if (!clave_usuario)
        {
            setErrorDireccion("Debes ingresar una dirección.");
            return;
        }//fin del if de negacion de imagen
               
        if (!descripcion)
        {
            setErrorDescripcion("Debes ingresar una descripción.");
            return;
        }//fin del if de negacion de imagen

        if (!telefono)
        {
            setErrorTelefono("Debes ingresar el whatsapp.");
            return;
        }//fin del if de negacion de imagen


         if(!imagen)
         {
            const empresa = doc(db, "negocios", idProducto)	
            console.log("el id producto es:",idProducto)       
                
             const data = {
                            nombre_negocio:nombre_usuario, 
                            correo:email_usuario,
                            direccion:clave_usuario,
                            descripcion:descripcion,
                            telefono:telefono,
                            rede_social:redsocial1,
                            rede_socila1:redsocial2,
                            rede_social2:redsocial3
                            
                       }
           
                         
            await updateDoc(empresa, data)
            MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro Modificado Con Exito!",
                            icon: "danger",
                             button: "Felicitaciones!"
                      });	   
          
          }//fin del if
          else
          {
   
           const nombreArchivo = imagen.name; // O un nombre generado
           const existe = await existeImagenEnStorage(nombreArchivo);
           if (existe) 
            {
              setErrorImagen("La imagen ya existe");
              return;
            }
            try
            {
               const archivoRef=ref(storage,`negocios/${imagen.name}`)
               const uplo=await uploadBytes(archivoRef,imagen)
               urlDescarga=await getDownloadURL(archivoRef)
               const existe = await existeImagenEnStorage(nombreArchivo);
               const empresa = doc(db, "negocios", idProducto)	
               console.log("el id producto es:",idProducto)       
                
              const data = {
                            nombre_negocio:nombre_usuario, 
                            direccion:clave_usuario,
                            descripcion:descripcion,
                            telefono:telefono,
                            rede_social:redsocial1,
                            rede_socila1:redsocial2,
                            rede_social2:redsocial3,
                            foto:urlDescarga       
                       }
           
                         
            await updateDoc(empresa, data)
            MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro Modificado Con Exito!",
                            icon: "danger",
                             button: "Felicitaciones!"
                      });	   
            }catch(error)
              {
                 console.error("Error al actualizar datos:", error);
              }     

          }//fin del else
       }
          
  return (
    <>
      <Aside1/>
             <div className="hold-transition sidebar-mini layout-fixed">
             <div className="wrapper">
        
              <div className="main-panel" style={{marginTop:"80px"}}>
        <div className="content-header">
                          <div className="container-fluid">
                             <div className="row mb-2">
                        <div className="col-sm-6">
                          <h1 className="m-0">Cpanel</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                          <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item">
                               <a href="javascript:void(0);">Perfil Negocio</a></li>
                            <li className="breadcrumb-item active">Cpanel</li>
                          </ol>
                        </div>
                      </div>
                          </div>
             </div>	
             
              <div className='row mover' >
                 <div className='col-md-8 grid-margin stretch-card'>
                   <div className="card">
                   <div className="card-body">
                    <h4 className="text-center">Perfil Negocio {nombre_usuario} </h4><br/>
                      <form className="forms-sample">
      
                            <div className="form-group">
                              <label for="Categoriar">Correo Negocio</label>
                              <input
                                  type="email"
                                  className='form-control'
                                  placeholder="Correo Negocio ..."
                                  minlength="6"
                                  maxlength="100"
                                  disabled
                                  value={email_usuario}
                              />
                          </div> 

                          <div className="form-group">
                              <label for="Categoriar">Nombre Negocio</label>
                              <input
                                  type="text"
                                  className='form-control'
                                  placeholder="Nombre Negocio ..."
                                  minlength="3"
                                  maxlength="20"
                                  value={nombre_usuario}
                                  onChange={manejarCambioNombre}
                                  
                              />
                               {errorNombre && <p style={{color:"red",textAlign:"center"}}>{errorNombre}</p>}
                          </div>                  
      
                          <div className="form-group">
                           <label for="Categoriar">Direción Negocio</label>
                           <textarea
                             className='form-control'
                             placeholder="Correo ..."
                             value={clave_usuario}
                             onChange={manejarCambioDireccion}
                             cols="30" 				  
                             rows="5" 
                             
                           />
                           {errorDireccion && <p style={{color:"red",textAlign:"center"}}>{errorDireccion}</p>}
                           </div> 
                          
                         <div className="form-group">
                           <label for="Categoriar">Descripción Negocio</label>
                           <textarea
                             className='form-control'
                             placeholder="Correo ..."
                             value={descripcion}
                             onChange={manejarCambioDes}
                             cols="30" 				  
                             rows="5" 
                            
                           />
                            {errorDescripcion && <p style={{color:"red",textAlign:"center"}}>{errorDescripcion}</p>}
                           </div> 
                           
                         <div className="form-group">
                              <label for="Categoriar">Whtasapp Negocio</label>
                              <textarea
                              className='form-control'
                              placeholder="Whtasapp Negocio ..."
                              cols="30" 				  
                              rows="5"
                              value={telefono}
                              onChange={manejarCambiosTel}     
                              />
                                {errorTelefono && <p style={{color:"red",textAlign:"center"}}>{errorTelefono}</p>}
                          </div>   
                        
                           <div className="form-group">
                              <label for="Categoriar">Facebook</label>
                              <input
                                  type="text"
                                  className='form-control'
                                  placeholder="Facebook ..."
                                  maxlength="20"
                                  value={redsocial1}
                                   onChange={manejarCambiosf}
                                  
                              />
                          </div>

                          <div className="form-group">
                              <label for="Categoriar">Instagran</label>
                              <input
                                  type="text"
                                  className='form-control'
                                  placeholder="Instagran ..."
                                  maxlength="20"
                                  value={redsocial2}
                                  onChange={manejarCambiosi}
                                  
                              />
                          </div>
                             
                             <div className="form-group">
                              <label for="Categoriar">Titok</label>
                              <input
                                  type="text"
                                  className='form-control'
                                  placeholder="Instagran ..."
                                  maxlength="20"
                                  value={redsocial3}
                                  onChange={manejarCambiost}
                                  
                              />
                          </div>
                             
                        

                         <div className="form-group">
                                <label for="Categoriar">Imagen</label>
                                 <img src={i} width="100"  height="100"/>
                          </div> 
      

                             <div className="form-group mb-5">
                               <label className="text-black" for="message">Foto Negocio</label>
                                  <input type="file" onChange={manejarCambioImagen}   accept="image/*"/>
                                    {errorImagen && <p style={{ color: 'red' ,textAlign:"center"}}>{errorImagen}</p>}    
                            </div>


                          {/* <div className="form-group">
                              <label className="descripcionr">Subir Imagen</label>
                              <input
                                  accept="image/*"
                                  type="file"
                                  className='form-control'
                                
                              />
                         </div>  */}
                     <div align="Center">
                          <button
                           type='button'
                            onClick={subirImagen} 
                            className='btn btn-primary mr-2'>Guardar</button>
                      </div> 
               </form>
      
      
                      </div>
                    </div>
                 </div>
              </div>
                       
           </div>
          </div>
         </div> 
       <Footer/> 
    </>
  )
}
