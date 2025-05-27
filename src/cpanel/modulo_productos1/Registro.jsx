import React from 'react'
import { PerfilHook } from './PerfilHook'
export default function Registro({email}) {

   const {
              nombre,
              direccion,
              descripcion,
              telefono,
              facebook,
              instagran,
              titok,
              errorDireccion,
              errorNombre,
              errorDescripcion,
              errorTelefono,
              errorImagen,
              manejarCambiosTel,
              manejarCambioDes,
              manejarCambioDireccion,
              manejarCambioNombre,
              manejarCambiosf,
              manejarCambiosi,
              manejarCambiost,
              manejarCambioImagen,
              subirImagen,
              acceptTerms,
              receiveUpdates,
              handleUpdatesChange,
              handleTermsChange,
              empresaterms,
              distribuidorterms,
              proveedorterms,
              handleEmpresaterms,
              handleDistribuidorterms,
              handleProveedorterms
        }=PerfilHook({email})
    
   
    return (
    <>
         <form className="forms-sample">

           <div className="form-group">
              <label for="Categoriar">Correo Negocio</label>
               <textarea
                className='form-control'
                placeholder="Correo ..."
                value={email}
                cols="30" 				  
                rows="5" 
                disabled
                 />
            </div> 
                  
            <div className="form-group">
              <label for="Categoriar">Nombre Negocio</label>
               <textarea
                className='form-control'
                placeholder="Nombre Negocio ..."
                value={nombre}
                onChange={manejarCambioNombre}
                cols="30" 				  
                rows="5" 
                />
                 {errorNombre && <p style={{color:"red",textAlign:"center"}}>{errorNombre}</p>}
            </div> 


             <div className="form-group">
              <label for="Categoriar">Dirección Negocio</label>
                <textarea
                className='form-control'
                placeholder="Direccion Negocio ..."
                value={direccion}
                onChange={manejarCambioDireccion}
                cols="30" 				  
                rows="5" 
                />
                 {errorDireccion && <p style={{color:"red",textAlign:"center"}}>{errorDireccion}</p>}
            </div> 

            <div className="form-group">
              <label for="Categoriar">Descripción Negocio</label>
                <textarea
                className='form-control'
                placeholder="Descripcion Negocio ..."
                value={descripcion}
                onChange={manejarCambioDes}
                cols="30" 				  
                rows="5" 
                />
                 {errorDescripcion && <p style={{color:"red",textAlign:"center"}}>{errorDescripcion}</p>}
            </div> 

               <div className="form-group">
              <label for="Categoriar">Whatsapp Negocio</label>
                <textarea
                className='form-control'
                placeholder="Whtasapp Negocio ..."
                value={telefono}
                onChange={manejarCambiosTel}
                cols="30" 				  
                rows="5" 
                />
                 {errorTelefono && <p style={{color:"red",textAlign:"center"}}>{errorTelefono}</p>}
            </div>

              <div className="form-group">
              <label for="Categoriar">Facebook</label>
                <textarea
                className='form-control'
                placeholder="Facebook ..."
                value={facebook}
                onChange={manejarCambiosf}
                cols="30" 				  
                rows="5" 
                />
            </div>

              <div className="form-group">
              <label for="Categoriar">Instagran</label>
                <textarea
                className='form-control'
                placeholder="Instagran ..."
                value={instagran}
                 onChange={manejarCambiosi}
                cols="30" 				  
                rows="5" 
                />
            </div>

              <div className="form-group">
              <label for="Categoriar">Tittok</label>
                <textarea
                className='form-control'
                placeholder="titok ..."
                value={titok}
                 onChange={manejarCambiost}
                cols="30" 				  
                rows="5" 
                />
            </div>
               
            <div className="form-group mb-5">
             <label className="text-black" for="message">Foto Negocio</label>
             <input type="file" onChange={manejarCambioImagen}   accept="image/*"/>
               {errorImagen && <p style={{ color: 'red' ,textAlign:"center"}}>{errorImagen}</p>}    
           </div>

             <div className="form-group mb-5">
             <label className="text-black" for="message">Perifl Negocio</label>
             <div className="mb-3 form-check">
             <input
              type="checkbox"
              className="form-check-input"
              id="acceptTerms"
              checked={acceptTerms}
              onChange={handleTermsChange}
             />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                Emprendedor
             </label>
             </div>

             <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
               id="receiveUpdates"
               checked={receiveUpdates}
               onChange={handleUpdatesChange}
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                 Negocio
                </label>
             </div>
            
            <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
               id="receiveUpdates"
               checked={empresaterms}
               onChange={handleEmpresaterms}
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                 Empresa
                </label>
             </div>

            <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
               id="receiveUpdates"
               checked={distribuidorterms}
               onChange={handleDistribuidorterms}
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                 Distribuidor
                </label>
             </div>
                 <div className="mb-3 form-check">
              <input
               type="checkbox"
               className="form-check-input"
               id="receiveUpdates"
               checked={ proveedorterms}
               onChange={handleProveedorterms}
              />
              <label 
               className="form-check-label" 
               htmlFor="acceptTerms">
                 Proveedor
                </label>
             </div>
          
           </div>

           <div align="Center">
             <button
              className='btn btn-primary mr-2'
              type="button"
               onClick={subirImagen}>Guardar</button>                  
           </div>         
                </form> 
    </>
  )
}
