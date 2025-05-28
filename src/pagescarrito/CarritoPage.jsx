import { useState,useContext } from "react"
import { CarritoContext } from "../context/CarritoContext"
import { Cupon } from "./Cupon"
import { Carrito } from "./Carrito"
import Navbar1 from "../navbar/Navbar1"
import NavbarDos from "../navbar/Navbar2"
import Footer  from "../piepagina/Footer"
import "./Carrito.css"
import "./Cupon"

export const CarritoPage = () => {

 const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra } = useContext(CarritoContext)
   const calcularTotal = () => {
        return listaCompras.reduce((total, item) => total + item.precio * item.cantidad, 0 ).toFixed(2)
    }
 const {
         errorImagen,
         manejarCambioImagen,
         subirImagen,
         imagenesSeleccionadas,
         errorUpload,
         statusMessage,
         isUploading,
         handleImageChange,
         uploadProductImages}=Carrito(listaCompras,calcularTotal)
 
  const handleProcessPayment = async () => {
    // Pasar la lista de productos al hook para que realice la validación y subida
    const result = await uploadProductImages(listaCompras);

    // Si necesitas hacer algo adicional después de la subida, lo haces aquí
    if (result.success) {
      // Por ejemplo, navegar a otra página o limpiar el carrito
      console.log('Proceso completado. Archivos subidos:', result.uploadedFiles);
    } else {
      console.error('Fallo en el proceso:', result.error);
    }
  };

  if (!listaCompras || listaCompras.length === 0) {
    return <p>No hay productos en tu lista de compras.</p>;
  }
 return(
  <> 
   <NavbarDos/>
   <Navbar1/>     
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row mb-5">
         <div className="col-md-12">
            <div className="site-blocks-table">
               <h2>Mis Productos Comprados</h2>
                <table className="table">
                     <thead>
                        <tr>
                          <th className="product-thumbnail">Imagen</th>
                          <th className="product-name">Productos</th>
                          <th className="product-name">Metodo Pago</th>
                          <th className="product-price">Precio</th>
                          <th clasName="product-quantity">Cantidad</th>
                          <th className="product-remove">Eliminar</th>
                          <th clasName="product-quantity">Subir Comprobate</th>
                        </tr>
                     </thead>

                  <tbody>
                     {listaCompras.map(item => (
                                  
                            <tr key={item.id}>
                            <td className="product-thumbnail">
                              <img src={item.imagenq} alt="Image"/>
                            </td>
                            <td class="product-name">
                              <h2 class="h5 text-black">{item.nombre_productos}</h2>
                            </td>
                            <td>{item.precio}</td>
                             <td>{item.metodos_pago}</td>
                            <td>
                              <div class="input-group mb-3 d-flex align-items-center quantity-container">
                                <div class="input-group-prepend">
                                <button 
                                    className="botoncc" 
                                    onClick={ () => disminuirCantidad(item.id)}
                                    >-</button>
                                </div>
                                <button className="botoncc">{item.cantidad}</button>
                                <div class="input-group-append">
                                <button 
                                    className="botoncc" 
                                    onClick={ () => aumentarCantidad(item.id)}
                                 >+</button>
                                </div>
                              </div>
          
                            </td>
                               
                            <td>
                              <button
                               type="button"
                               className="botonc"
                               onClick={()=>eliminarCompra(item.id)}
                                >Eliminar
                               </button>
                            </td>

                            <td colspan="7"  className="botoncentrado">
                            <label htmlFor={`file-upload-${item.id}`}>Subir Imagen:</label>
                            <input
                              type="file"
                              id={`file-upload-${item.id}`}
                              name={`productImage-${item.id}`} 
                              accept="image/*"
                              onChange={handleImageChange} 
                              />
                            </td>
                            <td>
                               {statusMessage && <p style={{ color: 'green', textAlign: 'center' }}>{statusMessage}</p>}
                               {errorUpload && <p style={{ color: 'red', textAlign: 'center' }}>{errorUpload}</p>}
                            </td>
                    </tr>            
                      ))}
                   
                   
                   </tbody> 

                 </table>
    <div className="botoncentrado">            
        <button 
         type="button"
         onClick={handleProcessPayment} // Usa la función del componente para procesar el pago
         className="botoncc" 
         disabled={isUploading} // Deshabilita el botón mientras se suben archivos
         >
          {isUploading ? 'Procesando...' : 'Procesar Pago'}
         </button>
     </div>           
       <Cupon t={calcularTotal()}/>
       </div>
    </div>
    </div>
    </div>
    </div>
  <Footer/>
  </>
    )
}
