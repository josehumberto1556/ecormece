import React,{useState,useEffect}from 'react'
import { Link, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import {app,db,auth} from '../../Configfirebase/Configfirebase'		
import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'
import  './formulario.css'
import CryptoJS from 'crypto-js'
import { getStorage,
         ref, 
		 uploadBytes,
         deleteObject,
		 getDownloadURL } from 'firebase/storage'
import { useUserAuth } from "../../context/UsuarioContext"
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
 
const storage=getStorage(app)
const MySwal = withReactContent(Swal)


function Editar() {
	
	
  const [ nombre_usuario,setcodigoempresa ] = useState('')
  const [ email_usuario,setNombreempresa ] = useState('')
  const [ clave_usuario,setDireccionempresa ] = useState('')
  const [ imageni,setImagen ] = useState('')
  const [tipo,setTipo]=useState('')
  const [ i,setI ] = useState(null)
  const [errorMensaje, setErrorMensaje] = useState(null);
  const [errorMensajeClave,setErrorMensajeClave] = useState(null);
  const { crearUsuario } = useUserAuth();
  
  const {id} = useParams()


    const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "usuarios", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setcodigoempresa(empresa.data().nombre_usuario)    
            setNombreempresa(empresa.data().email_usuario)
			setDireccionempresa(empresa.data().clave_usuario)   
            setImagen(empresa.data().imagen)
            setTipo(empresa.data().vendedor())			
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
	  
    if(!i)
    {
           

           if(nombre_usuario)
            {
               
            
                  const data = {
                                nombre_usuario:nombre_usuario, 
           
                                tipo:tipo
                                }
                                
                    await updateDoc(empresa, data)
                    MySwal.fire({
                                title: "Felicitaciones!",
                                text: "Registro Modificado Con Exito!",
                                icon: "danger",
                                button: "Felicitaciones!"
                                });	
             
             
                console.log("Usuario eliminado de Firebase Authentication.");
    
               
             
            }//fin del if email nuevo      
            
          }//fin del if de negar imagen         
        
     else
	   {
           
        
            if(nombre_usuario)
            {
               
               const n=i	 
		       const imageRef = ref(storage, imageni);
               const eli=await deleteObject(imageRef);
               const archivoRef=ref(storage,`musuarios/${n.name}`)
	            const uplo=await uploadBytes(archivoRef,n)
	            urlDescarga=await getDownloadURL(archivoRef) 
   		        const data = { nombre_usuario:nombre_usuario, 
                            imagen:urlDescarga,
                            tipo:tipo
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
        <div className='row'  >
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
                            disabled                  
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
                             disabled    
                        />
                    </div> 

				<div className="form-group">
                  <label className="text-black" for="message">Tipo Actividad</label>
					{tipo===true?          
					<select 
					className="form-control" 
					required>
						<option value="true">Vendedor</option>
						<option value="false">Comprador</option>
					</select>
					:
					<select 
					className="form-control" 
					required>
						<option value="fale">Comprador</option>
						<option value="true">Vendedor</option>
					</select>
					}
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