import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./IniciarSeccion.css"
import {Link, useNavigate }   from "react-router-dom";


function IniciarSeccion() {
  return (
  <>
   <Navbar/>
	
	<div className="hero fondo">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro">
								<h1>IniciarSeccion</h1>
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

			   <div>
  
 <section className="vh-100">
 
 <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius:"1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Cuenta de Usuario</h3>

            <form>

            <div className="form-outline mb-4">
              <input 
			  type="email" 
			  className="form-control form-control-lg" 
			  placeholder="Email"
		      name="email" 
		      id="emailField"
		      autofocus=""
		      minlength="3"
		      maxlength="100" 
		      required
			  />
              <label className="form-label" for="typeEmailX-2">Email</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" 
			  id="typePasswordX-2" 
			  className="form-control form-control-lg" 
			   name="password" 
			  id="passwordField"
			  className="form-control" 
			  placeholder="Password"
			  minlength="6"
			  maxlength="20"
			  required
			  />
			  
              <label className="form-label" for="typePasswordX-2">Password</label>
            </div>

            
            <div className="form-check d-flex justify-content-start mb-4">
              <Link className="text-center"
				to="/RegistrarUsuario"> 
				 Registar
                </Link>
              <Link className="text-center"
				to="/RecuperarAcceso"> 
				Olvido Contraseña
                </Link>
            </div>

            <button className="btn btn-primary btn-lg btn-block" type="submit">Entrar</button>
           </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 </div>

            </div>

          </div>

        </div>

      </div>


    </div>
  

		      
		 

	 
	 <Footer/>
  </>
  );
}

export default IniciarSeccion;
