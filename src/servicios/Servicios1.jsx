import {Link}  from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {collection,
        getDocs
		} from 'firebase/firestore'
import {app,db} from '../Configfirebase/Configfirebase'
import NavbarDos from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import ProductoPopular from "../productos/ProductoPopular"
import Footer  from "../piepagina/Footer"
import "./Servicios.css"

function Servicios1() {
	
	
	
  const [searchTerm, setSearchTerm] = useState('');
  const [empre,setEmpresas ]=useState([])
  const  empresaCollection=collection(db,"ofertaempleo")
  const getEmpresas=async ()   => {
  const data=await getDocs(empresaCollection)
   //console.log(data.docs)
   setEmpresas(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   
     }
	
	  useEffect( () => {
    getEmpresas()
  }, [] )
  

  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
	//console.log(empre.nombre_provincia)
  };

  const filteredData = empre.filter((item) =>
    item.nombreempleo.toLowerCase().includes(searchTerm.toLowerCase())
  );

	
  return (
  <>
  <NavbarDos/>
   <Navbar1/>
			

	<div className="row justify-content-center">
    <div className="col-md-6 p-4">
        <h1 className="text-center">Oferta de Empelo</h1>
        <form className="d-flex flex-column align-items-center">
            <input 
                type="text"  
                value={searchTerm}  
                onChange={handleSearch}
                placeholder="Oferta de Empleo ..."  
                className="form-control"
                required
            />
        </form> 
    </div>
</div>
				
			   	<div className="row">
			{filteredData.map((item) => (
			
	        
		
		<div className="col-md-6 col-lg-4 mb-4"  data-aos-delay="0"
		key={item.id}>
          <div className="card post-entry">
            <a>
			<img src={item.imagenempelo} 
			className="card-img-top" 
			alt={item.nombreempleo}
			width="200" height="300"
			/></a>
            <div className="card-body">
              <h1 className="b text-center">
			    {item.nombreempleo}
			  </h1>
               <div className="text-center">
			  {item.descripcionempleo}<br/>
			   <Link 
			   to={`/Verofertas/${item.id}`} 
				style={{backgroundColor:"#FFCA4B",color:'black'}}
	            >
                       Leer  m&aacute;s
                 </Link>
				   
				 </div>		
	
		   </div>
		  
      </div>   
		
		 </div>
			))}
		 
	      </div>
					
		  <br/>
		  <br/>  
		 

	 
	 <Footer/>
  </>
  );
}

export default Servicios1;
