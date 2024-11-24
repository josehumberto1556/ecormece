import couch from "../images/couch.png"
import "./Navbar.css"


function Navbar1() {
  return (
    <div>
     		<div className="hero fondo">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro-excerpt bajartexto">
								<h1>Productos Modernos <span clsas="d-block">Los mejores precios</span></h1>
								<p className="mb-4">
								Unidos por Argentina. ¡Consume responsable!
								</p>
							</div>
						</div>
						<div className="col-lg-7">
							<div>
								<img src={couch} 
								className="img-fluid tamano"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
  );
}

export default Navbar1;
