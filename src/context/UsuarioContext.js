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
  updateEmail,
  reauthenticateWithCredential,
   EmailAuthProvider
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
  
async function editarEmail(nuevoCorreo, claveActual) {
        const usuario = auth.currentUser;
        if (!usuario) {
            throw new Error('No hay ningún usuario autenticado.');
        }

        const credential = EmailAuthProvider.credential(usuario.email, claveActual);

        try {
            await reauthenticateWithCredential(usuario, credential);
            await updateEmail(usuario, nuevoCorreo);
            return true;
        } catch (error) {
            console.error("Error al actualizar correo:", error);
            let errorMessage = "Error al actualizar correo.";
            if (error.code === 'auth/requires-recent-login') {
                errorMessage = "Reinicio de sesión reciente requerido.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Correo electrónico no válido.";
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Correo electrónico ya en uso.";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Contraseña incorrecta.";
            }
            throw new Error(errorMessage);
        }
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
	    value={{ user,log,logOut,crearUsuario,recuperarClave,editarEmail }}
		>
		{children}
		</usuarioContext.Provider>
	)
}

export function useUserAuth() {
  return useContext(usuarioContext);
}