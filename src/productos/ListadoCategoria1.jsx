import React, { useState, useEffect } from 'react';
import {Link}  from 'react-router-dom'
import { collection, getDocs, query, limit, startAfter,orderBy } from 'firebase/firestore';
import {app,db} from '../Configfirebase/Configfirebase'
import {CategoriaItem1} from "./CategoriaItem1";
import NavbarDos from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import Productos from "./Productos"
import Productos2 from "./Productos2"
import Productos3 from "./Productos3"
import ProductoPopular from "./ProductoPopular"
import Blog  from "../blog/Blog"
import Footer  from "../piepagina/Footer"
import "boxicons"
import "./productos.css"

function ListadoCategoria1() {
	
  const [searchTerm, setSearchTerm] = useState('');
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
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
	
  };

  const filteredData = products.filter((item) =>
    item.nombre_categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <>
  <div>
  <NavbarDos/>
   <Navbar1/>
	 
			
			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">

 				<h2 className="text-center">Listado de Categorias</h2>
           
        <div className="clo-lg-12 col-md-12">  
		       <form>
		         <input type="text" 
		          value={searchTerm} 
		          onChange={handleSearch} 
		          placeholder="Buscar  Categoria ..." 
		          className="form-control"
		          reuired/>
        </form>	
        </div>
        {
          
					filteredData.map(productos=>(
					   <CategoriaItem1 
					   key={productos.id}
					   id={productos.id}
					   nombre={productos.nombre_categoria}
					   imagen={productos.imagenq}
					   
					   />
					   ))
          }
        
       
				{!loading && lastVisible && (
        <button onClick={handleLoadMore} className="boton-cargar">Cargar más</button>
      )}
        </div>

		    </div>
		</div>

	 
	 <Footer/>
</div>
  </>
  );
}

export default ListadoCategoria1;
