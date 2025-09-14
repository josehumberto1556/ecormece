import React,{useState,useEffect}from 'react'
import {Link,useParams} from 'react-router-dom'
import { getDoc, updateDoc, doc } from "firebase/firestore"
import {db,app} from '../../Configfirebase/Configfirebase'	
import { getStorage,
         deleteObject,
         ref, 
		 uploadBytes,
		 getDownloadURL } from 'firebase/storage'
import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'
import './formulario.css'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const storage=getStorage(app)
const MySwal = withReactContent(Swal)

function EditarNegocio() {
	
  const [ nombre_novedades,setcodigoempresa ] = useState('')
  const [ fecha,setNombreempresa ] = useState('')
  const [ descripcion,setDescripcion ] = useState('')	
  const [ imagen,setImagen ] = useState('')
  const [ video,setVideo ] = useState('')
  const [ red,setRed ] = useState('')
  const [ red1,setRed1 ] = useState('')
  const [ red2,setRed2 ] = useState('')
  const [ i,setI ] = useState(null)
  const [error, setError] = useState("");
  const maxSize = 5 * 1024 * 1024; // 5 MB en bytes 
   const [empresas,setEmpresas]=useState({
	   empres:false,
	   vendedor:false,
	   emprendedor:false,
	   distribuidor:false,
	   proveedor:false,
	   empresa:false
   })
  const {id} = useParams()
    
	const getEmpresaById = async (id) => {
        const empres = await getDoc( doc(db, "negocios", id) )
        if(empres.exists()) 
		{
            //console.log(product.data())
          const fetchedData = empres.data();
          // Mapeamos los hobbies de la base de datos a nuestro estado local
          const newEmpresa = { ...empresas };
          fetchedData.empresas.forEach(empr => {
            newEmpresa[empr] = true;
          });
          setEmpresas(newEmpresa);  
       
          
			setcodigoempresa(empres.data().nombre_negocio)    
            setNombreempresa(empres.data().direccion)
			setDescripcion(empres.data().descripcion) 
            setImagen(empres.data().foto)
			setVideo(empres.data().telefono)	
            setRed(empres.data().facebook)	
            setRed1(empres.data().instagran)	
            setRed2(empres.data().titiok)	
         
        }else{
            console.log('El  no existe')
        }
    }

    useEffect( () => {
        getEmpresaById(id)
        // eslint-disable-next-line
    }, [])
  
	 const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEmpresas({
      ...empresas,
      [name]: checked,
    });
  };
	 let urlDescarga
     let archivoLocalname

	 
	 
  async function subirArchivo(e)
   {
	   //detectar archivo
	    const archivoLocal=e.target.files[0]
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

  
	
    const update = async (e) => {
        e.preventDefault()
		if(!i)
		{
			
		  
             const empresa = doc(db, "negocios", id)
             const selectedHobbies = Object.keys(empresas).filter(key => empresas[key]);        		 
              const data = { 
			                 nombre_negocio:nombre_novedades, 
	                         direccion:fecha,
							 empresas:selectedHobbies,
					         descripcion:descripcion,
					         telefono:video,
							 facebook:red,
							 instagran:red1,
							 titok:red2
					       }
						   
              await updateDoc(empresa, data)
		      MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro Modificado con exito!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });
		}
		else
		{
		
		 const imageRef = ref(storage, imagen);
         const eli=await deleteObject(imageRef);
 		 const empresa = doc(db, "negocios", id)	
		 const n=i	  
	     const archivoRef=ref(storage,`negocios/${n.name}`)
	     const uplo=await uploadBytes(archivoRef,n)
	     urlDescarga=await getDownloadURL(archivoRef)   
		 const selectedHobbies = Object.keys(empresas).filter(key => empresas[key]);        		 
         const data = { 
			                 nombre_negocio:nombre_novedades, 
	                         direccion:fecha,
							 empresas:selectedHobbies,
					         descripcion:descripcion,
					         telefono:video,
							 facebook:red,
							 foto:urlDescarga,
							 instagran:red1,
							 titok:red2
					       }
			
        await updateDoc(empresa, data)
         MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro mpdificado con exito!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });		
		}
    }

    
  
  return (
       <div className="hold-transition sidebar-mini layout-fixed">
		 <Aside/>
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
						<a href="javascript:void(0);">Editar Negocio</a></li>
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
			   <h4 className="text-center">Editar Negocio</h4><br/>
                 <form className="forms-sample" onSubmit={update}>

				            <div className="form-group">
                        <label for="Categoriar">Nombre Novedades</label>
                        <textarea
                         className='form-control'
						             placeholder="Nombre Negocio ..."
                         required
							          value={nombre_novedades}
                        onChange={ (e) => setcodigoempresa(e.target.value)}
							          cols="30" 				  
				                rows="5" 
							        />
                    </div>                  
				 
				 <div className="form-group">
            <label for="Categoriar">Dirección</label>
            <textarea
             className='form-control'
						 placeholder="Nombre Negocio ..."
             required
						 value={fecha}
            onChange={ (e) => setNombreempresa(e.target.value)}
						 cols="30" 				  
				     rows="5" 
						 />
         </div>  
					
					 <div className="form-group">
             <label for="Categoriar">Descripción</label>
               <textarea
                        
                className='form-control'
	      		    placeholder="Descripción ..."
                required
							  value={descripcion}
                onChange={(e)=>setDescripcion(e.target.value)}
							  cols="30" 				  
				        rows="5" 
                />
                    </div> 
					
					
			 <div className="form-group">
              <label for="Categoriar">Telefono</label>
              <textarea
               className='form-control'
			   placeholder="Url  Video..."
			   value={video}
               onChange={ (e) => setVideo(e.target.value)}
                />
             </div> 

             <div className="form-group">
              <label for="Categoriar">Facebook</label>
               <textarea
                className='form-control'
				placeholder="Facebook ..."
				value={red}
                onChange={ (e) => setRed(e.target.value)}
               />
             </div>         
					
             <div className="form-group">
              <label for="Categoriar">Instagran</label>
               <textarea
                className='form-control'
				placeholder="Instagran ..."
				value={red1}
                onChange={ (e) => setRed1(e.target.value)}
               />
             </div>         

             <div className="form-group">
              <label for="Categoriar">Titok</label>
               <textarea
                className='form-control'
				placeholder="Titok ..."
				value={red2}
                onChange={ (e) => setRed2(e.target.value)}
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
                 <img src={imagen} width="100"  height="100"/>
              </div> 
					
            


					 <div className="form-group">
                        <label for="Categoriar">Imagen</label>
                        <input
                            type="file"
                            className='form-control'
                            onChange={subirArchivo} 
                             accept="image/*"
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
					          <Link 
                    to="/ModuloAdministrador/Negocios" 
                    className='btn btn-primary mr-2'>
                      Regresar</Link>
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
  )
 
  
 
  
}

export default EditarNegocio