import React,{useState,useEffect}from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import {collection,getDocs} from 'firebase/firestore'
import {Link}      from 'react-router-dom'
import "./blog.css"

function Blog() {
	
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
   
	<section className="articles-section">
        <div className="container">
             <div className="header-section">
                <h2>Últimas Noticias</h2>
                <Link to="/TodosBlog" className="view-all-link">Ver todas las noticias &rarr;</Link>
            </div>
            <div className="articles-grid">
               {empre.map((empr)=>(
                <article className="article-card">
                    <img
					src={empr.imagenblog}
                    width="400"
					height="250"
					alt="Imagen del Artículo 1"
					className="article-image"/>
                    <div className="article-content">
                        <h3>{empr.nombre_blog}</h3>
                        <p className="article-meta">{empr.fechablog}</p>
                        <p className="article-excerpt">{empr.descripcionblog}</p>
                        <a href="#" className="read-more">Leer más &rarr;</a>
                    </div>
                </article>
			   ))}
			    <article class="article-card">
                    <img 
					src="https://via.placeholder.com/400x250/E0E0E0/333333?text=Imagen+del+Articulo+2" alt="Imagen del Artículo 2" class="article-image"/>
                    <div class="article-content">
                        <h3>Título del Artículo 2</h3>
                        <p class="article-meta">Publicado el 29 de julio de 2025</p>
                        <p class="article-excerpt">Este es otro extracto. Es importante que el texto sea conciso y atractivo para captar la atención del usuario.</p>
                        <a href="#" class="read-more">Leer más &rarr;</a>
                    </div>
                </article>

			</div>
         </div>
      </section>		 
	</>
	
  );
}

export default Blog;
