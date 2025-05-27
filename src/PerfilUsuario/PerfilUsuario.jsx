import React,{useState,useEffect,useContext}from 'react'
import { useUserAuth } from '../context/UsuarioContext'
import { collection,query,where,getDocs,getDoc,doc, updateDoc} from 'firebase/firestore'
import NavbarDos from "../navbar/Navbar2"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import {db,app} from '../Configfirebase/Configfirebase'
import { getStorage,
         ref, 
         uploadBytes,
         getDownloadURL } from 'firebase/storage'
import CryptoJS from 'crypto-js'         
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
         
const storage=getStorage(app)
const MySwal = withReactContent(Swal)
function PerfilUsuario() {
  
  
   const [ nombre_usuario,setcodigoempresa ] = useState('')
        const [ email_usuario,setNombreempresa ] = useState('')
        const [ clave_usuario,setDireccionempresa ] = useState('')
        const [ imageni,setImagen ] = useState('')
        const [ i,setI ] = useState(null)
        const [idProducto, setIdProducto] = useState(null)
        const {user}=useUserAuth();
       let nom=user.email 
      
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
                 setcodigoempresa(productoData.nombre_usuario || ''); // Asegúrate de que el campo exista
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
   
           let urlDescarga
      let archivoLocalname
      async function subirArchivo(e)
      {
      
       const archivoLocal=e.target.files[0]
       archivoLocalname=archivoLocal.name
       setI(archivoLocal);
      
      }
   
      const update = async (e) => {
        e.preventDefault()
         const empresa = await getDoc( doc(db, "usuarios", idProducto) )
       if(!i)
       {
             
          const n=imageni
          const archivoRef=ref(storage,`imagenesusuarios/${n}`)
          const uplo=await uploadBytes(archivoRef,n)
          urlDescarga=await getDownloadURL(archivoRef)
          const hash = CryptoJS.MD5(clave_usuario).toString();          
             const data = { nombre_usuario:nombre_usuario, 
                            email_usuario:email_usuario,
                            clave_usuario:hash,
                            imagen:n
                           }
                           
              await updateDoc(empresa, data)
               MySwal.fire({
                                 title: "Felicitaciones!",
                                 text: "Registro Modificado Con Exito!",
                                 icon: "danger",
                                button: "Felicitaciones!"
                           });	   
             }
             else{
              const n=i	  
               const archivoRef=ref(storage,`imagenesusuarios/${n.name}`)
               const uplo=await uploadBytes(archivoRef,n)
               urlDescarga=await getDownloadURL(archivoRef) 
                  const hash = CryptoJS.MD5(clave_usuario).toString();  
                   const data = { nombre_usuario:nombre_usuario, 
                              email_usuario:email_usuario,
                              clave_usuario:hash,
                              imagen:urlDescarga
                            }
                            
              await updateDoc(empresa, data)
            MySwal.fire({
                                 title: "Felicitaciones!",
                                 text: "Registro Modificado Con Exito!",
                                 icon: "danger",
                                button: "Felicitaciones!"
                           });	  
         
         }
           
                   
          }

  return (

    <>
       <NavbarDos/>
         <Navbar1/>
         <div className="untree_co-section">
            <div className="container">
              <div className="block">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-8 pb-4">
                  <form  onSubmit={update}>
                <h1 style={{textAlign:"center"}}>Perfil Usuario {nombre_usuario} </h1>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="text-black" for="fname">Nombre</label>
                      <input type="text" 
	 				             className="form-control" 
   					           id="fname"
					             placeholder="Nombre ..."
                       value={nombre_usuario}
                       onChange={ (e) => setcodigoempresa(e.target.value)}
                       required
                       disabled
					            />
                    </div>
                  </div>
                
                </div>
                
				<div className="form-group">
                  <label className="text-black" for="email">Correo Electronico</label>
                  <input 
                  type="email" 
                  className="form-control" 
				           id="email" 
                  placeholder="Correo Electronico ..."
                  value={email_usuario}
                  onChange={ (e) => setNombreempresa(e.target.value)}
				          disabled/>
                </div>

                <div className="form-group mb-5">
                  <label className="text-black" for="message">Clave</label>
                  <input 
                    type="password"
				            className="form-control" 
				            id="message" 
                    cols="30" 
				             rows="5"
				            placeholder="Clave ..."
				            value={clave_usuario}
                    onChange={ (e) => setDireccionempresa(e.target.value)}
                    disabled
				          />
                </div>

                <div className="form-group mb-5">
                <label for="Categoriar">Imagen</label>
                <img src={imageni} width="100"  height="100"/>
                </div>
               
                {/* <div className="form-group mb-5">
                <input
                            onChange={subirArchivo} 
                            type="file"
                            className='form-control'
						    
                        />
                </div> */}


                {/* <button
                 type="submit"
				         style={{color:'white'}}
                 className="boton1 mt-1"
                >Editar</button> */}
              </form>

                   </div>
                 </div>
              </div>
           </div>
         </div>         
        <Footer/>
       
    </>
  )
}

export default PerfilUsuario