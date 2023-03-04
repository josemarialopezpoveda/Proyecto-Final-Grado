
import './ContenidoPagPrincipal.css';
import React from 'react';
import Carrusel from './Carrusel/Carrusel.js';
import CrearContenidoPagPrincipal from './CrearContenidoPagPrincipal';

function ProductosPagPrincipal(){
    <Carrusel/>
    //Devolvemos un div con varios p con el contenido props de la información de un pir de página.
    return(
    <React.Fragment> 
        <section id="services">
            <div className="sectiontitle">
                <p className="tituloInfoApp nospace font-xs">Seguimiento del tiempo sin esfuerzo</p>
                    <h6 className="headingPrincipal">Obtenga todo lo que necesita para hacer un seguimiento del tiempo fácil, rápido y preciso con <span className='tituloEmpresa'>TimeMana</span>
                </h6>
            </div>
            <ul className="padNo nospace group grid-3 m-lg-2">
            <CrearContenidoPagPrincipal/>
            </ul>
        </section>
    </React.Fragment>
    );
}

export default ProductosPagPrincipal;