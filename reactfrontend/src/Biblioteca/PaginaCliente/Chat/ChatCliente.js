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

  //Función que pide confirmación al usuario y si de verdad lo desea borra el caso seleccionado.
  const borrarCaso = async (e) => {
    SweetAlert.fire({
      title: "¿Estás seguro que quieres eliminar este caso?",
      text: "Los datos se eliminarán definitivamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (resultado) => {
      if (resultado.value) {
        try {
          const header = {
            headers: {
              Accept: "application/json",
              Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
          };
          let url = URL_API + "casos/";
          let peticion = await peticionDelete(`${url}${e.target.id}`, header);
          if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
            mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
          } else {
            console.log(peticion.data.message)
            if(peticion.data.message == "Error, no se puede borrar, el caso tiene mensajes."){
              mostrarAlertaErronea(peticion.data.message, "Error mensaje con errores.", "3000")
            }else{
              mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente.", "3000");
              Navigate("/chatCliente");
              recoleccionDatos();
            }
          }
        } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
        }
      } else {
      }
    });
  };

  //Función que añade al localStorage el id del caso y te mueve a otra página.
  const modificarCaso = (e) =>{
    localStorage.setItem("idCaso", e.target.id);
    Navigate("/modificarCorreo");
  }

  //Función que guarda el ID del empleado a ver la información en localStorage y te lleva a la ruta para vel la información del empleado.
  const verInfoChat = (e) => {
    localStorage.setItem("idCaso", e.target.id);
    // PENDIENTE DE CREAR PÁGINA DE VER MENSAJES DEL CASO
    Navigate("/verMensajesEmpleado");
  };

  //Función que a partir de la actividad devuelve un td con una clase o otra.
  const estaActivo = (activo) =>{
    if(activo === "Activo"){
      return(<td className="campoOpcional activo">{activo}</td>)
    }else{
      return(<td className="campoOpcional acabado">{activo}</td>)
    }
  }
  
  return (
    <React.Fragment>
      <NavCliente/>
      <h1 className='text-center tituloH1'>Chat</h1>
      <div>
        <div className='contenedorBotonCrearCorreo'>
          <Link to="/crearCorreoCliente" className='crearCorreoBoton'>Crear Caso</Link>
        </div>
        <BuscadorCasos datosEstaticos={setCasosEmpresaEstaticos} datosDinamicos={casosEmpresaDinamicos}/>
        <div className='TablaDatosUser'>
            <Table id='tablaAccionesEmpleados' striped>
                <thead>
                    <tr>
                        <th>Creado Por:</th>
                        <th>Asunto</th>
                        <th className='campoOpcional'>Estado</th>
                        <th className='campoOpcional'>Fecha Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {casosEmpresaEstaticos.map((option) => {
                  return (
                    <tr className="EmpleadoTablaApartado" key={generarUUID()}>
                      <td>{option.creadoPor}</td>
                      <td>{option.asunto}</td>
                      {estaActivo(option.activo)}
                      <td>{option.fCreacion}</td>
                      <td>
                        <button type="button" className="sinBorde" to="/modificarEmpleado" 
                        onClick={modificarCaso}
                        >
                          <img
                            title="Modificar Caso"
                            className="imagenFotoGestionUsuarios"
                            id={option.id}
                            src={require("../../../img/modify-foto.png")}
                            alt="imagen Foto Modificar"
                          />
                        </button>
                        <button type="button" className="sinBorde" onClick={borrarCaso}>
                          <img
                            title="Borrar Caso"
                            className="imagenFotoGestionUsuarios"
                            id={option.id}
                            src={require("../../../img/delete-foto.png")}
                            alt="imagen Foto Borrar"
                          />
                        </button>
                        <button type="button"
                          title="Ver Información Del Empleado"
                          onClick={verInfoChat}
                          id={option.id}
                          className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">
                          Ver Info.
                        </button>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
            </Table>
          </div>
        </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ChatCliente;
