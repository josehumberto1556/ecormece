import React, { useState, useEffect } from 'react';
import {Link}  from 'react-router-dom'
import { collection, getDocs, query,where } from 'firebase/firestore';
import {app,db} from '../Configfirebase/Configfirebase'
import { useUserAuth } from "../context/UsuarioContext";
import DataTable from 'react-data-table-component'
import NavbarDos from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import Productos from "../productos/Productos"
import Productos2 from "../productos/Productos2"
import Productos3 from "../productos/Productos3"
import ProductoPopular from "../productos/ProductoPopular"
import Footer  from "../piepagina/Footer"
import "./negocio.css"
import "boxicons"


function Compras() {
  
  const [search,setSearch ]=useState([])
	const [empre,setEmpresas ]=useState([])
  const [filtereCountries,setfiltereCountries]=useState([])
  const { user } = useUserAuth();
  let correo=user.email 
     
     const getEmpresas=async()=> 
     {
        const empresaCollection=collection(db,"pago_producto")
        const q=query( empresaCollection,where("correo","==",correo));
        const data=await getDocs(q);
        
        setEmpresas(
          data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
      )
      setfiltereCountries(
          data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
      )
   }
   const columns= [
    
    {
      name:"Productos",
      selector:(row)=>row.nombre_producto
    },
  
    {
      name:"Negocio",
      selector:(row)=>row.nombre_producto
    },
  

    {
      name:"Tipo Operación",
      selector:(row)=>row.tipo_operacion
    },

    
    {
      name:"Foto Producto",
      selector:(row)=>
      <a href={row.imagen} target="_blank">
       <img src={row.imagen} width="100" height="100"/>
      </a>,
      sortable:true
    },
  
    {
      name:"Fecha Pago",
      selector:(row)=>row.fecha_pago
    },
      
    {
      name:"Total Pagado",
      selector:(row)=>row.total
    },
    
    {
    name:"Ver Comprobante",
    cell:(row)=><Link 
    to={`/VerCompra/${row.id}`} 
    className="btn btn-light">Ver</Link>
     }
  
    
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
  <div>
  <NavbarDos/>
   <Navbar1/>
	 
			
			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">

 				<h2 className="text-center">Listado de Compras</h2>
           
        <div className="col-lg-12 col-md-12">  
		        <DataTable 
                  columns={columns} 
                  data={filtereCountries} 
                  fixedHeader 
                  pagination
                  fixedHeaderScrollHeight="450px"
                  selecttablesRow
                  selecttablesRowHighligh
                  highlightOnHover
                  subHeader
                  subHeaderComponent={
                  <input 
				          type="text" 
									placeholder="Fecha ..." 
									className="w25 form-control" 
									value={search}
									onChange={(e)=>setSearch(e.target.value)}/>
									}
                
                  />
        <br/><br/>
        </div>
     
       
			
        </div>
    
		    </div>
		</div>

	 
	 <Footer/>
</div>
  </>
  );
}

export default Compras;
