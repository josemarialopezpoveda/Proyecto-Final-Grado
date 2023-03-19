//Importamos los estilos CSS del pie de página.
import {React} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter, faTiktok, faLinkedin } from '@fortawesome/free-brands-svg-icons';


function Footer(){
    //Devolvemos un div con varios p con el contenido props de la información de un pir de página.
    return(
        <div className="ContenedorFooter">
            <footer id="footer" className="hoc clear">
                    <h1>Únase a nosotros en las redes sociales</h1>
                    <h2>Nos encantaría saber de usted</h2>
                    <div className=' p-2 contenedorIconos social-media-icons-white d-flex jsutify-content-evently'>
                        <a className='facebook' href='https://www.facebook.com/'>
                            <FontAwesomeIcon icon={faFacebook}/>
                        </a> 
                        <a className='twitter' href='https://twitter.com/home?lang=es'>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                        <a className='instagram' href='https://www.instagram.com'>
                            <div><FontAwesomeIcon icon={faInstagram}/></div>
                        </a> 
                        <a className='linkedin' href='https://es.linkedin.com/'>
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a> 
                        <a className='tiktok' href='https://www.tiktok.com'>
                            <FontAwesomeIcon icon={faTiktok}/>
                        </a> 
                    </div>
            </footer>
        </div>
    
    );
}

export default Footer;

