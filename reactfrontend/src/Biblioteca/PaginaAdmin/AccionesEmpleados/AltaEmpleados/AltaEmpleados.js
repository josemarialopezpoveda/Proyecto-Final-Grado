import React from 'react';
import NavAdmin from '../../Nav/NavAdmin';
import './AltaEmpleados.css';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import CrearFormularioAltaEmpleados from './CrearFormularioAltaEmpleados';

function AltaEmpleados() {
  
  return (
    <React.Fragment>
      <NavAdmin/>
      <div className='contenedorSectionFormAccionesUsuario'>
        <h1 className='text-center tituloH1'>Dar de alta empleados</h1>
        <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottom'>
          <CrearFormularioAltaEmpleados/>
        </section>
      </div>
      <PiePagina/>
    </React.Fragment>
  );
}

export default AltaEmpleados;
