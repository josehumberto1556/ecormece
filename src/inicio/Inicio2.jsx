import { Menu } from "../navbar/Menu"
import Navbar1 from "../navbar/Navbar1"
import NavbarDos from "../navbar/Navbar2"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
import { NavbarTres } from "../navbar/Navbar3"
import { useUserAuth } from "../context/UsuarioContext";

export const  Inicio2=()=> {



	return (
  <>
  	   <NavbarTres/>
	   <Navbar1/>
	   <Productos/>
	   <Productos2/>
	   <Productos3/>
	   {/*<ProductoPopular/>
	   <Blog/>*/}
	   <Footer/> 
  </>
  );
}


