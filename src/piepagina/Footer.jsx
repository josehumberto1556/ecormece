import "./Footer.css"


function Navbar1() {


  return (
    <>
   
     <footer className="footer-section Footer">
			<div className="container relative">
				

				<div className="border-top copyright">
					  <div className="container">
            <div className="footer-columns">
                <div className="footer-column about-us">
                    <h3>Liberty-Commerce</h3>
                    <p>Tu destino online para encontrar los mejores productos al mejor precio. Calidad y servicio garantizados.</p>
                </div>
                <div className="footer-column quick-links">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/ListadoCategorias">Tienda</a></li>
                        <li><a href="#">Política de Privacidad</a></li>
                        <li><a href="#">Términos y Condiciones</a></li>
                    </ul>
                </div>
                <div className="footer-column contact-info">
                    <h3>Contáctanos</h3>
                    {/* <p><i class="fas fa-map-marker-alt"></i> 123 Calle Ficticia, Ciudad, País</p> */}
                    <p><i className="fas fa-envelope" style={{background:"linear-gradient(#FFCA4B 70%,#FFCA4B) !important"}}></i> info@libertycommerce.com</p>
                    {/* <p><i class="fas fa-phone"></i> +123 456 7890</p> */}
                </div>
                <div className="footer-column social-media">
                    <h3>Síguenos</h3>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Liberty-Commerce. Todos los derechos reservados.</p>
            </div>
        </div>
				</div>

			</div>
		</footer>
   
    </>
  );
}

export default Navbar1;
