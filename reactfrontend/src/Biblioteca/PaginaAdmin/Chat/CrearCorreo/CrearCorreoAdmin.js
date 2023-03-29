//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './CrearCorreoAdmin.css';
import {Link} from 'react-router-dom';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import { formatDate } from "../../../FuncionesAuxiliares/Funciones";
import CrearOpcionHorarioCorreo from './CrearOpcionHorarioCorreo.js';

function CrearCorreoAdmin() {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("Informar Vacaciones");
    const [fechaInicio, setFechaInicio] = useState("Fecha Inicio a Introducir");
    const [fechaFin, setFechaFin] = useState("Fecha Fin a Introducir");
    const [form, setForm] = useState({});
    const [comprobarCampo, setComprobarCampo] = useState(false);
    
    /**
   * Devuelve un test del pattern informando el texto es correcto o incorrecto en el caso de que el estado este a true.
   * @param {testPattern} testPattern Es un RegEx.
   * @returns
   */
  const validarCampos = (testPattern) => {
    if (comprobarCampo === true) {
      return testPattern;
    }
  };

    const crearCorreo = () =>{
        if(opcionSeleccionada === "Informar Vacaciones" || opcionSeleccionada === "Informar Baja"){
            return(
                <div className='contenedorDatePickerCorreo divMensajeCorreo'>
                    <div className="divContenedorCampo2">
                        <div className="divContenedorCampo">
                        <p className="letrapequenya">Fecha inicio</p>
                        <Form.Group className="grupoInputPequenyo">
                            <Form.Control
                            size="lg"
                            type="date"
                            onChange={(e) => setFechaInicio({ ...form, fnac: e.target.value.trim() })}
                            defaultValue={form.fnac}
                            isValid={validarCampos(
                                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fnac))
                            )}
                            isInvalid={validarCampos(
                                !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fnac))
                            )}
                            />
                        </Form.Group>
                        </div>
                        <div className="divContenedorCampo">
                        <p className="letrapequenya">Fecha fin</p>
                        <Form.Group className="grupoInputPequenyo">
                            <Form.Control
                            size="lg"
                            type="date"
                            onChange={(e) => setFechaFin({ ...form, fechaAlta: e.target.value.trim() })}
                            isValid={validarCampos(
                                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fechaAlta))
                            )}
                            isInvalid={validarCampos(
                                !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fechaAlta))
                            )}
                            />
                        </Form.Group>
                        </div>
                    </div>
                </div>
            );
        }else if(opcionSeleccionada === "Informar Nuevo Horario"){
            return(
                <div>
                    <CrearOpcionHorarioCorreo/>
                </div>
            );
        }else if(opcionSeleccionada === "Otros"){
            return(
            <div>
                <Form.Group className="mb-3">
                    <Form.Label>Título:</Form.Label>
                    <Form.Control required size="lg" type="text"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Para:</Form.Label>
                    <Form.Control required size="lg" type="email"/>
                </Form.Group>
            </div>
            );
        }
    }
  return (
    <React.Fragment>
        <NavAdmin/>
                <div className=''>
                    <h1 className='text-center tituloH1'>Crear Correo</h1>
                    <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottomTipoAusencia'>
                    <Form id="anyadir">
                        <div className='contenedorSelectCrearCorreoAdmin'>
                            <div className="divContenedorCampo2">
                                <div className="divContenedorCampo">
                                    <Form.Select className='selectCrearCorreoAdmin' aria-label="Default select example" onChange={(e)=>{setOpcionSeleccionada(e.target.value) }}>
                                        <option value="Informar Vacaciones">Informar Vacaciones</option>
                                        <option value="Informar Baja">Informar Baja</option>
                                        <option value="Informar Nuevo Horario">Informar Nuevo Horario</option>
                                        <option value="Otros">Otros</option>
                                    </Form.Select>
                                </div>
                            </div>
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
                            {crearCorreo()}
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

export default CrearCorreoAdmin;
