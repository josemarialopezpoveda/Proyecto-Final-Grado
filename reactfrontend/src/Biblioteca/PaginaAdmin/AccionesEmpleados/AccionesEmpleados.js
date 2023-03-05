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
            <div className='TablaDatosUser'>
                <div className='contenedorBotonCrearCorreo'>
                    <Link className='crearCorreoBoton' to="/totalEmpleados">Ver Empleados Conectados</Link>
                </div>
                <Table id='tablaAccionesEmpleados' striped>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className='campoOpcional'>Apellidos</th>
                            <th className='campoOpcional'>DNI</th>
                            <th className='campoOpcional'>Correo</th>
                            <th className='campoOpcional'>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListarEmpleados/>
                    </tbody>
                </Table>
            </div>
        </section>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default AccionesEmpleados;
