import React, { useContext,useState,useEffect } from "react";
import  {DataContext}  from  '../context/DataProvider'
import {Link,useParams} from 'react-router-dom'
import "./Producto.css"
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import {ProductoItem} from "./ProductoItem";
import {DetalleItem}  from "./DetalleItem"

function Detalleproducto() 
{
   const value=useContext(DataContext)
   const [listadoproductos]=value.listadoproductos
   const [detalle,setDetalle]=useState([])
   const [url,setUrl]=useState(0)
   const [imagen,setImagen]=useState('')
   const params=useParams()
   


   
	
	return (
	<>
	          <Navbar/>
   
	 <div className="hero fondo">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro-excerpt">
								<h1>Producto</h1>
							</div>
						</div>
						<div className="col-lg-7">
							
						</div>
					</div>
				</div>
			</div>
	
			<div className="untree_co-section product-section before-footer-section">

		        <div className="container">
		      
			         <div className="row">

 				        <h2 className="text-center">Productos</h2>
				
				     </div>
		        
				 </div>

				 <DetalleItem/>


             </div>
      
	 <Footer/> 
			  
    			 
			  </>
  )
}		

			
export default Detalleproducto

