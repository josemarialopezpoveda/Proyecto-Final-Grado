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

function ChatAdmin() {
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();

  //Estado que almacena los casos de la empresa.
  const [casosEmpresaEstaticos, setCasosEmpresaEstaticos] = useState([{}]);
  const [casosEmpresaDinamicos,setCasosEmpresaDinamicos] = useState([{}]);

  const [emisor,setEmisor] = useState("");
  const [receptor,setReceptor] = useState("");

  //Función para recoger todos los empleados y los guarda en el estado.
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


   //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
   useEffect(() => {
    recoleccionDatos();
  }, []);

  //BorrarCaso
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
              Navigate("/chatAdmin");
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

  const modificarCaso = (e) =>{
    localStorage.setItem("idCaso", e.target.id);
    Navigate("/modificarCorreo");
  }

  //Función que guarda el ID del empleado a ver la información en localStorage y te lleva a la ruta para vel la información del empleado.
  const verInfoChat = (e) => {
    localStorage.setItem("idCaso", e.target.id);
    // PENDIENTE DE CREAR PÁGINA DE VER MENSAJES DEL CASO
    Navigate("/verMensajes");
  };
  
  return (
    <React.Fragment>
      <NavAdmin/>
      <div>
        <div className='contenedorBotonCrearCorreo'>
          <Link to="/crearCorreoAdmin" className='crearCorreoBoton'>Crear Caso</Link>
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
                  if (option.apellidos === "") {
                    return (
                      <tr className="EmpleadoTablaApartado" key={generarUUID()}>
                        <td colSpan="3">Tu empresa no dispone de empleados.</td>
                        <td colSpan="3" className="alturaDefinidaTabla">
                          <Link
                            title="Ver Información Del Empleado"
                            to="/altaEmpleado"
                            className="botonPadPequeño botonInfoCliente anyadirTurnoBoton linkSignInLogin"
                            id="signIn">
                            AÑADIR EMPLEADOS
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr className="EmpleadoTablaApartado" key={generarUUID()}>
                      <td>{option.creadoPor}</td>
                      <td>{option.asunto}</td>
                      <td className="campoOpcional">{option.activo}</td>
                      <td>{option.fCreacion}</td>
                      <td>
                        <button type="button" className="sinBorde" to="/modificarEmpleado" 
                        onClick={modificarCaso}
                        >
                          <img
                            title="Modificar Empleado"
                            className="imagenFotoGestionUsuarios"
                            id={option.id}
                            src={require("../../../img/modify-foto.png")}
                            alt="imagen Foto Modificar"
                          />
                        </button>
                        <button type="button" className="sinBorde" onClick={borrarCaso}>
                          <img
                            title="Borrar Empleado"
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

export default ChatAdmin;
