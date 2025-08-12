import React,{useState,useEffect}from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs} from 'firebase/firestore'
import {Link}      from 'react-router-dom'
import Navbar  from "../navbar/Navbar"
import Navbar1  from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./productos.css"

function TodosBlog1() {
	
  const [empre,setEmpresas ]=useState([])
  const  empresaCollection=collection(db,"blog")
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
	
  return (
    <>
	   <Navbar/>
       <Navbar1/>
     
			<section className="featured-products">
        <div className="container">
            <h2>Últimas Noticias</h2>
            <div className="product-grid">
			{empre.map((empr)=>(
                <div className="product-card" key={empr.id}>
                    <img src={empr.imagenblog} width="300" height="200" alt={empr.nombre_blog}/>
                    <h3>{empr.nombre_blog}</h3>
                    <p className="price">{empr.fechablog}</p>
                    <div className="meta">
					  <span>
				     	<a href="#">
						{empr.descripcionblog}
						</a></span> 
					</div>
					<Link 
					to={`/VerNoticias/${empr.id}`}
					className="btn btn-secondary">
					Ver Noticia</Link>
                </div>
				))}
               
                
            </div>
        </div>
    </section>
		
		
		<Footer/>
    </>
  );
}

export default TodosBlog1;
