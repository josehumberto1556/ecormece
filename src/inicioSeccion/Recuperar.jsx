import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./IniciarSeccion.css"
import {Link, useNavigate }   from "react-router-dom";


function Recuperar() {
  return (
  <>
   <Navbar/>
	
	<div className="hero fondo">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro">
								<h1>Contacto</h1>
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
               
				<div className="form-group">
                  <label className="text-black" for="email">Correo Electronico</label>
                  <input type="email" className="form-control" 
				  id="email" placeholder="Correo Electronico ..."
				  required/>
                </div>

              

                <button type="submit" className="btn boton"
				 style={{color:"white"}}>Recuperar</button>
				 <a 
				 style={{color:"white"}}
				 href="/IniciarSeccion"
				 className="btn boton"> 
				  Regresar
                </a>
				 
				 
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

export default Recuperar;





