import { useState } from "react";
import "./detalles_boton.css"
import "./templatemo.css";
export const Detalles=({
	nombre,color,descripcion,image,image1,image2,image3,price})=>
	{


	

    return(
        <div className="row">
        <div className="col-lg-5 mt-5">
			<div className="card mb-3">
				<img className="card-img img-fluid" 
				src={image}
				alt={nombre} 
				id="Detalle-producto"/>
			</div>
			<div className="row">
				
				
			<div className="col-1 align-self-center">
					<a href="#carouselExampleControls" role="button" data-bs-slide="prev">
						<i className="text-dark fas fa-chevron-left"></i>
						<span className="sr-only">Siguiente</span>
					</a>
				</div>

				<div id="carouselExampleControls" className="col-8 carousel slide carousel-multi-item" data-bs-ride="carousel">
                
				<div className="carousel-inner product-links-wap" role="listbox">

                  
					<div className="carousel-item   active">
						<div className="row">
						<div className="col-4">
						<a><img src={image1}   width="200" alt="..."/></a>
						</div>
						</div>
					</div>

					<div className="carousel-item">
						<div className="row">
						<div className="col-4">
							<img src={image2}  width="200" alt="..."/>
						</div>
						</div>
					</div>
		  
				<div className="carousel-item">
				<div className="row">
					<div className="col-4">
						<img src={image3}  width="200" alt="..."/>
					</div>
					</div>
				</div>
			</div>

				<div className="col-1 align-self-center">
					<a href="#carouselExampleControls" role="button" data-bs-slide="next">
						<i className="text-dark fas fa-chevron-right"></i>
						<span className="sr-only">Next</span>
					</a>
				</div>
				
      </div>
			 

				
				
			</div>
		</div>

		<div className="col-lg-7 mt-5">
			<div className="card">
				<div className="card-body">
					<h1 className="h2">{nombre}</h1>
					<p className="h3 py-2">{price}</p>
					<p className="py-2">
						<i className="fa fa-star text-warning"></i>
						<i className="fa fa-star text-warning"></i>
						<i className="fa fa-star text-warning"></i>
						<i className="fa fa-star text-warning"></i>
						<i className="fa fa-star text-secondary"></i>
						<span className="list-inline-item text-dark">Rating 4.8 | 36 Comments</span>
					</p>
					<ul className="list-inline">
						<li className="list-inline-item">
							<h6>Brand:</h6>
						</li>
						<li className="list-inline-item">
							<p className="text-muted"><strong>Easy Wear</strong></p>
						</li>
					</ul>

					<h6>Descripci&oacute;n:</h6>
					<p>{descripcion}</p>
					<ul className="list-inline">
						<li className="list-inline-item">
							<h6>Avaliable Color :</h6>
						</li>
						<li className="list-inline-item">
							<p className="text-muted"><strong>{color}</strong></p>
						</li>
					</ul>

					<h6>Specification:</h6>
					<ul className="list-unstyled pb-3">
						<li>Lorem ipsum dolor sit</li>
						<li>Amet, consectetur</li>
						<li>Adipiscing elit,set</li>
						<li>Duis aute irure</li>
						<li>Ut enim ad minim</li>
						<li>Dolore magna aliqua</li>
						<li>Excepteur sint</li>
					</ul>

					<div>
						<input type="hidden" name="product-title" value="Activewear" />
						
						<div className="row pb-3">
							<div className="col d-grid"> 
								<a 
								className="botonproducto"
								href="javascript: history.go(-1)"								
								>
								Volver atrás
								</a>
							</div>
					
						</div>
					</div>

				</div>
			</div>
		</div>
        </div>
    )

	}		