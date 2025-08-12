import React,{useState,useEffect}from 'react'
import {db,app} from '../Configfirebase/Configfirebase'		
import {Link,useParams} from 'react-router-dom'
import {collection,getDoc, doc} from 'firebase/firestore'
import Navbar  from "../navbar/Navbar"
import Navbar1  from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"


function VerNoticia() {
	
  const {id}=useParams()
  const [ nombrep,setNombrep]= useState('');
  const [ fecha,setFecha]=useState('');
  const [ imagen,setImagen]=useState('');
  const [ descripcion,setDescripcion]=useState('');   
  
	   const getEmpresaById = async (id) => {
	const empresa = await getDoc( doc(db, "blog", id) )
	if(empresa.exists()) {
		//console.log(product.data())
		setNombrep(empresa.data().nombre_blog); 
		setFecha(empresa.data().fechablog);    
		setImagen(empresa.data().imagenblog);
		setDescripcion(empresa.data().descripcionblog); 
		
	}else{
		console.log(' no existe')
	}
}

useEffect( () => {
	getEmpresaById(id)
	// eslint-disable-next-line
}, [])
  return (
    <>
	   <Navbar/>
       <Navbar1/>
       
	<section className="articles-section">
        <div className="container">
            <div className="articles-grid">
              
                <article className="article-card">
                    <img
					src={imagen}
                    width="400"
					height="250"
					alt={nombrep}
					className="article-image"/>
                    <div className="article-content">
                        <h3>{nombrep}</h3>
                        <p className="article-meta">{fecha}</p>
                        <p className="article-excerpt">{descripcion}</p>

                    </div>
                </article>
			   

			</div>
         </div>
      </section>		 
	
	
		<Footer/>
    </>
  );
}

export default VerNoticia;
