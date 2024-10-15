import {db} from '../Configfirebase/Configfirebase'
import {collection, getDocs,query,where} from "firebase/firestore"



export   const ListadoPo=async()=>
{
   
      
    let n;
//   const [a,setA]=useState('')
   const collectionRef=collection(db,"m_productos")
   const snaps=await getDocs(collectionRef)
   const productos=[]

  for await(const snap of snaps.docs)
  {

     const producto=snap.data()
     producto.id=snap.id
     productos.push(producto)

  }
  console.log(productos)
  
  return productos    //return producto
        
     
}


