import React from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table'
import './VerAusenciasGenerales.css';
import VerInfoAusencia from './VerInfoAusencia';
import {Link} from 'react-router-dom';

function VerAusenciasGenerales(props) {
  return (
    <React.Fragment>
        <NavAdmin/>
          <div className='contenedorVerAusenciasGenerales'>
            <h1>Ver {props.titulo}</h1>
            <div className='TablaDatosUser'>
              <Table striped>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th className='campoOpcional'>Fecha Inicio</th>
                        <th className='campoOpcional'>Fecha Fin</th>
                        <th className='campoOpcional'>Justificada</th>
                        <th className='campoOpcional'>Tipo Ausencia</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                  <VerInfoAusencia link={props.link}/>
                </tbody>
              </Table>
            </div>
          </div>
          <div className='contenedorBotonVolver'>
                <Link to="/pagInfoClienteSel" className="botonInfoCliente">Volver</Link>
          </div>
          <div className='ContenedorBajarFooter'>
            <div className='BajarFooter'>
              <PiePagina/>
            </div>
          </div>
    </React.Fragment>
  );
}

export default VerAusenciasGenerales;
