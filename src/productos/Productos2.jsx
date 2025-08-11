import "./productos.css"
import React,{useState,useEffect} from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs,orderBy, limit,query} from 'firebase/firestore'
import {Link}      from 'react-router-dom'

function Productos2() {
	
	 
const [empre,setEmpresas ]=useState([])
  const  empresaCollection=collection(db,"categoria")
  const getEmpresas=async ()   => {
//  const limitedQuery=await getDocs(empresaCollection)
  const limitedQuery=query(empresaCollection,orderBy("nombre_categoria"), limit(4))
  const data=await getDocs(limitedQuery)
   //console.log(data.docs)
   setEmpresas(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   
     }
	
	  useEffect( () => {
    getEmpresas()
  }, [] )
  
	
  return (
    
	 <section className="categories-section">
        <div className="container">
            <h2>Explora por Categorías</h2>
             
             <div className="category-grid">
             {empre.map((empr)=>(
             <div key={empr.id}>
			 <Link 
			 to={`/Productos/${empr.nombre_categoria}`} 
			 className="category-item" >
               <img 
			   src={empr.imagenq}
			   alt={empr.nombre_categoria}/>
               <h3>{empr.nombre_categoria}</h3>
             </Link>
               </div>
            ))}
			</div>
			 
        </div>
    </section>
  );
}

export default Productos2;
