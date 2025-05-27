import React,{useState,useEffect}from 'react'
import {Link,useParams} from 'react-router-dom'
import {db,app} from '../../Configfirebase/Configfirebase'	
import { getStorage,
         ref, 
         uploadBytes,
         getDownloadURL
        } from 'firebase/storage'
import { collection, query, where, getDocs, updateDoc,doc } from 'firebase/firestore';
import Header  from '../header'
import Aside2  from '../Aside2'
import Footer  from '../Footer'
import './formulario.css'
import Swal  from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Registro from './Registro';

const storage=getStorage(app)
const MySwal = withReactContent(Swal)

export default function PerfilNegocio() 
{
  const { correo } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState('');
  const [negocioid,setNegocioId]=useState(null)
  //const { setNegocioId } = useNegocioId()

  
  const getEmpresaById = async () => 
    {
      
        try
        {
          const usuariosRef = collection(db, 'negocios');
          const q = query(usuariosRef, where('correo', '==',correo));
          const querySnapshot = await getDocs(q);
         
           if(!querySnapshot.empty) 
           {
             const userData = querySnapshot.docs[0].data();
             const userId = querySnapshot.docs[0].id;
             setUsuario({ id: userId, ...userData });
             setEmail(userData.correo || '');
             setNegocioId(userId.id)
           }
        }catch (e) {
        console.error('Error al obtener el usuario: ', e);
       
      }   
    }       

    useEffect( () => {
        getEmpresaById()
        // eslint-disable-next-line
    }, [])
  
    
     

     

  
    
  
  return (
       <div className="hold-transition sidebar-mini layout-fixed">
         <Aside2/>
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
                        <a href="javascript:void(0);">Completar Perifl Negocio</a></li>
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
               <h4 className="text-center">Perifl Negocio </h4><br/>
                 <Registro  email={email}/>
              </div>
            </div>
        </div>
       </div>
     </div>
      <Footer/>
 </div>
    </div> 
  )}
