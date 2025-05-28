import React,{useState,useEffect}from 'react'
import { Link, useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import {app,db} from '../Configfirebase/Configfirebase'
import NavbarDos from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./compra.css"

export const VerCompra=()=>
{
        
   const [ nombre_usuario,setcodigoempresa ] = useState('')
   const [ tipo_operacion,setNombreempresa ] = useState('')
   const [ fecha_pago,setDireccionempresa ] = useState('')
   const [ imagen,setImagen ] = useState('')   
   const [ negocio,setNegocio ] = useState('')
   const [ total,setTotal ] = useState('')    
   
    const {id} = useParams()
     const getEmpresaById = async (id) => {
            const empresa = await getDoc( doc(db, "imagenes_subidas_comprobante", id) )
            if(empresa.exists()) {
                //console.log(product.data())
                setcodigoempresa(empresa.data().nombre_producto)    
                setNombreempresa(empresa.data().tipo_operacion)
                setDireccionempresa(empresa.data().fecha_pago)   
                setImagen(empresa.data().imagen)	
                setNegocio(empresa.data().nombre_negocio)
                setTotal(empresa.data().total)	
                			
            }else{
                console.log('El usuario no existe')
            }
        }
    
        useEffect( () => {
            getEmpresaById(id)
            // eslint-disable-next-line
        }, [])

    return (
     <>
     <NavbarDos/>
     <Navbar1/>
       <div class="container mt-5 mb-5">
        <div class="row justify-content-center">
            <div class="col-lg-7 col-md-9"> <div class="card shadow-lg border-0">
                    <div className=" azul card-header  text-white text-center py-3" >
                        <h3 class="mb-0 fw-bold"><i class="bi bi-box-seam-fill me-2"></i> Detalles de Compra del Producto</h3>
                        <p class="mb-0 text-white">Información consolidada de una transacción</p>
                    </div>
                    <div class="card-body p-4">
                        

                        <h4 class="text-primary mb-3">Producto: <span class="fw-bold"> {nombre_usuario}</span></h4>
                        <hr/>

                        <div class="row mb-3">
                            <div class="col-sm-6 mb-2">
                                <p class="mb-0 text-muted">Fecha de Compra:</p>
                                <p class="fw-bold fs-5">{fecha_pago}</p>
                            </div>
                            <div class="col-sm-6 mb-2">
                                <p class="mb-0 text-muted">Tipo de Operación:</p>
                                <p class="fw-bold fs-5">{tipo_operacion}</p>
                            </div>

                              <div class="col-sm-6 mb-2">
                                <p class="mb-0 text-muted">Negocio:</p>
                                <p class="fw-bold fs-5">{negocio}</p>
                            </div>
                        </div>

                        <div class="bg-light p-3 rounded mb-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0 fw-bold fs-4 text-dark">Total Pagado:</p>
                                <p class="mb-0 fw-bold fs-3 text-success">{total}</p>
                            </div>
                        </div>

                        <p class="text-muted small text-center">
                            Este reporte muestra los detalles de la compra de los producto.
                        </p>

                    </div>
                    {/* <div class="card-footer bg-light text-center py-3">
                        <button class="btn btn-outline-primary me-2"><i class="bi bi-arrow-left me-2"></i> Volver a Compras</button>
                        <button class="btn btn-outline-info"><i class="bi bi-printer me-2"></i> Imprimir Reporte</button>
                    </div> */}
                </div>
            </div>
        </div>
    </div>


     <Footer/>
  </>
  )
}		
            


