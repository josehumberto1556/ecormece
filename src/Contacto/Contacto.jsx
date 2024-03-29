import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"

import truck from "../images/truck.svg"
import bag   from "../images/bag.svg"
import support from "../images/support.svg"
import retur  from "../images/return.svg"
import why    from "../images/why-choose-us-img.jpg"

import "./Contacto.css"

function Contacto() {
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
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" for="fname">Nombre</label>
                      <input type="text" 
					  className="form-control" 
					  id="fname"
					  placeholder="Nombre ..."
					  required
					  />
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
                  <label className="text-black" for="message">Mensaje</label>
                  <textarea name="" 
				  className="form-control" 
				  id="message" cols="30" 
				  rows="5"
				   placeholder="Mensaje ..."
				  required
				  ></textarea>
                </div>

                <button type="submit" className="btn boton"
				style={{color:'white'}}>Enviar Mensaje</button>
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

export default Contacto;
