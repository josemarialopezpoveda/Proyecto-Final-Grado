//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import NavCliente from '../Nav/NavCliente';
import {Link} from 'react-router-dom';
import './ChatCliente.css';
import CrearDivCorreoCliente from './CrearDivCorreoCliente.js';

function ChatCliente() {
  return (
    <React.Fragment>
      <NavCliente/>
      <div className='contenedorBotonCrearCorreo'>
        <Link to="/crearCorreoCliente" className='crearCorreoBoton'>Crear Correo</Link>
      </div>
      <CrearDivCorreoCliente 
      titulo="Reunión general"
      correoEmisor="josemarialopez.alu@iespacomolla.es"
      correoReceptor="victorjoaquinmontoya.alu@iespacomolla.es"
      fecha="1/2/2023 12:35:00"
      actividad="Acabado"/>
      <CrearDivCorreoCliente 
      titulo="Reunión general"
      correoEmisor="josemarialopez.alu@iespacomolla.es"
      correoReceptor="victorjoaquinmontoya.alu@iespacomolla.es"
      fecha="1/2/2023 12:35:00"
      actividad="Activo"/>
      <CrearDivCorreoCliente 
      titulo="Reunión general"
      correoEmisor="josemarialopez.alu@iespacomolla.es"
      correoReceptor="victorjoaquinmontoya.alu@iespacomolla.es"
      fecha="1/2/2023 12:35:00"
      actividad="Acabado"/>
      
      <div className='ContenedorBajarFooter'>
        <div className='BajarFooter'>
          <PiePagina/>
        </div>
      </div>  
    </React.Fragment>
  );
}

export default ChatCliente;
