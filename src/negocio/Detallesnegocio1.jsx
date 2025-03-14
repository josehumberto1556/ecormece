import React, {useState} from "react";
import {Link}  from 'react-router-dom'


export const Detallesnegocio1=({id,title,price,image,handleAgregar, handleQuitar, handleAumentar, handleDisminuir })=>
{
        
    const [added, setAdded] = useState(false) 

    
    const clickAgregar = () => {
        handleAgregar()
        setAdded(true)
    }
    const clickQuitar = () => {
        handleQuitar()
        setAdded(false)
    }


    return (

            <div className="col-12 col-md-4 col-lg-3 mb-5">
                                                
                    <div className="product-item">
                    <Link  to={`/detallesDelProducto/${id}`}>	
                        <img 
                        src={image}
                        className="img-fluid product-thumbnail"/>
                    </Link>
                        
                        <h3 className="product-title">{title}</h3>
                          <strong className="product-price">{price}</strong>
                            <span className="icon-cross">
                             <img src={image}
                             className="img-fluid"/>
                            </span>
                                            
                        <br/>
                        {added
                          ? <button
                            type="button"
                            className="boton-err"
                            onClick={clickQuitar}
                            >
                            
                            Quitar del Carrito
                            </button>
                            : <button
                              type="button"
                              className="boton-ag"
                              onClick={clickAgregar}
                            >
                                Agregar Carrito
                              </button>
                            }


                        </div>
                

                        </div> 
  )
}		
            


