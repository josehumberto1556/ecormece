import React,{useState,useEffect}from 'react'
import {Link}      from 'react-router-dom'
import {collection,
        getDocs,
		getDoc,
		deleteDoc,
		doc} from 'firebase/firestore'
    import { ref, deleteObject,getStorage, } from 'firebase/storage';
import {app,db} from '../../Configfirebase/Configfirebase'		
import DataTable from 'react-data-table-component'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Aside   from '../Aside'
import Footer  from '../Footer'

const MySwal = withReactContent(Swal)
const storage=getStorage(app)
function ListadoPr() {
	
  ///1.configuramos los hooks
  const [search,setSearch ]=useState([])
  const [empre,setEmpresas ]=useState([])
  const [empre1,setEmpresas1 ]=useState([])
  const [filtereCountries,setfiltereCountries]=useState([])
  const  empresaCollection=collection(db,"m_productos")
  const getEmpresas=async ()   => {
  const data=await getDocs(empresaCollection)
   //console.log(data.docs)
   setEmpresas(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   setEmpresas1(
    data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
)
   setfiltereCountries(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
     }

  const deleteempresa = async (id,imageurl) => {
  const empresaDoc = doc(db, "m_productos", id)
  const ima=`${imageurl}`
  const imageRef = ref(storage,ima);
 //Eiminar el archivo
 await deleteDoc(empresaDoc)
 await deleteObject(imageRef);

    getEmpresas()
  }	 
  const confirmDelete = (id,imageurl) => {
    MySwal.fire({
      title: '¿Esta Seguro de Eliminar esta Registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteempresa(id,imageurl)               
        Swal.fire(
          'Eliminado!',
          'Registro Eliminado.',
          'Con Exito'
        )
      }
    })    
  }
  
  const columns= [
  
  {
	name:"Nombre producto",
	selector:(row)=>row.nombre_productos
  },
  
  {
	name:"Descripción",
	selector:(row)=>row.descripcion
  },
  
  {
	name:"Cantidad",
	selector:(row)=>row.cantidad
  },
  
  {
	name:"Precio",
	selector:(row)=>row.precio
	
  },
  
  {
	name:"Categoria",
	selector:(row)=>row.categoria
	
  },
   
  {
	name:"Imagen",
	selector:(row)=><img src={row.imagenq} width="100" height="100"/>,
	sortable:true
  },
  
  {
	name:"Agregar Imagenes",
	cell:(row)=><Link 
	to={`/ModuloAdministrador/Productos/AgregarImagenes/${row.id}`} 
	className="btn btn-light">Agregar Imagenes</Link>
  },
  
    
  {
	name:"Ver Imagenes",
	cell:(row)=><Link 
	to={`/ModuloAdministrador/Productos/VerImagenes/${row.id}`} 
	className="btn btn-light">Ver Imagenes</Link>
  },
  
  {
	name:"Modificar",
	cell:(row)=><Link 
	to={`/ModuloAdministrador/Productos/EditarProductos/${row.id}`} 
	className="btn btn-light">Editar</Link>
  },
   {
	 name:"Eliminar",
     cell:(row)=><button onClick={ () => { confirmDelete(row.id,row.imagenq)} } className="btn btn-danger">Eliminar</button>

   },
    {
	 name:"Actualizar Stock",
   cell:(row)=><Link 
   to={`/ModuloAdministrador/Productos/Actualizarproductos/${row.id}`} 
   className="btn btn-danger">Actualizar Stock</Link>

   }
  
  ]
	
  useEffect( () => {
    getEmpresas()
  }, [] )
  
   useEffect( () => {
    const result=empre.filter((country)=>{
	  return country.nombre_productos.substring(0, 20).toLowerCase().match(search.toLowerCase())
	})
	setfiltereCountries(result)
  }, [search] ) 
	
  
    
	
	
  return (
    <>
	
	    <Aside/>
  <div 
 className="hold-transition sidebar-mini layout-fixed"
   style={{marginTop:"150px",marginBottom:"-30px"}}>
      
		  <div className="row">
		    <div className="col-lg-12 grid-margin stretch-card">
			  <div className="card">
			    <div className="card-body">
				<h4 className="card-title">Listado de  Productos</h4>
				  {empre1.map(pro=>(
             pro.cantidad==0 
             ? 
                 
              <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                 <strong>Advertencia!</strong> No Tienes stock el producto {pro.nombre_productos}
                 <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
                      
             :
             pro.cantidad<=5
             ?
             <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
             <strong>Advertencia!</strong> Que dan pocos productos {pro.nombre_productos} en el stock
             <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
                  
             :<p></p>

          ))}
            <DataTable 
				columns={columns} 
				data={filtereCountries} 
				fixedHeader 
				pagination
				fixedHeaderScrollHeight="450px"
				selecttablesRow
				selecttablesRowHighlight
				actions={<Link to="/ModuloAdministrador/Productos/RegistarProductos" 
				className='btn btn-secondary mt-2 mb-2'>Nuevo Registro</Link>    }
				highlightOnHover
				subHeader
				subHeaderComponent={<input 
				                    type="text" 
									placeholder="Buscar Producto ..." 
									className="w25 form-control" 
									value={search}
									onChange={(e)=>setSearch(e.target.value)}/>
									}
				/>
		          
		       </div>
              </div>		 
		     
		  <Footer/>
	    </div>
	   	 
     </div>
	  
  </div>
  </>
  )
}

export default ListadoPr


