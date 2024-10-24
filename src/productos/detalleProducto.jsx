import React, { useState,useEffect } from "react"
import {Link,useParams} from 'react-router-dom'
import { getDoc, updateDoc, doc } from "firebase/firestore"
import {db,app} from '../Configfirebase/Configfirebase'
import "./Producto.css"
import {ProductoItem} from "./ProductoItem";
import {DetalleItem}  from "./DetalleItem"
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"


function Detalleproducto() 
{
   const {id}=useParams()
   const [ nombrep,setNombrep ]= useState('');
   const [ color,setColor ]=      useState('');
   const [ imagen,setImagen ] =  useState('');
   const [ imagen1,setImagen1]=  useState('');   
   const [ imagen2,setImagen2]=  useState('');   
   const [ imagen3,setImagen3]=  useState('');   
   const [ precio,setPrecio]=    useState('');
   const [descripcion,setDescripcion]=useState('');

   const getEmpresaById = async (id) => {
	const empresa = await getDoc( doc(db, "m_productos", id) )
	if(empresa.exists()) {
		//console.log(product.data())
		setNombrep(empresa.data().nombre_productos); 
		setColor(empresa.data().color);    
		setImagen(empresa.data().imagenq);
		setImagen1(empresa.data().imagen1);    
		setDescripcion(empresa.data().descripcion);
		setPrecio(empresa.data().precio);
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
		      
		        
				 </div>

				<DetalleItem
				 nombre={nombrep}
				 color={color}
				 image={imagen}
				 image1={imagen1}
				 image2={imagen2}
				 image3={imagen3}
				 descripcion={descripcion}
				 price={precio}
				 />

             </div>
      
	 <Footer/> 
			  
    			 
			  </>
  )
}		

			
export default Detalleproducto

