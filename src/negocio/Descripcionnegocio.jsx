import { Menu } from "../navbar/Menu"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import { Neg } from "./hooks/negociohook"
import "./negocio.css"

export const Descripcionnegocio=() =>{

const {negocio, cargando, error}=Neg()

  return (
    <>
 <Menu/>
 <Navbar1/>
   
 <div className="container container1">
    
    {negocio.map(nego=>(
    
    <div className="row">
   
      <div className="col-md-6">
       <img src={nego.foto} alt="Logo de la empresa" class="img-fluid"/>
       <h2>Nuestra Negocio {nego.nombre_negocio}</h2>
       <p class="text-muted">{nego.descripcion}</p>
      </div>

      <div class="col-md-6">
        <h2>Contáctanos</h2>
        <p><strong>Teléfono:</strong>{nego.telefono}</p>
        <p><strong>Email:</strong>{nego.correo}</p>
        <p><strong>Dirección:</strong>{nego.direccion}</p>
        <ul class="list-inline">
          <li class="list-inline-item"><a href={nego.rede_social}><i class="fab fa-facebook-f"></i></a></li>
          <li class="list-inline-item"><a href={nego.rede_social1}><i class="fab fa-titok"></i></a></li>
          <li class="list-inline-item"><a href={nego.rede_social2}><i class="fab fa-instagram"></i></a></li>
        </ul>
      </div>

      <h2>Nuestros servicios</h2>
        
          <div className="col-md-4">
            <div>
              {nego.descripcion}
             </div>
          </div>

    </div>  
     
       

     ))}
      

   
    </div>
<Footer/>
    </>
  )
}
