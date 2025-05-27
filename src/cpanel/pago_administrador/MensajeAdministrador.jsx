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

function MensajeAdministrador() {
    
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

  const Inabilitar = async (id) => 
  {
 
    const empresaDoc =await doc(db, "pago_administrador", id)
    const data = { 
                    status:0
                 }
         await updateDoc(empresaDoc, data)
          
   }	 

  const eliminarR = (id) => {
    MySwal.fire({
      title: '¿Esta Seguro de eliminar este registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Activar'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
       Inabilitar(id)               
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
    name:"Fecha Pago",
    selector:(row)=>row.fecha_pago
  },

  {
    name:"Estado",
    selector:(row)=>row.estado
  },

  {
    name:"Mensaje",
    selector:(row)=>row.mensaje_pago
  },

  {
    name:"Comprabante de Pago",
    selector:(row)=>
    <a href={row.foto_pago} target="_blank">
      <img src={row.foto_pago} width="100" height="100"/>
    </a>,
    sortable:true
    },


    
  ]
    
  useEffect( () => {
    getEmpresas()
  }, [] )
  
    useEffect( () => {
    const result=empre.filter((country)=>{
      return country.fecha_pago.toLowerCase().match(search.toLowerCase())
     
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
                <h4 className="card-title">Mensaje Administrador</h4>
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
                                              placeholder="Buscar Fecha ..." 
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

export default MensajeAdministrador