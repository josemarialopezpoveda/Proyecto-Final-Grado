//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import {Link} from 'react-router-dom';
import './ChatCliente.css';


function CrearDivCorreoCliente(props) {
  return (
    <React.Fragment>
      <Link to="/verCorreoSeleccionadoCliente" className='chat'>
      <div className='contenedorCorreo'>
          <h1 className='tituloCorreo'>
          {props.titulo}
          </h1>
          <em className='datoCorreoOpcional emisorCorreo'>
              De: {props.correoEmisor}
          </em>
          <em className='datoCorreoOpcional emisorCorreo'>
              Para: {props.correoReceptor}
          </em>
          <em>Actividad:<span className={props.actividad}>{props.actividad}</span></em>
          <em className='datoCorreoOpcional2'>{props.fecha}</em>
        </div>
    </Link>
    </React.Fragment>
  );
}

export default CrearDivCorreoCliente;
