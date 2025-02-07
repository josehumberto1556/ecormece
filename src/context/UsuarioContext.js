import { createContext, 
         useContext, 
		 useEffect, 
		 useState } 
		 from "react";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail
} from 'firebase/auth';

import { 
         collection,
         doc,
 		     getDoc,
	   } from 'firebase/firestore'

import { auth,db } from "../Configfirebase/Configfirebase";


export const usuarioContext=createContext()

export const UsuarioContextProvider=({children})=>
{
	
	const [user, setUser] = useState({});

  function crearUsuario(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  function editaremail(email){
	  return updateEmail(auth,email)
  }
  function recuperarClave(formCorreo) {
    return sendPasswordResetEmail(auth, formCorreo)
  }
  
  function log(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

   function logOut() {
    return signOut(auth);
  }
  
 


  function acceso(usuarioFirebase)
	{

		
    const userData={
 				               uid:usuarioFirebase.uid,
							         email:usuarioFirebase.email
											}		
	    setUser(userData)
			 console.log("el user",userData)
 }
	
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      console.log("Auth", usuarioFirebase);
	  if(usuarioFirebase){
      acceso(usuarioFirebase);}
    });

    return () => {
      unsubscribe();
    };
  }, []);
	
  
  
  return(
	   <usuarioContext.Provider
	    value={{ user,log,logOut,crearUsuario,recuperarClave }}
		>
		{children}
		</usuarioContext.Provider>
	)
}

export function useUserAuth() {
  return useContext(usuarioContext);
}