import React,{useState,useEffect}from 'react'
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { collection, addDoc } from 'firebase/firestore'
import {db,app} from '../../Configfirebase/Configfirebase'
import Header   from '../header'
import Aside1   from '../Aside1'
import Footer   from '../Footer'
import  './formulario.css'
import { RegistroHook } from './RegistroHook';
import { Link,useParams } from "react-router-dom"
import { getStorage,
         ref, 
         uploadBytes,
     uploadBytesResumable,
         getDownloadURL,
     getMetadata } from 'firebase/storage'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const storage=getStorage(app)

function EditarPago() 
{

  const [imagen, setImagen] = useState(null);
  const [errorImagen, setErrorImagen] = useState(null); 
  const [ imageni,setImageni ] = useState('')
  let urlDescarga;
  const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
   const {id} = useParams()

   const getEmpresaById = async (id) => 
    {
            const empresa = await getDoc( doc(db, "pago_administrador", id) )
            if(empresa.exists()) {
     
                setImageni(empresa.data().foto_pago)			
            }else{
                console.log('El usuario no existe')
            }
    }

     useEffect( () => {
          getEmpresaById(id)
    
          // eslint-disable-next-line
      }, [])

      
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
       
         const EditarImagen = async () =>
         {
      
            const empresa = doc(db, "pago_administrador", id)
          
          if (!imagen)
          {
           
               const data = { foto_pago:imageni}
               await updateDoc(empresa, data)
          }

          else
          {
             const nombreArchivo = imagen.name; // O un nombre generado
             const existe = await existeImagenEnStorage(nombreArchivo);
             if(existe) 
             {
               setErrorImagen("La imagen ya existe");
              return;
             }
             try
            {
           
              const archivoRef=ref(storage,`comprobante_pago/${imagen.name}`)
              const uplo=await uploadBytes(archivoRef,imagen)
              urlDescarga=await getDownloadURL(archivoRef)
              const data = { foto_pago:urlDescarga}
              await updateDoc(empresa, data)
              
              MySwal.fire({
                      title: "Bien hecho!",
                      text: "Registro Modificado con Exito!",
                      icon: "success",
                      button: "Felicitaciones!",
                      });
                 
          
           } catch (error) {
             console.error("Error al subir imagen:", error);
           }
           
   
        }//fin del metodo subir imagen   
     
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
						<a href="javascript:void(0);">Editar Pago</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row mover'>
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Editar Pago</h4><br/>
         <form className="forms-sample">

			   	<div className="form-group">
            <label className="descripcionr">Subir Imagen</label>
             <img
              src={imageni}
              width="100"
              height="100"
              alt=""
              className="img-thumbnail"
              />
                {errorImagen && <p style={{ color: 'red' ,textAlign:"center"}}>{errorImagen}</p>}
          </div> 
       
					
					<div className="form-group">
            <label className="descripcionr">Subir Imagen</label>
             <input
              type="file"
              className='form-control'
						  onChange={manejarCambioImagen}   accept="image/*"
							required
              />
        </div> 
       
           <div align="Center">
             <button type='button' 
             className='btn btn-primary mr-2'
             onClick={EditarImagen}>
              Guardar</button>
				    	<Link to="/ModuloAdministrador/PagosAdministrador" className='btn btn-primary mr-2'>Regresar</Link>
            </div> 
				  
				  
                 </form>   
				</div>
			  </div>
            </div>
        </div>
	    </div>
      </div>
      </div>  
     
  
	 </>
  )
 
  
 
  
}

export default EditarPago