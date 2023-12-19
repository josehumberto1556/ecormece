import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"

import p3 from "../images/product-3.png"
import cr from "../images/cross.svg"
import p1 from "../images/product-1.png"
import crs1   from "../images/cross.svg"

function ListadoProducto() {
  return (
  <>
   <Navbar/>
	 <div className="hero">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro-excerpt">
								<h1>Productos</h1>
							</div>
						</div>
						<div className="col-lg-7">
							
						</div>
					</div>
				</div>
			</div>
			
			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">
                      <h2 className="text-center">Listado de Categorias</h2>
					<div className="col-12 col-md-4 col-lg-3 mb-5">
						<a className="product-item" href="#">
							<img src={p3}
							className="img-fluid product-thumbnail"/>
							<h3 className="product-title">Nordic Chair</h3>
							<strong className="product-price">$50.00</strong>

							<span className="icon-cross">
								<img src={cr}
								className="img-fluid"/>
							</span>
						</a>
					</div> 
					
					<div className="col-12 col-md-4 col-lg-3 mb-5">
						<a className="product-item" href="#">
							<img src={p1} 
							className="img-fluid product-thumbnail"/>
							<h3 className="product-title">Nordic Chair</h3>
							<strong className="product-price">$50.00</strong>

							<span className="icon-cross">
								<img src={crs1} className="img-fluid"/>
							</span>
						</a>
					</div> 
					
					
					
					
				
					
				
					
					

		      	</div>
		    </div>
		</div>

	 
	 <Footer/>
  </>
  );
}

export default ListadoProducto;
