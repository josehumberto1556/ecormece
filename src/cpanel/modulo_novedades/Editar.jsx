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

function EditarN() {
	
  const [ nombre_novedades,setcodigoempresa ] = useState('')
  const [ fecha,setNombreempresa ] = useState('')
  const [ descripcion,setDescripcion ] = useState('')	
  const [ imagen,setImagen ] = useState('')
  const [ video,setVideo ] = useState('')
  const [ i,setI ] = useState(null)
  
    const {id} = useParams()
    
	const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "novedades", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setcodigoempresa(empresa.data().nombre_novedades)    
            setNombreempresa(empresa.data().fecha)
			setDescripcion(empresa.data().descripcion) 
            setImagen(empresa.data().imagen)
			setVideo(empresa.data().video)	
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
	   setI(archivoLocal);
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
						<a href="javascript:void(0);">Editar Novedades</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row'id="mover"  style={{marginBottom:"-80px"}} >
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Editar Novedades</h4><br/>
                 <form className="forms-sample" onSubmit={update}>

				 <div className="form-group">
                        <label for="Categoriar">Nombre Novedades</label>
                        <textarea
                            
                            className='form-control'
						    placeholder="Nombre Novedades ..."
                            required
							value={nombre_novedades}
                            onChange={ (e) => setcodigoempresa(e.target.value)}
							 cols="30" 				  
				            rows="5" 
							
                        />
                    </div>                  
				 
				 <div className="form-group">
                        <label for="Categoriar">Fecha</label>
                        <input
                            type="date"
                            className='form-control'
						    placeholder="Fecha ..."
							minlength="6"
							maxlength="20"
                            required
							value={fecha}
                            onChange={ (e) => setNombreempresa(e.target.value)}
							
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
                        <label for="Categoriar">Url Video</label>
                        <textarea
                            
                            className='form-control'
						    placeholder="Url  Video..."
						    value={video}
                            onChange={ (e) => setVideo(e.target.value)}
                            required
                        />
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
                        />
                    </div>
					
                     <div align="Center">
                    <button type='submit' className='btn btn-primary mr-2'>Guardar</button>
					<Link to="/ModuloAdministrador/modulo_novedades/ModuloNovedades" className='btn btn-primary mr-2'>Regresar</Link>
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

export default EditarN