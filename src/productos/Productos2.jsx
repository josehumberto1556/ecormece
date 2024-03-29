import why from "../images/why-choose-us-img.jpg"
import Envios from "../images/truck.svg"
import Compra from "../images/bag.svg"
import soporteTecnico from "../images/support.svg"

function Productos2() {
  return (
    <div>
     		<div className="why-choose-section">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-lg-6">
						<h2 className="section-title">Porque elejirnos</h2>
						<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

						<div className="row my-5">
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src={Envios} alt="Image" className="imf-fluid"/>
									</div>
									<h3>Envio rapido</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>
							
							

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src={Compra} 
										alt="Image" className="imf-fluid"/>
									</div>
									<h3>Facil de compra</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src={soporteTecnico} alt="Soporte Tecnico" className="imf-fluid"/>
									</div>
									<h3>24/7 Soporte</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>

							{/*
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="" alt="Image" 
										className="imf-fluid"/>
									</div>
									<h3>Hassle Free Returns</h3>
									<p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
								</div>
							</div>
							*/}
							</div>
					</div>

					<div className="col-lg-5">
						<div className="img-wrap">
							<img src={why} 
							alt="Image" className="img-fluid"/>
						</div>
					</div>

				</div>
			</div>
		</div>
    </div>
  );
}

export default Productos2;
