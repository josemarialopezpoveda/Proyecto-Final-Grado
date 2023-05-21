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
                        <a className='facebook' href='https://www.facebook.com/profile.php?id=100092667468398'>
                            <FontAwesomeIcon icon={faFacebook}/>
                        </a> 
                        <a className='twitter' href='https://twitter.com/TimeManaApp'>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </a>
                        <a className='instagram' href='https://www.instagram.com/timemana__official/'>
                            <div><FontAwesomeIcon icon={faInstagram}/></div>
                        </a> 
                        <a className='linkedin' href='https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAEOG0m8B4QeXIyGZYwZIEB1lcCO5NY7Xllw&keywords=timemana%20__official&origin=RICH_QUERY_SUGGESTION&position=0&searchId=80c8a2f7-4aff-4435-9977-0c7359dfed03&sid=!Sz'>
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a> 
                        <a className='tiktok' href='https://www.tiktok.com/@timemana__official'>
                            <FontAwesomeIcon icon={faTiktok}/>
                        </a> 
                    </div>
            </footer>
        </div>
    
    );
}

export default Footer;

