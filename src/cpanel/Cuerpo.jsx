import React from "react";
import { useUserAuth } from "../context/UsuarioContext";



const Cuerpo = () => {
 let fechas=new Date()
 const { user } = useUserAuth();
 let nom=user.email
const fecha=new Date().toLocaleDateString()
  return (
  <div>

  
  <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="callout callout-info">
              <h5><i className="fas fa-info"></i> Nota:</h5>
             Bienvenido a el cpanel Adimistrativo usuario:  
			 {nom}
            </div>
			
			<div className="invoice p-3 mb-3">
              
              <div className="row">
                <div className="col-12">
                  <h4>
                    <i className="fas fa-globe"></i> Salvemos Argentina.
                  </h4>
                </div>
               </div> 

                   <div className="row invoice-info">
                <div className="col-sm-4 invoice-col">
                     En esta secci&oacute;n podras manipular la
				 informaci&oacute;n del sistema
                  <address>
                    <strong>Admin:{nom}, Inc.</strong><br/>
                    Administrador autoriazado<br/>
                    fecha,{fecha}<br/>
                    <br/><br/>
                  </address>
                </div>

                <div className="col-sm-4 invoice-col">
                 
               
                </div>
                
              </div>
          			   
             </div> 

             			 
			  
			
			
		  </div>
         </div>	
       	</div>		  
   </section>
   
</div>
    

  );
};

export default Cuerpo;
