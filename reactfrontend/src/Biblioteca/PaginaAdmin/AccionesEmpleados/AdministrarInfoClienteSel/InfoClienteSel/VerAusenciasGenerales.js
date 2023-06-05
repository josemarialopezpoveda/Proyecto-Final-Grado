import React, { useEffect, useState } from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table'
import './VerAusenciasGenerales.css';
import VerInfoAusencia from './VerInfoAusencia';
import {Link} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

function VerAusenciasGenerales(props) {

  let titulo;
  if(props.titulo === "Vacaciones"){
    titulo = "Vacaciones";
  }else{
    titulo = props.titulo + "s";
  }

  const [empleado, setEmpleado] = useState({
    nombre:"",
  })

  useEffect(()=>{
    recoleccionDatosEmpleado();
  },[])

  const recoleccionDatosEmpleado = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("idEmpleado")}`, header);
    if (datosEmpleado.data.nombre !== undefined) {
        var newEmpleado = {
          nombre: datosEmpleado.data.nombre,
        }
      setEmpleado(newEmpleado);
    }
  };

  
  return (
    <React.Fragment>
        <NavAdmin/>
          <section>
            <div className='contenedorVerAusenciasGenerales'>
              <h1>Ausencias de {empleado.nombre}</h1>
              <div className='contenedorBotonCrearCorreo divFlexFichar'>
              <Link className="crearCorreoBoton" to="/anyadirAusencia">Añadir Ausencia</Link>
              </div>
              <VerInfoAusencia titulo={props.titulo} link={props.link}/>
            </div>
            <div className='contenedorBotonVolver'>
                <Link to="/pagInfoClienteSel" className="botonInfoCliente">Volver</Link>
            </div>
          </section>
          <PiePagina/>
    </React.Fragment>
  );
}

export default VerAusenciasGenerales;
