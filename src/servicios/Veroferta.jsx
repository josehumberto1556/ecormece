import React,{useState,useEffect}from 'react'
import {app,db} from '../Configfirebase/Configfirebase'		
import {Link,useParams} from 'react-router-dom'
import { getDoc,doc,collection,getDocs, } from "firebase/firestore"
import Navbar from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import ProductoPopular from "../productos/ProductoPopular"
import Footer  from "../piepagina/Footer"
import "./ofertas.css"
function Veroferta() {
	
    const {id} = useParams()
    
    
    const [nombreempleo,setNombreempleo ] = useState('');
    const [ imagen,setImagen ] = useState('');
    const [ descripcion,setDescripcion ] = useState('');	
    const [ fecha,setFecha ] = useState('');
    const [ responsabilidades,setResponsabilidades]=useState('');  
    const [ requisitos,setRequisitos]=useState('');    
    const [ link,setLink]=useState(''); 
    const getEmpresaById = async (id) => {
       const empresa = await getDoc( doc(db, "ofertaempleo", id) )
       if(empresa.exists()) {
           //console.log(product.data())
               
           setNombreempleo(empresa.data().nombreempleo)
           setImagen(empresa.data().imagenempelo)
           setDescripcion(empresa.data().descripcionempleo) 
           setFecha(empresa.data().fecha)	
           setResponsabilidades(empresa.data().Responsabilidades)
           setRequisitos(empresa.data().Requisitos)
           setLink(empresa.data().link_oferta)
       }else{
           console.log('El  no existe')
       }
   }
    
     useEffect( () => {
       getEmpresaById(id)
       // eslint-disable-next-line
   }, [])
  
   
  
   
    
   return(
   <>
     <Navbar/>
    <Navbar1/>
       <div className="section" style={{marginTop:"80px"}}>
    <div className="container article">
        <div className="row justify-content-center align-items-stretch">
            <article className="col-lg-8 order-lg-2 px-lg-5 job-card">
                <img 
                    src={imagen} 
                    alt="Image" 
                    className="img-fluid"
                    width="600"
                    height="600"
                />

                <h3>{nombreempleo}</h3>
                <p style={{textAlign:"justify"}}>
                    {descripcion}<br/>
                    <strong>{fecha}</strong>
                </p>

                <h4>Responsabilidades</h4>
                <p>
                    <ul>
                        <li>{responsabilidades}</li>
                        {/* Puedes dividir las responsabilidades en una lista para una mejor presentación */}
                        {/* Ejemplo:
                        <li>Crear y programar publicaciones atractivas en redes sociales.</li>
                        <li>Responder a comentarios y mensajes de la comunidad de manera profesional.</li>
                        <li>Monitorear y analizar métricas de redes sociales.</li>
                        */}
                    </ul>
                </p>

                <h4>Requisitos</h4>
                <p>
                    <ul>
                        <li>{requisitos}</li>
                        {/* Puedes dividir los requisitos en una lista */}
                        {/* Ejemplo:
                        <li>Experiencia comprobable (mínimo [X] años) en gestión de redes sociales.</li>
                        <li>Residencia actual en San Josecito o zonas cercanas.</li>
                        <li>Excelente comunicación escrita y verbal.</li>
                        */}
                    </ul>
                </p>

                <div className="mb-5">
                    <Link to={link}>
                        <button className="botones1" style={{backgroundColor:"#FFCA4B"}}>Postularse</button>
                    </Link>
                </div>
            </article>
        </div>
    </div>
</div>
    <Footer/>
   </>
   )
}

export default Veroferta;	