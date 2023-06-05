import React from 'react';
import NavAdmin from '../../Nav/NavAdmin';
import './Modificar.css';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import CrearFormModificar from './CrearFormModificar';
import {Link} from 'react-router-dom';

function Modificar() {
  return (
    <React.Fragment>
      <NavAdmin/>
      <div className='contenedorSectionFormAccionesUsuario'>
        <div className='FlexBoton'>
            <h1 className='text-center tituloH1'>Modificar Empleado</h1>
            <div className='contenedorBotonCrearCorreo'>
                <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/accionesEmpleados">Volver</Link>
            </div>
        </div>
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
