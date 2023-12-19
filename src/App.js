import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Inicio from "./inicio/Inicio"
import ListadoProducto from "./productos/ListadoProducto"
import Nosotros from "./nosotros/Nosotros"
import Servicios  from "./servicios/Servicios"
import Contacto  from "./Contacto/Contacto"


function App() {
  return (
    <Router>
    
        <Routes>
	     <Route path="/"                     element={<Inicio/>} />
		 <Route path="/Productos"            element={<ListadoProducto/>} />
         <Route path="/Nosotros"             element={<Nosotros/>} />
         <Route path="/Servicios"            element={<Servicios/>} />
         <Route path="/Contacto"             element={<Contacto/>} />
		 
		 </Routes> 
	
    
	</Router>
  );
}

export default App;
