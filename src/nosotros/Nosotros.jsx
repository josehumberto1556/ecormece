import Navbar  from "../navbar/Navbar"
import Navbar1 from "../navbar/Navbar1"
import Footer  from "../piepagina/Footer"
import "./Nosotros.css"

function Nosotros() {
  return (
  <>
   <Navbar/>
	<Navbar1/>
	 <main class="page-content about-page">
        <div class="container">
            <h1 class="page-title">Sobre Nosotros</h1>
            <p class="page-description">Descubre la historia y la misión detrás de Liberty-Commerce.</p>

            <section class="about-intro">
                <img src="https://via.placeholder.com/600x400/007bff/ffffff?text=Nuestra+Historia" alt="Nuestra Historia"/>
                <div class="about-text">
                    <h2>Nuestra Historia y Compromiso</h2>
                    <p>En **Liberty-Commerce**, nacimos en 2020 con la visión de crear un espacio donde la calidad y la accesibilidad se encuentren. Desde nuestra sede en **Rubio, Táchira, Venezuela**, nos hemos dedicado a seleccionar los mejores productos para ofrecer a nuestros clientes una experiencia de compra online inigualable.</p>
                    <p>Creemos firmemente en la libertad de elección y en la transparencia, y estos valores son el pilar de cada interacción y cada producto que ofrecemos. Nuestro compromiso es contigo: brindarte productos excepcionales y un servicio al cliente que supere tus expectativas.</p>
                </div>
            </section>

            <section class="our-values">
                <h2>Nuestros Valores</h2>
                <div class="values-grid">
                    <div class="value-item">
                        <i class="fas fa-lightbulb" style={{color:"#FFCA4B"}}></i>
                        <h3>Innovación</h3>
                        <p>Buscamos constantemente las últimas tendencias y tecnologías para ofrecerte productos de vanguardia.</p>
                    </div>
                    <div class="value-item">
                        <i class="fas fa-handshake" style={{color:"#FFCA4B"}}></i>
                        <h3>Confianza</h3>
                        <p>Construimos relaciones duraderas basadas en la honestidad y la fiabilidad con cada cliente.</p>
                    </div>
                    <div class="value-item">
                        <i class="fas fa-heart" style={{color:"#FFCA4B"}}></i>
                        <h3>Pasión</h3>
                        <p>Nos apasiona lo que hacemos y nos esforzamos por que esa pasión se refleje en cada envío.</p>
                    </div>
                    <div class="value-item">
                        <i class="fas fa-users" style={{color:"#FFCA4B"}}></i>
                        <h3>Comunidad</h3>
                        <p>Fomentamos una comunidad de clientes satisfechos y apoyamos el comercio local.</p>
                    </div>
                </div>
            </section>

            {/* <section className="team-section">
                <h2>Conoce a Nuestro Equipo</h2>
                <div class="team-grid">
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150x150?text=Juan+P" alt="Juan Pérez"/>
                        <h3>Juan Pérez</h3>
                        <p>CEO y Fundador</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150x150?text=Maria+G" alt="María González"/>
                        <h3>María González</h3>
                        <p>Directora de Marketing</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150x150?text=Carlos+R" alt="Carlos Rodríguez"/>
                        <h3>Carlos Rodríguez</h3>
                        <p>Jefe de Operaciones</p>
                    </div>
                </div>
            </section> */}
        </div>
    </main>		
    <Footer/>
  </>
  );
}

export default Nosotros;
