import React,{useState,useEffect}from 'react'
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

function AgregarImagenes() {
	
  const [ nombre_novedades,setcodigoempresa ] = useState('')
  const [ progress,setProgress ] = useState('')	
  const [ imagen,setImagen ] = useState('')	
  const [ i,setI ] = useState([])
  const [ i1,setI1 ] = useState([])
  const [ i2,setI2 ] = useState([])
  const [ i3,setI3 ] = useState([])
  const [images,setImages]= useState([])
    const {id} = useParams()
    
	const getEmpresaById = async (id) => {
        const empresa = await getDoc( doc(db, "m_productos", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setcodigoempresa(empresa.data().nombre_productos)    
            setImagen(empresa.data().imagenq)
		}else{
            console.log('El  no existe')
        }
    }

    useEffect( () => {
        getEmpresaById(id)
        // eslint-disable-next-line
    }, [])
  
	
	 let urlDescarga
	 let urlDescarga1
	 let urlDescarga2
	 let urlDescarga3

	 
	 
  async function subirArchivo(e)
   {
	  
	   const archivoLocal=e.target.files[0]
	   setI(archivoLocal);
   }
   
   async function subirArchivo2(e)
   {
	  
	   const archivoLocal=e.target.files[0]
	   setI1(archivoLocal);
   }

   async function subirArchivo3(e)
   {
	  
	   const archivoLocal=e.target.files[0]
	   setI2(archivoLocal);
   }
   
   async function subirArchivo4(e)
   {
	  
	   const archivoLocal=e.target.files[0]
	   setI3(archivoLocal);
   }

	
    const update = async (e) => {
        e.preventDefault()
	    const empresa = doc(db, "m_productos", id)	
		const n=i	
        const n1=i1	
        const n2=i2	
        const n3=i3			
	   
	    const archivoRef=ref(storage,`m_producto/${n.name}`)
	    const uplo=await uploadBytes(archivoRef,n)
	    urlDescarga=await getDownloadURL(archivoRef)   
		
		const archivoRef1=ref(storage,`m_producto/${n1.name}`)
	    const uplo1=await uploadBytes(archivoRef1,n1)
	    urlDescarga1=await getDownloadURL(archivoRef1)   
		
		const archivoRef2=ref(storage,`m_producto/${n2.name}`)
	    const uplo2=await uploadBytes(archivoRef2,n2)
	    urlDescarga2=await getDownloadURL(archivoRef2)   
		
		const archivoRef3=ref(storage,`m_producto/${n3.name}`)
	    const uplo3=await uploadBytes(archivoRef3,n3)
	    urlDescarga3=await getDownloadURL(archivoRef3)   
		
		
		
		const data = { 
					    imagen:urlDescarga,
						imagen1:urlDescarga1,
						imagen2:urlDescarga2,
						imagen3:urlDescarga3
					}
        await updateDoc(empresa, data)
         MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Registro mpdificado con exito!",
                           icon: "danger",
                           button: "Felicitaciones!"
					    });		
		
		
	}//fin del update	
  
  return (
       <div className="hold-transition sidebar-mini layout-fixed">
		 <Aside/>
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
						<a href="javascript:void(0);">Agregar Imagenes de Producto</a></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
</div>	
        <div className='row'id="mover"  style={{marginBottom:"-80px"}} >
            <div className='col-md-8 grid-margin stretch-card'>
             <div className="card">
			  <div className="card-body">
			   <h4 className="text-center">Agregar Imagenes de Producto {nombre_novedades}</h4><br/>
                 <form className="forms-sample" onSubmit={update}>

				 <div className="form-group">
                        <label for="Categoriar">Nombre Producto</label>
                        <textarea
                            
                            className='form-control'
						    placeholder="Nombre Producto ..."
                            required
							value={nombre_novedades}
                            onChange={ (e) => setcodigoempresa(e.target.value)}
							 cols="30" 				  
				            rows="5" 
							disabled
                        />
                    </div>                  
				 
				
			
						 <div className="form-group">
                          <label for="Categoriar">Imagen</label>
                           <img src={imagen} width="100"  height="100"/>
                          </div> 
					
					 <div className="form-group">
                        <label for="Categoriar">Subir Imagen 1</label>
                        <input
                            type="file"
                            className='form-control'
                            onChange={subirArchivo}
                            required							 
                        />
                    </div>
					
					 <div className="form-group">
                        <label for="Categoriar">Subir Imagen 2</label>
                        <input
                            type="file"
                            className='form-control'
                            onChange={subirArchivo2}
							required
                            							
                        />
                    </div>
					
					 <div className="form-group">
                        <label for="Categoriar">Subir Imagen 3</label>
                        <input
                            type="file"
                            className='form-control'
                            onChange={subirArchivo3}
							required
                            							
                        />
                    </div>
					
					 <div className="form-group">
                        <label for="Categoriar">Subir Imagen 4</label>
                        <input
                            type="file"
                            className='form-control'
                            onChange={subirArchivo4}
                            required							
                        />
                    </div>
					
                     <div align="Center">
                    <button type='submit' className='btn btn-primary mr-2'>Guardar</button>
					<Link to="/ModuloAdministrador/Productos" className='btn btn-primary mr-2'>Regresar</Link>
                </div> 
				  
				  
                 </form>   
				</div>
			  </div>
            </div>
        </div>
	   
     </div>
	  <Footer/>
 </div>
    </div> 
  )
 
  
 
  
}

export default AgregarImagenes





