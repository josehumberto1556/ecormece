import {Link}   from "react-router-dom";

function Navbar() {
  return (
    <div>
     		<nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark fixed-top" arial-label="Furni navigation bar">

			<div className="container">
				<a className="navbar-brand" href="index.html">Furni<span>.</span></a>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarsFurni">
					<ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
						<li className="nav-item active">
							<Link to="/"  className="nav-link">Inicio</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/Productos"  className="nav-link">Productos</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/Nosotros"  className="nav-link">Sobre Nosotros</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/Servicios"  className="nav-link">Servicios</Link>
						</li>
						
						<li className="nav-item active">
							<Link to="/Contacto"  className="nav-link">Contacto</Link>
						</li>
						
						
					</ul>

					<ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li>
						<a className="nav-link" href="#">
						
						</a>
						</li>
						<li>
						<a className="nav-link" href="cart.html">
						
						</a>
						</li>
					</ul>
				</div>
			</div>
				
		</nav>
    </div>
  );
}

export default Navbar;
