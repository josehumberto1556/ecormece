import React, { useContext } from "react";
import  {DataContext}  from  '../context/DataProvider'
import {Link}      from 'react-router-dom'


export const ProductoItem=({id,title,price,image})=>
{
		
    const value=useContext(DataContext)
    const [menu,setMenu] =value.menu;
    const addCarrito=value.addCarrito

	return (
<div className="col-12 col-md-4 col-lg-3 mb-5">
						<Link className="product-item" to={`/detalleProducto/${id}`}>
							<img src={image}
							className="img-fluid product-thumbnail"/>
							<h3 className="product-title">{title}</h3>
							<strong className="product-price">{price}</strong>
							  <span className="icon-cross">
								 <img src={image}
								 className="img-fluid"/>
							  </span>
						</Link>
						<button className="btn" onClick={()=>addCarrito(id)}>
						 Agregar
						</button> 
						</div> 
  )
}		
			


