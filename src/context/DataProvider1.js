import React, { createContext, useState, useEffect } from "react";
import Data from "../Data.js";
//import mostrarProductos from "../mostrarProductos.js";
//import ListadoProducto  from "../function/perfielempresa/ListadoProductos"
export const DataContext = createContext();

export const DataProvider = (props) => {
	const [listadoproductos,setListadoproductos] = useState([]);
	const [menu,setMenu] = useState(false);
	const [carrito, setCarrito] =useState([])
	const [total, setTotal] = useState(0)
	
	/*async function actualizarEstadoProductos(){
   const productos=await ListadoProducto();
    if(productos){
			setListadoproductos(productos)
		}else{
			setListadoproductos()
		}
   }//fin del actualizarEstadoProductos
   
   useEffect(() => {
	 actualizarEstadoProductos()  }, []);
	useEffect(() => {
		const productos = ListadoProducto() 
		const productos = Data.items 
		if(productos){
			setListadoproductos(productos)
		}else{
			setListadoproductos([])
		}
	}, []);
	
	
	 
	useEffect(async() => {
		const productos = await ListadoProducto().items  
		//const productos = Data.items 
		if(productos){
			setListadoproductos(productos)
		}else{
			setListadoproductos([])
		}
	}, []);
	*/
	
	useEffect(() => {
		const productos = Data.items 
		if(productos){
			setListadoproductos(productos)
		}else{
			setListadoproductos([])
		}
	}, []);
	
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

	
	//carga el local storage
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
		menu: [menu, setMenu],
		carrito: [carrito, setCarrito],
		addCarrito: addCarrito,
		total: [total, setTotal]
	}
	return (
		<DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
	)
};
