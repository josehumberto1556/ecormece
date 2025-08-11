import { useState, useEffect } from 'react';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import {app,db} from '../Configfirebase/Configfirebase'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "./slyder.css"

// Tu lógica para obtener los productos y los handlers de navegación
function Navbar1() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pageSize] = useState(12);
  
  // Lógica de useEffect para obtener los datos de Firebase (como te mostré antes)
   // --- 1. Lógica para obtener los productos de Firebase ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
		 const productsRef = collection(db, 'm_productos');  
         const productsQuery = query(
                                      productsRef,
                                      orderBy("nombre_productos","desc"), 
                                      limit(pageSize)
                                     );
	     const querySnapshot = await getDocs(productsQuery);
         const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (err) {
        console.error('Error al obtener los productos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Se ejecuta solo una vez al montar el componente


  // Lógica de handleNext y handlePrev
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % products.length);
  };
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  // --- El renderizado condicional es clave para evitar el error ---

  // 1. Manejamos el estado de carga
  if (loading) {
    return <div>Cargando productos...</div>;
  }

  // 2. Manejamos el caso de que no haya productos
  if (products.length === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  // 3. Solo cuando los datos están listos, asignamos el producto actual
  const currentProduct = products[currentImageIndex];

  // 4. Ahora, tu código JSX es seguro
  return (
    <div className="custom-slider-container container-fluid py-5">
      <div className="row g-0 align-items-center h-100">
        {/* Columna de la izquierda para el texto y el botón */}
        <div className="col-md-6 d-flex flex-column text-start p-5 product-info">
          <h2 className="product-name" style={{ color: "white" }}>{currentProduct.nombre_productos}</h2>
          <p className="product-price" style={{ color: "#FFCA4B" }}>{currentProduct.precio}</p>
          <button className="btn btn-lg" style={{ color: "black", backgroundColor: "#FFCA4B" }}>Comprar ahora</button>
        </div>
        {/* Columna de la derecha para la imagen (centrada) */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={currentProduct.imagenq} className="slider-image" />
        </div>
      </div>
      {/* Botones de navegación del slider */}
      <div className="position-absolute w-100 h-100 d-flex justify-content-between slider-nav-buttons">
        <button className="btn btn-lg btn-link text-white" onClick={handlePrev}>
          <i className="bi bi-chevron-left" style={{ fontSize: '2rem' }}></i>
        </button>
        <button className="btn btn-lg btn-link text-white" onClick={handleNext}>
          <i className="bi bi-chevron-right" style={{ fontSize: '2rem' }}></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar1;
