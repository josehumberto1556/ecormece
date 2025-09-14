import React,{useState,useEffect}from 'react'
import {Link,useNavigate}  from 'react-router-dom'
import { collection, 
	     addDoc,
	     getDocs,
	     getDoc,
	     deleteDoc,
	    doc
	 } from 'firebase/firestore'

import {db,app} from '../../Configfirebase/Configfirebase'	

import { getStorage,
         ref, 
		 uploadBytes,
		 getDownloadURL } from 'firebase/storage'

import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'
import './formulario.css'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useUserAuth } from "../../context/UsuarioContext"
const MySwal = withReactContent(Swal)


const storage=getStorage(app)

function RegistrarPr1() {
	
	 const [listado,setListado]=useState([])
     const [ codigo_empresa,setcodigoempresa ] = useState('')
     const [ nombre_empresa,setNombreempresa ] = useState('')
     const [ direccion_empresa,setDireccionempresa ] = useState('')
	 const [ video,setVideo ] = useState('')
	 const [ precio,setPrecio ] = useState('')
	 const [ categoria,setCategoria ] = useState('')
	 const [ i,setI ] = useState(null)
	 const [error, setError] = useState("");
	 const { user } = useUserAuth();
	 let correo=user.email
     const maxSize = 5 * 1024 * 1024; // 5 MB en bytes

     const categoriaCollection=collection(db,'categoria')

	 const Categorias=async()=>{

		const data=await getDocs(categoriaCollection)
		setListado(
		  data.docs.map((doc)=>({...doc.data(),id:doc.id}))
		)
	
	 }
	

	 const empresaCollection = collection(db, "m_productos")
     const navigate = useNavigate()
	 let urlDescarga
         

  async function subirArchivo(e)
   {
	
	   //detectar archivo
	   const archivoLocal=e.target.files[0];
	   if (archivoLocal)
	   {
		  // Validar el tipo de archivo
		  if (!archivoLocal.type.startsWith("image/")) 
		   {
				setError("Por favor, selecciona un archivo de imagen válido.")
				return;
			 }
   
			const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
			if (!allowedTypes.includes(archivoLocal.type)) 
			{
				setError("Solo se permiten imágenes JPG, PNG y WebP.");
				return;
			}
   
	   }
   
		// Validar el tamaño del archivo
		if (archivoLocal.size > maxSize) {
		 setI(null);
		 setError("El archivo es demasiado grande. El tamaño máximo permitido es 5 MB.");
		 return;
	   }
	  
		 setI(archivoLocal);
		 setError("");
	   

   }
 
   const checkIfImageExists = async (imageName) => {
	  try {
		const imageRef = ref(storage, `m_producto/${imageName}`); // Reemplaza 'images' con tu ruta de almacenamiento
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
	};
  


 const store = async (e) => {
    e.preventDefault()

	if (!i) {
		setError("Por favor, selecciona un archivo de imagen.");
		return;
	  }
  
	  setError("");
	  const imageName = i.name; // O genera un nombre único
	  const imageExists = await checkIfImageExists(imageName);
  
	  if (imageExists) {
	   setError("La imagen ya existe");
		return;
	  }

	try
	{
		
		const archivoRef=ref(storage,`m_producto/${i.name}`)
	    const uplo=await uploadBytes(archivoRef,i)
	    urlDescarga=await getDownloadURL(archivoRef)
        await addDoc( empresaCollection, {  
		                                    nombre_productos:codigo_empresa, 
									        descripcion:direccion_empresa,
									        cantidad:video,
										    precio:precio,
										    categoria:categoria,
									       imagenq:urlDescarga,
										   nombre_usuario:correo
	     } )
		 MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro con exito!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });
        navigate("/ModuloAdministrador/Producto")
    }catch(error){
		console.log(error)
	   } 
  }


  useEffect(()=>{
	 Categorias()
  },[])

  return (
      <>

	<Aside/>

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
						<a href="javascript:void(0);">Registro Producto</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row'>
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Registro Producto</h4><br/>
                 <form className="forms-sample" onSubmit={store} >

				 <div className="form-group">
                        <label for="Categoriar">Nombre Producto</label>
                        <textarea
                            
                            className='form-control'
						    placeholder="Nombre Producto ..."
                            required
							value={codigo_empresa}
                            onChange={ (e) => setcodigoempresa(e.target.value)}
							 cols="30" 				  
				             rows="5" 
							
                        />
                    </div>                  
				
                  
					
					 <div className="form-group">
                        <label for="Categoriar">Descripción</label>
                        <textarea
                            
                            className='form-control'
						    placeholder="Descripción ..."
						    value={direccion_empresa}
                            onChange={ (e) => setDireccionempresa(e.target.value)}
                            required
							 cols="30" 				  
				            rows="5" 
                        />
                    </div> 

					
				   <div className="form-group">
                        <label for="Categoriar">Cantidad</label>
                        <input 
						 type="number"
                         className='form-control'
						  min="1" max="10"  
						 value={video}
                         onChange={ (e) => setVideo(e.target.value)}
                         required
                        />
                    </div> 
					
					 <div className="form-group">
                        <label for="Categoriar">Precio</label>
                        <input 
						type="number" 
						name="precio" 
						placeholder="Precio" 
						minlength="1" 
						maxlength="6" size="1"
						className='form-control'
						 value={precio}
                         onChange={ (e) => setPrecio(e.target.value)}
						required/>
                    </div> 
					
					<div className="form-group">
                        <label for="Categoriar">Categoria</label>
                        <select
						required 
						className='form-control' 
						onChange={ (e) => setCategoria(e.target.value)}>
                           <option value="">-Seleccione</option>
						  {
						     listado.map((list)=>
							 <option value={list.nombre_categoria} key={list.id}>{list.nombre_categoria}</option>
							)
						   }
						
						
                        </select>						
                       
                    </div> 
					
					 <div className="form-group">
                        <label for="Categoriar">Imagen</label>
                        <input
                         type="file"
                         className='form-control'
                         onChange={subirArchivo} 
						 accept="image/*"
                         required
                        />
                    </div>
					{error &&     
                      <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                         <strong>Error!</strong> {error}
                         <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                   }

                     <div align="Center">
                    <button type='submit' className='btn btn-primary mr-2'>Guardar</button>
					<Link to="/ModuloAdministrador/Producto/" 
					className='btn btn-primary mr-2'>Regresar</Link>
                </div> 
				  
				  
                 </form>   
				</div>
			  </div>
            </div>
        </div>
	    </div>
     
	 	<Footer/> 
 </div>
    </div> 
	  </>

  )
 
  
 
  
}

export default RegistrarPr1




