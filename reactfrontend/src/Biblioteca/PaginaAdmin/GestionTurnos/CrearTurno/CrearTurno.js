//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import {Link} from 'react-router-dom';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import './CrearTurno.css';
import TurnosDelDia from './ComponentesAuxTurno/TurnosDelDia.js';
import ChecksDiasSemana from './ComponentesAuxTurno/ChecksDiasSemana.js';
import ContextoTurno from 'Biblioteca/Contextos/ContextoTurnos/ContextoTurnos.js';

function CrearTurno() {
  return (
    <React.Fragment>
        <NavAdmin/>
        <ContextoTurno>
          <h1 className='tituloCambiarTurno'>Crear Turno</h1>
          <div className='contenedorCrearTurnoForm divPequenyo '>
            <h1 className='subtitulo2'>Dias de la semana</h1>
            <div className='todosLosDiasDeLaSemanaTurno'>
              <ChecksDiasSemana diaSemana="Lunes" />
              <ChecksDiasSemana diaSemana="Martes" />
              <ChecksDiasSemana diaSemana="Miércoles" />
              <ChecksDiasSemana diaSemana="Jueves" />
              <ChecksDiasSemana diaSemana="Viernes" />
              <ChecksDiasSemana diaSemana="Sábado" />
              <ChecksDiasSemana diaSemana="Domingo" />
            </div>
            <TurnosDelDia/>

            <div className='botonAnyadirTurnoDiv'>
              <Link className="anyadirTurnoBoton" id='botonCrearTurno' to='/paginaPrincipalTurnos'>
                Crear Turno
              </Link>
            </div>
          </div>
        </ContextoTurno>
        <PiePagina/>
    </React.Fragment>
  );
}

export default CrearTurno;
