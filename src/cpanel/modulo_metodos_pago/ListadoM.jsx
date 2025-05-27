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
import Aside1  from '../Aside1'
import Footer  from '../Footer'

const MySwal = withReactContent(Swal)

function ListadoM() {
	
  //1.configuramos los hooks
  const [search,setSearch ]=useState([])
  const [empre,setEmpresas ]=useState([])
  const [filtereCountries,setfiltereCountries]=useState([])
  const  empresaCollection=collection(db,"metodo_pago")
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
     const deleteempresa = async (id) => {
      const empresaDoc = doc(db, "metodo_pago", id)
      await deleteDoc(empresaDoc)
       getEmpresas()
     }	 

  const eliminar = (id) => {
    MySwal.fire({
      title: '¿Esta Seguro de Eliminar Registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Activar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteempresa(id)               
        Swal.fire(
          'Registro!',
          'Eliminado.',
          'Con Exito'
        )
      }
    })    
  }
  const columns= [
  
  {
    name:"Metodo",
    selector:(row)=>row.nombre_metodo
  },

  {
    name:"Descripción",
    selector:(row)=>row.metodo1
    },

  
    
    {
      cell:(row)=><button onClick={ () => { eliminar(row.id) } } className="btn btn-danger">Eliminar</button>
    }

  
  ]
   useEffect( () => {
      getEmpresas()
    }, [] )

  	 useEffect( () => {
        const result=empre.filter((country)=>{
        return country.nombre_metodo.toLowerCase().match(search.toLowerCase())
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
				<h4 className="card-title">Listado de Metodo de Pago</h4>
				
        <DataTable 
                columns={columns} 
                data={filtereCountries} 
                fixedHeader 
                pagination
                fixedHeaderScrollHeight="450px"
                selecttablesRow
                selecttablesRowHighlight
                actions={<Link to="/ModuloAdministrador/RegistrarMetodoPago" 
                className='btn btn-secondary mt-2 mb-2'>Registro</Link>    }
                highlightOnHover
                subHeader
                subHeaderComponent={<input 
                                    type="text" 
                                     placeholder="Buscar Metodo pago ..." 
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
export default ListadoM