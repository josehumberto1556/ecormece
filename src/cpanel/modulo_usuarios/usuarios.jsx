import React,{useState,useEffect}from 'react'
import {Link}      from 'react-router-dom'
import {collection,
        getDocs,
		    getDoc,
		   deleteDoc,
		   doc,
      updateDoc} from 'firebase/firestore'
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { deleteUser } from 'firebase/auth';
import {app,db,auth} from '../../Configfirebase/Configfirebase'		
import DataTable from 'react-data-table-component'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Aside   from '../Aside'
import Footer  from '../Footer'

const MySwal = withReactContent(Swal)

function Usuarios() {
	
  ///1.configuramos los hooks
  const [search,setSearch ]=useState([])
  const [empre,setEmpresas ]=useState([])
  const [filtereCountries,setfiltereCountries]=useState([])

  const  empresaCollection=collection(db,"usuarios")
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

  const deleteempresa = async (id) => 
  {
	  
    if(!id)
    {
      console.log("el id del usuario no existe")
    }//fin del if id
   
    const empresa=doc(db, "usuarios", id)
    const data = { estado:"Inabilitado"}
    await updateDoc(empresa, data)
    getEmpresas()
		
  }	 

  const activar = async (id) => 
  {
	  
    if(!id)
    {
      console.log("el id del usuario no existe")
    }//fin del if id
   
    const empresa=doc(db, "usuarios", id)
    const data = { estado:"Haabilitado"}
    await updateDoc(empresa, data)
    getEmpresas()
		
  }	 

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Esta Seguro de Inabilitar este Registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Habilitar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteempresa(id)               
        Swal.fire(
          'Inabilitando',
          'Usuario Inabilitado.',
          'Con Exito'
        )
      }
    })    
  }
  
 const confirmActivar = (id) => {
    MySwal.fire({
      title: '¿Esta Seguro de Activar este Usuario?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Inabilitar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        activar(id)               
        Swal.fire(
          'Habilitando',
          'Usuario Habilitado.',
          'Con Exito'
        )
      }
    })    
  }

  const columns= [
  
  {
	name:"Nombre Usuario",
	selector:(row)=>row.nombre_usuario
  },
  
  {
	name:"Correo electronico",
	selector:(row)=>row.email_usuario
  },
  

  
   
  {
	name:"Imagen",
	selector:(row)=><img src={row.imagen} width="100" height="100"/>,
	sortable:true
  },
  
  {
	name:"Estado Usuario",
	selector:(row)=>row.estado
  },
  
  {
	name:"Modificar",
	cell:(row)=><Link 
	to={`/ModuloAdministrador/modulo_usuarios/EditarUsuarios/${row.id}`} 
	className="btn btn-light">Editar</Link>
  },
   {
	 name:"Inabilitar",
     cell:(row)=><button onClick={ () => { confirmDelete(row.id)} } className="btn btn-danger">Habilitar</button>

   },

  {
	   name:"Activar",
     cell:(row)=><button onClick={ () => { confirmActivar(row.id)} } className="btn btn-danger">Inabilitar</button>

   }
  
  ]
	
  useEffect( () => {
    getEmpresas()
  }, [] )
  
  useEffect( () => {
     const result=empre.filter((country)=>{
    return country.nombre_usuario.substring(0, 20).toLowerCase().match(search.toLowerCase())
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
				<h4 className="card-title">Listado de Usuarios</h4>
				<DataTable 
				columns={columns} 
				data={filtereCountries} 
				fixedHeader 
				pagination
				fixedHeaderScrollHeight="450px"
				selecttablesRow
				selecttablesRowHighlight
				actions={<Link to="/ModuloAdministrador/modulo_usuarios/RegistrarUsuarios" 
				className='btn btn-secondary mt-2 mb-2'>Nuevo Registros</Link>    }
				highlightOnHover
				subHeader
				subHeaderComponent={<input 
                            type="text" 
                            placeholder="Buscar Usuario ..." 
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

export default Usuarios