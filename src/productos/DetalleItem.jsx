//import {useContext} from "react";
//import {DataContext} from "../context/DataProvider";
import {Detalles} from "./Detalles"

export const DetalleItem=({nombre,color,image,image1,image2,image3,descripcion,price})=>
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
        />
        

	</div>
</section>
 )
}


