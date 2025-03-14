import React, { useState, useEffect } from 'react';
import {Link}  from 'react-router-dom'
import { collection, getDocs, query, limit, startAfter,orderBy } from 'firebase/firestore';
import {app,db} from '../Configfirebase/Configfirebase'
import {Negociotem1} from "./Negocioitem1"
import NavbarDos from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
import "./negocio.css"
import "boxicons"


function Negocios1() {
	
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageSize] = useState(12);
  

  const fetchProducts = async (startAfterDoc =1) => {
    setLoading(true);
    const productsRef = collection(db, 'negocios');
    const productsQuery = query(
      productsRef,
      orderBy("nombre_negocio","asc"), 
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
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
	
  };

  const filteredData = products.filter((item) =>
    item.nombre_negocio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <>
  <div>
  <NavbarDos/>
   <Navbar1/>
	 
			
			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">

 				<h2 className="text-center">Listado de negocios</h2>
           
        <div className="clo-lg-12 col-md-12">  
		       <form>
		         <input type="text" 
		          value={searchTerm} 
		          onChange={handleSearch} 
		          placeholder="Buscar  Negocios ..." 
		          className="form-control"
		          reuired/>
        </form>	
        </div>
        <br/><br/><br/>
        {
          
					filteredData.map(productos=>(
					   <Negociotem1 
					   key={productos.id}
					   id={productos.id}
					   nombre={productos.nombre_negocio}
					   foto={productos.foto}
					   
					   />
					   ))
          }
        
       
				
        </div>
        {!loading && lastVisible && (
        <button onClick={handleLoadMore} className="boton5">Cargar más</button>
      )}
		    </div>
		</div>

	 
	 <Footer/>
</div>
  </>
  );
}

export default Negocios1;
