import React from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavCliente from '../../Nav/NavCliente';
import {Link} from 'react-router-dom';
import './InfoCorreoSeleccionadoCliente.css';

function  InfoCorreoSeleccionadoCliente() {
  return (
    <React.Fragment>
      <NavCliente/>
        <div className='contenedorCorreoSeleccionado'>
          <div>
            <h4>Actividad: <span className='activo'>Activo</span></h4>
            <h5>1/1/2023 12:35:00</h5>
          </div>
          {/* <h4>Actividad: <span className='desactivado'>Desactivado</span></h4> */}
          <h1>Reunión general</h1>
          <h3  className='hacerPequeño'>De: josemarialopez.alu@iespacomolla.es</h3>
          <h3  className='hacerPequeño'>Para: victorjoaquinmontoya.alu@iespacomolla.es</h3>
          <p>Todo texto necesita un formato razonable que favorezca su lectura, lo que comienza ya con el uso de los párrafos. La estructuración de un texto ayuda a clasificar el contenido y establecer contextos. Lo mismo sucede con recursos como la negrita y la cursiva que dirigen los ojos a los pasajes más importantes siempre y cuando se usen con moderación. Al escribir tus correos electrónicos, los autores tienen que seleccionar una fuente, color y tamaño que favorezcan la lectura.</p>
        </div>
        <div className='contenedorBotonVolver'>
          <Link to="/chatCliente" className="linkSignInLogin" id="signIn">Volver</Link>
        </div>
      <PiePagina/>
    </React.Fragment>
  );
}

export default InfoCorreoSeleccionadoCliente;
