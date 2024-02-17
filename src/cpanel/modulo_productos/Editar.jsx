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
  const [ descripcion,setDescripcion ] = useState('')	
  const [ imagen,setImagen ] = useState('')
  const [ video,setVideo ] = useState('')
  const [ precio,setPrecio ] = useState('')
  const [ ca,setCa ] = useState('')
  const [ i,setI ] = useState(null)
  
    const {id} = useParams()
    
	const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "m_productos", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setcodigoempresa(empresa.data().nombre_productos)    
			setDescripcion(empresa.data().descripcion) 
            setImagen(empresa.data().imagenq)
			setVideo(empresa.data().cantidad)	
			setPrecio(empresa.data().precio)
			setCa(empresa.data().categoria)
        }else{
            console.log('El  no existe')
        }
    }

    useEffect( () => {
        getEmpresaById(id)
        // eslint-disable-next-line
    }, [])
  
	
	 let urlDescarga

	 
	 
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
			
		  
             const empresa = doc(db, "m_productos", id)
		    
              const data = { nombre_productos:nombre_novedades, 
	                         descripcion:descripcion,
					         cantidad:video,
							 precio:precio
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
		  const empresa = doc(db, "m_productos", id)	
		const n=i	  
	    const archivoRef=ref(storage,`m_producto/${n.name}`)
	    const uplo=await uploadBytes(archivoRef,n)
	    urlDescarga=await getDownloadURL(archivoRef)   
		
		const data = { nombre_productos:nombre_novedades, 
	                   descripcion:descripcion,
					   cantidad:video,
					    precio:precio,
					    imagenq:urlDescarga
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
						<a href="javascript:void(0);">Editar Producto</a></li>
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
			   <h4 className="text-center">Editar Producto {nombre_novedades}</h4><br/>
                 <form className="forms-sample" onSubmit={update}>

				 <div className="form-group">
                        <label for="Categoriar">Nombre Producto</label>
                        <textarea
                            
                            className='form-control'
						    placeholder="Nombre Producto ..."
                            required
							value={nombre_novedades}
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
                            required
							value={descripcion}
                            onChange={(e)=>setDescripcion(e.target.value)}
							 cols="30" 				  
				             rows="5" 
                        />
                    </div> 
					
					
					 <div className="form-group">
                        <label for="Categoriar">Cantidad</label>
                         <input 
						 type="number"
						 min="1" max="10"  
                         className='form-control'
						 placeholder="cantidad ..."
						 value={video}
                         onChange={ (e) => setVideo(e.target.value)}
                         required
                        />
                    </div> 
					
					<div className="form-group">
                        <label for="Categoriar">Precio</label>
                        <input 
						type="text" 
						name="precio" 
						placeholder="Precio" 
						minlength="1" 
						maxlength="6" size="10"
						className='form-control'
						 value={precio}
                         onChange={ (e) => setPrecio(e.target.value)}
						required/>
                    </div> 
					
					<div className="form-group">
                        <label for="Categoriar">Categoria</label>
                        <textarea
                            
                            className='form-control'
						    placeholder="Categoria ..."
                            required
							value={ca}
                            onChange={(e)=>setCa(e.target.value)}
							 cols="30" 				  
				             rows="5" 
							 disabled
                        />
                    </div> 
						 <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={imagen} width="100"  height="100"/>
                          </div> 
					
					 <div className="form-group">
                        <label for="Categoriar">Subir Imagen</label>
                        <input
                            type="file"
                            className='form-control'
                            onChange={subirArchivo} 
                        />
                    </div>
					
                     <div align="Center">
                    <button type='submit' className='btn btn-primary mr-2'>Guardar</button>
					<Link to="/ModuloAdministrador/Productos" className='btn btn-primary mr-2'>Regresar</Link>
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