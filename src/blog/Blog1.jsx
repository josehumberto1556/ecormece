import React,{useState,useEffect}from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs,query, orderBy, limit,} from 'firebase/firestore'
import {Link}      from 'react-router-dom'
import "./blog.css"

function Blog1() {
	
  const [empre,setEmpresas ]=useState([])
  const  empresaCollection=collection(db,"blog")
  const getEmpresas=async ()   => {
  const q = query(
    empresaCollection,
    orderBy("nombre_blog", "desc"),
    limit(6)
  );
  const data=await getDocs(q)
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
   
	<section className="articles-section">
        <div className="container">
             <div className="header-section">
                <h2>Últimas Noticias</h2>
                <Link to="/TodosNoticias" className="view-all-link">Ver todas las noticias &rarr;</Link>
            </div>
            <div className="articles-grid">
               {empre.map((empr)=>(
                <article className="article-card">
                    <img
					src={empr.imagenblog}
                    width="400"
					height="250"
					alt={empr.nombre_blog}
					className="article-image"/>
                    <div className="article-content">
                        <h3>{empr.nombre_blog}</h3>
                        <p className="article-meta">{empr.fechablog}</p>
                        <p className="article-excerpt">{empr.descripcionblog}</p>
                        <Link 
                         to={`/VerNoticias/${empr.id}`}
						className="read-more">
						Leer más &rarr;
						</Link>
                    </div>
                </article>
			   ))}

			</div>
         </div>
      </section>		 
	</>
	
  );
}

export default Blog1;
