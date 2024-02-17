import React,{useState} from 'react'
import { Link,useNavigate }  from "react-router-dom";
import { useUserAuth } from "../../context/UsuarioContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)		
		
const RecuperarC = (props) => {
	
  const [formCorreo, setFormCorreo] = useState("");
  const {recuperarClave}=useUserAuth()
   const navigate = useNavigate();
  const cambiarDatos = (e) => {
    const value = e.target.value;
    setFormCorreo(value);
  };
  
  function recuperarContrasena(formCorreo){
  
   try
   {
      recuperarClave(formCorreo)
	  			 MySwal.fire({
                      title: "Bien hecho!",
                      text: "Revisa tu bandeja de entrada o span!",
                      icon: "success",
                       button: "Felicitaciones!",
                   });
				navigate("/CuentaUsuario");   
    }catch(error)
	{
	  if(error.code ==='auth/user-not-found')
	  {
         MySwal.fire({
                      title: "Error!",
                      text: "Correo Electronico Invalido!",
                      icon: "danger",
                       button: "Felicitaciones!"
					    });
      }
    };
  }
  	 
  const recuperar = (e) => {
    e.preventDefault();
    recuperarContrasena(formCorreo).then((res) => {
      if (res === "correcto") {
        console.log("Verifique en su correo electrónico");
      } else {
        console.log("Error no se pudo"+formCorreo);
      }
    });
    setFormCorreo("");
  };

	

	
	return(

       <div className="hold-transition login-page">

 <div className="login-box">
  
  
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Cuenta de Usuario</p>

      <form onSubmit={recuperar} >
        <div className="input-group mb-3">
         
		  <input type="email" 
		  className="form-control" 
		  placeholder="Email"
		  name="correo"
		  value={formCorreo}
                onChange={cambiarDatos}
			   required  
		  />
          
		  <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope"></span>
            </div>
          </div>
        </div>
       
        <div className="row">
          
         
          <div className="col-7">
		   <button className="btn btn-primary btn-block"
		   type="submit" >
                Recuperar 
	       </button>
          </div>
		  
		  <div className="col-5">
		   <Link 
		   className="btn btn-primary btn-block"
		   to="/CuentaUsuario"
		   >
              Átras
	       </Link>
          </div>
         
        </div>
      </form>

   
    </div>
  </div>
</div>
</div>


  )
}	

export default RecuperarC 