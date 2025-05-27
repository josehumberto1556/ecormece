import React from 'react';
import Navbar4  from "../navbar/Navbar4"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import { CompletarPerfil } from './CompletarPerfil';

export const PerfilCompletar=()=>
{
    return(
        <>
        <Navbar4/>
        <Navbar1/>
        <CompletarPerfil/>
         <Footer/> 
        </>
    )
}