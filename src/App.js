import {
  BrowserRouter as Router,
  Route,
  Routes
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
import PerfilNegocio from "./cpanel/modulo_productos1/PerfilNegocio";

import IniciarSeccion    from "./inicioSeccion/IniciarSeccion"
import {RegistrarUsuario}  from "./inicioSeccion/RegistrarUsuario"
import Recuperar         from "./inicioSeccion/Recuperar"

import LoginU              from  './cpanel/login/Login'
import LoginUsuario        from  './cpanel/login_usuario/Login_usuario'
import RecuperarClave      from  './cpanel/login/RecuperarClave'
import  ProtectedRoute     from  './cpanel/login/ProtectedRoute' 
import  ProtectedRoute1     from  './cpanel/login/ProtectedRoute1' 
import ModuloAdministrador from "./cpanel/ModuloAdministrador"
import Administrador       from "./cpanel/Administrador"

import  Usuarios           from  './cpanel/modulo_usuarios/usuarios'
import  Registrar          from  './cpanel/modulo_usuarios/Registrar'
import  Editar             from  './cpanel/modulo_usuarios/Editar'

import  ListadoN           from  './cpanel/modulo_novedades/Listado'
import  RegistrarN         from  './cpanel/modulo_novedades/Registrar'
import  EditarN            from  './cpanel/modulo_novedades/Editar'


import  ListadoP             from  './cpanel/modulo_categorias/ListadoP'
import  RegistrarP           from  './cpanel/modulo_categorias/Registrar'
import  EditarP              from  './cpanel/modulo_categorias/Editar' 
import { Actualizarproducto} from "./cpanel/modulo_productos/Actualizarproducto";
import { Actualizarproducto1 } from "./cpanel/modulo_productos1/Actualizarproducto1";


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

import  PagarAdministrador   from  './cpanel/pago_administrador/ListadoPago'


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

import Perfil from "./cpanel/perfil_usuario/Perfil";
import PerfilUsuario from "./PerfilUsuario/PerfilUsuario";
import NotFoundPage from "./404/Notfound";
import { PerfilNegocios } from "./cpanel/modulo_pago_negocio1/PerfilNegocios";
import ListadoM from "./cpanel/modulo_metodos_pago/ListadoM";
import RegistroM from "./cpanel/modulo_metodos_pago/RegistroM";
import RegistrarPago from "./cpanel/pago_administrador/Registrar";
import EditarPago from "./cpanel/pago_administrador/Editar";
import MensajeAdministrador from "./cpanel/pago_administrador/MensajeAdministrador";

import ListadoNegocio from "./cpanel/modulo_negocio/ListadoNegoio";
import RegistraNegocio from "./cpanel/modulo_negocio/Registrar";
import EditarNegocio from "./cpanel/modulo_negocio/Editar";

import ListadoPago from "./cpanel/modulo_pago_negocio/ListadoPago";
import { MensjaePago } from "./pagescarrito/MensjaePago";

import Compras from "./compras/Compras";
import { VerCompra } from "./compras/VerCompra";

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
         <Route path="/Compras"                 exact   element={<Compras/>}/>
         <Route path="/VerCompra/:id"           exact   element={<VerCompra/>}/>
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
		 <Route path="/MensajePago"             exact   element={<MensjaePago/>}/>
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
		 element={<ProtectedRoute><ModuloAdministrador/></ProtectedRoute>} />

		 
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
            path="/ModuloAdministrador/Negocios"
		    element={
			        <ProtectedRoute>
			           <ListadoNegocio/>
			 	    </ProtectedRoute>
				    } 
		 />

         <Route
            path="/ModuloAdministrador/modulo_negocio/RegistraNegocio"
		    element={
			        <ProtectedRoute>
			           <RegistraNegocio/>
			 	    </ProtectedRoute>
				    } 
		 />

        <Route
            path="/ModuloAdministrador/modulo_negocio/EditarNegocio/:id"
		    element={
			        <ProtectedRoute>
			           <EditarNegocio/>
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
		 path="/ModuloAdministrador/PagoUsuario"
		  element={
			        <ProtectedRoute>
				      <ListadoPago/>
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
		 path="/ModuloAdministrador/MetodoPago"
		  element={
			        <ProtectedRoute1>
                      <ListadoM/> 
		             </ProtectedRoute1>
				  } 
		 />
		
		<Route
		 path="/ModuloAdministrador/RegistrarMetodoPago"
		  element={
			        <ProtectedRoute1>
                      <RegistroM/> 
		             </ProtectedRoute1>
				  } 
		 />

         <Route
		 path="/ModuloAdministrador/Producto"
		  element={
			        <ProtectedRoute1>
		              <ListadoPr1/>  
		 
		  </ProtectedRoute1>
				  } 
		 />

         <Route
		 path="/ModuloAdministrador/PerfilNegocio/:correo"
		  element={
			        
		              <PerfilNegocio/>  
		          
				  } 
				   />

        <Route
		 path="/ModuloAdministrador/Productos/RegistarProducto"
		  element={
			        <ProtectedRoute1>
		              <RegistrarPr1/>  
		            </ProtectedRoute1>
				  } 
		 />

       <Route
		 path="/ModuloAdministrador/Productos/EditarProducto/:id"
		  element={
			        <ProtectedRoute1>
		              <EditarN1/>  
		 
		           </ProtectedRoute1>
				  } 
		 />
      
	  <Route
		 path="/ModuloAdministrador/Productos/AgregarlasImagenes/:id"
		  element={
			        <ProtectedRoute1>
		              <AgregarImagenes1/>  
		 
		            </ProtectedRoute1>
				  } 
		 />	


       <Route
		 path="/ModuloAdministrador/Productos/VerlasImagenes/:id"
		  element={
			        <ProtectedRoute1>
		              <VerImagenes1/>  
		 
		            </ProtectedRoute1>
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
		  path="/ModuloAdministrador/Productos/Actualizarproductos/:id"
		  element={
			        <ProtectedRoute>
		              <Actualizarproducto/>  
		            </ProtectedRoute>
				  } 
		 />		

        <Route
		  path="/ModuloAdministrador/Productos/Actualizarproducto/:id"
		  element={
			        <ProtectedRoute1>
		              <Actualizarproducto1/>  
		            </ProtectedRoute1>
				  } 
		 />		

          <Route
		  path="/ModuloAdministrador/PerfilUsuario"
		  element={
			        <ProtectedRoute1>
		              <Perfil/>  
		            </ProtectedRoute1>
				  } 
		 />		

             <Route
		      path="/ModuloAdministrador/PerfilNegocio"
		      element={
			        <ProtectedRoute1>
		              <PerfilNegocios/>  
		            </ProtectedRoute1>
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
				<ProtectedRoute1>        
				<Buscarfecha1/> 
				</ProtectedRoute1> 
		 
		            
				  } 
		   />

        <Route
		    path="ModuloAdministrador/PagosDeNegocios"
		    element={
			    <ProtectedRoute1>    
				<ListadoNeg1/>  
				</ProtectedRoute1>
		            
				  } 
		   />
       

	   <Route
		    path="ModuloAdministrador/PagosNegocios"
		    element={
				<ProtectedRoute>      
				  <ListadoNeg/>  
				  </ProtectedRoute>
		            
				  } 
		   />
       
	   <Route
		    path="ModuloAdministrador/modulo_pago_negocio/Buscarfecha"
		    element={
				<ProtectedRoute>      
				 <Buscarfecha/>  
				 </ProtectedRoute>
		            
				  } 
		   />
	
	     <Route
		    path="ModuloAdministrador/PagosAdministrador"
		    element={
			    <ProtectedRoute1>    
				<PagarAdministrador/>  
				</ProtectedRoute1>
		            
				  } 
		   />

         <Route
		    path="ModuloAdministrador/Registrar_pago_administrador"
		    element={
			    <ProtectedRoute1>    
				<RegistrarPago/>  
				</ProtectedRoute1>
		            
				  } 
		   />

         <Route
		    path="ModuloAdministrador/Editar_pago_administrador/:id"
		    element={
			    <ProtectedRoute1>    
				<EditarPago/>  
				</ProtectedRoute1>
		            
				  } 
		   />

		  <Route
		    path="ModuloAdministrador/MensajeAdministrador"
		    element={
			    <ProtectedRoute1>    
				<MensajeAdministrador/>  
				</ProtectedRoute1>
		            
				  } 
		   />


         <Route
		    path="PerfilUsuario"
		    element={
				     <PerfilUsuario/>  
				    } 
		   />

		  <Route
		   path="*"
		   element={NotFoundPage}/>
         
		

		</Routes> 
				 
	</Router>

	</CarritoProvider>
	
  </UsuarioContextProvider>	
  );
}

export default App;
