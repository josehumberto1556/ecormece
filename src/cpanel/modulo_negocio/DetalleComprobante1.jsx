import React,{useState,useEffect}    from 'react'
import {Link,useParams} from 'react-router-dom'
import { getDoc, updateDoc, doc } from "firebase/firestore"
import {db,app} from '../../Configfirebase/Configfirebase'
import { getStorage,
         ref, 
		 uploadBytes,
		 getDownloadURL,
         deleteObject} from 'firebase/storage'		
import Header  from '../header'
import Aside1   from '../Aside1'
import Footer  from '../Footer'
import './formulario.css'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const storage=getStorage(app)
const MySwal = withReactContent(Swal)



function DetalleComprobante1() {
  const [ nombre_producto,setNombreProducto] = useState('')
  const [ nombre_empresa,setNombreEmpresa] = useState('')
  const [ correo,setCorreo] = useState('')
  const [ cantidad_producto,setCantidad] = useState('')
  const [ fecha,setFecha] = useState('')  
  const [ total,setTotal] = useState('')  
  const [ i,setI ] = useState(null)
  const {id} = useParams()
 

	 const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "imagenes_subidas_comprobante", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setNombreProducto(empresa.data().nombre_producto)    
            setNombreEmpresa(empresa.data().nombre_negocio)    
			setCorreo(empresa.data().correo)
            setCantidad(empresa.data().cantidad_producto)    			
            setFecha(empresa.data().fecha_pago)
			setI(empresa.data().url)
			setTotal(empresa.data().total)
		}else{
            console.log(' no existe')
        }
    }

    useEffect( () => {
        getEmpresaById(id)
        // eslint-disable-next-line
    }, [])
    

    


  return (
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
						Detalle Comprobante</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row'>
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Editar Detalle Empresa </h4><br/>
                 <form className="forms-sample">

				    <div className="form-group">
                <label for="Categoriar">Nombre Productos</label>
                 <input
                  type="text"
                  className='form-control'
			       minlength="3"
				   maxlength="20"
                   disabled
				 	value={nombre_producto}
                    onChange={ (e) => setNombreProducto(e.target.value)}
                  />
                    </div>   

				 <div className="form-group">
                <label for="Categoriar">Nombre Empresas</label>
                 <input
                  type="text"
                  className='form-control'
			       minlength="3"
				   maxlength="20"
                   disabled
				 	value={nombre_empresa}
                    onChange={ (e) => setNombreEmpresa(e.target.value)}
                  />
                    </div>   
                    
				<div className="form-group">
                 <label for="Categoriar">Correo Electronico</label>
                  <input
                    type="text"
                    className='form-control'
			        minlength="3"
				    maxlength="20"
                    disabled
				 	 value={correo}
                     onChange={ (e) => setCorreo(e.target.value)}
                  />
                </div>
				
				
					<div className="form-group">
                    <label for="Categoriar">Cantidad producto</label>
                    <input
                    type="text"
                    className='form-control'
			        minlength="3"
				    maxlength="20"
                    disabled
				 	value={cantidad_producto}
                    onChange={ (e) => setCantidad(e.target.value)}
                   />
                    </div>
				
				    <div className="form-group">
                    <label for="Categoriar">Fecha Pago</label>
                    <input
                    type="text"
                    className='form-control'
			        minlength="3"
				    maxlength="20"
                    disabled
				 	value={fecha}
                    onChange={ (e) => setFecha(e.target.value)}
                   />
                    </div>	
					
                    <div className="form-group">
                        <label for="Categoriar">Foto</label>
                        <img
				        src={i}
						width="100"  height="100"
                        />
                    </div> 
			
			       <div className="form-group">
                    <label for="Categoriar">Total Pagodo</label>
                    <input
                    type="text"
                    className='form-control'
			        minlength="3"
				    maxlength="20"
                    disabled
				 	value={total}
                    onChange={ (e) => setTotal(e.target.value)}
                   />
                    </div>
					 <div align="Center">
          				<Link to="/ModuloAdministrador/PagosDeNegocios"
						className='btn btn-primary mr-2'>Regresar</Link>
                    </div> 
				  
                 </form>   
				</div>
			  </div>
            </div>
        </div>
	    </div>
	 	 <div style={{marginTop:"300px"}}> <Footer/></div>
 </div>
    </div> 
  )
 
  
 
  
}

export default DetalleComprobante1


