import React,{useState,useEffect}from 'react'
import {app,db} from '../Configfirebase/Configfirebase'		
import {Link,useParams} from 'react-router-dom'
import { getDoc,doc,collection,getDocs, } from "firebase/firestore"
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import ProductoPopular from "../productos/ProductoPopular"
import Footer  from "../piepagina/Footer"

function Veroferta() {
	
    const {id} = useParams()
    
    
    const [nombreempleo,setNombreempleo ] = useState('');
    const [ imagen,setImagen ] = useState('');
    const [ descripcion,setDescripcion ] = useState('');	
    const [ fecha,setFecha ] = useState('');
    const [ responsabilidades,setResponsabilidades]=useState('');  
    const [ requisitos,setRequisitos]=useState('');    
        
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

       <article className="col-lg-8 order-lg-2 px-lg-5">
         
         

         <img src={imagen} 
         alt="Image" className="img-fluid"
           width="600"
           height="600"
         />

         <h3>{nombreempleo}</h3>
         <p style={{textAlign:"justify"}}> 
         {descripcion}<br/>
         <strong>{fecha}</strong>
         </p>
         
         <p>
          <b>Responsabilidades:</b><br/>
          {responsabilidades}
         </p>
         
         <p>
          Requisitos:<br/>
          {requisitos}
         </p>

         { /*<p>
           
           <iframe width="560" height="315" src={video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           
         </p>*/}

       
     


         <div className="pt-5">
           
           
           {/*/<Comentarios/>
          
             <Formulariocontacto id={id}/>
           */}
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