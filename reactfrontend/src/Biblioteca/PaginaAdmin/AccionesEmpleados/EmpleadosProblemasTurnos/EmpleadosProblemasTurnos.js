//Importamos los estilos CSS del pie de página.
import React from 'react';
import {Link} from 'react-router-dom';
import ListarEmpleadosConProblemas from './ListarEmpleadosConProblemas';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin';


function EmpleadosProblemasTurnos(){  
    return(
    <React.Fragment>
        <NavAdmin/>
        <section className="contenedorEmpleadosAcciones">
            <h1 className='text-center tituloH1'>Listar empleados con problemas en los turnos</h1>
            <div className='contenedorBotonCrearCorreo'>
                <Link className='crearCorreoBoton margin0-10' to="/accionesEmpleados">Gestion Empleados</Link>
                <Link className='crearCorreoBoton margin0-10' to="/listadoIncidenciasPresencia">Listado Incidencias</Link>
                <Link className='crearCorreoBoton margin0-10' to="/totalEmpleados">Empleados Online</Link>
                <Link className='crearCorreoBoton margin0-10' to="/altaEmpleado">Alta empleado</Link>
            </div>
            <ListarEmpleadosConProblemas/>
        </section>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default EmpleadosProblemasTurnos;
