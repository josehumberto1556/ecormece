import { Link } from "react-router-dom";
import { doc,getDoc } from "firebase/firestore"
import { useEffect, useState }  from "react"
import { useUserAuth } from "../context/UsuarioContext";
import {useParams}  from 'react-router-dom'
import {app,db} from '../Configfirebase/Configfirebase'		
import { useNavigate } from "react-router";
import "./aside.css"

const Aside = () => {
  
  const { logOut, user } = useUserAuth();
  const n  =user.nom
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/CuentaUsuario");
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
	
    <button  style={{color:"white"}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" style={{backgroundColor:"white"}}></span>
    </button>
	
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
	  
        <li className="nav-item">
		
         <Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador">Inicio</Link>
		  
        </li>
        
		 
		<li className="nav-item">
          
		  <Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/modulo_usuarios/ModuloUsuario">Usuarios</Link>
		  
        </li>
		
		<li className="nav-item">
          
		  <Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/modulo_novedades/ModuloNovedades">Novedades</Link>
		  
        </li>
		
        <li className="nav-item">
          
		   <Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/modulo_categorias/ModuloCategorias"
		  >              
		  Categorias
          </Link>
        
        </li>
		
        <li className="nav-item">
          
		     <Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/modulo_contacto/ListadoContacto"
		  >              
		 Mensaje Contacto
          </Link>
        
		</li>
		
		 <li className="nav-item">
          
		     <Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/Subscripcion"
		  >              
		 Subscripción
          </Link>
        
		</li>
		{
			/*
		 <li className="nav-item">
          
		     <Link className="nav-link" style={{color:"white"}}
		  to="/ModuloAdministrador/Opiniones"
		  >              
		 Opiniones
          </Link>
        
		</li>
		*/}
	    	 <li className="nav-item">
          
		     <Link 
			   className="nav-link" 
			   style={{color:"white"}}
		       to="/ModuloAdministrador/Productos">              
		         Productos
          </Link>
        
		</li>

	    <li className="nav-item">
          
		     <Link 
			   className="nav-link" 
			   style={{color:"white"}}
		       to="/ModuloAdministrador/PagosNegocios">              
		         Pagos de negocio
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

export default Aside;





