import {useContext} from "react";
import {DataContext} from "../context/DataProvider";
import {Detalles} from "./Detalles"

export const DetalleItem=()=>
{
    const value=useContext(DataContext)
    const [listadoproductos]=value.listadoproductos

return(
<section>
	<div className="container pb-5">
		
        
    {
		listadoproductos.map(productos=>(   
			<Detalles
            key={productos.id}
            id={productos.id}
            title={productos.title}
            price={productos.price}
            image={productos.image}
            />
        ))
        }	
	</div>
</section>
 )
}


