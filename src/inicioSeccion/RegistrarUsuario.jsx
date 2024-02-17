import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./IniciarSeccion.css"
import {Link, useNavigate }   from "react-router-dom";


function RegistrarUsuario() {
  return (
  <>
   <Navbar/>
	
	<div className="hero fondo">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro">
								<h1>Registrar Usuario</h1>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			
		<div className="untree_co-section">
      <div className="container">

        <div className="block">
          <div className="row justify-content-center">


            <div className="col-md-8 col-lg-8 pb-4">


              <div className="row mb-5">
               

               
             
              </div>

              <form>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" for="fname">Nombre</label>
                      <input type="text" 
					  className="form-control" 
					  id="fname"
					  placeholder="Nombre ..."/>
                    </div>
                  </div>
                
                </div>
                
				<div className="form-group">
                  <label className="text-black" for="email">Correo Electronico</label>
                  <input type="email" className="form-control" 
				  id="email" placeholder="Correo Electronico ..."
				  required/>
                </div>

                <div className="form-group mb-5">
                  <label className="text-black" for="message">Tipo Actividad</label>
                  <select required className="form-control">
                    <option value="-">Seleccione</option>
					<option value="Vendedor">Vendedor</option>
				    <option value="Comprador">Comprador</option>
				  </select>
                </div>

                <button 
				type="submit" 
				className="btn boton" 
				 style={{color:"white"}}>Registrar</button>
              </form>

            </div>

          </div>

        </div>

      </div>


    </div>
  

		      
  

		      
		 

	 
	 <Footer/>
  </>
  );
}

export default RegistrarUsuario;



