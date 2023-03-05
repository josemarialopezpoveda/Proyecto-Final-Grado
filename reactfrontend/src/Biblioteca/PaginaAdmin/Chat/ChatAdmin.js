//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import {Link} from 'react-router-dom';
import CrearDivCorreoAdmin from '../../PaginaAdmin/Chat/CrearCorreo/CrearDivCorreoAdmin.js';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../Nav/NavAdmin';
import './ChatAdmin.css';


function ChatAdmin() {
  return (
    <React.Fragment>
      <NavAdmin/>
      <section className='sectionTamanyoFijo'>
      <h1 className='tituloh1'>Chat Admin</h1>
        <div className='contenedorBotonCrearCorreo'>
          <Link to="/crearCorreoAdmin" className='crearCorreoBoton'>Crear Correo</Link>
        </div>
          <CrearDivCorreoAdmin 
          titulo="Reunión general"
          correoEmisor="josemarialopez.alu@iespacomolla.es"
          correoReceptor="victorjoaquinmontoya.alu@iespacomolla.es"
          fecha="1/2/2023 12:35:00"
          actividad="Activo"/>
          <CrearDivCorreoAdmin 
          titulo="Reunión general"
          correoEmisor="josemarialopez.alu@iespacomolla.es"
          correoReceptor="victorjoaquinmontoya.alu@iespacomolla.es"
          fecha="1/2/2023 12:35:00"
          actividad="Acabado"/>
          <CrearDivCorreoAdmin 
          titulo="Reunión general"
          correoEmisor="josemarialopez.alu@iespacomolla.es"
          correoReceptor="victorjoaquinmontoya.alu@iespacomolla.es"
          fecha="1/2/2023 12:35:00"
          actividad="Activo"/>
        </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ChatAdmin;
