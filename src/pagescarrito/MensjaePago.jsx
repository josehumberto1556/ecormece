import NavbarDos  from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"

export const MensjaePago=()=> {
  return (
    <>
       <NavbarDos/>
        <Navbar1/>
        <div className="why-choose-section">
              <div className="container">
                <div className="row justify-content-between align-items-center">
                  <div className="col-lg-6">
                    <h2 className="section-title">Felcicidades</h2>
                    <p>
                     Gracias por realizar nuestra 
                     Esperemo que este sastifecho; con nuestro Servicio
        
                    </p>
        
                    <div className="row my-5">
                      <div className="col-6 col-md-6">
                        <div className="feature">
                          <div className="icon">
                            
                          </div>
                          
                        </div>
                      </div>
        
                    </div>
                  </div>
        
                  <div className="col-lg-5">
                    <div className="img-wrap">
                    </div>
                  </div>
        
                </div>
              </div>
            </div>
                <Footer/>
    </>
  )
}
