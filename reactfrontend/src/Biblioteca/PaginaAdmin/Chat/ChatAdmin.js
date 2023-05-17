//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../Nav/NavAdmin';
import './ChatAdmin.css';
import Table from 'react-bootstrap/Table';
import { 
  generarUUID,
  peticionDelete,
  peticionGetAuth,
  mostrarAlertaCorrecta,
  mostrarAlertaErronea,
  recogerNombreAPartirIdEmpleado,
  mirarActividad, 
} from 'Biblioteca/FuncionesAuxiliares/Funciones.js';
import { URL_API } from 'services/http/const.js';
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
import BuscadorCasos from 'Biblioteca/Buscador/BuscadorCasos';
import PaginacionChatAdmin from 'Biblioteca/Paginacion/PaginacionChatAdmin';

function ChatAdmin() {
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();

  //Estado que almacena los casos de la empresa.
  const [casosEmpresaEstaticos, setCasosEmpresaEstaticos] = useState([{}]);
  const [casosEmpresaDinamicos,setCasosEmpresaDinamicos] = useState([{}]);

  //Función para recoger todos los empleados y los guarda en el estado.
  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosCasos = await peticionGetAuth(URL_API + "casos", header);
    console.log(datosCasos)
    if (datosCasos.data.casos.length !== 0) {
      var todosDatosEmpresa = datosCasos.data.casos.map((datosE) => {
        var newEmpresa = {
          id: datosE.id,
          asunto: datosE.asunto,
          activo: mirarActividad(datosE.activo),
          fCreacion: datosE.fechaCreacion,
          creadoPor: datosE.empleado.nombre + " " + datosE.empleado.apellidos
        };
        return newEmpresa;
      });
      setCasosEmpresaEstaticos(todosDatosEmpresa);
      setCasosEmpresaDinamicos(todosDatosEmpresa);
    }
  };


   //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
   useEffect(() => {
    recoleccionDatos();
  }, []);

  const comprobarAdminCrearCaso = () =>{
    if(localStorage.getItem("tipoUsuario") !== undefined && localStorage.getItem("tipoUsuario") === "Administrador"){
      return(
        <div className='contenedorBotonCrearCorreo'>
          <Link to="/crearCorreoAdmin" className='crearCorreoBoton'>Crear Caso</Link>
        </div>
      )
    }
  }
  
  return (
    <React.Fragment>
      <NavAdmin/>
      <div>
        <h1 className='text-center tituloH1'>Chat</h1>
        {comprobarAdminCrearCaso()}
        <BuscadorCasos datosEstaticos={setCasosEmpresaEstaticos} datosDinamicos={casosEmpresaDinamicos}/>
        <PaginacionChatAdmin data={casosEmpresaEstaticos} perPage={7} 
                setEstadoEstatico={setCasosEmpresaEstaticos} setEstadoDinamico={setCasosEmpresaDinamicos}/>
        </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ChatAdmin;
