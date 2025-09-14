import React,{useState,useEffect}from 'react'
import {Link,useNavigate}  from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
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
const MySwal = withReactContent(Swal)


const storage=getStorage(app)

function RegistraNegocio() {
	
   const [ codigo_empresa,setcodigoempresa ] = useState('')
   const [ nombre_empresa,setNombreempresa ] = useState('')
   const [ direccion,setDireccion ] = useState('')
   const [ descripcion,setDescripcion ] = useState('')
   const [ facebook,setFacebook ] = useState('')
   const [ instagran,setInstagran ] = useState('')
   const [ titok,setTitok ] = useState('')
   const [empresas,setEmpresas]=useState({
	   empresa:false,
	   vendedor:false,
	   emprendedor:false,
	   distribuidor:false,
	   proveedor:false,
	   empresa:false
   })
  
   const [ video,setVideo ] = useState('')
   const [ i,setI ] = useState(null)	
   const [error, setError] = useState("");
	 const empresaCollection = collection(db, "negocios")
   let urlDescarga
   const navigate = useNavigate()
  
   const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
  
   async function subirArchivo(e)
   {
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
      const imageRef = ref(storage,`negocios/${imageName}`); // Reemplaza 'images' con tu ruta de almacenamiento
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

    const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEmpresas({
      ...empresas,
      [name]: checked,
    });
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

	   const selectedEmpresas = Object.keys(empresas).filter(key =>empresas[key]);
	   const archivoRef=ref(storage,`negocios/${i.name}`)
	   const uplo=await uploadBytes(archivoRef,i)
	   urlDescarga=await getDownloadURL(archivoRef)
       await addDoc( empresaCollection, { 
	                                   nombre_negocio:codigo_empresa, 
	                                   direccion:direccion,
									   descripcion:descripcion,
									   telefono:video,
									   foto:urlDescarga,
									   facebook:facebook,
									   instagran:instagran,
									   titok:titok,
									   empresas:selectedEmpresas
		                               }
			   )
		 MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro con exito!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });
        //navigate('/ModuloAdministrador/Negocios')
    
  }catch(error){
		console.log(error)
	   } 

}


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
						<a href="javascript:void(0);">Registro Novedades</a></li>
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
			       <h4 className="text-center">Registro Negocio</h4><br/>
             
              <form className="forms-sample"onSubmit={store} >

				       <div className="form-group">
                        <label for="Categoriar">Nombre Negocio</label>
                        <textarea
                        className='form-control'
						placeholder="Nombre Negocio ..."
                        required
						value={codigo_empresa}
                        onChange={ (e) => setcodigoempresa(e.target.value)}
						cols="30" 				  
				        rows="5" 
			                />
                    </div>                  
				         
          <div className="form-group">
            <label for="Categoriar">Dirección</label>
            <textarea
              className='form-control'
		      placeholder="Dirección Negocio ..."
             value={direccion}
                        onChange={ (e) => setDireccion(e.target.value)}
 			  required
			  cols="30" 				  
			   rows="5" 
			/>
         </div>  
				
		 <div className="form-group">
           <label for="Categoriar">Descripción</label>
            <textarea
             className='form-control'
		     placeholder="Descripción ..."
			 value={descripcion}
             onChange={ (e) => setDescripcion(e.target.value)}
             required
    		 cols="30" 				  
			 rows="5" 
              />
             </div> 
					
			 <div className="form-group">
             <label for="Categoriar">Telefono</label>
              <textarea
               className='form-control'
			   placeholder="Telefono ..."
			   value={video}
               onChange={ (e) => setVideo(e.target.value)}
               />
             </div> 

             <div className="form-group">
              <label for="Categoriar">Facebook</label>
               <textarea
                className='form-control'
			    placeholder="Facebook ..."
         		value={facebook}
               onChange={ (e) => setFacebook(e.target.value)}
               />
             </div>         
					
             <div className="form-group">
              <label for="Categoriar">Instagran</label>
               <textarea
                className='form-control'
				placeholder="Instagran ..."
				value={instagran}
               onChange={ (e) => setInstagran(e.target.value)}
						  
               />
             </div>         

             <div className="form-group">
              <label for="Categoriar">Titok</label>
               <textarea
                className='form-control'
				placeholder="Titok ..."
				value={titok}
               onChange={ (e) => setTitok(e.target.value)}		   
               />
             </div>         
		    
			<div className="form-group mb-5">
             <label className="text-black" for="message">Tipo Actividad</label>
             <div className="mb-3 form-check">
             <input
              type="checkbox"
              className="form-check-input"
               name="vendedor"
			   checked={empresas.vendedor} onChange={handleCheckboxChange}  
              
              
             />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms"
			  >
             Vendedor
             </label>
             </div>

             <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
                name="comprador"
			   checked={empresas.comprador} onChange={handleCheckboxChange}  
              
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                 Comprador
                </label>
             </div>

               <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
               name="emprendedor"
			   checked={empresas.emprendedor} onChange={handleCheckboxChange}  
              
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                 Emprendedor
                </label>
             </div>

              <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
                name="distribuidor"
			   checked={empresas.distribuidor} onChange={handleCheckboxChange}  
              
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                Distribuidor
                </label>
             </div>
            
              <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
               name="proveedor"
			   checked={empresas.proveedor} onChange={handleCheckboxChange}  
              
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                 Proveedor
                </label>
             </div>

              <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
               name="empresa"
			   checked={empresas.empresa} onChange={handleCheckboxChange}  
              
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                 Empresa
                </label>
             </div>

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
                    <button 
                    type='submit'
                    className='btn btn-primary mr-2'>
                      Guardar
                    </button>
					          <Link
                      to="/ModuloAdministrador/Negocios" 
                      className='btn btn-primary mr-2'>
                       Regresar
                    </Link>
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

export default RegistraNegocio