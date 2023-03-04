//Importamos los estilos CSS del pie de página.
import './ImagenFondo.css';
import React from 'react';
import Header from './Header';
import Carrusel from '../Carrusel/Carrusel';

function ImagenFondo(){
    //Devolvemos un div con varios p con el contenido props de la información de un pir de página.
    return(
    <React.Fragment>
        <div>
            <Header/>
            <Carrusel/>
        </div>
    </React.Fragment>
    );
}

export default ImagenFondo;