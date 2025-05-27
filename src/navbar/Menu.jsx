import React,{useContext,useState,useEffect}from 'react'
import { useUserAuth } from "../context/UsuarioContext";
import {db} from '../Configfirebase/Configfirebase'		
import { collection,query,where,getDocs } from 'firebase/firestore'; 
import Navbar from "../navbar/Navbar"
import NavbarDos  from "../navbar/Navbar2"
import Inicio1 from '../inicio/Inicio1';
import { Inicio2 } from '../inicio/Inicio2';
import Inicio from '../inicio/Inicio';
import { PerfilCompletar } from '../inicioSeccion/PerfilCompletar';

export const Menu=() =>{

const { user} = useUserAuth();
const [empre,setEmpresas ]=useState([])

    let nom=user.email
        
        const getEmpresas=async() =>
        {
        
           if(nom)
          { 
             const col= collection(db,'usuarios');
             const q=query(col,where("email_usuario","==",nom));
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
    {
      

      empre.map(usu=>(
         nom
         ?
            usu.nivel_usuario===3 && usu.status===0 ? <PerfilCompletar/>
            :
            usu.nivel_usuario===3 && usu.status===1 ?  <Inicio1/>
            :<Inicio/>
          :  
          <Inicio/>
      ))
      
      
     
   
    }	
    
      
    </>
  )
}
