import React,{useState}from 'react'
import {useNavigate}  from 'react-router-dom'   
import { collection,doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { getStorage,
         ref, 
		   uploadBytes,
         uploadBytesResumable,
		   getDownloadURL,
        getMetadata } from 'firebase/storage'
import {db,app} from '../../Configfirebase/Configfirebase'	
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const storage=getStorage(app)



export const PerfilHook=({email})=>{
    
  const [nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [errorDireccion, setErrorDireccion] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [errorTelefono, setErrorTelefono] = useState(null);
  const [facebook, setFacebook] = useState('');
  const [instagran, setInstagran] = useState('');
  const [titok, setTitok] = useState('');
  const [ id,setId ] = useState(null);
  const  [ ids,setIds ] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [empresaterms, setEmpresaterms] = useState(false);
  const [distribuidorterms, setDistribuidorterms] = useState(false);
  const [proveedorterms, setProveedorterms] = useState(false);
    const navigate = useNavigate()
  //estados de imagenes
    const [imagen, setImagen] = useState(null);
    const [errorImagen, setErrorImagen] = useState(null);
    let urlDescarga;
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
   
  
    const manejarCambioNombre = (evento) => 
    {
       setNombre(evento.target.value);
       setErrorNombre(null);
    }

    const manejarCambioDireccion = (evento) => 
    {
       setDireccion(evento.target.value);
       setErrorDireccion(null);
    }


   const manejarCambioDes = (evento) => 
    {
       setDescripcion(evento.target.value);
       setErrorDescripcion(null);
    }

    const manejarCambiosTel= (evento) => 
    {
       const tel=evento.target.value
       const telef=tel.replace(/\D/g, '')
       setTelefono(telef);
       setErrorTelefono(null);
    }

   const manejarCambiosf= (evento) => 
    {
       setFacebook(evento.target.value);
      
    }

    const manejarCambiosi= (evento) => 
    {
       
      setInstagran(evento.target.value);
      
    }


    const manejarCambiost= (evento) => 
    {
       setTitok(evento.target.value);
      
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
          const imagenRef = ref(storage, `negocios/${nombreArchivo}`); // Ruta a tu carpeta de imágenes
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
      
    const handleTermsChange = (event) => {
      setAcceptTerms(event.target.checked);
    };
  
    const handleUpdatesChange = (event) => {
      setReceiveUpdates(event.target.checked);
    }
  
   const handleEmpresaterms = (event) => {
      setEmpresaterms(event.target.checked);
    }

      const handleDistribuidorterms = (event) => {
      setDistribuidorterms(event.target.checked);
    }
  
      const handleProveedorterms = (event) => {
      setProveedorterms(event.target.checked);
    }
  
  
  
    const subirImagen = async () =>
    {
               
        if (!nombre)
        {
            setErrorNombre("Debes ingresar un nombre.");
            return;
        }//fin del if de negacion de imagen
        
        if (!direccion)
        {
            setErrorDireccion("Debes ingresar una dirección.");
            return;
        }//fin del if de negacion de imagen
               
        if (!descripcion)
        {
            setErrorDescripcion("Debes ingresar una descripción.");
            return;
        }//fin del if de negacion de imagen

        if (!telefono)
        {
            setErrorTelefono("Debes ingresar el whatsapp.");
            return;
        }//fin del if de negacion de imagen
       
        if (!imagen)
        {
            setErrorImagen("Debes seleccionar una imagen.");
            return;
        }//fin del if de negacion de imagen
                      
          setErrorImagen(null);
           const nombreArchivo = imagen.name; // O un nombre generado
           const existe = await existeImagenEnStorage(nombreArchivo);
           if (existe) {
            setErrorImagen("La imagen ya existe");
           return;}
         const usuariosRef1 = collection(db, 'usuarios');
         const q1 = query(usuariosRef1, where('email_usuario', '==',email));
         const querySnapshot1 = await getDocs(q1);
                       
          if(!querySnapshot1.empty) 
          {
              const userData1 = querySnapshot1.docs[0].data();
              const userId1 = querySnapshot1.docs[0].id;
              try
              {
                const empresa1 = doc(db,"usuarios",userId1)
                const data1= {status:1}
                await updateDoc(empresa1, data1)
              }catch(error)
              {
                 console.error("Error al actualizar datos:", error);
              }              
         }
         
         const usuariosRef = collection(db, 'negocios');
         const q = query(usuariosRef, where('correo', '==',email));
         const querySnapshot = await getDocs(q);
                       
          if(!querySnapshot.empty) 
          {
              const userData = querySnapshot.docs[0].data();
              const userId = querySnapshot.docs[0].id;
              console.log(userId)
              try
              {

               const archivoRef=ref(storage,`negocios/${imagen.name}`)
               const uplo=await uploadBytes(archivoRef,imagen)
               urlDescarga=await getDownloadURL(archivoRef)
             
               const existe = await existeImagenEnStorage(nombreArchivo);
                const empresa = doc(db,"negocios",userId)
                const data= { 
                                nombre_negocio:nombre,
                                direccion:direccion,
                                descripcion:descripcion,
                                telefono:telefono,
                                rede_social:facebook,
                                rede_social1:instagran,
                                rede_social2:titok,
                                foto:urlDescarga,
                                emprendedor:acceptTerms,
                                negocio:receiveUpdates,
                                empresa:empresaterms,
                                distribuidor:distribuidorterms,
                                proveedor:proveedorterms
                            }
                await updateDoc(empresa,data)
                   MySwal.fire({
                           title: "Felicitaciones!",
                           text: "Perifl completado!",
                           icon: "danger",
                           button: "Felicitaciones!"
					            });
                      navigate('/CuentasDeUsuarios')
              }catch(error)
              {
                 console.error("Error al actualizar datos:", error);
              }              
         }
        

              
    }//fin del metodo subir imagen 

    return{
              nombre,
              direccion,
              descripcion,
              telefono,
              errorTelefono,
              errorDireccion,
              errorNombre,
              errorDescripcion,
              errorImagen,
              manejarCambioDes,
              manejarCambioDireccion,
              manejarCambioNombre,
              manejarCambiosTel,
              manejarCambiosf,
              manejarCambiosi,
              manejarCambiost,
              manejarCambioImagen,
              subirImagen,
              acceptTerms,
              receiveUpdates,
              handleUpdatesChange,
              handleTermsChange,
              empresaterms,
              distribuidorterms,
              proveedorterms,
              handleEmpresaterms,
              handleDistribuidorterms,
              handleProveedorterms
          }
}