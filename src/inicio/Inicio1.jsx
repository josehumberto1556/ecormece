import { Menu } from "../navbar/Menu"
import Navbar1 from "../navbar/Navbar1"
import NavbarDos from "../navbar/Navbar2"
import Productos4 from "../productos/Productos4"
import Productos5 from "../productos/Productos5"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
import Boletin from "../piepagina/Boletin"
import Blog1 from "../blog/Blog1"
function Inicio1() {



	return (
  <>
  	   <NavbarDos/>
	   <Navbar1/>
	   <Productos4/>
	   <Productos5/>
	  
	   {/*<ProductoPopular/>
	   */}
	   <Blog1/>
	   <Boletin/>
	   <Footer/> 
  </>
  );
}

export default Inicio1;
