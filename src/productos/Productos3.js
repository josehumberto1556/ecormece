import imga from "../images/img-grid-1.jpg"
import img2 from "../images/img-grid-2.jpg"
import img3 from "../images/img-grid-3.jpg"


function Productos2() {
  return (
    <div>
     		
    <div className="we-help-section">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-lg-7 mb-5 mb-lg-0">
						<div className="imgs-grid">
							<div className="grid grid-1">
							<img src={imga} 
							alt="Untree.co"/>
							</div>
							
							<div className="grid grid-2">
							
							<img src={img2} 
							alt="Untree.co"/></div>
							
							<div className="grid grid-3">
                                 <img src={img3} alt="Untree.co"/></div>
						</div>
					</div>
					<div className="col-lg-5 ps-lg-5">
						<h2 className="section-title mb-4">Tenemos los mejores Productos del mercado</h2>
						<p className="text-justify">
						Ecomerce salvemos argentina  ofrece una amplia gama de productos  para el hogar, 
						la belleza, la moda y la alimentación. Todos los productos están cuidadosamente 
						seleccionados para garantizar que sean de alta calidad y tengan un impacto mínimo en el medio ambiente. Tienda Verde se compromete a brindar a sus clientes una experiencia de compra conveniente y agradable, 
						a la vez que apoya prácticas comerciales sostenibles.

						</p>

						
					
					</div>
				</div>
			</div>
		</div>
							
    </div>
  );
}

export default Productos2;
