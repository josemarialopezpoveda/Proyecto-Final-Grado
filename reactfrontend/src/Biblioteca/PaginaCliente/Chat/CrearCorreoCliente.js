//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import NavCliente from '../Nav/NavCliente';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './CrearCorreoCliente.css';
import {Link} from 'react-router-dom';

function CrearCorreoCliente() {
  return (
    <React.Fragment>
        <NavCliente/>
            <div className='contenedorFormularioCrearCorreo divContenedorFormCrearCorreo'>
                <Form id="anyadir">
                    <h1>Crear Correo</h1>
                    <div className='divContenedorCampo'>
                        <p>Título</p>
                        <Form.Group className="mb-3">
                            <Form.Control required type="text"/>
                        </Form.Group>
                    </div>
                    <div className='divContenedorCampo'>
                        <p>Para</p>
                        <Form.Group className="mb-3">
                            <Form.Control required size="lg" type="email"/>
                        </Form.Group>
                    </div>
                    <div className='divContenedorCampo'>
                        <InputGroup className='textAreaPequenyo'>
                            <InputGroup.Text>Mensaje:</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="With textarea" />
                        </InputGroup>
                    </div>
                    <div className='contenedorLinkEnviarCorreo'>
                        <Link className='enviarCorreoBoton' to="/chatCliente">Enviar Correo</Link>
                    </div>
                </Form>
            </div>
            <div className='ContenedorBajarFooter'>
                <div className='BajarFooter'>
                    <PiePagina/>
                </div>
            </div>
    </React.Fragment>
  );
}

export default CrearCorreoCliente;
