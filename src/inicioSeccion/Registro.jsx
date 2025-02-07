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
       validacionExitosa}=RegistroHook()
    return (
    <>

			
		<div className="untree_co-section">
      <div className="container">

        <div className="block">
          <div className="row justify-content-center">


            <div className="col-md-8 col-lg-8 pb-4">


              <div className="row mb-5">
               

               
             
              </div>
      <form>
      <h1 style={{textAlign:"center"}}>Registrar Usuario</h1>      
      <label className="text-black" for="fname">Nombre</label>
         <input 
          type="text" 
          className="form-control" 
          placeholder="Nombre ..."
          value={nombreusu} onChange={manejarCambioNombre}
          required
         />
         {errorNombre && <p style={{color:"red",textAlign:"center"}}>{errorNombre}</p>}
   
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
      
          
          <label className="text-black" for="email">Clave Usuario</label>
           <input 
           type="password"
           className="form-control" 
                   placeholder="clave Usuario ..."
           value={clave}
           onChange={manejarClaveUsuario}
                   />
            {errorclave && <p style={{ color: 'red' ,textAlign:"center"}}>{errorclave}</p>}
          
            <label className="text-black" for="message">Tipo Actividad</label>
             <select 
              className="form-control" 
              onChange={manejarNivel}
              required>
              <option value="-">Seleccione</option>
                           <option value="2">Vendedor</option>
                         <option value="3">Comprador</option>
                      </select>
              {errorc && <p style={{ color: 'red',textAlign:"center" }}>{errorc}</p>}
   
              <label for="Categoriar">Foto Negocio</label>
              <input type="file" onChange={manejarCambioImagen}   accept="image/*"/>
               {errorImagen && <p style={{ color: 'red' ,textAlign:"center"}}>{errorImagen}</p>}
               
            
             <div className="d-grid gap-2 col-6 mx-auto">
              <button 
               type="button"
              className="boton4"
               onClick={subirImagen}
              
              >
               Guardar
                </button> 
           </div>
       </form>      

       </div>
     </div>
   </div>
 </div>
</div>
    </>
  )
}
