//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
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
import NavCliente from '../Nav/NavCliente';
import PaginacionChatCliente from 'Biblioteca/Paginacion/PaginacionChatCliente';

function ChatCliente() {
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();

  //Estado que almacena los casos de la empresa.
  const [casosEmpresaEstaticos, setCasosEmpresaEstaticos] = useState([{}]);
  const [casosEmpresaDinamicos,setCasosEmpresaDinamicos] = useState([{}]);

  //Función para recoger todos casos y sus datos.
  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosCasos = await peticionGetAuth(URL_API + "casos", header);
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


   //Creamos un useEffect que nada más cargar recoge los datos del chat.
   useEffect(() => {
    recoleccionDatos();
  }, []);
  
  return (
    <React.Fragment>
      <NavCliente/>
      <h1 className='text-center tituloH1'>Chat</h1>
      <div>
        <div className='contenedorBotonCrearCorreo'>
          <Link to="/crearCorreoCliente" className='crearCorreoBoton'>Crear Caso</Link>
        </div>
        <BuscadorCasos datosEstaticos={setCasosEmpresaEstaticos} datosDinamicos={casosEmpresaDinamicos}/>
        <PaginacionChatCliente data={casosEmpresaEstaticos} perPage={5} 
                setEstadoEstatico={setCasosEmpresaEstaticos} setEstadoDinamico={setCasosEmpresaDinamicos}/>
        </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ChatCliente;
