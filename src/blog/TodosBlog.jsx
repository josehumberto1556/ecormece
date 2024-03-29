import React,{useState,useEffect}from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs} from 'firebase/firestore'
import Navbar  from "../navbar/Navbar"


function TodosBlog() {
	
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

     <div className="blog-section">
			<div className="container">
				<div className="row mb-5">
					<div className="col-md-6">
						<h2 className="section-title">Articulos</h2>
					</div>
					
				</div>

				<div className="row">
               {empre.map((empr)=>(
					<div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0" key={empr.id}>
						<div className="post-entry"> 
							<a href="#" className="post-thumbnail">
							<img src={empr.imagenblog} alt="Image" 
							className="img-fluid"/></a>
							<div className="post-content-entry">
								<h3><a href="#">{empr.nombre_blog}</a></h3>
								<div className="meta">
									<span>b
									<a href="#">{empr.descripcionblog}</a></span> <span> <a href="#">{empr.fechablog}</a></span>
								</div>
							</div>
						</div>
					</div>

					
			 ))  }
				
				</div>
			</div>
		</div>
    </>
  );
}

export default TodosBlog;
