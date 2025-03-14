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

function VerImagenes() {
	
  const [ nombre_novedades,setcodigoempresa ] = useState('')
  const [ progress,setProgress ] = useState('')	
  const [ imagen,setImagen ] = useState('')	
  const [ imagen1,setImagen1 ] = useState('')	
  const [ imagen2,setImagen2 ] = useState('')	
  const [ imagen3,setImagen3 ] = useState('')	
  const [ imagen4,setImagen4 ] = useState('')	
  const {id} = useParams()
    
	const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "m_productos", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setcodigoempresa(empresa.data().nombre_productos)    
            setImagen(empresa.data().imagenq)
            setImagen1(empresa.data().imagen)
            setImagen2(empresa.data().imagen1)
            setImagen3(empresa.data().imagen2)
            setImagen4(empresa.data().imagen3)
		}else{
            console.log('El  no existe')
        }
    }

    useEffect( () => {
        getEmpresaById(id)
        // eslint-disable-next-line
    }, [])
			
  
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
						<a href="javascript:void(0);">Agregar Imagenes de Producto</a></li>
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
			   <h4 className="text-center">Agregar Imagenes de Producto {nombre_novedades}</h4><br/>
                 <form className="forms-sample">

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
							disabled
                        />
                    </div>                  
				 
				
			
						 <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={imagen} width="100"  height="100"/>
                          </div> 
					
					     <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={imagen1} width="100"  height="100"/>
                          </div> 

                          <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={imagen2} width="100"  height="100"/>
                          </div> 
					
                        <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={imagen3} width="100"  height="100"/>
                          </div> 
					
                       <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={imagen4} width="100"  height="100"/>
                          </div> 
					
					 
					
                     <div align="Center">
                    
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

export default VerImagenes





