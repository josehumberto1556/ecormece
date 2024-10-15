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
import { set } from "firebase/database";


function VerProducto() 
{
   const [ nombre,setNombre ] = useState('')
   const [ imagen,setImasgen]= useState('')
   const [ descripcion,setDescripcion]=useState('')

   const {id} = useParams() 
  
   const getEmpresaById = async (id) => {
   const empresa = await getDoc( doc(db, "m_productos", id) )
        if(empresa.exists()) {
            //console.log(product.data())
            setNombre(empresa.data().nombre_productos) 
			setImasgen(empresa.data().imagenq)   
			setDescripcion(empresa.data().descripcion)
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
			  <Navbar1/>
   

	
	    <div className="untree_co-section product-section before-footer-section">
		   
		    <div className="container">
			  
			    <h2 className="text-center">Productos {nombre}</h2>
				
				<div className="row">

				        <div className="col-lg-6">
							<img src={imagen} className="img-fluid"  width="400" height="400"/>
						</div>

						<div className="col-lg-6">
							<p>

								{descripcion}
							</p>
						</div>


				</div>

		    </div>
		</div>

	 
	 <Footer/> 
			  
			 
			  </>
  )
}		

			
export default VerProducto

