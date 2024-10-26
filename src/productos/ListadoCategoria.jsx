import React, { useState, useEffect } from 'react';
import {Link}  from 'react-router-dom'
import { collection, getDocs, query, limit, startAfter,orderBy } from 'firebase/firestore';
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
	
  const [products, setProducts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageSize] = useState(12);

  const fetchProducts = async (startAfterDoc =1) => {
    setLoading(true);
    const productsRef = collection(db, 'categoria');
    const productsQuery = query(
      productsRef,
      orderBy("nombre_categoria","asc"), 
      limit(pageSize),
      startAfterDoc ? startAfter(startAfterDoc) : 0
    );

    const querySnapshot = await getDocs(productsQuery);
    const newProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
   // setProducts(prevProducts => [...prevProducts, ...newProducts]);
   setProducts(querySnapshot.docs.map( (doc) => ( {...doc.data(),id:doc.id}))) 
   setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    if (lastVisible) {
      fetchProducts(lastVisible);
    }
  };
  
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
          
					products.map(productos=>(
					   <CategoriaItem 
					   key={productos.id}
					   id={productos.id}
					   nombre={productos.nombre_categoria}
					   imagen={productos.imagen}
					   
					   />
					   ))
          }
        
       
				{!loading && lastVisible && (
        <button onClick={handleLoadMore}>Cargar más</button>
      )}
        </div>

		    </div>
		</div>

	 
	 <Footer/>
</div>
  </>
  );
}

export default ListadoCategoria;
