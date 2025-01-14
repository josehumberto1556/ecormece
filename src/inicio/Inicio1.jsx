import { Menu } from "../navbar/Menu"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
import { useUserAuth } from "../context/UsuarioContext";

function Inicio1() {



	return (
  <>
  	   <Menu/>
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

export default Inicio1;
