import sofa from "../images/sofa.png"
import c    from "../images/envelope-outline.svg"
import "./Footer.css"


function Navbar1() {
  return (
    <div>
   
     <footer className="footer-section Footer">
			<div className="container relative">

				<div className="sofa-img">
					<img 
					src={sofa} 
					alt="Image" 
					className="img-fluid"/>
				</div>

				<div className="row">
					<div className="col-lg-8">
						<div className="subscription-form">
							<h3 className="d-flex align-items-center">
							
							<span className="me-1">
							<img src={c}
							alt="Image" 
							className="img-fluid"/>
							</span>
							<span style={{color:"white"}}>
							Subscribete a Nuestro boletin
							informativo
							</span></h3>

							<form action="#" className="row g-3">
								
								<div className="col-auto">
									<input type="text" 
									className="form-control" 
									placeholder="Enter your name"/>
								</div>
								
								<div className="col-auto">
									<input type="email" 
								uw	className="form-control" 
									placeholder="Enter your email"/>
								</div>
								
								<div className="col-auto">
									<button className="btn btn-primary">
										<span className="fa fa-paper-plane"></span>
									</button>
								</div>
							</form>

						</div>
					</div>
				</div>

				

				<div className="border-top copyright">
					<div className="row pt-4">
						
						<div className="col-lg-6">
						
 					    	<p className="mb-2 text-center text-lg-start">
							Copyright &copy;. Todos los derechos Reservados
							<a href="#" style={{color:"white"}}>Ecomerce Salvemos Argentina</a> 
                           </p>
						
						</div>

						<div className="col-lg-6 text-center text-lg-end">
							<ul className="list-unstyled d-inline-flex ms-auto">
								<li className="me-4">
								<a href="#" style={{color:"white"}}>Terminos y Condiciones</a></li>
								<li><a href="#" style={{color:"white"}}>Politica de Privacidad</a></li>
							</ul>
						</div>

					</div>
				</div>

			</div>
		</footer>
   
    </div>
  );
}

export default Navbar1;
