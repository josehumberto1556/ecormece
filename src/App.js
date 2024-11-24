import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Inicio from "./inicio/Inicio"
import Inicio1 from "./inicio/Inicio1"
import ListadoProducto from "./productos/ListadoProducto"
import Nosotros from "./nosotros/Nosotros"
import Servicios  from "./servicios/Servicios"
import Veroferta from "./servicios/Veroferta";
import Contacto  from "./Contacto/Contacto"
import ListadoCategoria  from "./productos/ListadoCategoria";
import Detalleproducto from "./productos/detalleProducto" 
import VerProducto from "./productos/VerProducto" 
import TodosBlog from "./blog/TodosBlog" 


import IniciarSeccion    from "./inicioSeccion/IniciarSeccion"
import RegistrarUsuario  from "./inicioSeccion/RegistrarUsuario"
import Recuperar         from "./inicioSeccion/Recuperar"

import LoginU              from  './cpanel/login/Login'
import RecuperarClave      from  './cpanel/login/RecuperarClave'
import  ProtectedRoute     from  './cpanel/login/ProtectedRoute' 
import ModuloAdministrador  from "./cpanel/ModuloAdministrador"

import  Usuarios           from  './cpanel/modulo_usuarios/usuarios'
import  Registrar          from  './cpanel/modulo_usuarios/Registrar'
import  Editar             from  './cpanel/modulo_usuarios/Editar'

import  ListadoN           from  './cpanel/modulo_novedades/Listado'
import  RegistrarN         from  './cpanel/modulo_novedades/Registrar'
import  EditarN            from  './cpanel/modulo_novedades/Editar'


import  ListadoP           from  './cpanel/modulo_categorias/ListadoP'
import  RegistrarP         from  './cpanel/modulo_categorias/Registrar'
import  EditarP            from  './cpanel/modulo_categorias/Editar' 

import  ListadoPr          from  './cpanel/modulo_productos/ListadoPr'
import  RegistrarPr        from  './cpanel/modulo_productos/Registrar'
import  EditarPr           from  './cpanel/modulo_productos/Editar'
import  AgregarImagenes    from  './cpanel/modulo_productos/AgregarImagenes'


import  ListadoC           from  './cpanel/modulo_contacto/Listado'

import  ListadoSub         from  './cpanel/modulo_sub/ListadoSub'

import { PanelUsuario }     from "./inicioSeccion/CpanelUsuario";

import {UsuarioContextProvider} from "./context/UsuarioContext";
import { CarritoProvider } from "./context/CarritoProvider"
import { CarritoPage } from "./pagescarrito/CarritoPage";

function App() {
  return (
   <UsuarioContextProvider>
    <CarritoProvider>

   
	<Router>
    
        <Routes>
	     <Route path="/"                        exact   element={<Inicio/>} />
		 <Route path="/Inicio"                  exact   element={<Inicio1/>} />
		 <Route path="/ListadoCategorias"       exact   element={<ListadoCategoria/>}/>
		 <Route path="/Productos/:nombre"       exact   element={<ListadoProducto/>} />
         <Route path="/detalleProducto/:id"     exact   element={<Detalleproducto/>} />
		 <Route path="/Nosotros"                exact   element={<Nosotros/>} />
         <Route path="/OfertasEmpleo"           exact   element={<Servicios/>} />
         <Route path="/Veroferta/:id"           exact   element={<Veroferta/>}/>
		 <Route path="/VerProducto/:id"         exact   element={<VerProducto/>} />
         <Route path="/Contacto"                exact   element={<Contacto/>} />
         <Route path="/TodosBlog"               exact   element={<TodosBlog/>} />
		 <Route path="/IniciarSeccion"          exact   element={<IniciarSeccion/>} />
		 <Route path="/RegistrarUsuario"        exact   element={<RegistrarUsuario/>}/>
	     <Route path="/RecuperarAcceso"         exact   element={<Recuperar/>}/>
		 
		 
		 <Route path="/PanelUsuario" exact
		  element={<PanelUsuario/>}/>
		 
		 	 <Route path="/CuentaUsuario"         
		 element={<LoginU/>} 
		 />
          
          <Route path="/RecuperarClave"         
		 element={<RecuperarClave/>} 
		 />
		  
		 
		 <Route path="/ModuloAdministrador"  
		 element={<ModuloAdministrador/>} />

		 
		 <Route 
		path="/ModuloAdministrador/modulo_usuarios/ModuloUsuario" 
		 element={
			<ProtectedRoute>
			    <Usuarios/>
			</ProtectedRoute> 	
				} 
		 />
		 
		
            <Route
            path="/ModuloAdministrador/modulo_usuarios/RegistrarUsuarios"
		    element={
			        <ProtectedRoute>
			           <Registrar/>
			 	    </ProtectedRoute>
				    } 
		 />
		 
		  <Route
		  path="/ModuloAdministrador/modulo_usuarios/EditarUsuarios/:id"
		  element={
			        <ProtectedRoute> 
				       <Editar/>
			        </ProtectedRoute>
			      }  
		 /> 
		 
		   	<Route 
		path="/ModuloAdministrador/modulo_novedades/ModuloNovedades" 
		 element={
			        <ProtectedRoute>  
				      <ListadoN/>
				    </ProtectedRoute>
				 } 
		 />
		 
		  <Route
		  path="/ModuloAdministrador/modulo_novedades/RegistraNovedades"
		  element={
			       <ProtectedRoute>
					 <RegistrarN/>
				   </ProtectedRoute>
				  } 
		 /> 
		 
	    
		<Route
		 path="/ModuloAdministrador/modulo_novedades/EditarNovedades/:id"
		  element={
			        <ProtectedRoute>
				      <EditarN/>
				    </ProtectedRoute>
				   
				   } 
		 />
		 
         <Route 
		path="/ModuloAdministrador/modulo_categorias/ModuloCategorias" 
		 element={<ListadoP/>} 
		 />
		 
		  <Route
		  path="/ModuloAdministrador/modulo_categorias/RegistraCategoria"
		  element={
			         <ProtectedRoute>
    					<RegistrarP/>
					 </ProtectedRoute>	
				  } 
		 /> 

<Route
		  path="/ModuloAdministrador/modulo_categorias/EditarCategoria/:id"
		  element={
			         <ProtectedRoute>
    					<EditarP/>
					 </ProtectedRoute>	
				  } 
		 /> 
	   	 
	    <Route
		 path="/ModuloAdministrador/modulo_contacto/ListadoContacto"
		  element={
			        <ProtectedRoute>
					  <ListadoC/>
				     </ProtectedRoute>
				  } 
		 />
		 
		 	 
	    <Route
		 path="/ModuloAdministrador/modulo_contacto/ListadoContacto"
		  element={
			        <ProtectedRoute>
					  <EditarP/>
				     </ProtectedRoute>
				  } 
		 />
		  
		<Route
		 path="/ModuloAdministrador/Subscripcion"
		  element={
			        <ProtectedRoute>
					  <ListadoSub/>
				     </ProtectedRoute>
				  } 
		 />
		 
		<Route
		 path="/ModuloAdministrador/Productos"
		  element={
			        <ProtectedRoute>
		              <ListadoPr/>  
		 
		  </ProtectedRoute>
				  } 
		 />

		 
		 <Route
		 path="/ModuloAdministrador/Productos/RegistarProductos"
		  element={
			        <ProtectedRoute>
		              <RegistrarPr/>  
		 
		  </ProtectedRoute>
				  } 
		 />

		 	 
		 <Route
		 path="/ModuloAdministrador/Productos/EditarProductos/:id"
		  element={
			        <ProtectedRoute>
		              <EditarPr/>  
		 
		  </ProtectedRoute>
				  } 
		 />

         <Route
		 path="/ModuloAdministrador/Productos/AgregarImagenes/:id"
		  element={
			        <ProtectedRoute>
		              <AgregarImagenes/>  
		 
		            </ProtectedRoute>
				  } 
		 />		


          

           <Route
		    path="/CarritoProductos/"
		    element={
			        
		              <CarritoPage/>  
		 
		            
				  } 
		   />


		</Routes> 
		 
	</Router>

	</CarritoProvider>
	
  </UsuarioContextProvider>	
  );
}

export default App;
