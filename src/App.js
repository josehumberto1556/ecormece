import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Inicio from "./inicio/Inicio"
import Inicio1 from "./inicio/Inicio1"
import ListadoProducto from "./productos/ListadoProducto"
import ListadoProducto1 from "./productos/ListadoProducto1"
import Nosotros from "./nosotros/Nosotros"
import Servicios  from "./servicios/Servicios"
import Servicios1  from "./servicios/Servicios1"
import Veroferta from "./servicios/Veroferta";
import Veroferta1 from "./servicios/Veroferta1";
import Contacto  from "./Contacto/Contacto"
import Contacto1  from "./Contacto/Contacto1"
import ListadoCategoria  from "./productos/ListadoCategoria";
import ListadoCategoria1  from "./productos/ListadoCategoria1";
import Detalleproducto from "./productos/detalleProducto" 
import Detalleproducto1 from "./productos/detalleProducto1" 
import VerProducto from "./productos/VerProducto" 
import TodosBlog from "./blog/TodosBlog" 


import IniciarSeccion    from "./inicioSeccion/IniciarSeccion"
import {RegistrarUsuario}  from "./inicioSeccion/RegistrarUsuario"
import Recuperar         from "./inicioSeccion/Recuperar"

import LoginU              from  './cpanel/login/Login'
import LoginUsuario        from  './cpanel/login_usuario/Login_usuario'
import RecuperarClave      from  './cpanel/login/RecuperarClave'
import  ProtectedRoute     from  './cpanel/login/ProtectedRoute' 
import ModuloAdministrador from "./cpanel/ModuloAdministrador"
import Administrador       from "./cpanel/Administrador"

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
import  ListadoPr1         from  './cpanel/modulo_productos1/ListadoPr1'
import  RegistrarPr        from  './cpanel/modulo_productos/Registrar'
import  RegistrarPr1       from  './cpanel/modulo_productos1/Registrar1'
import  EditarPr           from  './cpanel/modulo_productos/Editar'
import  EditarN1           from  './cpanel/modulo_productos1/Editar1'
import  AgregarImagenes    from  './cpanel/modulo_productos/AgregarImagenes'
import  AgregarImagenes1   from  './cpanel/modulo_productos1/AgregarImagenes1'
import  VerImagenes       from  './cpanel/modulo_productos/VerImagenes'
import  VerImagenes1       from  './cpanel/modulo_productos1/VerImagenes1'

import  ListadoC           from  './cpanel/modulo_contacto/Listado'

import  ListadoSub         from  './cpanel/modulo_sub/ListadoSub'

import { PanelUsuario }     from "./inicioSeccion/CpanelUsuario";

import  ListadoNeg          from  './cpanel/modulo_pago_negocio/ListadoP'


import  ListadoNeg1          from  './cpanel/modulo_pago_negocio1/ListadoP1'

import {UsuarioContextProvider} from "./context/UsuarioContext";
import { CarritoProvider } from "./context/CarritoProvider"
import { CarritoPage } from "./pagescarrito/CarritoPage";
 
import Negocios from "./negocio/Negocio"
import Negocios1 from "./negocio/Negocio1"
import { Vernegocio } from "./negocio/Vernegocio";
import { Vernegocio1 } from "./negocio/Vernegocio1";
import { Descripcionnegocio } from "./negocio/Descripcionnegocio";
import { Descripcionnegocio1 } from "./negocio/Descripcionnegocio1";
import { Menu } from "./navbar/Menu";

import { Inicio2 } from "./inicio/Inicio2";

import { Buscarfecha } from "./cpanel/modulo_pago_negocio/Buscarfecha";

import { Buscarfecha1 } from "./cpanel/modulo_pago_negocio1/Buscarfecha1";

function App() {
  return (
   <UsuarioContextProvider>
    <CarritoProvider>

   
	<Router>
    
        <Routes>
	     <Route path="/"                        exact   element={<Inicio/>} />
		 <Route path="/Inicio"                  exact   element={<Inicio1/>} />
		 <Route path="/ListadoCategorias"       exact   element={<ListadoCategoria/>}/>
		 <Route path="/ListadosDeCategorias"    exact   element={<ListadoCategoria1/>}/>
		 <Route path="/Productos/:nombre"       exact   element={<ListadoProducto/>} />
         <Route path="/Producto/:nombre"        exact   element={<ListadoProducto1/>} />

         <Route path="/detalleProducto/:id"     exact   element={<Detalleproducto/>} />
		 <Route path="/detallesDelProducto/:id" exact   element={<Detalleproducto1/>} />
		 <Route path="/Nosotros"                exact   element={<Nosotros/>} />
         <Route path="/OfertasEmpleo"           exact   element={<Servicios/>} />
		 <Route path="/OfertasDeEmpleo"         exact   element={<Servicios1/>} />
         <Route path="/Veroferta/:id"           exact   element={<Veroferta/>}/>
		 <Route path="/Verofertas/:id"          exact   element={<Veroferta1/>}/>
		 <Route path="/VerProducto/:nombre"     exact   element={<VerProducto/>} />
         <Route path="/Contacto"                exact   element={<Contacto/>} />
		 <Route path="/Contactos"               exact   element={<Contacto1/>} />
         <Route path="/TodosBlog"               exact   element={<TodosBlog/>} />
		 <Route path="/IniciarSeccion"          exact   element={<IniciarSeccion/>} />
		 <Route path="/RegistrarUsuario"        exact   element={<RegistrarUsuario/>}/>
	     <Route path="/RecuperarAcceso"         exact   element={<Recuperar/>}/>
		 
		 <Route 
		path="/Comprador" 
		 element={
			<ProtectedRoute>
			    <Inicio2/>
			</ProtectedRoute> 	
				} 
            />

		 <Route 
		path="/Menu" 
		 element={
			<ProtectedRoute>
			    <Menu/>
			</ProtectedRoute> 	
				} 
		 />
		 
		

		 <Route path="/PanelUsuario" exact
		  element={<PanelUsuario/>}/>
		 
		  <Route path="/CuentaUsuario"         
		 element={<LoginU/>} 
		 />
          
          <Route path="/RecuperarClave"         
		 element={<RecuperarClave/>} 
		 />


        <Route path="/CuentasDeUsuarios"         
		 element={<LoginUsuario />} 
		 />
		  
		  <Route path="/Administrador"  
		 element={<Administrador/>} />


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
		 path="/ModuloAdministrador/Producto"
		  element={
			        <ProtectedRoute>
		              <ListadoPr1/>  
		 
		  </ProtectedRoute>
				  } 
		 />

        <Route
		 path="/ModuloAdministrador/Productos/RegistarProducto"
		  element={
			        <ProtectedRoute>
		              <RegistrarPr1/>  
		 
		  </ProtectedRoute>
				  } 
		 />

       <Route
		 path="/ModuloAdministrador/Productos/EditarProducto/:id"
		  element={
			        <ProtectedRoute>
		              <EditarN1/>  
		 
		  </ProtectedRoute>
				  } 
		 />
      
	  <Route
		 path="/ModuloAdministrador/Productos/AgregarlasImagenes/:id"
		  element={
			        <ProtectedRoute>
		              <AgregarImagenes1/>  
		 
		            </ProtectedRoute>
				  } 
		 />	


       <Route
		 path="/ModuloAdministrador/Productos/VerlasImagenes/:id"
		  element={
			        <ProtectedRoute>
		              <VerImagenes1/>  
		 
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
		 path="/ModuloAdministrador/Productos/VerImagenes/:id"
		  element={
			        <ProtectedRoute>
		              <VerImagenes/>  
		 
		            </ProtectedRoute>
				  } 
		 />		


          

           <Route
		    path="/CarritoProductos/"
		    element={
			        
		              <CarritoPage/>  
		 
		            
				  } 
		   />

          
            <Route
		    path="/Negocios"
		    element={
			        
		              <Negocios/>  
		 
		            
				  } 
		   />
		   <Route
		    path="/Negocio"
		    element={
			        
		              <Negocios1/>  
		 
		            
				  } 
		   />

           <Route
		    path="/Vernegocio/:nombre"
		    element={
			        
		              <Vernegocio/>  
		 
		            
				  } 
		   />
        

		<Route
		    path="/Vernegocios/:nombre"
		    element={
			        
		              <Vernegocio1/>  
		 
		            
				  } 
		   />

		<Route
		    path="descripcionNegocio/:id"
		    element={
			        
				<Descripcionnegocio/>  
		 
		            
				  } 
		   />
        <Route
		    path="descripcionNegocios/:id"
		    element={
			        
				<Descripcionnegocio1/>  
		 
		            
				  } 
		   />

       
	   <Route
		    path="ModuloAdministrador/modulo_pagos_de_negocio/Buscarfecha"
		    element={
			        
				<Buscarfecha1/>  
		 
		            
				  } 
		   />

        <Route
		    path="ModuloAdministrador/PagosDeNegocios"
		    element={
			        
				<ListadoNeg1/>  
		 
		            
				  } 
		   />
       

	   <Route
		    path="ModuloAdministrador/PagosNegocios"
		    element={
			        
				<ListadoNeg/>  
		 
		            
				  } 
		   />
       
	   <Route
		    path="ModuloAdministrador/modulo_pago_negocio/Buscarfecha"
		    element={
			        
				<Buscarfecha/>  
		 
		            
				  } 
		   />



		</Routes> 
		 
	</Router>

	</CarritoProvider>
	
  </UsuarioContextProvider>	
  );
}

export default App;
