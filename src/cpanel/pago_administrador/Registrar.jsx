import React,{useState,useEffect}from 'react'
import { collection, addDoc,getDocs } from 'firebase/firestore'
import {db,app} from '../../Configfirebase/Configfirebase'	
import Header   from '../header'
import Aside1   from '../Aside1'
import Footer   from '../Footer'
import  './formulario.css'
import { RegistroHook } from './RegistroHook';
import { Link } from "react-router-dom"




function RegistrarPago() {
	const {
         
         errorImagen,
         manejarCambioImagen,
         subirImagen}=RegistroHook()
  
  const [nombresProductos, setNombresProductos] = useState(''); 
   
  const fetchProductos = async () => 
  {

        try 
        {
          const productosCollectionRef = collection(db, 'metodo_pago_administrador');
          const querySnapshot = await getDocs(productosCollectionRef);
  
          const nombres = querySnapshot.docs.map(doc => {
            // Extraemos solo el campo 'nombre'
            return doc.data().metodo;
          });
  
          // Unimos todos los nombres con un salto de línea para mostrarlos en el textarea
          setNombresProductos(nombres.join('\n'));
        
        } catch (err) {
          console.error("Error al obtener los productos: ", err);
        
        }
      
    }

  useEffect(() => {
    fetchProductos();
  }, []); 

   


  return (
  <>
  <Aside1/>
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
						<a href="javascript:void(0);">Registro Pago</a></li>
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
			   <h4 className="text-center">Registro Pago</h4><br/>
         <form className="forms-sample">

			   <div className="form-group">
            <label className="descripcionr">Datos pago administrador</label>
                {nombresProductos ? (
               <textarea
                className='form-control'
                value={nombresProductos}
                cols="30" 				  
                rows="5" 
                disabled
                />
               ) : (
        <p>No hay productos disponibles.</p>
      )}
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
				    	<Link to="/ModuloAdministrador/PagosAdministrador" className='btn btn-primary mr-2'>Regresar</Link>
            </div> 
				  
				  
                 </form>   
				</div>
			  </div>
            </div>
        </div>
	    </div>
      </div>
      </div>  
     
  
	 </>
  )
 
  
 
  
}

export default RegistrarPago