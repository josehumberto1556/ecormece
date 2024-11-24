import {Link}      from 'react-router-dom'


export const CategoriaItem=({id,nombre,imagen})=>
{
		
  

	return (
		
		<div className="col-12 col-md-4 col-lg-3 mb-5">
		   <Link  to={`/Productos/${nombre}`}>
              
					   <div className="product-item">

							<img src={imagen}
							className="img-fluid product-thumbnail"/>
							<h3 className="product-title">{nombre}</h3>
							<span className="icon-cross">
								<img 
								src={imagen}
								 className="img-fluid"/>
							  </span>
						</div>
		   </Link>
	   </div>    		
  )
}		
			


