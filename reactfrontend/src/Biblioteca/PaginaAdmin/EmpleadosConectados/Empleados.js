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
        <section>
            <h1 className='text-center tituloH1'>Empleados Online</h1>
            <div className='TablaDatosUser'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className='campoOpcional'>Apellidos</th>
                            <th className='campoOpcional'>DNI</th>
                            <th className='campoOpcional'>Correo</th>
                            <th className='campoOpcional'>Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListarActividadEmpleados/>
                    </tbody>
                </Table>
                <div className='contenedorBotonVolver text-center'>
                    <Link to="/accionesEmpleados" className="linkSignInLogin botonInfoCliente" id="signIn">Volver</Link>
                </div>
            </div>
        </section>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default Empleados;
