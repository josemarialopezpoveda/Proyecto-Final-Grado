import React from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import CrearBodyTurno from '../../../GestionTurnos/PaginaPrincipalTurnos/VerTurnos/CrearBodyTurno';
import NavAdmin from '../../../Nav/NavAdmin';
import {Link} from 'react-router-dom';
import './VerAusenciasGenerales.css';

function VerTurnoCliente() {
  return (
    <React.Fragment>
        <NavAdmin/>
        <section className="contenedorEmpleadosAcciones">
                <div className='TablaDatosUser'>
                    {/*PENDIENTE BUSCADOR TURNOS*/ }
                    <CrearBodyTurno/>
                </div>
            <div className='contenedorBotonVolver verHorarioClienteVolver divFlexTurnoSelEmpleado'>
                <Link className="botonInfoCliente margin10" to="/cambiarTurno">Cambiar Turno</Link>
                <Link to="/pagInfoClienteSel" className="botonInfoCliente margin10">Volver</Link>
            </div>
          </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerTurnoCliente;
