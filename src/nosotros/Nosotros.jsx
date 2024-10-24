import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"

import truck from "../images/truck.svg"
import bag   from "../images/bag.svg"
import support from "../images/support.svg"
import retur  from "../images/return.svg"
import why    from "../images/why-choose-us-img.jpg"

import "./Nosotros.css"

function Nosotros() {
  return (
  <>
   <Navbar/>
	<Navbar1/>
			
			<div className="why-choose-section">
			<div className="container">
				<div className="row justify-content-between align-items-center">
					<div className="col-lg-6">
						<h2 className="section-title">Quienes somos</h2>
						<p>
						 Somos una tienda cuyo principal objetivo es brindar 
						 la sastifaci&oacute;n a nuestro clientes

						</p>

						<div className="row my-5">
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src={truck} alt="Image" 
										className="imf-fluid"/>
									</div>
									<h3>Env&iacute;o y entrega Rapido</h3>
									<p>Entrega direacta con el cliente.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src={bag} alt="Image" 
										className="imf-fluid"/>
									</div>
									<h3>Comprar Facil</h3>
									<p>Plataforma con facilidad de compra.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src={support} alt="Image" 
										className="imf-fluid"/>
									</div>
									<h3>24/7 Soporte Tecnico</h3>
									<p>soporte Tecnico las 24 horas para ayudar a nuestros clientes.</p>

								</div>
							</div>

							

						</div>
					</div>

					<div className="col-lg-5">
						<div className="img-wrap">
							<img src={why} alt="Image" className="img-fluid"/>
						</div>
					</div>

				</div>
			</div>
		</div>
				
					
				
					
					

		      
		 

	 
	 <Footer/>
  </>
  );
}

export default Nosotros;
