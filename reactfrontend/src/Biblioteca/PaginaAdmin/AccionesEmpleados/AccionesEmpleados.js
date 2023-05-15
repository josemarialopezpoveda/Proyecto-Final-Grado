//Importamos los estilos CSS del pie de página.
import React from 'react';
import Table from 'react-bootstrap/Table';
import NavAdmin from '../Nav/NavAdmin';
import './AccionesEmpleados.css';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import ListarEmpleados from './ListarEmpleados';
import {Link} from 'react-router-dom';


function AccionesEmpleados(){  
    return(
    <React.Fragment>
        <NavAdmin/>
        <section className="contenedorEmpleadosAcciones">
            <div className='contenedorBotonCrearCorreo'>
                <Link className='crearCorreoBoton margin0-10' to="/totalEmpleados">Empleados Online</Link>
                <Link className='crearCorreoBoton margin0-10' to="/altaEmpleado">Alta empleado</Link>
            </div>
            <ListarEmpleados/>
        </section>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default AccionesEmpleados;
