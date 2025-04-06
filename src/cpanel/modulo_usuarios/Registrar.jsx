import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'
import  './formulario.css'
import { RegistroHook } from './RegistroHook';
import { Link } from "react-router-dom"




function Registrar() {
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
  <Aside/>
   <div className="hold-transition sidebar-mini layout-fixed">
<div className="wrapper">
     
	   
        <div className="main-panel" style={{marginTop:"80px"}}>
	<div className="content-header">
					  <div className="container-fluid">
						 <div className="row mb-2">
					<div className="col-sm-6">
					  <h1 className="m-0">Cpanel</h1>
					</div>{/* /.col */}
					<div className="col-sm-6">
					  <ol className="breadcrumb float-sm-right">
						<li className="breadcrumb-item">
						<a href="javascript:void(0);">Registro Usuario</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row mover'>
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Registro Usuarios</h4><br/>
         <form className="forms-sample">

				 <div className="form-group">
           <label for="Categoriar">Nombre Usuario</label>
             <input
              type="text"
              className='form-control'
		 		      placeholder="Nombre Usuario ..."
							minlength="3"
							maxlength="20"
              required
              value={nombreusu} 
              onChange={manejarCambioNombre}  
               />
               {errorNombre && <p style={{color:"red",textAlign:"center"}}>{errorNombre}</p>}
              </div>                  
				 
				 <div className="form-group">
           <label for="Categoriar">Correo Usuario</label>
            <input
             type="email"
			     	 id="emailField" 
             className='form-control'
			       placeholder="Correo Usuario ..."
			       minlength="3"
			       maxlength="100"
             required
             onChange={handleChangeEmail}
             value={emailu}
              />
             {errorEmail && <p style={{ color: 'red' ,textAlign:"center"}}>{errorEmail}</p>}         
            </div>  
					
					 <div className="form-group">
             <label for="Categoriar">Clave Usuario</label>
              <input
               type="password"
               className='form-control'
	  				   placeholder="Correo Usuario ..."
		  				 minlength="6"
							 maxlength="20"
               value={clave}
               onChange={manejarClaveUsuario}
               id="passwordField"	
							 required
               />
                {errorclave && <p style={{ color: 'red' ,textAlign:"center"}}>{errorclave}</p>}       
            </div> 
					
            <div className="form-group">
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
           </div>

					<div className="form-group">
            <label className="descripcionr">Subir Imagen</label>
             <input
              type="file"
              className='form-control'
						  onChange={manejarCambioImagen}   accept="image/*"
							required
              />
              {errorImagen && <p style={{ color: 'red' ,textAlign:"center"}}>{errorImagen}</p>}
					 </div> 
       
           <div align="Center">
             <button type='button' 
             className='btn btn-primary mr-2'
             onClick={subirImagen}>
              Guardar</button>
				    	<Link to="/ModuloAdministrador/modulo_usuarios/ModuloUsuario" className='btn btn-primary mr-2'>Regresar</Link>
            </div> 
				  
				  
                 </form>   
				</div>
			  </div>
            </div>
        </div>
	    </div>
      </div>
      </div>   
	  <Footer/>
  
	 </>
  )
 
  
 
  
}

export default Registrar