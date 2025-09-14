import React,{useState,useEffect}from 'react'
import {Link}      from 'react-router-dom'
import {collection,
        getDocs,
		getDoc,
		deleteDoc,
		doc} from 'firebase/firestore'
import { getStorage,deleteObject,ref} from 'firebase/storage'
import {app,db} from '../../Configfirebase/Configfirebase'		
import DataTable from 'react-data-table-component'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'

const MySwal = withReactContent(Swal)


function ListadoN() {
	
  const [search,setSearch ]=useState([])
  const [empre,setEmpresas ]=useState([])
  const [filtereCountries,setfiltereCountries]=useState([])
  const storage=getStorage(app)
  const  empresaCollection=collection(db,"novedades")
  const getEmpresas=async ()   => {
  const data=await getDocs(empresaCollection)
   //console.log(data.docs)
   setEmpresas(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   setfiltereCountries(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
     }

  const deleteempresa = async (id,imagen) => {
   const imageRef = ref(storage, imagen);
   const eli=await deleteObject(imageRef);
   const empresaDoc = doc(db, "novedades", id)
   await deleteDoc(empresaDoc)
    getEmpresas()
  }	 
  const confirmDelete = (id,imagen) => {
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
        deleteempresa(id,imagen)               
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
	name:"Nombre Novedades",
	selector:(row)=>row.nombre_novedades.substring(0, 20)
  },
  
    
  {
	name:"Fecha",
	selector:(row)=>row.fecha
  },
  
  {
	name:"Descripcion",
	selector:(row)=>row.descripcion.substring(0, 20)
  },
  
  {
	name:"Video",
	selector:(row)=>row.video
  },
  
  
  {
	name:"Imagen",
	selector:(row)=><img src={row.imagen} width="100" height="100"/>,
	sortable:true
  },
  
  {
	name:"Modificar",
	cell:(row)=><Link 
	to={`/ModuloAdministrador/modulo_novedades/EditarNovedades/${row.id}`} 
	className="btn btn-light">Editar</Link>
  },
   {
	 name:"Eliminar",
     cell:(row)=><button onClick={ () => { confirmDelete(row.id,row.imagen) } } className="btn btn-danger">Eliminar</button>

   }
  
  ]
	
  useEffect( () => {
    getEmpresas()
  }, [] )
  
      useEffect( () => {
    const result=empre.filter((country)=>{
	  return country.nombre_novedades.substring(0, 20).toLowerCase().match(search.toLowerCase())
	})
	setfiltereCountries(result)
  }, [search] ) 
	
	 
	
	
  return (
    <>
	<Aside/>
  <div className="hold-transition sidebar-mini layout-fixed"
   style={{marginTop:"150px",marginBottom:"-30px"}}>
      <div className="main-panel"> 
		  <div className="row">
		    <div className="col-lg-12 grid-margin stretch-card">
			  <div className="card">
			    <div className="card-body">
				<h4 className="card-title">Listado de Novedades</h4>
				<DataTable 
				columns={columns} 
				data={filtereCountries} 
				fixedHeader 
				pagination
				fixedHeaderScrollHeight="450px"
				selecttablesRow
				selecttablesRowHighlight
				actions={<Link to="/ModuloAdministrador/modulo_novedades/RegistraNovedades" 
				className='btn btn-secondary mt-2 mb-2'>Nuevo Registro</Link>    }
				highlightOnHover
				subHeader
				subHeaderComponent={<input 
				                    type="text" 
									placeholder="Buscar Novedades ..." 
									className="w25 form-control" 
									value={search}
									onChange={(e)=>setSearch(e.target.value)}/>
									}
				/>
		          
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

export default ListadoN