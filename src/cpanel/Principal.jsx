import { Link} from "react-router-dom";
import Aside   from './Aside'
import Cuerpo  from './Cuerpo'


const Principal = () => {

  return (
			 
				
				
					<div className="content-headermt-3" 
					style={{marginTop:"80px"}}>
					  <div className="container-fluid">
						 <div className="row mb-2">
					<div className="col-sm-6">
					  <h1 className="m-0">Cpanel</h1>
					</div>{/* /.col */}
					<div className="col-sm-6">
					  <ol className="breadcrumb float-sm-right">
						<li className="breadcrumb-item">
						<Link to="/Moduloadministrador">Inicio</Link></li>
						<li className="breadcrumb-item active">Cpanel</li>
					  </ol>
					</div>
				  </div>
					  </div>
				   
			        <Cuerpo/>
					</div> 
							
				
				
			 
			
			  
  );
};

export default Principal;