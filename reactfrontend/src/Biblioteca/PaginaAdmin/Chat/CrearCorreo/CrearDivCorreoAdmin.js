//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import {Link} from 'react-router-dom';


function CrearDivCorreoAdmin(props) {
  return (
    <React.Fragment>
      <Link to="/verCorreoSeleccionadoAdmin" className='chat'>
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
          <div>
            <button type="button" className="sinBorde" to="/modificarEmpleado">
              <img
                title="Modificar Empleado"
                className="imagenFotoGestionUsuarios"
                src={require("../../../../img/modify-foto.png")}
                alt="imagen Foto Modificar"
              />
            </button>
            <button type="button" className="sinBorde">
              <img
                title="Borrar Empleado"
                className="imagenFotoGestionUsuarios"
                src={require("../../../../img/delete-foto.png")}
                alt="imagen Foto Borrar"
              />
            </button>
          </div>
        </div>
    </Link>
    </React.Fragment>
  );
}

export default CrearDivCorreoAdmin;
