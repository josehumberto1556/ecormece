import "./Footer.css"
import c    from "../images/envelope-outline.svg"
import React,{useState,useEffect}from 'react'
import {Link }   from "react-router-dom";
import {db} from '../Configfirebase/Configfirebase'		
import { collection, addDoc,query,where,getDocs } from 'firebase/firestore'
import { getStorage,
         ref, 
         uploadBytes,
         getDownloadURL } from 'firebase/storage'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./Footer.css"

const MySwal = withReactContent(Swal)

function Boletin() {

    const [ nombre,setNombre ] = useState('')
    const [ codigo_empresa,setcodigoempresa ] = useState('')
    
	
	const store = async (e) => 
	{
      
	  e.preventDefault()
      const empresaCollection = collection(db, "subscribcion")
      const q=query(empresaCollection,where("email","==",codigo_empresa));
      const datos=await getDocs(q); 
	  if(!datos.empty)
	  {
	       MySwal.fire({
          title: "Error",
          text: "El correo ya está registrado.",
          icon: "error",
          button: "Aceptar",
        });
	  }
	  else
	  {	  
	  await addDoc( empresaCollection, {
                                        nombre:nombre,
                                        email:codigo_empresa
                                     } )
                                     
      MySwal.fire({
                    title: "Bien hecho!",
                    text: "subscribción con exito!",
                    icon: "success",
                     button: "Felicitaciones!",
 
       })}
    }//fin del else
    
  return (
    <>
<section className="footer-section">
   
   <div className="container relative">


    <div className="row">
        <div className="col-lg-8">
            <div className="subscription-form">
            <h3 className="d-flex align-items-center">
                            
            
            <span className="me-1">
				<img 
				src={c}
				alt="Image" 
				className="img-fluid"/>
			</span>
            <span style={{color:"white", marginLeft:"140px"}}>
            Subscribete a Nuestro boletin
            informativo
           </span></h3>

            <form  onSubmit={store} className="row g-3">
            
            <div className="col-auto">
                <input type="text" 
                className="form-control" 
                placeholder="Escriba su nombre"
                value={nombre}
                onChange={ (e) => setNombre(e.target.value)}
                required/>
            </div>
                                
            <div className="col-auto">
              <input type="email" 
              className="form-control" 
              placeholder="Escriba su correo electronico"
              value={codigo_empresa}
              onChange={ (e) => setcodigoempresa(e.target.value)}
              required								
             />		 
            </div>
                                
                <div className="col-auto">
                    <button className="btn" style={{backgroundColor:"#FFCA4B"}}>
                    <span className="fa fa-paper-plane" style={{color:"#080808ff"}}></span>
                    </button>
                </div>
            </form>

                        </div>
                    </div>
                </div>
    </div>			
</section>
</>
)

}


export default Boletin