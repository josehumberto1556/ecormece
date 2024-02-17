import Principal  from  './Principal'
import Aside      from  './Aside'
import Footer  from './Footer'
import 'bootstrap/dist/css/bootstrap.css'
function ModuloAdministrador() {
	
  return (
  <>
     <div>
	  <Aside/>
	  <Principal/>
	  <Footer/>
    </div>
  </>
  )
}

export default ModuloAdministrador