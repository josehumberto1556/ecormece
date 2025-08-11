import React,{useState,useEffect}from 'react'
import {Link,useNavigate}  from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import {db,app} from '../Configfirebase/Configfirebase'	
import { getStorage,
         ref, 
		 uploadBytes,
		 getDownloadURL } from 'firebase/storage'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'		 
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

const MySwal = withReactContent(Swal)

function Contacto() {


  const [ codigo_empresa,setCodigoempresa ] = useState('')
  const [ email_empresa,setEmailempresa ] = useState('')
  const [ direccion_empresa,setDireccionempresa ] = useState('')
  
  const empresaCollection = collection(db, "contacto")
     
      const store = async (e) => {
    e.preventDefault()
    await addDoc( empresaCollection, {
                                        nombre:codigo_empresa, 
	                                      email:email_empresa,
									                      comentario:direccion_empresa,
									 
		                                  } )
		MySwal.fire({
                      title: "Bien hecho!",
                      text: "Registro con Exito!",
                      icon: "success",
                       button: "Felicitaciones!",
                   });
    
  }   


  return (
  <>
   <Navbar/>
	 <Navbar1/>
  <main className="page-content contact-page">
        <div className="container">
            <h1 className="page-title">Contáctanos</h1>
            <p className="page-description">¿Tienes preguntas, comentarios o necesitas ayuda? ¡Estamos aquí para ti!</p>

            <div className="contact-info-section">
                {/* <div class="contact-card">
                    <i class="fas fa-map-marker-alt"></i>
                    <h3>Nuestra Ubicación</h3>
                    <p>123 Avenida Siempre Viva, Sector Centro</p>
                    <p>Rubio, Táchira, Venezuela</p>
                </div> */}
                <div className="contact-card">
                    <i className="fas fa-envelope" style={{color:"#FFCA4B"}}></i>
                    <h3>Envíanos un Correo</h3>
                    <p>info@libertycommerce.com</p>
                    <p>soporte@libertycommerce.com</p>
                </div>
                <div class="contact-card">
                    <i className="fas fa-phone-alt" style={{color:"#FFCA4B"}}></i>
                    <h3>Llámanos</h3>
                    {/* <p>+58 (276) 123-4567</p> */}
                    <p>Disponible Lunes - Viernes, 9 AM - 5 PM</p>
                </div>
            </div>

            <section class="contact-form-section">
                <h2>Envíanos un Mensaje</h2>
                <form class="contact-form" onSubmit={store}>
                    <div class="form-group">
                        <label for="name">Nombre</label>
                        <input 
                        className="form-control"
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder="Nombre ..."
                        value={codigo_empresa}
                        onChange={ (e) => setCodigoempresa(e.target.value)}
                        required 
                         />
                    </div>
                    <div class="form-group">
                        <label for="email">Correo Electrónico</label>
                        <input
                         type="email" 
                         className="form-control" 
				                 id="email" 
                         placeholder="Correo Electronico ..."
                         value={email_empresa}
                         onChange={ (e) => setEmailempresa(e.target.value)}
                         required/>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Tu Mensaje</label>
                        <textarea 
                          name="mensaje" 
				                  className="form-control" 
				                   id="message" 
                           cols="30" 
				                  rows="5"
				                  placeholder="Mensaje ..."
				                  value={direccion_empresa}
                          onChange={ (e) => setDireccionempresa(e.target.value)}
                           required
                        ></textarea>
                    </div>
                    <button type="submit" className="boton-a">Enviar Mensaje</button>
                </form>
            </section>
        </div>
    </main>
		<p><br/><br/></p>	
		
		      
		 

	 
	 <Footer/>
  </>
  );
}

export default Contacto;
