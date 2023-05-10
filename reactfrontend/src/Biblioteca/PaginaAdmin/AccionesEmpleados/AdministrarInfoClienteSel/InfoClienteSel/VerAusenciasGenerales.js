import React from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table'
import './VerAusenciasGenerales.css';
import VerInfoAusencia from './VerInfoAusencia';
import {Link} from 'react-router-dom';

function VerAusenciasGenerales(props) {
  let titulo;
  if(props.titulo === "Vacaciones"){
    titulo = "Vacaciones";
  }else{
    titulo = props.titulo + "s";
  }
  return (
    <React.Fragment>
        <NavAdmin/>
          <section>
            <div className='contenedorVerAusenciasGenerales'>
              <h1>Ver {titulo}</h1>
              <div className='contenedorBotonCrearCorreo divFlexFichar'>
              <Link className="crearCorreoBoton" to="/anyadirAusencia">Añadir Ausencia</Link>
              </div>
              <VerInfoAusencia titulo={props.titulo} link={props.link}/>
            </div>
            <div className='contenedorBotonVolver'>
                <Link to="/pagInfoClienteSel" className="botonInfoCliente">Volver</Link>
            </div>
          </section>
          <PiePagina/>
    </React.Fragment>
  );
}

export default VerAusenciasGenerales;
