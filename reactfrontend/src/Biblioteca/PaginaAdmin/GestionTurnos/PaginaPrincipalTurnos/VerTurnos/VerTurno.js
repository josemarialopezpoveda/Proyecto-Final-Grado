import React from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table';
import CrearBodyTurno from './CrearBodyTurno';
import { Link } from "react-router-dom";
import './VerTurno.css'


function VerTurno() {
  return (
    <React.Fragment>
        <NavAdmin/>
            <div>
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
                        <CrearBodyTurno/>
                    </Table>
                </div>
                <div className='contenedorBotonModificarTurno'>
                    <Link className="linkSignInLogin" id="signIn" to="/modificarTurno">Modificar Turno</Link>
                    <Link to="/paginaPrincipalTurnos" className="linkSignInLogin" id="signIn">Volver</Link>
                </div>
            </div>
        <div className="ContenedorBajarFooter">
            <div className='BajarFooter'>
                <PiePagina/>
            </div>
        </div>
    </React.Fragment>
  );
}

export default VerTurno;
