import React,{useContext,useState,useEffect}from 'react'
import { useUserAuth } from '../../context/UsuarioContext'
import { collection,query,where,getDocs,getDoc,doc, updateDoc} from 'firebase/firestore'
import {app,db} from '../../Configfirebase/Configfirebase'	
import {Link} from 'react-router-dom'
import Aside1 from '../Aside1'
import Footer from '../Footer'
import { getStorage,
         ref, 
         uploadBytes,
         getDownloadURL } from 'firebase/storage'
         
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
         
const storage=getStorage(app)
const MySwal = withReactContent(Swal)

const Perfil = () => {

  
     const [ nombre_usuario,setCodigoempresa ] = useState('')
     const [ email_usuario,setNombreempresa ] = useState('')
     const [ clave_usuario,setDireccionempresa ] = useState('')
     const [ imagen,setImagen ] = useState('')
     const [ i,setI ] = useState(null)
     const [idProducto, setIdProducto] = useState(null)
     const {user,editarEmail}=useUserAuth();
     const [errorImagen, setErrorImagen] = useState(null);
     let urlDescarga;    
     let nom=user.email
     
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes

      // const manejarCambioImagen = (evento) => 
      //   {
      //       const archivo = evento.target.files[0];
           
      //       if (archivo.size > maxSize) {
      //         setImagen(null);
      //         setErrorImagen("El archivo es demasiado grande. El tamaño máximo permitido es 5 MB.");
      //         return;
      //       } 
    
      //       if (archivo)
      //       {
      //           if (!archivo.type.startsWith("image/")) 
      //           {
      //               setErrorImagen("Por favor, selecciona un archivo de imagen válido.")
      //               return;
      //            }
    
      //            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      //           if (!allowedTypes.includes(archivo.type)) {
      //                setErrorImagen("Solo se permiten imágenes JPG, PNG y WebP.");
      //               return;
      //            }
      //            if (archivo.size > 1024 * 1024) { // 1MB
      //             setErrorImagen("La imagen es demasiado grande maximi 1M.");
      //             return;
      //          }
      //         else {
      //           setImagen(null);
      //           setErrorImagen("Por favor, selecciona una imagen.");
      //         }
          
                 
      //       }//fin del if principal
            
      //       else 
      //       {
      //               setImagen(null);
      //               setErrorImagen("Por favor, selecciona una imagen.");
      //       }//fin del else principal
    
      //       setImagen(archivo);
      //       setErrorImagen(null); // Limpiar errores anteriores
    
      //   }//fin de la funion mensaje
      
        //  const existeImagenEnStorage=async(nombreArchivo)=> {
        //     try {
        //       const imagenRef = ref(storage, `musuarios/${nombreArchivo}`); // Ruta a tu carpeta de imágenes
        //       urlDescarga=await getDownloadURL(imagenRef)
        //      // await getMetadata(imagenRef); // Intenta obtener metadatos
        //       return true; // Si no hay error, la imagen existe
        //     } catch (error) {
        //       if (error.code === 'storage/object-not-found') {
        //         return false; // La imagen no existe
        //       }
        //       console.error("Error al comprobar imagen:", error);
        //       return false; // Otro error, asumimos que no existe para evitar bloqueos
        //     }
        //   }
    
    const getUsuarios=async()=>{
    try
     {
         const productosRef = collection(db,'usuarios');
         const q=query(productosRef,where('email_usuario', '==',nom));
         const querySnapshot=await getDocs(q);
            if (!querySnapshot.empty) 
            {
              const producto = querySnapshot.docs[0]
              const productoData = producto.data();
              setIdProducto(producto.id);
              setCodigoempresa(productoData.nombre_usuario || ''); // Asegúrate de que el campo exista
              setNombreempresa(productoData.email_usuario || ''); // Asegúrate de que el campo exista
              setDireccionempresa(productoData.clave_usuario || '')   
              setI(productoData.imagen)		
            }
        
          } catch (error) {
            console.error('Error al buscar el producto:', error);
            
            
          }		   
    }
    
     useEffect( () => {
        getUsuarios()
            // eslint-disable-next-line
        }, [])


   const  subirImagen=async()=>
   {
 
      const empresa = doc(db, "usuarios", idProducto)	
      console.log("el id producto es:",idProducto)       
   
                 
       const data = {
                        nombre_usuario:nombre_usuario, 
                        email_usuario:email_usuario,
                        clave_usuario:clave_usuario,
                        //  imagen:n
                   }
       
                     
        await updateDoc(empresa, data)
        MySwal.fire({
                       title: "Felicitaciones!",
                       text: "Registro Modificado Con Exito!",
                        icon: "danger",
                         button: "Felicitaciones!"
                  });	   
      

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
                         <a href="javascript:void(0);">Perfil Usuario</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
       </div>	
       
        <div className='row' >
           <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
		 	   <div className="card-body">
			    <h4 className="text-center">Perfil {nombre_usuario} </h4><br/>
                <form className="forms-sample">

                    <div className="form-group">
                        <label for="Categoriar">Nombre Usuario</label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Nombre Usuario ..."
                            minlength="3"
                            maxlength="20"
                            disabled
                            value={nombre_usuario}
                            onChange={ (e) => setCodigoempresa(e.target.value)}
                            
                        />
                    </div>                  

                    <div className="form-group">
                        <label for="Categoriar">Correo Usuario</label>
                        <input
                            type="email"
                            className='form-control'
                            placeholder="Correo Usuario ..."
                            minlength="6"
                            maxlength="100"
                            disabled
                            value={email_usuario}
                            onChange={ (e) => setNombreempresa(e.target.value)}
                        />
                    </div>  
                    
                        <div className="form-group">
                        <label for="Categoriar">Clave Usuario</label>
                        <input
                            type="password"
                            className='form-control'
                            placeholder="Correo Usuario ..."
                            minlength="6"
                            maxlength="20"
                            disabled
                            value={clave_usuario}
                            onChange={ (e) => setDireccionempresa(e.target.value)}
                        />
                    </div> 


					
					 <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={i} width="100"  height="100"/>
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
                      {/* <button type='button' onClick={subirImagen} className='btn btn-primary mr-2'>Guardar</button>
                    <Link to="/Administrador" className='btn btn-primary mr-2'>Regresar</Link> */}
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

export default Perfil
