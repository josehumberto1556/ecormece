import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./IniciarSeccion.css"
import {Link, useNavigate }   from "react-router-dom";
import { useUserAuth } from "../context/UsuarioContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function IniciarSeccion() {
  const{log} = useUserAuth();
  let navigate = useNavigate();
   
  const  submitHandler=async(e)=>{
      
    e.preventDefault()
    const email=e.target.emailField.value
    const password=e.target.passwordField.value
    try
    {
          
      await log(email,password);
      MySwal.fire({
                    title: "Bien hecho!",
                    text: "Has Iniciado Sección!",
                    icon: "success",
                     button: "Felicitaciones!",
                 });
              navigate("/Menu"); 
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
