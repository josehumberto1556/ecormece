import { useState, useEffect } from 'react';
import {app,db} from '../../Configfirebase/Configfirebase'
import {collection,
    getDocs,
    getDoc,
    deleteDoc,
    doc} from 'firebase/firestore'

export const Neg=()=> {
  const [negocio, setNegocio] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const  empresaCollection=collection(db,"negocios")

  const obtenerNegocios= async () => {
    try {
       const data=await getDocs(empresaCollection)
         setNegocio(
             data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
         )
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerNegocios()
  }, []);

  return { negocio, cargando, error };
}

