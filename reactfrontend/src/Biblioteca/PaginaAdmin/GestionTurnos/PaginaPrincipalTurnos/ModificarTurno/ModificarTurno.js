import React from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import CrearBodyModificarTurno from './CrearBodyModificarTurno.js';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import './ModificarTurno.css';

function ModificarTurno() {
  return (
    <React.Fragment>
        <NavAdmin/>
            <section>
                <div className='TablaDatosUser'>
                    {/*PENDIENTE BUSCADOR TURNOS*/ }
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Horas Asignadas</th>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miércoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                                <th>Sábado</th>
                                <th>Domingo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CrearBodyModificarTurno horaAsignada="Hora Inicio Mañana"/>
                            <CrearBodyModificarTurno horaAsignada="Hora Fin Mañana"/>
                            <CrearBodyModificarTurno horaAsignada="Hora Inicio Tarde"/>
                            <CrearBodyModificarTurno horaAsignada="Hora Fin Tarde"/>
                            <CrearBodyModificarTurno horaAsignada="Hora Inicio Noche"/>
                            <CrearBodyModificarTurno horaAsignada="Hora Fin Noche"/>
                        </tbody>

                    </Table>
                </div>
                <div className='divFlexBotones'>
                    <div className='contenedorBotonModificarTurno'>
                        <Link className="linkSignInLogin" id="signIn" to="/verTurno">Modificar Turno</Link>
                        <Link to="/verTurno" className="linkSignInLogin" id="signIn">Volver</Link>
                    </div>
                </div>
            </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarTurno;
