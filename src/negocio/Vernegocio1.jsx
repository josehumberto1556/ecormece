import NavbarDos  from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import React,{useContext,useState,useEffect}from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import { collection,query,where,getDocs } from 'firebase/firestore'; 
import {link,useParams} from 'react-router-dom'
import { CarritoContext } from "../context/CarritoContext"
import { Detallesnegocio1} from "./Detallesnegocio1"
import "boxicons"



export const Vernegocio1=()=> {
	const {nombre} = useParams()
	let categoria= decodeURIComponent(nombre);
   	const [empre,setEmpresas ]=useState([])
	const [searchTerm, setSearchTerm] = useState('');
     
    const getEmpresas=async() =>
    {
       if(categoria)
	   { 
         const col= collection(db,'m_productos');
		 const q=query(col,where("nombre_negocio","==",categoria));
		 const datos=await getDocs(q);
  
	 	 //data.forEach(user=>{console.log(user.data())})
		setEmpresas(datos.docs.map((doc => ({ ...doc.data(), id: doc.id }))))				   
	    
		}
         
     }
	 
 	 useEffect( () => {
         getEmpresas()
    }, [] )
	
	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
		
	  };
	
	  const filteredData = empre.filter((item) =>
		item.nombre_productos.toLowerCase().includes(searchTerm.toLowerCase())
	  );

	  const { agregarCompra, eliminarCompra } = useContext(CarritoContext)

	  const handleAgregar = (compra) =>{
		agregarCompra(compra)
	  }
	  const handleQuitar = (id) =>{
		eliminarCompra(id)
	  }

  return (
  <>
   <NavbarDos/>
   <Navbar1/>
   			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">

 				<h2 className="text-center">Listado de Productos {categoria}</h2>
			   
			    <div className="clo-lg-12 col-md-12">  
		         <form>
		          <input type="text" 
		          	          	           placeholder="Buscar  Producto ..." 
		           className="form-control"
		           reuired/>
                  </form>
				</div>

				 {
					empre.map(productos=>(
					
							
						<Detallesnegocio1
					     key={productos.id}
					     id={productos.id}
					     title={productos.nombre_productos}
					     price={productos.precio}
					     image={productos.imagenq}
						 handleAgregar={() => handleAgregar(productos)}
						 handleQuitar={() => handleQuitar(productos.id)}
					   />
					   ))
                    
				}
				</div>
		    </div>
		</div>

	 
	 <Footer/>
  </>
  );
}


