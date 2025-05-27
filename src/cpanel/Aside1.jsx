import { Link } from "react-router-dom";
import { doc,getDoc } from "firebase/firestore"
import { useEffect, useState }  from "react"
import { useUserAuth } from "../context/UsuarioContext";
import {useParams}  from 'react-router-dom'
import {app,db} from '../Configfirebase/Configfirebase'		
import { useNavigate } from "react-router";
import "./aside.css"

const Aside1 = () => {
  
  const { logOut, user } = useUserAuth();
  const n=user.nom
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/CuentasDeUsuarios");
    } catch (error) {
      console.log(error.message);
    }
  };
 
 
 return (
    
	 <header>   
	  <nav 
	  className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
 
      
  
      <Link  style={{color:"white"}}
		  to="/ModuloAdministrador/"
		  >Cpanel Administrativo</Link> 
	
    <button style={{color:"white"}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span  style={{backgroundColor:"white"}} className="navbar-toggler-icon"></span>
    </button>
	
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
	  
        <li className="nav-item">
		
         <Link className="nav-link" style={{color:"white"}}
		  to="/Administrador">Inicio</Link>
		  
        </li>

       <li>

		<Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/PerfilUsuario">Mi Perfil Usuario</Link>
		  
        </li>
        
		 <li>

		<Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/PerfilNegocio">Mi Perfil Negocio</Link>
		  
        </li>
   
	 <li className="nav-item">
          
		     <Link 
			   className="nav-link" 
			   style={{color:"white"}}
		       to="/ModuloAdministrador/Producto">              
		         Productos
          </Link>
        
		</li>

        <li>

		<Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/MetodoPago">Metodo de Pagos</Link>
		  
        </li>

	    <li className="nav-item">
          
		     <Link 
			   className="nav-link" 
			   style={{color:"white"}}
		       to="/ModuloAdministrador/PagosDeNegocios">              
		         Compra y Venta
          </Link>
        
		</li>

            <li className="nav-item">
          
		     <Link 
			   className="nav-link" 
			   style={{color:"white"}}
		       to="/ModuloAdministrador/PagosAdministrador">              
		         Pagar Administrador
          </Link>
        
		</li>

         
            <li className="nav-item">
          
		     <Link 
			   className="nav-link" 
			   style={{color:"white"}}
		       to="/ModuloAdministrador/MensajeAdministrador">              
		         Mensaje Administrador
          </Link>
        
		</li>

		   <li className="nav-item">
		   {
		      <a 
			   className="nav-link" 
		       style={{color:"white"}}
		       onClick={handleLogout}>Cerrar Sección</a>
          }
		</li>
		 
        
			


      </ul>
    
   
  </div>
</nav>
 </header> 	 
		

)
}

export default Aside1;





