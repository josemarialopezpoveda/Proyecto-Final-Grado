//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina.js';
import NavAdmin from '../../Nav/NavAdmin.js';
import Table from 'react-bootstrap/Table';
import ListarTurnos from './ListarTurnos/ListarTurnos.js';
import { Link } from "react-router-dom";
import './PaginaPrincipalTurnos.css';

function PaginaPrincipalTurnos() {
  return (
    <React.Fragment>
        <NavAdmin/>
        <section className='sectionTamanyoFijo'>
            <h1 className='tituloh1'>Turnos</h1>
            <div className='contenedorBotonCrearCorreo'>
                <Link className='crearCorreoBoton' to="/crearTurno">Crear Turno</Link>
            </div>
            {/*PENDIENTE BUSCADOR TURNOS*/ }
            <ListarTurnos/>  
        </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default PaginaPrincipalTurnos;
