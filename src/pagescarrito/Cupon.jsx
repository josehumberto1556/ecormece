import React,{useState,useEffect}from 'react'
import {Link,useNavigate}  from 'react-router-dom'
import { collection, 
	     addDoc,
	     getDocs,
	     getDoc,
	     deleteDoc,
	    doc
	 } from 'firebase/firestore'

import {db,app} from '../Configfirebase/Configfirebase'	

import { getStorage,
         ref, 
		 uploadBytes,
		 getDownloadURL } from 'firebase/storage'
import "./Carrito.css"
import {Metodopago} from  "./Metodopago"
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const storage=getStorage(app)

export const Cupon = ({t,metodo}) => {

const [ i,setI ] = useState(null)

 const empresaCollection = collection(db, "pago_producto")
 const navigate = useNavigate()
 let urlDescarga
         


  async function subirArchivo(e)
  {
	    const archivoLocal=e.target.files[0];
	    setI(archivoLocal);
  }//fin de subir archivo


 const store = async (e) => {
     e.preventDefault()
  if(i)
  {
    
    const archivoRef=ref(storage,`pago_prooducto/${i.name}`)
    const uplo=await uploadBytes(archivoRef,i)
    urlDescarga=await getDownloadURL(archivoRef)
     await addDoc({  
                       nombre_producto:"cocacola",
                       imagen:urlDescarga,
                       status:1
                   } )
      
    
    
  

      MySwal.fire({
                       title: "Felicitaciones!",
                       text: "Registro con exito!",
                       icon: "danger",
                       button: "Felicitaciones!"
              });
         navigate("/ModuloAdministrador/Productos")
     }
    
   }

   

  return (
    <>
      <div class="row">
                <div class="col-md-6">
                  <div class="row mb-5">
                    {/* <div class="col-md-6 mb-3 mb-md-0">
                      <button class="btn btn-black btn-sm btn-block">Update Cart</button>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-outline-black btn-sm btn-block">Continue Shopping</button>
                    </div> */}
                  </div>

                  {/* <div class="row">
                    <div class="col-md-12">
                      <label class="text-black h4" for="coupon">Cup&oacute;n</label>
                      <p>Ingrese codigo de su cup&oacute;n.</p>
                    </div>
                    <div class="col-md-8 mb-3 mb-md-0">
                      <input type="text" class="form-control py-3" id="coupon" placeholder="Codigo de cup&oacute;n" required/>
                    </div>
                    <div class="col-md-4">
                      <button class="botoncc">Aplicar Cup&oacute;n</button>
                    </div>
                  </div> */}
                  
                  <div class="row">
                   { metodo.map(item=>(

                         <Metodopago 
                          key={item.id}
                          nombrenegocio={item.nombre_negocio}
                          />
              
                  ))}  
                  
                  </div>

                 
                  <div class="row">
                    <div class="col-md-12">
                      <label class="text-black h4" for="coupon">Comprobante de pago</label>
                      <p>Ingrese Comprobante de pago.</p>
                    </div>
                  
                  <form  onSubmit={store}>
                    <div class="col-md-8 mb-3 mb-md-0">
                     
                        <input
                        type="file" 
                        className="form-control py-3" 
                        onChange={subirArchivo}
                        id="coupon" 
                        required/>
                   </div>

                    <div class="col-md-4">
                      <button type='submit' className="botoncc">Procesar Pago</button>
                    </div>
                  </form>
                  </div>
                

                </div>
                <div class="col-md-6 pl-5">
                  <div class="row justify-content-end">
                    <div class="col-md-7">
                      <div class="row">
                        <div class="col-md-12 text-right border-bottom mb-5">
                          <h3 class="text-black h4 text-uppercase">Total del Carrito</h3>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-md-6">
                          <span className="text-black">Subtotal</span>
                        </div>
                        <div class="col-md-6 text-right">
                          <strong class="text-black">{t}</strong>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-md-6">
                          <span class="text-black">Total</span>
                        </div>
                        <div class="col-md-6 text-right">
                          <strong class="text-black">{t}</strong>
                        </div>
                      </div>
        
                      {/* <div class="row">
                        <div class="col-md-12">
                          <button class="botoncc btn-lg py-3 btn-block" onclick="window.location='checkout.html'">Proceder al  Pago </button>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}


