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

function RegistrarN() {
	
	 const [ codigo_empresa,setcodigoempresa ] = useState('')
     const [ nombre_empresa,setNombreempresa ] = useState('')
     const [ direccion_empresa,setDireccionempresa ] = useState('')
	 const [ video,setVideo ] = useState('')
     const [ i,setI ] = useState(null)	
	 const empresaCollection = collection(db, "novedades")
     let urlDescarga
     const navigate = useNavigate()

  async function subirArchivo(e)
   {
	   const archivoLocal=e.target.files[0];
	   setI(archivoLocal);
   }

  const store = async (e) => {
    e.preventDefault()
	if(i){
		 const archivoRef=ref(storage,`novedades/${i.name}`)
	   const uplo=await uploadBytes(archivoRef,i)
	   urlDescarga=await getDownloadURL(archivoRef)
    await addDoc( empresaCollection, { nombre_novedades:codigo_empresa, 
	                                   fecha:nombre_empresa,
									   descripcion:direccion_empresa,
									    video:video,
									   imagen:urlDescarga
		} )
		 MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro con exito!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });
        navigate('/ModuloAdministrador/modulo_novedades/ModuloNovedades')
    
  }}


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
        <div className='row'  id="mover" style={{marginBottom:"-80px"}}>
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Registro Novedades</h4><br/>
                 <form className="forms-sample"onSubmit={store} >

				 <div className="form-group">
                        <label for="Categoriar">Nombre Novedades</label>
                        <textarea
                            
                            className='form-control'
						    placeholder="Nombre Novedades ..."
                            required
							value={codigo_empresa}
                            onChange={ (e) => setcodigoempresa(e.target.value)}
							 cols="30" 				  
				             rows="5" 
							
                        />
                    </div>                  
				
                  <div className="form-group">
                        <label for="Categoriar">Fecha Novedades</label>
                        <input
                            type="date"
                            className='form-control'
						    placeholder="Fecha Novedades ..."
                            required
							 value={nombre_empresa}
                            onChange={ (e) => setNombreempresa(e.target.value)}
							
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
	  </>

  )
 
  
 
  
}

export default RegistrarN