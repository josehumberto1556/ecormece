/*import React, {  useState, useEffect,createContext } from "react";
import { ListadoPo } from "../productos/Listadoprod";
import {app,db} from '../Configfirebase/Configfirebase'	
import {collection,
	getDocs,
	getDoc,
	deleteDoc,
	doc} from 'firebase/firestore'

export const DataContext = createContext();

export const DataProvider = (props) => {
	const [listadoproductos,setListadoproductos] = useState([]);
    const [menu,setMenu] = useState(false);
    const [carrito, setCarrito] =useState([])
    const [total, setTotal] = useState(0)
    const [empre,setEmpresas ]=useState([])
	const  empresaCollection=collection(db,"m_productos")
	const getEmpresas=async ()   => {
	const data=await getDocs(empresaCollection)
	 //console.log(data.docs)
	 setEmpresas(
		 data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
	 )}

	useEffect(() => {
		const productos = getEmpresas()
					if(productos){
	    setListadoproductos(productos)
		}else{
			setListadoproductos([])
		}
	},[])
	
	const addCarrito = (id) =>{
		const check = carrito.every(item =>{
			return item.id !== id
			
		})
		if(check){
			const data = listadoproductos.filter(producto =>{
				return producto.id === id
			})
			setCarrito([...carrito, ...data])
		}else{
			alert("El producto se ha añadido al carrito")
		}
	}
	
		useEffect(() =>{
		const dataCarrito = JSON.parse(localStorage.getItem('dataCarrito'))
		if(dataCarrito){
			setCarrito(dataCarrito)
		}
	},[])
	
	useEffect(() =>{
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	},[carrito])

	useEffect(() =>{
		const getTotal = () =>{
			const res = carrito.reduce((prev, item) =>{
				return prev + (item.price * item.cantidad)
			},0)
			setTotal(res)
		}
		getTotal()
	},[carrito])
	
	
		const value = {
		listadoproductos : [listadoproductos],
//		menu: [menu, setMenu],
//		carrito: [carrito, setCarrito],
//		addCarrito: addCarrito,
//		total: [total, setTotal]
		
	}
	
	
	
	return (
		<DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
	)
};
*/