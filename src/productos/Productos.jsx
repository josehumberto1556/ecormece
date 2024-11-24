import React,{useState,useEffect} from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs,orderBy, limit,query} from 'firebase/firestore'
import {Link}      from 'react-router-dom'
function Productos() {
 

  const [empre,setEmpresas ]=useState([])
  const  empresaCollection=collection(db,"m_productos")
  const getEmpresas=async ()   => {
//  const limitedQuery=await getDocs(empresaCollection)
  const limitedQuery=query(empresaCollection,orderBy("nombre_productos"), limit(3))
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
    <div>
     		<div className="product-section">
			<div className="container">
				<div className="row">

					<div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
						<h2 className="mb-4 section-title">Productos creados con execelencia.</h2>
						<p className="mb-4">Ultimos Productos publicados diferentes categorias</p>
						
					</div> 
					
					{empre.map((empr)=>(
		
					<div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" key={empr.id}>
					 
					<Link to={`/VerProducto/${empr.nombre_productos}`}>
            
			        <section 	className="product-item" >
					<img src={empr.imagen}
							className="img-fluid product-thumbnail"/>
							
							<h3 className="product-title">{empr.nombre_productos}</h3>
							<strong className="product-price">{empr.precio}</strong>

							<span className="icon-cross">
								<img src={empr.imagenq} 
								className="img-fluid"/>
							</span>
				
				   </section>
				</Link>
								</div> 
					))
					}
					

				</div>
			</div>
		</div>
    </div>
  );
}

export default Productos;
