import React,{useState,useEffect}    from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import {db,app} from '../../Configfirebase/Configfirebase'
import { getStorage,
         ref, 
         uploadBytes,
         getDownloadURL, 
		 StorageError} from 'firebase/storage'		
import Header  from '../header'
import Aside1  from '../Aside1'
import Footer  from '../Footer'
import './formulario.css'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const  Buscarfecha1=()=> {


	const [fechaBusqueda, setFechaBusqueda] = useState('');
	const [resultados, setResultados] = useState([]);
    const [errores, setErrores] = useState("");
	const buscarPorFecha = async () => {
	  try {
        

		if(fechaBusqueda)
		{	
	         console.log("fecha busqueda",fechaBusqueda)
             const col= collection(db,'pago_producto');
			 const q=query(col,where("fecha_pago","==",fechaBusqueda));
			 const datos=await getDocs(q);
             if(datos){
			 console.log("Documentos encontrados:", datos.docs);
			 setResultados(datos.docs.map((doc => ({ ...doc.data(), id: doc.id }))));
			 console.log("exito")
			 }
			 else
			 {
				setErrores("No existe comprobante la fecha que introdujo no es correcta")	
			 }
		}
		else
		{
			setErrores("No existe comprobante")
		}	 

	} catch (error) {
		console.error('Error al buscar por fecha:', error);
	  }
	};

  return (
    <>
      <div className="hold-transition sidebar-mini layout-fixed">
		 <div className="wrapper">
	   <Aside1/>
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
						<a href="javascript:void(0);">
						Buscar por fecha</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
				  <div className="container mt-4">
      <div className="mb-3">
        <label htmlFor="fechaBusqueda" className="form-label">
          Buscar por fecha:
        </label>
        <input
          type="date"
          className="form-control"
          id="fechaBusqueda"
          value={fechaBusqueda}
          onChange={(e) => setFechaBusqueda(e.target.value)}
		  required
        />
      </div>
	  {errores &&     
        <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
           <strong>Error!</strong> {errores}
               <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
                   }
      <center>
	  <button className="btn btn-primary" onClick={buscarPorFecha}>
        Buscar
      </button>
	 </center>
        {resultados.map((resultado) => (
		 
		 <center>
		 <p key={resultado.id}>
			<b>{resultado.nombre_negocio}</b><br/>
            <img src={resultado.imagen} width="200" height="200"/>
		  </p>
		</center>
		))}
					  </div>
</div>	

</div>
         <div style={{marginTop:"600px"}}> <Footer/></div>
 </div>
    </div> 
</div>
    </>
  )
}


