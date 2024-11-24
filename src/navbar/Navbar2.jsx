import React,{useState,useContext} from "react";
//import  {DataContext}   from '../context/DataProvider'
import {Link}   from "react-router-dom";
//import  {DataContext}   from '../context/DataProv/ider'
import "./Navbar.css"
import  Usu from "../images/user.svg"
import Carrito from "../images/cart.svg"
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UsuarioContext";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
function NavbarDos() {

 /* const value = useContext(DataContext);
  const [carrito] = value.carrito;
  const [menu,setMenu] =value.menu;
  const toogleMenu = () =>{
   setMenu(!menu)
  }
*/

const { logOut, user } = useUserAuth();
const n  =user.email
const navigate = useNavigate();
const handleLogout = async () => {
  try {

	await logOut();
	MySwal.fire({
		title: "Bien hecho!",
		text: "Has Cerrado Sección!",
		icon: "success",
		 button: "Felicitaciones!",
	 });
	navigate("/Inicio");
  } catch (error) {
	console.log(error.message);
  }
};




  const letra = {
	 color:"#ffffff"
	
	 
 }  
	
  return (
    <div>
     		<nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark navbars fixed-top" arial-label="Furni navigation bar">

			<div className="container">
				<Link to="/"  className="navbar-brand">ESA<span>.</span></Link>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarsFurni">
					<ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
						<li className="nav-item active">
							<Link to="/"  className="nav-link">Inicio</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/ListadoCategorias"  className="nav-link">Productos</Link>
						</li>
					
						
						<li className="nav-item active">
							<Link to="/Nosotros"  className="nav-link">Sobre Nosotros</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/OfertasEmpleo"  className="nav-link">Ofertas Empleo</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/Contacto"  className="nav-link">Contacto</Link>
						</li>
 
                       
						
					</ul>

					<ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li>
						<Link to="/IniciarSeccion" className="nav-link" href="#">
						<img src={Usu}/>
						</Link>
						</li>
						<li>
						<a className="nav-link">
						<img src={Carrito}/>
						</a>
						</li>
					{/*	 <li className="nav-item active" onClick={toogleMenu}  style={letra}>
                              <span className="item__total">{carrito.length}</span>
  </li>*/}
                     
                     
						<li className="nav-item active">
							<a onClick={handleLogout}  className="nav-link">Cerrar Secci&oacute;n</a>
						</li>

					</ul>
				</div>
			</div>
				
		</nav>
    </div>
  );
}

export default NavbarDos;
