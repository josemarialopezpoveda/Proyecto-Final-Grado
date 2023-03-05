import React from 'react';
import Table from 'react-bootstrap/Table';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import CrearBodyTurno from '../../../GestionTurnos/PaginaPrincipalTurnos/VerTurnos/CrearBodyTurno';
import NavAdmin from '../../../Nav/NavAdmin';
import {Link} from 'react-router-dom';

function VerTurnoCliente() {
  return (
    <React.Fragment>
        <NavAdmin/>
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
            <div className='contenedorBotonVolver verHorarioClienteVolver '>
                <p className='botonCambiarTurno'><Link className="botonInfoCliente" to="/cambiarTurno">Cambiar Turno</Link></p>
                <Link to="/pagInfoClienteSel" className="botonInfoCliente">Volver</Link>
            </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerTurnoCliente;
