import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UsuarioContext";

const Header = () => {
 const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/ModuloAdministrador/Login");
    } catch (error) {
      console.log(error.message);
    }
  };
 
  return (
   
<header>
   <nav className="main-header navbar navbar-expand navbar-white ">

    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
		
		<i className="fas fa-bars" /></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to="/Moduloadministrador"className="nav-link">Inicio</Link>
      </li>
     
    </ul>
    <ul className="navbar-nav ml-auto">
   
	   <li className="nav-item">
        <a className="nav-link" 
		  style={{color:"white"}}
		  onClick={handleLogout}>
		  
          Cerrar Sección
        </a>
      </li>
    </ul>
  </nav>
  
  
  
  
</header>

    
  );
};

export default Header;
