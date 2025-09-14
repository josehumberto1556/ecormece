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

//   async function log(email, password) {
//   try {
//     // Intenta iniciar sesión con el email y la contraseña
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
//     // Si la promesa se resuelve, el inicio de sesión fue exitoso
//     const user = userCredential.user;
//     console.log("¡Inicio de sesión exitoso! Usuario:", user.email);
    
//     // Devuelve las credenciales del usuario si es necesario
//     return userCredential;

//   } catch (error) {
//     // Si la promesa se rechaza, captura el error
//     console.error("Error al iniciar sesión:", error.code, error.message);

//     // Usa una estructura 'switch' para dar retroalimentación específica al usuario
//     switch (error.code) {
//       case "auth/invalid-email":
//         // Este error ocurre si el email no tiene un formato válido
//         throw new Error("El correo electrónico no es válido.");
//       case "auth/user-disabled":
//         // Este error indica que el usuario fue deshabilitado en Firebase
//         throw new Error("El usuario ha sido deshabilitado.");
//       case "auth/user-not-found":
//         // El email no está asociado a ninguna cuenta
//         throw new Error("El correo electrónico no está registrado.");
//       case "auth/wrong-password":
//         // La contraseña no coincide con la del usuario
//         throw new Error("La contraseña es incorrecta.");
//       default:
//         // Para cualquier otro tipo de error inesperado
//         throw new Error("Ocurrió un error inesperado al iniciar sesión.");
//     }
//   }
// }
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