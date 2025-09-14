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

function ListadoNeg() {
	
  //1.configuramos los hooks
  const [search,setSearch ]=useState([])
  const [empre,setEmpresas ]=useState([])
  const [filtereCountries,setfiltereCountries]=useState([])

  const  empresaCollection=collection(db,"imagenes_subidas_comprobante")
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

   	 
  const columns= [
  
  {
    name:"Nombre negocio",
    selector:(row)=>row.nombre_negocio
  },
  
  {
    name:"Venta negocio",
    selector:(row)=>row.venta
  },
  
  
  {
    name:"Correo",
    selector:(row)=>row.correo
  },
	
	{
    name:"Compra al negocio",
    selector:(row)=>row.tipo_operacion
  },
  {
    name:"Nombre Productos",
    selector:(row)=>row.nombre_producto
    },

  {
    name:"Fecha de pago",
    selector:(row)=>row.fecha_pago
  },

   {
    name:"Comprabante de pago negocio",
    selector:(row)=>
    <a href={row.url} target="_blank">
      <img src={row.url} width="100" height="100"/>
    </a>,
    sortable:true
    },
	
	{
	  name:"Ver Detalle comprobante",
	  cell:(row)=><Link 
	  to={`/ModuloAdministrador/modulo_pago_negocio/DetalleComprobante/${row.id}`} 
	  className="btn btn-light">Detalle Comprobante</Link>
    }
	
  ]
	
  useEffect( () => {
    getEmpresas()
  }, [] )
  
    useEffect( () => {
    const result=empre.filter((country)=>{
	  return country.correo.toLowerCase().match(search.toLowerCase())
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
				<h4 className="card-title">Listado de Pagos de negocio</h4>
				<DataTable 
				columns={columns} 
				data={filtereCountries} 
				fixedHeader 
				pagination
				fixedHeaderScrollHeight="450px"
				selecttablesRow
				selecttablesRowHighlight
				//actions={<Link to="/ModuloAdministrador/modulo_pago_negocio/Buscarfecha" 
				//className='btn btn-secondary mt-2 mb-2'>Buscar por fecha</Link>    }
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

export default ListadoNeg