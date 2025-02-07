import React,{useState,useContext} from "react";
import {Link}   from "react-router-dom";
import "./Navbar.css"
import  Usu from "../images/user.svg"

import { CarritoContext } from "../context/CarritoContext"

function Navbar()
{
	 
  const letra = {
	 color:"#ffffff"
	
	 
 }  
 const { listaCompras } = useContext(CarritoContext)
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

						
						<li className="nav-item active">
						    <Link to="/Negocios"  className="nav-link">Negocio</Link>
						</li>
 
                       
						
					</ul>

					<ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li>
						<Link to="/IniciarSeccion" className="nav-link" href="#">
						<img src={Usu}/>
						</Link>
						</li>
                     
					</ul>
				</div>
			</div>
				
		</nav>
    </div>
  );
}

export default Navbar;
