import React, { useState, useEffect } from 'react';
import {Link}  from 'react-router-dom'
import {collection,
        getDocs
		} from 'firebase/firestore'
import {app,db} from '../Configfirebase/Configfirebase'
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
import {DataContext} from "../context/DataProvider";
import {CategoriaItem} from "./CategoriaItem";
import  Carrito         from  '../Carrito/Carrito'
import "boxicons"


function ListadoCategoria() {
	
	
    const [searchTerm, setSearchTerm] = useState('');
    const [empre,setEmpresas ]=useState([])
    const  empresaCollection=collection(db,"categoria")
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
  <>
  <div>
   <Navbar/>
   <Navbar1/>
	 
			
			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">

 				<h2 className="text-center">Listado de Categorias</h2>
				{
					empre.map(productos=>(
					   <CategoriaItem 
					   key={productos.id}
					   id={productos.id}
					   nombre={productos.nombre_categoria}
					   imagen={productos.imagen}
					   
					   />
					   ))
                 }
				</div>
		    </div>
		</div>

	 
	 <Footer/>
</div>
  </>
  );
}

export default ListadoCategoria;
