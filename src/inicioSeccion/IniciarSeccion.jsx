import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./IniciarSeccion.css"
import React,{useState,useEffect}from 'react'
import {db,app} from '../Configfirebase/Configfirebase'	
import {Link, useNavigate }   from "react-router-dom";
import { collection,query,where,getDocs } from 'firebase/firestore'; 
import { useUserAuth } from "../context/UsuarioContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CryptoJS from 'crypto-js';
const MySwal = withReactContent(Swal)

function IniciarSeccion() {
  const{log} = useUserAuth();
  let navigate = useNavigate();
   const [ email,setEmail ] = useState('')
   const [ clave,setClave ] = useState('')
   const [error, setError] = useState(""); 
  const  submitHandler=async(e)=>{
      
    e.preventDefault()
    // const email=e.target.emailField.value
    // const password=e.target.passwordField.value
   
    try
    {
      const hash = CryptoJS.MD5(clave).toString();
      const col= collection(db,'usuarios');
      const q=query(col,where("email_usuario","==",email),where("clave_usuario","==",hash));
      const datos=await getDocs(q);       
      if(datos.empty){setError("Correo o contraeña invalida.");return null;}
      else
      {
        await log(email,hash);
      
              MySwal.fire({
                    title: "Bien hecho!",
                    text: "Has Iniciado Sección!",
                    icon: "success",
                     button: "Felicitaciones!",
                 });
              navigate("/Menu"); 
        
        }//fin del else

        }catch(error){
      
      
  
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
  <>
   <Navbar/>
   <Navbar1/>

			
			<div className="untree_co-section">
      <div className="container">

        <div className="block">
          <div className="row justify-content-center">


            <div className="col-md-8 col-lg-8 pb-4">


              <div className="row mb-5">
               

               
             
              </div>

			   <div>
          
         <h3 className="mb-5 text-center">Cuenta de Usuario</h3>
         {error &&     
                      <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                         <strong>Error!</strong> {error}
                         <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                   }

         <form  onSubmit={submitHandler}>

  <div data-mdb-input-init className="form-outline mb-4">
    <input 
      className="form-control"
       type="email" 
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
    <label className="form-label" for="form2Example1">Correo Electronico</label>
  </div>


  <div data-mdb-input-init class="form-outline mb-4">
    <input 
    name="password" 
    id="passwordField"
    className="form-control" 
    placeholder="Password"
    type="password"
    minlength="6"
    maxlength="20"
    required
    value={clave}
    onChange={ (e) => setClave(e.target.value)}
   />
    <label class="form-label" for="form2Example2">Contraseña</label>
  </div>


  <div className="row mb-4">
  
   <div className="col d-flex justify-content-center">
      
      <div class="form-check">
        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label className="form-check-label" for="form2Example31"> Selecionado para recuperar </label>
      </div>
    </div>

    <div class="col">
     
    <Link className="text-center boton2"
				to="/RecuperarAcceso"> 
			  Recuperar Contraseña
                </Link>
    </div>
  </div>
 
  <div class="d-grid gap-2 col-6 mx-auto">
   <button  type="submit" className="boton4">Entrar</button>
  </div>
  
  <br/>
  
  <div className="text-center">
    
    <Link 
      className="text-center boton3"
	   	to="/RegistrarUsuario"
     > 
		  Registrar Usuario
      </Link> 
    
    {/*}
    <p>or sign up with:</p>
    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>
    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-link btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button>
  */}
    </div>
</form>

 </div>

            </div>

          </div>

        </div>

      </div>


    </div>
  

		      
		 

	 
	 <Footer/>
  </>
  );
}

export default IniciarSeccion;
