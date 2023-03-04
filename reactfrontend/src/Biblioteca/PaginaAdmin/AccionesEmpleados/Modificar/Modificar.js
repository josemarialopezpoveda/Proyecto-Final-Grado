import React from 'react';
import NavAdmin from '../../Nav/NavAdmin';
import './Modificar.css';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import CrearFormModificar from './CrearFormModificar';


function Modificar() {
  return (
    <React.Fragment>
      <NavAdmin/>
      <div className='contenedorSectionFormAccionesUsuario'>
        <h1 className='text-center tituloH1'>Modificar Empleado</h1>
        <section className='sectionPequenyo sectionTamanyoFijoGrande sectionFormAccionesUsuario sectionFormMarginBottom'>
          <CrearFormModificar/>
        </section>
      </div>
      <div className='marginTopDiv'>
        <PiePagina/>
      </div>
    </React.Fragment>
  );
}

export default Modificar;
