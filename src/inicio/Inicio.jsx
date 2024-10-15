import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"


function Inicio() {
  return (
  <>
   <Navbar/>
	 <Navbar1/>
	 <Productos/>
	 <Productos2/>
	 <Productos3/>
	 {/*<ProductoPopular/>*/}
	 <Blog/>
	 <Footer/>
  </>
  );
}

export default Inicio;
