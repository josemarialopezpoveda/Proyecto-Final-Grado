import React from 'react';
import NavAdmin from '../../Nav/NavAdmin';
import './AltaEmpleados.css';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import CrearFormularioAltaEmpleados from './CrearFormularioAltaEmpleados';
import {Link} from 'react-router-dom';

function AltaEmpleados() {
  
  return (
    <React.Fragment>
      <NavAdmin/>
      <div className='contenedorSectionFormAccionesUsuario'>
        <div className='FlexBoton'>
          <h1 className='text-center tituloH1'>Alta empleado</h1>
          <div className='contenedorBotonCrearCorreo'>
              <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/accionesEmpleados">Volver</Link>
          </div>
        </div>
        <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottom'>
          <CrearFormularioAltaEmpleados/>
        </section>
      </div>
      <PiePagina/>
    </React.Fragment>
  );
}

export default AltaEmpleados;
