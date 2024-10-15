import React,{useState} from 'react'
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./IniciarSeccion.css"
import {Link, useNavigate }   from "react-router-dom";
import { useUserAuth } from "../context/UsuarioContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)




const Recuperar=(props) =>  {
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

              <form onSubmit={recuperar}>
               
				<div className="form-group">
                  <label className="text-black" for="email">Correo Electronico</label>
                  <input 
                  type="email"
                   className="form-control" 
				          id="email" 
                  placeholder="Correo Electronico ..."
				          name="correo"
		              value={formCorreo}
                  onChange={cambiarDatos}
                  required/>
                </div>

              

         <input  type="submit"  className="boton2"  value="Recuperar"/>
				 {/*<a  href="/IniciarSeccion" className="boton">Regresar</a>*/}
				 
				 
              </form>

            </div>

          </div>

        </div>

      </div>


    </div>
  

		      
		 

	 
	 <Footer/>
  </>
  );
}

export default Recuperar;





