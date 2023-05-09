//Importamos los estilos CSS del pie de página.
import React from 'react';
import NavAdmin from '../Nav/NavAdmin';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import {Link} from 'react-router-dom';
import TiemposEmpleado from './TiemposEmpleado';

function VerTiemposEmpleado(){
    return(
    <React.Fragment>
        <NavAdmin/>
        <section>
            <h1 className='text-center tituloH1'>Tiempos del empleado</h1>
            <div className='contenedorBotonCrearCorreo divFlexFichar'>
                <Link to="/crearTiempo" className='crearCorreoBoton'>Crear Tiempo</Link>
            </div>
            <TiemposEmpleado/>
            <div className='contenedorBotonVolver text-center'>
                <Link to="/accionesEmpleados" className="linkSignInLogin botonInfoCliente" id="signIn">Volver</Link>
            </div>
        </section>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default VerTiemposEmpleado;
