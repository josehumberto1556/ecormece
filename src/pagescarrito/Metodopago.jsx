import React,{useContext,useState,useEffect}from 'react'
import {db} from '../Configfirebase/Configfirebase'		
import { collection,query,where,getDocs } from 'firebase/firestore'; 
import {link,useParams} from 'react-router-dom'

export const Metodopago=({id,nombrenegocio})=> {

    
    const [empre,setEmpresas ]=useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const getEmpresas=async() =>
    {
        
        if(nombrenegocio)
        { 
           const col= collection(db,'metodo_pago');
           const q=query(col,where("email_usuario","==",nombrenegocio));
           const datos=await getDocs(q);
          //data.forEach(user=>{console.log(user.data())})
          setEmpresas(datos.docs.map((doc => ({ ...doc.data(), id: doc.id }))))				   
        
        }
            
    }
     
         useEffect( () => {
            getEmpresas()
       }, [] )
    

  return (
    <>
      <div class="col-md-12">
                      <label class="text-black h4" for="coupon">Metodo de pago</label>
                     
      </div>
      {empre.map(item=>(
      <div class="col-md-8 mb-3 mb-md-0">
       <p>{item.metodo1}</p>   
      </div>
    ))}
    </>
  )
}
