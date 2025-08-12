import React,{useState,useEffect} from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs,orderBy, limit,query} from 'firebase/firestore'
import "./Gusta.css"
function Gusta() {
  
const [empre,setEmpresas ]=useState([])
  const  empresaCollection=collection(db,"m_productos")
  const getEmpresas=async ()   => {
//  const limitedQuery=await getDocs(empresaCollection)
  const limitedQuery=query(empresaCollection,orderBy("nombre_productos","desc"), limit(4))
  const data=await getDocs(limitedQuery)
   //console.log(data.docs)
   setEmpresas(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   
     }
	
	  useEffect( () => {
    getEmpresas()
  }, [] )
return(	
<section className="you-might-also-like">
            <h3>Tambien Te podria gustar</h3>
            <div className="products-list">
                {empre.map((empr)=>(
				<div className="product-card">
                    <img src={empr.imagenq}
					width="200"
					height="150"
					alt={empr.nombre_productos}/>
                    <h4>{empr.descripcion}</h4>
                    <p>{empr.precio}</p>
                </div>
                ))}
               
              
            </div>
        </section>
)}

export default Gusta