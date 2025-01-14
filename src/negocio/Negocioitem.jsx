import {Link} from 'react-router-dom'


export const Negociotem=({id,nombre,foto})=>
{
        
  

    return (
        
        <div className="col-12 col-md-4 col-lg-3 mb-5">
           
              
                       <div className="product-item">
                       <Link  to={`/Vernegocio/${nombre}`}>
                            <img src={foto}
                            className="img-fluid product-thumbnail"/>
                           </Link>   
                            <h3 className="product-title">{nombre}</h3>
                            <span className="icon-cross">
                                <img 
                                src={foto}
                                 className="img-fluid"/>
                              </span>
                              <Link to={`/descripcionNegocio/:${id}`}>Descripciön del negocio</Link>
                        </div>
        
       </div>    		
  )
}		
            


