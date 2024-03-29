import React, { useContext,useState,useEffect } from "react";
import  {DataContext}  from  '../context/DataProvider'
import "./Producto.css"
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import {Link,useParams} from 'react-router-dom'
import { getDoc, updateDoc, doc } from "firebase/firestore"
import {db,app} from '../Configfirebase/Configfirebase'
import { getStorage,
         ref, 
		 uploadBytes,
		 getDownloadURL } from 'firebase/storage'	

function VerProducto() 
{
   const [ nombre,setNombre ] = useState('')
   const {id} = useParams() 
  
   const getEmpresaById = async (id) => {
   const empresa = await getDoc( doc(db, "m_productos", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setNombre(empresa.data().nombre_productos)    
           //setNombreempresa(empresa.data().bandera)    
        }else{
            console.log(' no existe')
        }
    }

    useEffect( () => {
        getEmpresaById(id)
        // eslint-disable-next-line
    }, [])


   
	
	return (
	<>
	          <Navbar/>
   
	 <div className="hero fondo">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro-excerpt">
								<h1>Producto {nombre}</h1>
							</div>
						</div>
						<div className="col-lg-7">
							
						</div>
					</div>
				</div>
			</div>
	
			<div className="untree_co-section product-section before-footer-section">
		    <div className="container">
		      	<div className="row">

 				<h2 className="text-center">Productos {nombre}</h2>
				
				</div>
		    </div>
		</div>

	 
	 <Footer/> 
			  
			 
			  </>
  )
}		

			
export default VerProducto

