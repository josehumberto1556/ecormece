import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
import Boletin from "../piepagina/Boletin"
import Gusta from "../piepagina/Productos_gusta"
function Inicio() {

	

	return (
  <>
 
	<Navbar/>
	<Navbar1/>
	 <Productos/>
	 <Productos2/>
	
	 {/*<ProductoPopular/>*/}
	 <Blog/>
	 <Gusta/>
	 <Boletin/>
	 <Footer/>
  </>
  );
}

export default Inicio;
