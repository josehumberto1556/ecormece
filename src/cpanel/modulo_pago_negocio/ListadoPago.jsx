import React,{useState,useEffect}from 'react'
import {Link}      from 'react-router-dom'
import {
         collection,
         getDocs,
		     getDoc,
		     deleteDoc,
		     doc,
         updateDoc} from 'firebase/firestore'
import {app,db} from '../../Configfirebase/Configfirebase'		
import DataTable from 'react-data-table-component'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Header  from '../header'
import Aside   from '../Aside'
import Footer  from '../Footer'

const MySwal = withReactContent(Swal)

function ListadoPago() {
	
  //1.configuramos los hooks
  const [search,setSearch ]=useState([])
  const [empre,setEmpresas ]=useState([])
  const [filtereCountries,setfiltereCountries]=useState([])

  const  empresaCollection=collection(db,"pago_administrador")
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

  const activarpago = async (id) => 
  {
 
    const empresaDoc =await doc(db, "pago_administrador", id)
    const data = { 
                    estado:"Cancelado",
                    mensaje_pago:"Pago cancelado",
                    status:1
                 }
         await updateDoc(empresaDoc, data)
          
   }	 


   
  const pagoPendiente = async (id) => 
  {
   
      const empresaDoc =await doc(db, "pago_administrador", id)
      const data = { 
                      mensaje_pago:"Esta Pendiente Su Pago"
                   }
           await updateDoc(empresaDoc, data)
            
     }


  const activar = (id) => {
    MySwal.fire({
      title: '¿Esta Seguro de Activar este Comprobante de pago?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Activar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        activarpago(id)               
        Swal.fire(
          'Comprobante!',
          'Validado.',
          'Con Exito'
        )
      }
    })    
  }

  const Enviarmensaje = (id) => {
    MySwal.fire({
      title: '¿Esta Seguro de Activar este Comprobante de pago?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Activar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        pagoPendiente(id)               
        Swal.fire(
          'Esta!',
          'Pendienete.',
          'el pago'
        )
      }
    })    
  }

  const columns= [
  
  {
    name:"Correo",
    selector:(row)=>row.correo
  },

  {
    name:"Fecha de pago",
    selector:(row)=>row.fecha_pago
  },

  {
    name:"Estado",
    selector:(row)=>row.estado
  },
    
  {
    name:"Comprabante de pago",
    selector:(row)=>
    <a href={row.foto_pago} target="_blank">
     <img src={row.foto_pago} width="100" height="100"/>
    </a>,
    sortable:true
    },
    
    {
      cell:(row)=><button onClick={ () => { activar(row.id) } } className="btn btn-danger">Activar</button>
    },

    {
      cell:(row)=><button onClick={ () => { Enviarmensaje(row.id) } } className="btn btn-danger">Enviar Mensaje</button>
    }


  
  ]
	
  useEffect( () => {
    getEmpresas()
  }, [] )
  
    useEffect( () => {
    const result=empre.filter((country)=>{
	  return country.nombre_negocio.toLowerCase().match(search.toLowerCase())
	})
	setfiltereCountries(result)
  }, [search] ) 
	
	
  return (
    <>
  <div className="hold-transition sidebar-mini layout-fixed">
	    <Aside/>
	   <div className="main-panel" 
	    style={{marginTop:"150px",marginBottom:"-30px"}}>
		  <div className="row">
		    <div className="col-lg-12 grid-margin stretch-card">
			  <div className="card">
			    <div className="card-body">
				<h4 className="card-title">Listado de Pagos de Usuario</h4>
				<DataTable 
				columns={columns} 
				data={filtereCountries} 
				fixedHeader 
				pagination
				fixedHeaderScrollHeight="450px"
				selecttablesRow
				selecttablesRowHighlight
				actions={<Link to="/ModuloAdministrador/modulo_pago_negocio/Buscarfecha" 
				className='btn btn-secondary mt-2 mb-2'>Buscar por fecha</Link>    }
				highlightOnHover
				subHeader
				subHeaderComponent={<input 
				                    type="text" 
									placeholder="Buscar Ngocio ..." 
									className="w25 form-control" 
									value={search}
									onChange={(e)=>setSearch(e.target.value)}/>
									}
				/>
		          
		       </div>
             		 
		     </div>
		   
		  </div>
		  
	    </div>
		<br/><br/>
	   	 <Footer/>
     </div>
	  
  </div>
  </>
  )
}

export default ListadoPago