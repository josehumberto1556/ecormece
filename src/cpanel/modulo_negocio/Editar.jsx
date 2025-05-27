import React,{useState,useEffect}from 'react'
import {Link,useParams} from 'react-router-dom'
import { getDoc, updateDoc, doc } from "firebase/firestore"
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
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [empresaUpdates, setEmpresaUpdates] = useState(false);
  const [distribuidorUpdates, setDistribuidorUpdates] = useState(false);
  const [proveedorUpdates, setProveedorUpdates] = useState(false);
  const [emprendedorUpdates, setEmprendedorUpdates] = useState(false);
  const {id} = useParams()
    
	const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "negocios", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setcodigoempresa(empresa.data().nombre_negocio)    
            setNombreempresa(empresa.data().direccion)
			      setDescripcion(empresa.data().descripcion) 
            setImagen(empresa.data().foto)
			      setVideo(empresa.data().telefono)	
            setRed(empresa.data().rede_social)	
            setRed1(empresa.data().rede_social1)	
            setRed2(empresa.data().rede_social2)	
            setAcceptTerms(empresa.data().vendedor)
            setReceiveUpdates(empresa.data().comprador)
            setEmpresaUpdates(empresa.data().empresa)
            setProveedorUpdates(empresa.data().proveedor)
            setDistribuidorUpdates(empresa.data().distribuidor)
            setEmprendedorUpdates(empresa.data().emprendedor)
        }else{
            console.log('El  no existe')
        }
    }

    useEffect( () => {
        getEmpresaById(id)
        // eslint-disable-next-line
    }, [])
  
	
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
			
		  
             const empresa = doc(db, "novedades", id)
		    
              const data = { nombre_novedades:nombre_novedades, 
	                         fecha:fecha,
					         descripcion:descripcion,
					         video:video
					       }
						   
              await updateDoc(empresa, data)
		      MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro Modificado con exito!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });
		}
		else{
		  const empresa = doc(db, "novedades", id)	
		const n=i	  
	    const archivoRef=ref(storage,`novedades/${n.name}`)
	    const uplo=await uploadBytes(archivoRef,n)
	    urlDescarga=await getDownloadURL(archivoRef)   
		
		const data = { nombre_novedades:nombre_novedades, 
	                   fecha:fecha,
					   descripcion:descripcion,
					   video:video,
					   imagen:urlDescarga
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
        <div className='row mover'>
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
						    placeholder="Facebook ..."
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
					
					

						 <div className="form-group">
               <label for="Categoriar">Imagen</label>
                 <img src={imagen} width="100"  height="100"/>
              </div> 
					
            <div className="form-group mb-5">
             <label className="text-black" for="message">Tipo Actividad</label>
             <div className="mb-3 form-check">
             <input
              type="checkbox"
              className="form-check-input"
              id="acceptTerms"
               checked={acceptTerms}
              
             />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
             Vendedor
             </label>
             </div>

             <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
               id="receiveUpdates"
              checked={receiveUpdates}
              //  onChange={handleUpdatesChange}
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
               id="receiveUpdates"
              checked={emprendedorUpdates}
              //  onChange={handleUpdatesChange}
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
               id="receiveUpdates"
              checked={distribuidorUpdates}
              //  onChange={handleUpdatesChange}
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
               id="receiveUpdates"
              checked={proveedorUpdates}
              //  onChange={handleUpdatesChange}
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
               id="receiveUpdates"
              checked={empresaUpdates}
              //  onChange={handleUpdatesChange}
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