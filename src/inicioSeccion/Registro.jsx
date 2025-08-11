import { RegistroHook } from './Registrohook';

export const Registro=()=> {

const {
       nombreusu,
       errorNombre,
       manejarCambioNombre,
       emailu,
       errorEmail,
       handleChangeEmail,
       clave,
       errorclave,
       manejarClaveUsuario,
       errorc,
       manejarNivel,
       imagen,
       errorImagen,
       manejarCambioImagen,
       subirImagen,
       acceptTerms,
       receiveUpdates,
       handleUpdatesChange,
       handleTermsChange,
       validacionExitosa}=RegistroHook()
    return (
    <>

<div className="untree_co-section">
      <div className="container">

        <div className="block">
          <div className="row justify-content-center">


         <section className="contact-form-section col-md-9 col-lg-8 pb-4">
            <form className="contact-form">
                <h1 style={{textAlign:"center"}}>Regisrar Usuario</h1>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" for="fname">Nombre</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nombre ..."
                        value={nombreusu} onChange={manejarCambioNombre}
                        required
                      />
         {errorNombre && <p style={{color:"red",textAlign:"center"}}>{errorNombre}</p>}
                    </div>
                  </div>
                
                </div>
                
				<div className="form-group">
          <label className="text-black" for="email">Correo Electronico</label>
          <input
          type="email" 
          className="form-control" 
           id="email"
          placeholder="Correo Electronico ..."
          onChange={handleChangeEmail}
          value={emailu}
         
         />
          {errorEmail && <p style={{ color: 'red' ,textAlign:"center"}}>{errorEmail}</p>}         
        </div>

           <div className="form-group mb-5">
             <label className="text-black" for="message">Clave Usuario</label>
             <input 
              type="password"
              className="form-control" 
              placeholder="clave Usuario ..."
              value={clave}
              onChange={manejarClaveUsuario}
             />
            {errorclave && <p style={{ color: 'red' ,textAlign:"center"}}>{errorclave}</p>}       
           </div>
           
           <div className="form-group mb-5">
             <label className="text-black" for="message">Tipo Actividad</label>
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
             Vendedor
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
                 Comprador
                </label>
             </div>
            
             {/* <select 
              className="form-control" 
              onChange={manejarNivel}
              required>
              <option value="-">Seleccione</option>
               <option value="2">Vendedor</option>
               <option value="3">Comprador</option>
              </select> */}
              {errorc && <p style={{ color: 'red',textAlign:"center" }}>{errorc}</p>}           
           </div>

           <div className="form-group mb-5">
             <label className="text-black" for="message">Foto Negocio</label>
             <input type="file" onChange={manejarCambioImagen}   accept="image/*"/>
               {errorImagen && <p style={{ color: 'red' ,textAlign:"center"}}>{errorImagen}</p>}    
           </div>

                <button
                type="button"
                 className="boton-a"
                 onClick={subirImagen}
                >Guardar
                </button>
              </form>
              
            </section>

          </div>

        </div>

      </div>


    </div>	
		
        
    </>
  )
}
