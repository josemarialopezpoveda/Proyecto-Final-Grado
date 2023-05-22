//Importamos los estilos CSS del pie de página.
import React from 'react';
import Table from 'react-bootstrap/Table';
import NavAdmin from '../Nav/NavAdmin';
import './Empleados.css';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import ListarActividadEmpleados from './ListarActividadEmpleados.js';
import {Link} from 'react-router-dom';

function Empleados(){
    
    return(
    <React.Fragment>
        <NavAdmin/>
        <section className='sectionFormMarginBottom'>
            <h1 className='text-center tituloH1'>Empleados Online</h1>
            <div className='contenedorBotonCrearCorreo'>
                <Link className='crearCorreoBoton margin0-10' to="/empleadosProblemasTurnos">Empleados sin turno</Link>
                <Link className='crearCorreoBoton margin0-10' to="/listadoIncidenciasPresencia">Listado Incidencias</Link>
                <Link className='crearCorreoBoton margin0-10' to="/accionesEmpleados">Gestion Empleados</Link>
                <Link className='crearCorreoBoton margin0-10' to="/altaEmpleado">Alta empleado</Link>
            </div>
            <ListarActividadEmpleados/>
            <div className='contenedorBotonVolver text-center'>
                <Link to="/accionesEmpleados" className="linkSignInLogin botonInfoCliente" id="signIn">Volver</Link>
            </div>
        </section>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default Empleados;
