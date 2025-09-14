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
import Aside1  from '../Aside1'
import Footer  from '../Footer'

const MySwal = withReactContent(Swal)

function ListadoNeg1() {
	
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

  const activarpago = async (id) => 
  {
 
    const empresaDoc =await doc(db, "pago_producto", id)
    const data = { 
                    estado:"activo"
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
  const columns= [
  
  {
    name:"Nombre negocio",
    selector:(row)=>row.nombre_negocio
  },

  {
    name:"Nombre Productos",
    selector:(row)=>row.nombre_producto
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
	  to={`/ModuloAdministrador/modulo_pago_negocio/DetalleComprobantes/${row.id}`} 
	  className="btn btn-light">Detalle Comprobante</Link>
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
	    <Aside1/>
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

export default ListadoNeg1