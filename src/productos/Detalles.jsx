import "./templatemo.css";
export const Detalles=({nombre,color,descripcion,image,image1,image2,image3,price})=>{
		
    return(
        <div class="row">
        <div class="col-lg-5 mt-5">
			<div class="card mb-3">
				<img className="card-img img-fluid" 
				src={image}
				alt={nombre} 
				id="Detalle-producto"/>
			</div>
			<div class="row">
				
				<div class="col-1 align-self-center">
					<a href="#multi-item-example" role="button" data-bs-slide="prev">
						<i class="text-dark fas fa-chevron-left"></i>
						<span class="sr-only">Siguiente</span>
					</a>
				</div>

			 <div id="multi-item-example" class="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">

					<div class="carousel-inner product-links-wap" role="listbox">

						
						<div class="carousel-item active">
							<div class="row">
								<div class="col-4">
									<a href="#">
										<img 
										className="card-img img-fluid" 
										src={image1} 
										alt="Product Image 1" />
									</a>
								</div>
								<div class="col-4">
									<a href="#">
										<img 
										className="card-img img-fluid" 
										src={image2}
										 alt="Product Image 2" />
									</a>
								</div>
								<div class="col-4">
									<a href="#">
										<img class="card-img img-fluid" 
										src={image3}
										 alt="Product Image 3" />
									</a>
								</div>
							</div>
						</div>
						

					
					
					  
					</div>
					
				</div>

				<div class="col-1 align-self-center">
					<a href="#multi-item-example" role="button" data-bs-slide="next">
						<i class="text-dark fas fa-chevron-right"></i>
						<span class="sr-only">Next</span>
					</a>
				</div>
				
			</div>
		</div>

		<div class="col-lg-7 mt-5">
			<div class="card">
				<div class="card-body">
					<h1 class="h2">{nombre}</h1>
					<p class="h3 py-2">{price}</p>
					<p class="py-2">
						<i class="fa fa-star text-warning"></i>
						<i class="fa fa-star text-warning"></i>
						<i class="fa fa-star text-warning"></i>
						<i class="fa fa-star text-warning"></i>
						<i class="fa fa-star text-secondary"></i>
						<span class="list-inline-item text-dark">Rating 4.8 | 36 Comments</span>
					</p>
					<ul class="list-inline">
						<li class="list-inline-item">
							<h6>Brand:</h6>
						</li>
						<li class="list-inline-item">
							<p class="text-muted"><strong>Easy Wear</strong></p>
						</li>
					</ul>

					<h6>Descripci&oacute;n:</h6>
					<p>{descripcion}</p>
					<ul class="list-inline">
						<li class="list-inline-item">
							<h6>Avaliable Color :</h6>
						</li>
						<li class="list-inline-item">
							<p class="text-muted"><strong>{color}</strong></p>
						</li>
					</ul>

					<h6>Specification:</h6>
					<ul class="list-unstyled pb-3">
						<li>Lorem ipsum dolor sit</li>
						<li>Amet, consectetur</li>
						<li>Adipiscing elit,set</li>
						<li>Duis aute irure</li>
						<li>Ut enim ad minim</li>
						<li>Dolore magna aliqua</li>
						<li>Excepteur sint</li>
					</ul>

					<form action="" method="GET">
						<input type="hidden" name="product-title" value="Activewear" />
						<div class="row">
							
							<div className="col-auto">
								<ul className="list-inline pb-3">
									<li class="list-inline-item text-right">
										Cantidad
										<input type="hidden" name="product-quanity" id="product-quanity" value="1" />
									</li>
									<li className="list-inline-item">
										<span className="btn btn-success" id="btn-minus" 
										style={{ background:"linear-gradient(#051126 70%,#203560)",color:"white"}}>
											-
										</span>
									</li>
									<li class="list-inline-item">
										<span class="badge bg-secondary"
										 id="var-value"
										 style={{ background:"linear-gradient(#051126 70%,#203560)",color:"white"}}
										 >1</span>
									</li>
									<li class="list-inline-item">
										<span 
										class="btn btn-success" 
										id="btn-plus"
										style={{ background:"linear-gradient(#051126 70%,#203560)",color:"white"}}>+</span>
									</li>
								</ul>
							</div>
						</div>
						<div class="row pb-3">
							<div class="col d-grid">
								<button type="submit" className="btn  btn-lg" 
								style={{background:"linear-gradient(#051126 70%,#203560)",color:"white"}} 
								name="submit"
								 value="buy">Comprar</button>
							</div>
							<div class="col d-grid">
								<button 
								type="submit" 
								className="btn btn-success btn-lg"
								 name="submit" 
								 value="addtocard" 
								style={{ background:"linear-gradient(#051126 70%,#203560)",color:"white"}}>Añadir al Carrito</button>
							</div>
						</div>
					</form>

				</div>
			</div>
		</div>
        </div>
    )

	}		