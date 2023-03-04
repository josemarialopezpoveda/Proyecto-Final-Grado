//Importamos los estilos CSS del pie de página.
import React from 'react';
import NavAdminLogin from '../Nav/NavAdminLogin';
import './RegistrarseAdmin.css';
import CrearFormRegistroAdmin from './CrearFormRegistroAdmin';
import ContextoRegistroAdmin from 'Biblioteca/Contextos/ContextoRegistroAdmin/ContextoRegistroAdmin';

function RegistrarseAdmin() {
    //Devolvemos un div con varios p con el contenido props de la información de un por de página.
    return (
        <React.Fragment>
            <NavAdminLogin/>
            <div id='contenedorLogin'>
                <img className='fotoFondoLogin' alt="foto de fondo del login"
                     src={require("../../../../img/imagenFondoLogin2.jpg")}/>
                <div className="imagenDeFondoLogin contenedorCrearCuentaForm2 contenedorCrearCuentaForm"
                     id='imagenDeFondoLogin'>
                    <div className="container contenedorRegistrarse" id="container">
                        <div className='formularioCrearCuenta'>
                            <ContextoRegistroAdmin>
                                <CrearFormRegistroAdmin/>
                            </ContextoRegistroAdmin>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default RegistrarseAdmin;
