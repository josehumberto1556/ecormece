import React,{useState} from "react";
import {Link, useNavigate }   from "react-router-dom";
import { useUserAuth } from "../../context/UsuarioContext";
import {db,app} from '../../Configfirebase/Configfirebase'	
import { collection,query,where,getDocs } from 'firebase/firestore'; 
import "./Login.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CryptoJS from 'crypto-js';
const MySwal = withReactContent(Swal)


const LoginU = () => {
	
	const{log} = useUserAuth();
    let navigate = useNavigate();
	  const [ email,setEmail ] = useState('')
    const [ clave,setClave ] = useState('')
     const [error, setError] = useState(""); 
	async function submitHandler(e){
		 e.preventDefault()
		         		 
		try
		{
		
        const password= CryptoJS.MD5(clave).toString();
		    const col= collection(db,'usuarios');
        const q=query(col,where("email_usuario","==",email),where("clave_usuario","==",password));
        const datos=await getDocs(q);       
        if(datos.empty){setError("Correo o contraeña invalida.");return null;}
				else{
        await log(email,password);
				MySwal.fire({
                      title: "Bien hecho!",
                      text: "Has Iniciado Sección!",
                      icon: "success",
                       button: "Felicitaciones!",
                   });
                navigate("/ModuloAdministrador"); 
        }//fin del else
			}catch(error){
				
				
				
				if(error.code ==='auth/invalid-email')
				{
                  MySwal.fire({
                      title: "Error!",
                      text: "Correo Electronico Invalido!",
                      icon: "danger",
                       button: "Felicitaciones!"
					    });
                 
				  
                }
				
				if(error.code ==='auth/user-not-found')
				{
                  MySwal.fire({
                      title: "Error!",
                      text: "Correo no existe!",
                      icon: "danger",
                       button: "Felicitaciones!"
					    });
                 
				  
                }
				
				if (error.code === 'auth/wrong-password')
				{
					   MySwal.fire({
                      title: "Error!",
                      text: "Contraseña debil minimo 6 caracteres!",
                      icon: "danger",
                       button: "Felicitaciones!"
					    });
				}
				
	
			}//fin del try catch
	}	
	
	
  return (
  
<div className="body">
  
 <section className="vh-100" style={{backgroundColor:"#508bfc"}}>
 
 <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius:"1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Cuenta de Usuario</h3>
            {error &&     
                      <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                         <strong>Error!</strong> {error}
                         <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                   }

            <form onSubmit={submitHandler}>

            <div className="form-outline mb-4">
            
              <input 
			          type="email" 
			          className="form-control form-control-lg" 
			          placeholder="Email"
		            name="email" 
		            id="emailField"
		            autofocus=""
		            minlength="3"
		            maxlength="100" 
		            required
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
			      />

              <label className="form-label" for="typeEmailX-2">Email</label>
            </div>

            <div className="form-outline mb-4">
              <input
               type="password" 
			         className="form-control form-control-lg" 
			         name="password" 
			         id="passwordField"
			         placeholder="Password"
			         minlength="6"
			         maxlength="20"
			         required
							value={clave}
              onChange={ (e) => setClave(e.target.value)}
			       />
			  
              <label className="form-label" for="typePasswordX-2">Password</label>
            </div>

            
            <div className="form-check d-flex justify-content-start mb-4">
             
              <Link className="text-center"
				to="/RecuperarClave"> 
				Olvido Contraseña
                </Link>
            </div>

            <button className="btn btn-primary btn-lg btn-block" type="submit">Entrar</button>
           </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 </div>
  );
};

export default LoginU;
