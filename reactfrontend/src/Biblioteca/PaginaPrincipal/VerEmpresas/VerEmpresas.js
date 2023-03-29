//Importamos los estilos CSS del pie de página.
import React from 'react';
import ListarEmpresas from './ListarEmpresas';
import PiePagina from '../Footer/PiePagina';
import Header from '../Nav/Header';


function VerEmpresas(){  
    return(
    <React.Fragment>
        <Header/>
        {/* <section className="contenedorEmpleadosAcciones">
            <h1 className='text-center mt-4'>Empresas que usan nuestra tecnología</h1>
            <Buscador/>
            <div className='TablaDatosUser'>
                <Table id='tablaAccionesEmpleados' striped>
                    <thead>
                        <tr>
                            <th>Nombre Comercial</th>
                            <th>Población</th>
                            <th className='campoOpcional'>País</th>
                            <th className='campoOpcional'>Provincia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ListarEmpresas/>
                    </tbody>
                </Table>
            </div>
        </section> */}
        <ListarEmpresas/>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default VerEmpresas;
