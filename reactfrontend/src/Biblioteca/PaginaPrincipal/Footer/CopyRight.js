//Importamos los estilos CSS del pie de página.
import './CopyRight.css';
import React from 'react';

function Copyright(){
    //Variable para almacenar el año actual.
    let anyo = new Date().getFullYear();

    //Devolvemos un div con varios p con el contenido props de la información de un pir de página.
    return(
    <React.Fragment>
        <div className="ContenedorCopyright">
            <div id="copyright" className="hoc clear"> 
                <p className="fl_left">Copyright &copy; {anyo} - Todos los derechos reservados - Timemana</p>
                <p></p>
            </div>
        </div>
        <a id="backtotop" href="#top"><i className="fas fa-chevron-up"></i></a>
    </React.Fragment>
    
    );
}

export default Copyright;
