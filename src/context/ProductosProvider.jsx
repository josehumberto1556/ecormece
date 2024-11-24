import React, {  useState, useEffect} from "react";
import {app,db} from '../Configfirebase/Configfirebase'	
import { ProductosContext } from "./ProductosContext"
import {collection,
	getDocs,
	getDoc,
	deleteDoc,
	doc} from 'firebase/firestore'

export const ProductosProvider = (	{children}) => {
  

    const [listadp,setListadop] = useState([]);

    const  productosCollection=collection(db,"m_productos")

	const Listadoproductos=async ()   => 
	{
	  const data=await getDocs(productosCollection)
	    //console.log(data.docs)
	   setListadop(
		 data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
	 )}

	useEffect(() => {
		Listadoproductos()
	},[])
	
  
  
    return (
    <ProductosContext.Provider value={{listadp}}>
             	{children}
    </ProductosContext.Provider>
  )
}


