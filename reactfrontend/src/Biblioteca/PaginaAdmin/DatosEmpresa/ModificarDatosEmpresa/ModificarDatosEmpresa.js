import React from 'react';
import NavAdmin from '../../Nav/NavAdmin';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import CrearFormModificarDatosEmpresa from './CrearFormModificarDatosEmpresa';
import {Link} from 'react-router-dom';


function ModificarDatosEmpresa() {

  return (
    <React.Fragment>
      <NavAdmin/>
      <div className='contenedorSectionFormAccionesUsuario'>
        <div className='FlexBoton'>
          <h1 className='text-center tituloH1'>Modificar Datos de la empresa</h1>
          <div className='contenedorBotonCrearCorreo'>
              <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/datosEmpresa">Volver</Link>
          </div>
        </div>
        <section className='sectionPequenyo sectionFormAccionesUsuario'>
          <CrearFormModificarDatosEmpresa/>
        </section>
      </div>
      <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarDatosEmpresa;
