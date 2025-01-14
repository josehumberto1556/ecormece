import { useUserAuth } from "../context/UsuarioContext";
import Navbar from "../navbar/Navbar"
import NavbarDos  from "../navbar/Navbar2"
export const Menu=() =>{

const { user } = useUserAuth();
    let nom=user.email

    return (
    
    <>
    { nom ? <NavbarDos/>:<Navbar/> }	

      
    </>
  )
}
