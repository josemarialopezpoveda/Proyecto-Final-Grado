import React from 'react';
import PiePagina from '../../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../../Nav/NavAdmin';
import CrearFormModAusenciaGeneral from './CrearFormModAusenciaGeneral';
import {Link} from 'react-router-dom';

function ModificarAusenciaGeneral(props) {
  return (
    <React.Fragment>
        <NavAdmin/>
        <div className='contenedorSectionFormAccionesUsuario'>
            <h1 className='tituloh1'>Modificar {props.titulo}</h1>
            <section className='sectionFormAccionesUsuario sectionPequenyo '>
              <CrearFormModAusenciaGeneral titulo={props.titulo} link={props.link}/>
            </section>
            <div className='contenedorBotonVolver modAusenciaVolver'>
                <Link to={props.link} className="linkSignInLogin" id="signIn">Volver</Link>
            </div>
        </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarAusenciaGeneral;
