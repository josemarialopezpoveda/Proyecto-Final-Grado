//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import './CrearTurno.css';
import TurnosDelDia from './ComponentesAuxTurno/TurnosDelDia.js';
import ChecksDiasSemana from './ComponentesAuxTurno/ChecksDiasSemana.js';
import ContextoTurno from 'Biblioteca/Contextos/ContextoTurnos/ContextoTurnos.js';
import {Link} from 'react-router-dom';


function CrearTurno() {
  return (
    <React.Fragment>
        <NavAdmin/>
        <ContextoTurno>
          <div className='FlexBoton'>
              <h1 className='text-center tituloH1'>Crear Turno</h1>
              <div className='contenedorBotonCrearCorreo'>
                  <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/paginaPrincipalTurnos">Volver</Link>
              </div>
          </div>
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
          </div>
        </ContextoTurno>
        <PiePagina/>
    </React.Fragment>
  );
}

export default CrearTurno;
