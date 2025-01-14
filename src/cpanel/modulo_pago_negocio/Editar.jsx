import React,{useState,useEffect}    from 'react'
import {Link,useParams} from 'react-router-dom'
import { getDoc, updateDoc, doc } from "firebase/firestore"
import {db,app} from '../../Configfirebase/Configfirebase'
import { getStorage,
         ref, 
		 uploadBytes,
		 getDownloadURL } from 'firebase/storage'		
import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'
import './formulario.css'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const storage=getStorage(app)
const MySwal = withReactContent(Swal)



function EditarP() {
  const [ codigo_empresa,setcodigoempresa ] = useState('')
  const [ nombre_empresa,setNombreempresa ] = useState('')
  const [ i,setI ] = useState(null)
   
    const {id} = useParams()



	 const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "categoria", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setcodigoempresa(empresa.data().nombre_categoria)    
            setNombreempresa(empresa.data().imagenq)    
        }else{
            console.log(' no existe')
        }
    }

    useEffect( () => {
        getEmpresaById(id)
        // eslint-disable-next-line
    }, [])
    

    let urlDescarga

    async function subirArchivo(e)
    {
      //detectar archivo
       const archivoLocal=e.target.files[0]
      setI(archivoLocal);
    }

    const update = async (e) => {
      e.preventDefault()
  if(!i)
  {
    
    
    const empresa = doc(db, "categoria", id)
    const data = {nombre_categoria:codigo_empresa}
    await updateDoc(empresa, data)
        MySwal.fire({
                         title: "Felicitaciones!",
                         text: "Registro Modificado con exito!",
                         icon: "danger",
                         button: "Felicitaciones!"
            });
  }
  else{
    const empresa = doc(db, "categoria", id)	
    const n=i	  
    const archivoRef=ref(storage,`categoria/${n.name}`)
    const uplo=await uploadBytes(archivoRef,n)
    urlDescarga=await getDownloadURL(archivoRef)   
  
  const data = { 
                    nombre_categoria:codigo_empresa,
                    imagenq:urlDescarga
              }
      await updateDoc(empresa, data)
       MySwal.fire({
                         title: "Felicitaciones!",
                         text: "Registro mpdificado con exito!",
                         icon: "danger",
                         button: "Felicitaciones!"
            });		
  }
  }
   


  return (
   <div className="hold-transition sidebar-mini layout-fixed">
		 <div className="wrapper">
	   <Aside/>
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
						Editar Categoria</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row' id="mover"  style={{marginBottom:"-80px"}}>
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Editar Categoria {codigo_empresa}</h4><br/>
                 <form className="forms-sample" onSubmit={update}>

				    <div className="form-group">
                <label for="Categoriar">Nombre Categoria</label>
                 <input
                  type="text"
                  className='form-control'
						      placeholder="Nombre  Categoria ..."
							    minlength="3"
							    maxlength="20"
                  required
						    	value={codigo_empresa}
                  onChange={ (e) => setcodigoempresa(e.target.value)}
                  />
                    </div>                  
                    
                    <div className="form-group">
                        <label for="Categoriar">Foto Categoria</label>
                        <img
						             src={nombre_empresa}
						             width="100"  height="100"
                        />
                    </div> 
				 

                    <div className="form-group">
                        <label for="Categoriar">Subir Imagen</label>
                        <input
                            type="file"
                            className='form-control'
                            onChange={subirArchivo} 
                        />
                    </div>
			     

				 {/*<div className="form-group">
                        <label for="Categoriar">Foto Provincia</label>
                        <img
						src={nombre_empresa}
						width="100"  height="100"
                        />
                    </div> 
				 
				 <div className="form-group">
                        <label for="Categoriar">Bandera</label>
                        <input
                            type="file"
                            className='form-control'
                            onChange={subirArchivo} 
                        />
                    </div> */ }
					
					 <div align="Center">
                    <button type='submit' className='btn btn-primary mr-2'>Guardar</button>
					<Link to="/ModuloAdministrador/modulo_categorias/ModuloCategorias" className='btn btn-primary mr-2'>Regresar</Link>
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

export default EditarP