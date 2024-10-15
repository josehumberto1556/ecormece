import React,{useState,useEffect}from 'react'
import {useNavigate,Link } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { useUserAuth } from "../../context/UsuarioContext";
import {app,db} from '../../Configfirebase/Configfirebase'		
import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'
import  './formulario.css'

import { getStorage,
         ref, 
		 uploadBytes,
		 getDownloadURL } from 'firebase/storage'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const storage=getStorage(app)
const MySwal = withReactContent(Swal)

function Registrar() {
	
  const { crearUsuario } = useUserAuth(); 	
  const [ codigo_empresa,setcodigoempresa ] = useState('')
  const [ nombre_empresa,setNombreempresa ] = useState('')
  const [ direccion_empresa,setDireccionempresa ] = useState('')
  const [ i,setI ] = useState(null)
 
  const navigate = useNavigate()
  let urlDescarga
   async function subirArchivo(e)
   {
	    const archivoLocal=e.target.files[0];
	    setI(archivoLocal);
   }

   
  const store = async (e) => {
    e.preventDefault()
	if(i)
	{
		
		const archivoRef=ref(storage,`imagenesusuarios/${i.name}`)
	    const uplo=await uploadBytes(archivoRef,i)
	    urlDescarga=await getDownloadURL(archivoRef)
	    console.log(uplo)
	    console.log(urlDescarga)
	    const correo=e.target.emailField.value
        const password=e.target.passwordField.value
	    console.log(correo,password)
	    const usuario=await crearUsuario(
				 correo,
				 password
                 ).then((
	             usuarioFirebase)=>
	             {return usuarioFirebase}
	             ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      switch (errorCode) {
        case "auth/email-already-in-use":
            MySwal.fire({
                           title: "Error!",
                           text: "Correo ya existe!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });
          break;
        case "auth/invalid-email":
          MySwal.fire({
                           title: "Error!",
                           text: "Correo Invalido!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });
          break;
        case "auth/weak-password":
          MySwal.fire({
                           title: "Error!",
                           text: "Clave debil!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });
          break;
        default:
          // Handle other errors
          break;
      }	
				 })
				 
				   let idu=usuario.user.uid;
				   const empresaCollection = collection(db, "usuarios")

                   await addDoc( empresaCollection, { 
				                       nombre_usuario:codigo_empresa, 
	                                   email_usuario:nombre_empresa,
									   clave_usuario:direccion_empresa,
									   imagen:urlDescarga,
									   nivel_usuario:1
									   } )
		MySwal.fire({
                      title: "Bien hecho!",
                      text: "Registro con exito!",
                      icon: "success",
                       button: "Felicitaciones!",
                   });								   
    navigate('/ModuloAdministrador/modulo_usuarios/ModuloUsuario')
    //console.log(e.target[0].value)
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
						<a href="javascript:void(0);">Registro Usuario</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row' id="mover" style={{marginBottom:"-80px"}}>
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Registro Usuarios</h4><br/>
                 <form className="forms-sample" onSubmit={store}>

				 <div className="form-group">
                        <label for="Categoriar">Nombre Usuario</label>
                        <input
                            type="text"
                            className='form-control'
						    placeholder="Nombre Usuario ..."
							minlength="3"
							maxlength="20"
                            required
							value={codigo_empresa}
                            onChange={ (e) => setcodigoempresa(e.target.value)}  
                        />
                    </div>                  
				 
				 <div className="form-group">
                        <label for="Categoriar">Correo Usuario</label>
                        <input
                            type="email"
						              	 id="emailField" 
                            className='form-control'
						                placeholder="Correo Usuario ..."
							              minlength="3"
							              maxlength="100"
                            required
							              value={nombre_empresa}
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
							value={direccion_empresa}
                            onChange={ (e) => setDireccionempresa(e.target.value)} 
                            id="passwordField"	
							required
                        />
                    </div> 
					
					
					<div className="form-group">
                        <label className="descripcionr">Subir Imagen</label>
                        <input
                            
                            type="file"
                            className='form-control'
						    onChange={subirArchivo} 
							required
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
    
	  <Footer/>
 </div>
    </div> 
	 </>
  )
 
  
 
  
}

export default Registrar