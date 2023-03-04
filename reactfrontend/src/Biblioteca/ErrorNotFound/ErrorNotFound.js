import React from 'react';
import './ErrorNotFound.css';
import {Link} from 'react-router-dom';


function ErrorNotFound() {
  return(
    <React.Fragment>
        <div id="contenedorLogin">
        <img
            className="fotoFondoLogin"
            alt="foto de fondo del login"
            src={require("../../img/imagenFondoLogin.jpg")}
        />
        <div className="imagenDeFondoLogin paginaError">
            <div className="container ContenedorbotonCetrado">
                <h1 className="tituloLogin text-center mt-5">Error inesperado página no encontrada</h1>
                <div>
                    <p>La página que buscas no pertenece a nuestro sitio web</p>
                </div>
                <div className="ContenedorLoginBotones">
                    <Link to="/" type='button' className="linkSignInLogin botonCentrado" id="signIn">Volver a TimeMana</Link>
                </div>
            </div>
        </div>
        </div>
    </React.Fragment>
    )
}

export default ErrorNotFound;
