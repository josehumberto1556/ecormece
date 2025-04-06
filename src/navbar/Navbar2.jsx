import React,{useState,useContext} from "react";
import {Link}   from "react-router-dom";
import "./Navbar.css"
import  Usu from "../images/user.svg"
import Carrito from "../images/cart.svg"
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UsuarioContext";
import { CarritoContext } from "../context/CarritoContext"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function NavbarDos() {

const { listaCompras } = useContext(CarritoContext)
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
	navigate("/IniciarSeccion");
  } catch (error) {
	console.log(error.message);
  }
};

const letra = { color:"#ffffff"}  
	
  return (
    <div>
     		<nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark navbars fixed-top" arial-label="Furni navigation bar">

			<div className="container">
				<Link to="/Inicio"  className="navbar-brand">ESA<span>.</span></Link>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarsFurni">
					<ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
						<li className="nav-item active">
							<Link to="/Inicio"  className="nav-link">Inicio</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/PerfilUsuario"  className="nav-link">Mi Perfil</Link>
						</li>
					
						

						<li className="nav-item active">
							<Link to="/ListadosDeCategorias"  className="nav-link">Productos</Link>
						</li>
					
					
						<li className="nav-item active">
							<Link to="/OfertasDeEmpleo"  className="nav-link">Ofertas Empleo</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/Contactos"  className="nav-link">Contacto</Link>
						</li>

						<li className="nav-item active">
							<Link to="/Negocio"  className="nav-link">Negocio</Link>
						</li>
 
                       
						
					</ul>

					<ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						    
						<li className="nav-item active">
							<Link to='/CarritoProductos' className="nav-link">
						        <img src={Carrito}/>
							    <span className="item__total">{listaCompras.length}</span>
							</Link>
						</li>
                     
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
