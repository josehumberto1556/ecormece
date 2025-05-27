import React,{useState,useEffect,useContext}from 'react'
import { useUserAuth } from '../context/UsuarioContext'
import { collection,
         query,
         where,
         getDocs
         ,getDoc,
         doc,
         updateDoc } from 'firebase/firestore'
import NavbarDos from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import {db,app} from '../Configfirebase/Configfirebase'
import { getStorage,
         ref, 
         uploadBytes,
         getDownloadURL } from 'firebase/storage'
import { useNavigate } from "react-router-dom";
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const CompletarPerfil=()=> {

const [ nombre_usuario,setCodigoempresa ] = useState('')
const [ email_usuario,setNombreempresa ] = useState('')
const [ clave_usuario,setDireccionempresa ] = useState('')
const [ imagen,setImagen ] = useState('')
const [idProducto, setIdProducto] = useState(null)
const {user}=useUserAuth();
let nom=user.email 
let navigate = useNavigate();
      
       const getUsuarios=async()=>{
       try
        {
            const productosRef = collection(db,'usuarios');
            const q=query(productosRef,where('email_usuario', '==',nom));
            const querySnapshot=await getDocs(q);
               if (!querySnapshot.empty) 
               {
                 const producto = querySnapshot.docs[0]
                 const productoData = producto.data();
                 setIdProducto(producto.id);
                 setCodigoempresa(productoData.nombre_usuario || ''); // Asegúrate de que el campo exista
                 setNombreempresa(productoData.email_usuario || ''); // Asegúrate de que el campo exista
                 setDireccionempresa(productoData.clave_usuario || '')   
                 setImagen(productoData.imagen)
               	
               }
           
             } catch (error) {
               console.error('Error al buscar el producto:', error);
               
               
             }		   
       }
       
        useEffect( () => {
           getUsuarios()
               // eslint-disable-next-line
           }, [])
   
 
   
      const update = async (e) =>
      {
      
        e.preventDefault()
         
         const empresa = doc(db, "usuarios", idProducto)	
         const data = { status:1}
         await updateDoc(empresa, data)
         MySwal.fire({
                        title: "Felicitaciones!",
                        text: "Cuuenta Activada Con Exito!",
                        icon: "danger",
                        button: "Felicitaciones!"
                       });	   
        navigate("/Inicio")
             
        }

  return (
    <>
    <div className="untree_co-section">
      <div className="container">

        <div className="block">
          <div className="row justify-content-center">


            <div className="col-md-9 col-lg-8 pb-4">
            <form  onSubmit={update}>
                <h1 style={{textAlign:"center"}}>Perfil Usuario  {nombre_usuario}</h1>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" for="fname">Nombre Usuario</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        disabled
                        value={nombre_usuario}
                       onChange={ (e) => setCodigoempresa(e.target.value)}
                      />
                    </div>
                  </div>
                
                </div>
                
				<div className="form-group">
                   <label className="text-black" for="email">Correo Usuario</label>
                   <input
                   type="email" 
                    className="form-control" 
                    id="email"
                    placeholder="Correo Electronico ..."
                    disabled
                    value={email_usuario}
                    onChange={ (e) => setNombreempresa(e.target.value)}
                  />
               </div>

           <div className="form-group mb-5">
             <label className="text-black" for="message">Clave Usuario</label>
             <input 
              type="password"
              className="form-control" 
              placeholder="clave Usuario ..."
              disabled
              value={clave_usuario}
              onChange={ (e) => setDireccionempresa(e.target.value)}
             />
            </div>

            <div className="form-group mb-5">
             <label className="text-black" for="message">Tipo de Operación</label>
             <input 
              type="text"
              className="form-control" 
              disabled
              value="Comprador"
             />
            </div>
           
           <div className="form-group mb-5">
             <label for="Categoriar">Imagen</label>
                <img src={imagen} width="100"  height="100"/>
            </div>
            
            <button
            type="submit"
            className="boton4"
            >Activar Cuenta
            </button>
          
        </form>
            
            </div>

          </div>

        </div>

      </div>


    </div>	
      
    </>
  )
}
