import React,{useState}from 'react'
import {useNavigate}  from 'react-router-dom'
import { collection, addDoc,query,where,getDocs } from 'firebase/firestore'
import {db,app} from '../Configfirebase/Configfirebase'	
import { getStorage,
         doc,
         ref, 
		 uploadBytes,
     uploadBytesResumable,
		 getDownloadURL,
     getMetadata } from 'firebase/storage'
import { useUserAuth } from "../context/UsuarioContext";		
import "./IniciarSeccion.css"
import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CryptoJS from 'crypto-js';
const MySwal = withReactContent(Swal)
const storage=getStorage(app)

export const RegistroHook=()=>{
   const { crearUsuario } = useUserAuth();
    const [ nombreusu,setNombreusu ] = useState('')
    const [errorNombre, setErrorNombre] = useState(null);
    const [ emailu,setEmailu ] = useState('')
    const [errorEmail, setErrorEmail] = useState(null);
    const [ clave,setClave ] = useState('')
    const [errorclave, setErrorClave] = useState(null);
    const [ categoria,setCategoria ] = useState('')
    const[errorc,setErrorc]=useState(null);
    const navigate = useNavigate()
    const [validacionExitosa, setValidacionExitosa] = useState(false)
    const empresaCollection = collection(db, "usuarios")
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [receiveUpdates, setReceiveUpdates] = useState(false);
    //estados de imagenes
    const [imagen, setImagen] = useState(null);
    const [errorImagen, setErrorImagen] = useState(null);
    let urlDescarga;
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes


    const handleTermsChange = (event) => {
      setAcceptTerms(event.target.checked);
    };
  
    const handleUpdatesChange = (event) => {
      setReceiveUpdates(event.target.checked);
    }

    const manejarCambioImagen = (evento) => 
    {
        const archivo = evento.target.files[0];
       
        if (archivo.size > maxSize) {
          setImagen(null);
          setErrorImagen("El archivo es demasiado grande. El tamaño máximo permitido es 5 MB.");
          return;
        } 

        if (archivo)
        {
            if (!archivo.type.startsWith("image/")) 
            {
                setErrorImagen("Por favor, selecciona un archivo de imagen válido.")
                return;
             }

             const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(archivo.type)) {
                 setErrorImagen("Solo se permiten imágenes JPG, PNG y WebP.");
                return;
             }
             if (archivo.size > 1024 * 1024) { // 1MB
              setErrorImagen("La imagen es demasiado grande maximi 1M.");
              return;
           }
          else {
            setImagen(null);
            setErrorImagen("Por favor, selecciona una imagen.");
          }
      
             
        }//fin del if principal
        
        else 
        {
                setImagen(null);
                setErrorImagen("Por favor, selecciona una imagen.");
        }//fin del else principal

        setImagen(archivo);
        setErrorImagen(null); // Limpiar errores anteriores

    }//fin de la funion mensaje
  
     const existeImagenEnStorage=async(nombreArchivo)=> {
        try {
          const imagenRef = ref(storage, `musuarios/${nombreArchivo}`); // Ruta a tu carpeta de imágenes
          urlDescarga=await getDownloadURL(imagenRef)
         // await getMetadata(imagenRef); // Intenta obtener metadatos
          return true; // Si no hay error, la imagen existe
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            return false; // La imagen no existe
          }
          console.error("Error al comprobar imagen:", error);
          return false; // Otro error, asumimos que no existe para evitar bloqueos
        }
      }

      const subirImagen = async () =>
        {
           
           if (!nombreusu)
             {
              setErrorNombre("Debes ingresar un nombre.");
              return;
            }//fin del if de negacion de imagen
    
           
           if(!emailu) {
            setErrorEmail("Debes ingresar un email.");
             return;
           }
   
           if(!clave) {
             setErrorClave("Debes ingresar una clave.");
             return;
           }    
             if (!imagen)
               {
                setErrorImagen("Debes seleccionar una imagen.");
                return;
              }//fin del if de negacion de imagen
       
            if(!acceptTerms && !receiveUpdates)
           {
             setErrorc("Debe selecionar tipo de actividad")
             return;
           }
           setErrorNombre(null);
           setErrorEmail(null);
           setErrorClave(null);
           setErrorImagen(null);
           setErrorc(null);
   
           const nombreArchivo = imagen.name; // O un nombre generado
           const existe = await existeImagenEnStorage(nombreArchivo);
           if (existe) {
            setErrorImagen("La imagen ya existe");
           return;}
        
           
           try {
            const archivoRef=ref(storage,`musuarios/${imagen.name}`)
            const uplo=await uploadBytes(archivoRef,imagen)
            urlDescarga=await getDownloadURL(archivoRef)
             
               const existe = await existeImagenEnStorage(nombreArchivo);
            //   if(existe) {
            //    setErrorImagen("Ya existe una imagen con ese nombre.");
            //    return;
            //  }//fin del exitsw
             
            //crear usuario
            
             //insertar datos base de datos
             if(acceptTerms==true && receiveUpdates==false)
             {
              const hash = CryptoJS.MD5(clave).toString();
              const usuario=await crearUsuario(
                    	 emailu, 
                    	 hash
                         ).then((
                         usuarioFirebase)=>
                         {return usuarioFirebase}
                         ).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              
              switch (errorCode) {
                case "auth/email-already-in-use":
                    MySwal.fire({
                                   title: "Error!",
                                   text: "Correo ya existe!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                case "auth/invalid-email":
                  MySwal.fire({
                                   title: "Error!",
                                   text: "Correo Invalido!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                case "auth/weak-password":
                  MySwal.fire({
                                   title: "Error!",
                                   text: "Clave debil!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                default:
                  // Handle other errors
                  break;
              }	
                    	 })
              await addDoc( empresaCollection, {
                nombre_usuario:nombreusu,
                email_usuario: emailu, 
                clave_usuario:hash,
                imagen:urlDescarga,
                vendedor:acceptTerms,
                status:0,
                nivel_usuario:2
                } )
                setNombreusu(''); 
                setEmailu('')
                setClave('')
                setImagen('')
                MySwal.fire({
                        title: "Bien hecho!",
                        text: "Registro con Exito!",
                        icon: "success",
                        button: "Felicitaciones!",
                        });
                         navigate('/IniciarSeccion')        
              
               } 
               
              if(acceptTerms==false && receiveUpdates==true)
              {
              const hash = CryptoJS.MD5(clave).toString();
              const usuario=await crearUsuario(
                    	 emailu,
                    	 hash
                         ).then((
                         usuarioFirebase)=>
                         {return usuarioFirebase}
                         ).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              
              switch (errorCode) {
                case "auth/email-already-in-use":
                    MySwal.fire({
                                   title: "Error!",
                                   text: "Correo ya existe!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                case "auth/invalid-email":
                  MySwal.fire({
                                   title: "Error!",
                                   text: "Correo Invalido!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                case "auth/weak-password":
                  MySwal.fire({
                                   title: "Error!",
                                   text: "Clave debil!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                default:
                  // Handle other errors
                  break;
              }	
                    	 }) 
              await addDoc( empresaCollection, {
                nombre_usuario:nombreusu,
                email_usuario: emailu, 
                clave_usuario:hash,
                imagen:urlDescarga,
                comprador:receiveUpdates,
                status:0,
                nivel_usuario:3
                } )
                setNombreusu(''); 
                setEmailu('')
                setClave('')
                setImagen('')
                MySwal.fire({
                        title: "Bien hecho!",
                        text: "Registro con Exito!",
                        icon: "success",
                        button: "Felicitaciones!",
                        });
                        navigate('/IniciarSeccion')        
              
               } 

             if(acceptTerms==true && receiveUpdates==true)
             {
              const hash = CryptoJS.MD5(clave).toString();
              const usuario=await crearUsuario(
                    	 emailu,
                    	 hash
                         ).then((
                         usuarioFirebase)=>
                         {return usuarioFirebase}
                         ).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              
              switch (errorCode) {
                case "auth/email-already-in-use":
                    MySwal.fire({
                                   title: "Error!",
                                   text: "Correo ya existe!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                case "auth/invalid-email":
                  MySwal.fire({
                                   title: "Error!",
                                   text: "Correo Invalido!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                case "auth/weak-password":
                  MySwal.fire({
                                   title: "Error!",
                                   text: "Clave debil!",
                                   icon: "danger",
                                   button: "Felicitaciones!"
                    		    });
                  break;
                default:
                  // Handle other errors
                  break;
              }	
                    	 })
              await addDoc( empresaCollection, {
                nombre_usuario:nombreusu,
                email_usuario: emailu, 
                clave_usuario:hash,
                imagen:urlDescarga,
                vendedor:acceptTerms,
                comprador:receiveUpdates,
                status:0,
                nivel_usuario:4
                } )
                setNombreusu(''); 
                setEmailu('')
                setClave('')
                setImagen('')
                MySwal.fire({
                        title: "Bien hecho!",
                        text: "Registro con Exito!",
                        icon: "success",
                        button: "Felicitaciones!",
                        });
   
                       navigate('/IniciarSeccion')        
              
               } 

           } catch (error) {
             console.error("Error al subir imagen:", error);
             setErrorImagen("Error al subir la imagen. Inténtalo de nuevo.");
           }
           
   
       }//fin del metodo subir imagen   
      //manejo campos
      //nombre
      const manejarCambioNombre = (evento) => {
        setNombreusu(evento.target.value);
        setErrorNombre(null);
      }
      //email
   

      const validarEmail = async (emailc) => {
     
        try {
          const q=query(empresaCollection,where("email_usuario","==", emailc));
          const datos=await getDocs(q);
          console.log(datos)
           if (!datos.empty) {
            setErrorEmail('Este correo ya existe.');
            setValidacionExitosa(false);
          } else {
            setErrorEmail('');
            setValidacionExitosa(true);
          }
        } catch (error) {
          console.error('Error al validar correo:', error);
          setErrorEmail('Error al validar correo. Inténtalo de nuevo.');
          setValidacionExitosa(false);
        }
      };

      const handleChangeEmail = (event) => {
        const emailc = event.target.value;
        setEmailu(emailc);
        validarEmail(emailc);
      };

      const manejarClaveUsuario = (evento) => {
       setClave(evento.target.value);
       setErrorClave(null);
      }

      const manejarNivel = (evento) => {
        setCategoria(evento.target.value);
        setErrorc(null);
       }
 

    return{
        nombreusu,
        errorNombre,
        manejarCambioNombre,
        emailu,
        errorEmail,
        handleChangeEmail,
        clave,
        errorclave,
        manejarClaveUsuario,
        errorc,
        manejarNivel,
        imagen,
        errorImagen,
        manejarCambioImagen,
        subirImagen,
        validacionExitosa,
        acceptTerms,
        receiveUpdates,
        handleUpdatesChange,
        handleTermsChange
      
    }
}