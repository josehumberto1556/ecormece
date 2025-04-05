import React,{useState,useEffect}from 'react'
import { Link, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import {app,db} from '../../Configfirebase/Configfirebase'		
import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'
import  './formulario.css'
import CryptoJS from 'crypto-js'
import { getStorage,
         ref, 
		 uploadBytes,
		 getDownloadURL } from 'firebase/storage'
		 
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
		 
const storage=getStorage(app)
const MySwal = withReactContent(Swal)


function Editar() {
	
	
  const [ nombre_usuario,setcodigoempresa ] = useState('')
  const [ email_usuario,setNombreempresa ] = useState('')
  const [ clave_usuario,setDireccionempresa ] = useState('')
  const [ imageni,setImagen ] = useState('')
  const [ i,setI ] = useState(null)
  
  
  const {id} = useParams()


    const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "usuarios", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setcodigoempresa(empresa.data().nombre_usuario)    
            setNombreempresa(empresa.data().email_usuario)
			setDireccionempresa(empresa.data().clave_usuario)   
            setImagen(empresa.data().imageni)			
        }else{
            console.log('El usuario no existe')
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
	  
	   const archivoLocal=e.target.files[0]
	   archivoLocalname=archivoLocal.name
	   setI(archivoLocal);
	  
   }

    const update = async (e) => {
        e.preventDefault()
        const empresa = doc(db, "usuarios", id)
		if(!i){
	      
		  
          const n=imageni
		  const archivoRef=ref(storage,`imagenesusuarios/${n}`)
	      const uplo=await uploadBytes(archivoRef,n)
	      urlDescarga=await getDownloadURL(archivoRef)
          const hash = CryptoJS.MD5(clave_usuario).toString();          
		  const data = { nombre_usuario:nombre_usuario, 
	                     email_usuario:email_usuario,
					     clave_usuario:hash,
					     imagen:n
				        }
						
            await updateDoc(empresa, data)
		    MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro Modificado Con Exito!",
                           icon: "danger",
                          button: "Felicitaciones!"
					    });	   
       }
       else{
        const n=i	  
		    const archivoRef=ref(storage,`imagenesusuarios/${n.name}`)
	        const uplo=await uploadBytes(archivoRef,n)
	        urlDescarga=await getDownloadURL(archivoRef) 
            const hash = CryptoJS.MD5(clave_usuario).toString();  
   		    const data = { nombre_usuario:nombre_usuario, 
	                       email_usuario:email_usuario,
					       clave_usuario:hash,
					       imagen:urlDescarga
				         }
						 
        await updateDoc(empresa, data)
		 MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro Modificado Con Exito!",
                           icon: "danger",
                          button: "Felicitaciones!"
					    });	  
	  
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
                         <a href="javascript:void(0);">Editar Usuario</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row mover' >
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Editar Usuario {nombre_usuario}</h4><br/>
                 <form className="forms-sample" onSubmit={update} >

				 <div className="form-group">
                        <label for="Categoriar">Nombre Usuario</label>
                        <input
                            type="text"
                            className='form-control'
						    placeholder="Nombre Usuario ..."
							minlength="3"
							maxlength="20"
                            required
							value={nombre_usuario}
                            onChange={ (e) => setcodigoempresa(e.target.value)}
							
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
                            required
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
                            required
							value={clave_usuario}
                            onChange={ (e) => setDireccionempresa(e.target.value)}
                        />
                    </div> 
					
					 <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={imageni} width="100"  height="100"/>
                          </div> 
					
					<div className="form-group">
                        <label className="descripcionr">Subir Imagen</label>
                        <input
                            onChange={subirArchivo} 
                            type="file"
                            className='form-control'
						    
                        />
					 </div> 
					
                     <div align="Center">
                    <button type='submit' className='btn btn-primary mr-2'>Guardar</button>
					<Link to="/ModuloAdministrador/modulo_usuarios/ModuloUsuario" className='btn btn-primary mr-2'>Regresar</Link>
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

export default Editar