import React from 'react';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../Nav/NavAdmin';
import Table from 'react-bootstrap/Table';
import ContenidoTablaTipoAusencias from './ContenidoTablaTipoAusencias';
import {Link} from 'react-router-dom';
import './VerTiposAusencias.css';

function VerTiposAusencias() {
  return (
    <React.Fragment>
        <NavAdmin/>
        <section className="contenedorEmpleadosAcciones">
            <h1 className='tituloh1'>Tipos Ausencias</h1>
            <div className='contenedorBotonCrearCorreo'>
                <Link className='crearCorreoBoton' to="/anyadirTipoAusencia">Añadir tipo de ausencia</Link>
            </div>
            <ContenidoTablaTipoAusencias/>
        </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerTiposAusencias;
