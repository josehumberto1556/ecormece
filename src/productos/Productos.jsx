import React,{useState,useEffect} from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs,orderBy, limit,query} from 'firebase/firestore'
import {Link}      from 'react-router-dom'
import "./productos.css"

function Productos() {
 
  
const [empre,setEmpresas ]=useState([])
  const  empresaCollection=collection(db,"m_productos")
  const getEmpresas=async ()   => {
//  const limitedQuery=await getDocs(empresaCollection)
  const limitedQuery=query(empresaCollection,orderBy("nombre_productos"), limit(4))
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
  
<>
	<section className="featured-products">
        <div className="container">
            <h2>Productos Destacados</h2>
            <div className="product-grid">
			{empre.map((empr)=>(
                <div className="product-card" key={empr.id}>
                    <img src={empr.imagen} width="300" height="200" alt="Producto 1"/>
                    <h3>{empr.nombre_productos}</h3>
                    <p className="price">{empr.precio}</p>
                    <Link 
					to={`/detalleProducto/${empr.id}`}
					className="btn btn-secondary">
					Ver Producto</Link>
                </div>
				))}
               
                
            </div>
        </div>
    </section>
</>
  );
}

export default Productos;
