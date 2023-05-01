//Importamos los estilos CSS del pie de página.
import React from 'react';
import ListarEmpresas from './ListarEmpresas';
import PiePagina from '../Footer/PiePagina';
import Header from '../Nav/Header';


function VerEmpresas(){  
    return(
    <React.Fragment>
        <Header/>
        <ListarEmpresas/>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default VerEmpresas;
