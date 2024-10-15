//import {useContext} from "react";
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
//import {DataContext} from "../context/DataProvider";
import {ProductoItem} from "./ProductoItem";
import  Carrito         from  '../Carrito/Carrito'
import React,{useState,useEffect}from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import { collection,query,where,getDocs } from 'firebase/firestore'; 
import {link,useParams} from 'react-router-dom'
import "boxicons"


function ListadoProducto() {
	const {nombre} = useParams()
	let categoria= decodeURIComponent(nombre);
   	const [empre,setEmpresas ]=useState([])
	
  
    const getEmpresas=async() =>
    {
		
       if(categoria)
	   { 
         const col= collection(db,'m_productos');
		 const q=query(col,where("categoria","==",categoria));
		 const datos=await getDocs(q);
	 	 //data.forEach(user=>{console.log(user.data())})
		setEmpresas(datos.docs.map((doc => ({ ...doc.data(), id: doc.id }))))				   
	    
		}
         
     }
	 
 	 useEffect( () => {
         getEmpresas()
    }, [] )
	
//const value=useContext(DataContext)
//const [listadoproductos]=value.listadoproductos
  return (
  <>
   <Navbar/>
   <Navbar1/>
   

			{//<Carrito/>
			}
			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">

 				<h2 className="text-center">Listado de Productos</h2>
				{
					empre.map(productos=>(
					
							
						<ProductoItem 
					     key={productos.id}
					    id={productos.id}
					    title={productos.nombre_productos}
					    price={productos.precio}
					    image={productos.imagenq}
					   
					   />
					   ))
				}
				</div>
		    </div>
		</div>

	 
	 <Footer/>
  </>
  );
}

export default ListadoProducto;
