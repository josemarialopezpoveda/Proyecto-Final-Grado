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
                <div className=''>
                    <h1 className='text-center tituloH1'>Crear Correo</h1>
                    <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottomTipoAusencia'>
                    <Form id="anyadir">
                        <div className='contenedorSelectCrearCorreoAdmin'>
                            <div className="divContenedorCampo2">
                                <div className="divContenedorCampo">
                                    <Form.Select className='selectCrearCorreoAdmin' aria-label="Default select example">
                                        <option value="Informar Vacaciones">Informar Vacaciones</option>
                                        <option value="Informar Baja">Informar Baja</option>
                                        <option value="Informar Nuevo Horario">Informar Nuevo Horario</option>
                                        <option value="Otros">Otros</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </div>
                            <div className="divContenedorCampo divMensajeCorreo">
                                    <p>Título</p>
                                    <Form.Group className="mb-3 width500">
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                    />
                                    </Form.Group>
                            </div>
                            <div className="divContenedorCampo divMensajeCorreo">
                                    <p>Para</p>
                                    <Form.Group className="mb-3 width500">
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                    />
                                    </Form.Group>
                            </div>
                            <div className="divContenedorCampo divMensajeCorreo">
                                <p>Mensaje</p>
                                <Form.Group className="mb-3 width500">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    //defaultValue={form.nombre}
                                    //onChange={(e) => setForm({ ...form, nombre: e.target.value.trim() })}
                                    //isValid={validarCampos(/^(?!\s*$).+/.test(form.nombre))}
                                    //isInvalid={validarCampos(!/^(?!\s*$).+/.test(form.nombre))}
                                />
                                </Form.Group>
                            </div>
                        <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                            <Link to="/verTipoAusencias" className="anyadirUsuarioDatos">Volver</Link>
                            <Link className='anyadirUsuarioDatos' to="/chatAdmin">Enviar Correo</Link>
                        </div>
                    </Form>
                    </section>
                </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default CrearCorreoCliente;
