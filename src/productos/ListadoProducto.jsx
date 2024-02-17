import {useContext} from "react";
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
import {DataContext} from "../context/DataProvider";
import {ProductoItem} from "./ProductoItem";
import  Carrito         from  '../Carrito/Carrito'
import "boxicons"


function ListadoProducto() {
	
	
const value=useContext(DataContext)
const [listadoproductos]=value.listadoproductos
  return (
  <>
   <Navbar/>
   
	 <div className="hero fondo">
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
			<Carrito/>
			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">

 				<h2 className="text-center">Listado de Categorias</h2>
				{
					listadoproductos.map(productos=>(
					   <ProductoItem 
					   key={productos.id}
					   id={productos.id}
					   title={productos.title}
					   price={productos.price}
					   image={productos.image}
					   
					   />
					   ))
		      	}
				</div>
		    </div>
		</div>

	 
	 <Footer/>
  </>
  );
}

export default ListadoProducto;
