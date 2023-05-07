import React from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import CrearBodyTurno from '../../../GestionTurnos/PaginaPrincipalTurnos/VerTurnos/CrearBodyTurno';
import NavAdmin from '../../../Nav/NavAdmin';
import {Link} from 'react-router-dom';

function VerTurnoCliente() {
  return (
    <React.Fragment>
        <NavAdmin/>
        <section className="contenedorEmpleadosAcciones">
                <div className='TablaDatosUser'>
                    {/*PENDIENTE BUSCADOR TURNOS*/ }
                    <CrearBodyTurno/>
                </div>
            <div className='contenedorBotonVolver verHorarioClienteVolver '>
                <p className='botonCambiarTurno'><Link className="botonInfoCliente" to="/cambiarTurno">Cambiar Turno</Link></p>
                <Link to="/pagInfoClienteSel" className="botonInfoCliente">Volver</Link>
            </div>
          </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerTurnoCliente;
