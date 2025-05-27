import Navbar1 from "../navbar/Navbar1"
import NavbarDos from "../navbar/Navbar2"
import Footer  from "../piepagina/Footer"
import { useContext } from "react"
import { CarritoContext } from "../context/CarritoContext"
import { Cupon } from "./Cupon"

import "./Carrito.css"

export const CarritoPage = () => {

    const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra } = useContext(CarritoContext)

    const calcularTotal = () => {
        return listaCompras.reduce((total, item) => total + item.precio * item.cantidad, 0 ).toFixed(2)
    }

    const handleImpresion = () => {

      // print()
    }

    return (
        <>
        <NavbarDos/>
        <Navbar1/>
           
        <div className="untree_co-section before-footer-section">

           
          <div className="container">
          <div className="row mb-5">
                <div className="col-md-12">
                  <div className="site-blocks-table">
                    <table className="table">
                     <thead>
                        <tr>
                          <th className="product-thumbnail">Imagen</th>
                          <th className="product-name">Productos</th>
                          <th className="product-price">Precio</th>
                          <th clasName="product-quantity">Cantidad</th>
                          <th className="product-remove">Eliminar</th>
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
                          
                            <td><button
                                    type="button"
                                    className="botonc"
                                    onClick={()=>eliminarCompra(item.id)}
                                >Eliminar
                                </button></td>
                          </tr>

                      ))}
                     </tbody>

                     </table>
                    </div> 
                  </div>   
          </div>
        
          
          <Cupon 
           t={calcularTotal()}
           metodo={listaCompras}
           >
          </Cupon>

        </div> 
        </div>   
        
            <Footer/>
        </>
    )
}
