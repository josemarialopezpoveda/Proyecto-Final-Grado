import React from 'react';
import NavAdmin from '../../Nav/NavAdmin';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import CrearFormModificarDatosEmpresa from './CrearFormModificarDatosEmpresa';

function ModificarDatosEmpresa() {

  return (
    <React.Fragment>
      <NavAdmin/>
      <div className='contenedorSectionFormAccionesUsuario'>
        <h1 className='text-center tituloH1'>Modificar Datos de la empresa</h1>
        <section className='sectionPequenyo sectionFormAccionesUsuario'>
          <CrearFormModificarDatosEmpresa/>
        </section>
      </div>
      <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarDatosEmpresa;
