import React,{useState}from 'react'
import {useNavigate}  from 'react-router-dom'
import {Link}      from 'react-router-dom'
import { useUserAuth } from "../../context/UsuarioContext";		
import { collection, addDoc} from 'firebase/firestore'
import {db,app} from '../../Configfirebase/Configfirebase'
import Aside1  from '../Aside1'
import Footer  from '../Footer'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function RegistroM() {

const [ nombreusu,setNombreusu ] = useState('')
const [ emailu,setEmailu ] = useState('')
const [errorNombre, setErrorNombre] = useState(null);
const [errorEmail,setErrorEmail]=useState(null)
const { user } = useUserAuth();
const navigate = useNavigate()
let correo=user.email

   const manejarCambioNombre = (evento) => {
        setNombreusu(evento.target.value);
        setErrorNombre(null);
      }

      const handleChangeEmail = (event) => {
        const emailc = event.target.value;
        setEmailu(emailc);
        setErrorEmail(null)
      };


    const subirImagen = async () =>
    {
               
               if (!nombreusu)
                 {
                  setErrorNombre("Debes ingresar un nombre.");
                  return;
                }//fin del if de negacion de imagen
        
               
               if(!emailu) {
                setErrorEmail("Debes ingresar una descripción.");
                 return;
               }
       
            
               setErrorNombre(null);
               setErrorEmail(null);
        
               try
               {
                 const empresaCollection = collection(db, "metodo_pago")
                 await addDoc( empresaCollection, {
                   nombre_metodo:nombreusu,
                   metodo1:emailu,
                   email_usuario:correo, 
                   
                  } )
                  setNombreusu(''); 
                  setEmailu('')

                  MySwal.fire({
                          title: "Bien hecho!",
                          text: "Registro con Exito!",
                          icon: "success",
                          button: "Felicitaciones!",
                          });
                   navigate('/ModuloAdministrador/MetodoPago')
               } catch (error) {
                 console.error("Error al subir imagen:", error);
           }
               
       
           }


  return (
    <>
       <Aside1/>
        <div className="hold-transition sidebar-mini layout-fixed">
             <div className="wrapper">
              <div className="main-panel" style={{marginTop:"80px"}}>
                <div className="content-header">
                          <div className="container-fluid">
                           <div className="row mb-2">
                        <div className="col-sm-6">
                          <h1 className="m-0">Cpanel</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                          <ol className="breadcrumb float-sm-right">
                          <li className="breadcrumb-item">
                          <a href="javascript:void(0);">Registro Metodo de Pago</a></li>
                          <li className="breadcrumb-item active">Cpanel</li>
                          </ol>
                        </div>
                        </div>
                          </div>
              </div>	
                      <div className='row mover'>
                          <div className='col-md-8 grid-margin stretch-card'>
                           <div className="card">
                      <div className="card-body">
                       <h4 className="text-center">Registro Metodo de pago</h4><br/>
                       <form className="forms-sample">
              
                       <div className="form-group">
                         <label for="Categoriar">Nombre Metodo Pago</label>
                           <input
                            type="text"
                            className='form-control'
                            placeholder="Nombre Metodo Pago ..."
                            minlength="3"
                            maxlength="30"
                            required
                            value={nombreusu} 
                            onChange={manejarCambioNombre}  
                             />
                             {errorNombre && <p style={{color:"red",textAlign:"center"}}>{errorNombre}</p>}
                            </div>                  
                       
                       <div className="form-group">
                         <label for="Categoriar">Descripción de Metodo</label>
                          <textarea
                            
                           className='form-control'
                           placeholder="Descripción metodo de pago ..."
                           cols="30" 				  
                           rows="5" 
                           required
                           onChange={handleChangeEmail}
                           value={emailu}
                            />
                           {errorEmail && <p style={{ color: 'red' ,textAlign:"center"}}>{errorEmail}</p>}         
                          </div>  
                        
                        
                        
                        
              
                        
                     
                         <div align="Center">
                           <button type='button' 
                           className='btn btn-primary mr-2'
                           onClick={subirImagen}>
                            Guardar</button>
                            <Link to="/ModuloAdministrador/MetodoPago" className='btn btn-primary mr-2'>Regresar</Link>
                          </div> 
                        
                        
                               </form>   
                      </div>
                      </div>
                          </div>
                      </div>
                    </div>
             </div>
         </div>    
    </>
  )
}
