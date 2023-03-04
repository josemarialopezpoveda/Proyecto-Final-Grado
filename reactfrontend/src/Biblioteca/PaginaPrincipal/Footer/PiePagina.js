//Importamos los estilos CSS del pie de página.
import './PiePagina.css';
import React from 'react';
import Copy  from './CopyRight';
import Footer from './Footer';

function PiePagina(){
    //Devolvemos un div con varios p con el contenido props de la información de un pir de página.
    return(
    <React.Fragment>
        <div className='contenedorTodoFooter'>
            <Footer/>
            <Copy/>
        </div>
    </React.Fragment>
    );
}

export default PiePagina;