import React,{useState,useEffect}from 'react'
import { Menu } from '../navbar/Menu'
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
import NavbarDos  from "../navbar/Navbar2"
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
   <Menu/>
	 <Navbar1/>
  
			
			<div className="untree_co-section">
      <div className="container">

        <div className="block">
          <div className="row justify-content-center">


            <div className="col-md-8 col-lg-8 pb-4">

              <form  onSubmit={store}>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" for="fname">Nombre</label>
                      <input type="text" 
	 				             className="form-control" 
   					           id="fname"
					             placeholder="Nombre ..."
                       value={codigo_empresa}
                       onChange={ (e) => setCodigoempresa(e.target.value)}
					             required
					            />
                    </div>
                  </div>
                
                </div>
                
				<div className="form-group">
                  <label className="text-black" for="email">Correo Electronico</label>
                  <input 
                  type="email" 
                  className="form-control" 
				           id="email" 
                  placeholder="Correo Electronico ..."
                  value={email_empresa}
                  onChange={ (e) => setEmailempresa(e.target.value)}
				          required/>
                </div>

                <div className="form-group mb-5">
                  <label className="text-black" for="message">Mensaje</label>
                  <textarea 
                    name="" 
				            className="form-control" 
				            id="message" 
                    cols="30" 
				             rows="5"
				            placeholder="Mensaje ..."
				            value={direccion_empresa}
                    onChange={ (e) => setDireccionempresa(e.target.value)}
                    required
				          >
                    
                  </textarea>
                </div>

                <button
                 type="submit"
				         style={{color:'white'}}
                 className="boton1 mt-1"
                >Enviar Mensaje</button>
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
