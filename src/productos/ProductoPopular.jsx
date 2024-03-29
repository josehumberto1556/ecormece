import React,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs} from 'firebase/firestore'


function ProductoPopular() {
 
 const [empre,setEmpresas ]=useState([])
  const  empresaCollection=collection(db,"m_productos")
  const getEmpresas=async ()   => {
  const data=await getDocs(empresaCollection)
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
     		<div className="popular-product">
			<div className="container">
				<div className="row">

					<div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
						{empre.map((empr)=>(
						<div className="product-item-sm d-flex" key={empr.id}>
							<div className="thumbnail">
								<img src={empr.imagen} alt="Image" 
								className="img-fluid"/>
							</div>
							
							<div className="pt-3">
								<h3>{empr.nombre_productos}</h3>
								<p>{empr.descripcion} </p>
								<p><Link to={`/VerProducto/${empr.id}`}>Leer m&aacute;s</Link></p>
							</div>
						</div>
						))}
					</div>

					

				</div>
			</div>
		</div>
    </div>
  );
}

export default ProductoPopular;
