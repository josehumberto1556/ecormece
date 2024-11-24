import {useContext} from "react";
//import {DataContext} from "../context/DataProvider";
import {Detalles} from "./Detalles"
import { CarritoContext } from "../context/CarritoContext"

export const DetalleItem=({id,nombre,color,image,image1,image2,image3,descripcion,price, handleAgregar, handleQuitar, handleAumentar, handleDisminuir})=>
{
  /*  const value=useContext(DataContext)
    const [listadoproductos]=value.listadoproductos
*/


  
return(
<section>
	<div className="container pb-5">
		<Detalles 
        nombre={nombre}
        color={color}
        image={image}
        image1={image1}
        image2={image2}
        image3={image3}
        descripcion={descripcion}
        price={price}
        handleAgregar={handleAgregar}
        handleQuitar={handleQuitar}
        handleAumentar={handleAumentar} 
        handleDisminuir={handleAumentar}
       
     
     />
        

	</div>
</section>
 )
}


