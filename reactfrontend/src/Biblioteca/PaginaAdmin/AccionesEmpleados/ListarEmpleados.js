//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {
  generarUUID,
  peticionDelete,
  peticionGetAuth,
  mostrarAlertaCorrecta,
  mostrarAlertaErronea,
} from "../../FuncionesAuxiliares/Funciones";
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { Link } from "react-router-dom";
import { URL_API } from "../../../services/http/const";
import BuscadorEmpleados from "Biblioteca/Buscador/BuscadorEmpleados";

function ListarEmpleados() {
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Creamos la variable para el contenido de los empleados estaticos.
  const [empleadosDinamicos, setEmpleadosDinamicos] = useState([
    {
      id: "",
      nombre: "",
      apellidos: "",
      dni: "",
      correo: "",
      telefono: "",
    },
  ]);
  //Creamos la variable para el contenido de los empleados dinamicos.
  const [empleadosEstaticos, setEmpleadosEstaticos] = useState([
    {
      id: "",
      nombre: "",
      apellidos: "",
      dni: "",
      correo: "",
      telefono: "",
    },
  ]);
  //Función para recoger todos los empleados y los guarda en el estado.
  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosEmpresa = await peticionGetAuth(URL_API + "empresa", header);
    if (datosEmpresa.data.empresa.empleados.length !== 0) {
      var todosDatosEmpresa = datosEmpresa.data.empresa.empleados.map((datosE) => {
        var newEmpresa = {
          id: datosE.id,
          nombre: datosE.nombre,
          apellidos: datosE.apellidos,
          dni: datosE.nif,
          correo: datosE.email,
          telefono: datosE.telefono,
        };
        return newEmpresa;
      });
      setEmpleadosEstaticos(todosDatosEmpresa);
      setEmpleadosDinamicos(todosDatosEmpresa);
    }
  };
  //Función que guarda el ID del empleado a modificar en localStorage y te lleva a la ruta del formulario de modificar el empleado.
  const modificar = (e) => {
    localStorage.setItem("idEmpleado", e.target.id);
    Navigate("/modificarEmpleado");
  };
  //Función que guarda el ID del empleado a ver la información en localStorage y te lleva a la ruta para vel la información del empleado.
  const verInfo = (e) => {
    localStorage.setItem("idEmpleado", e.target.id);
    Navigate("/pagInfoClienteSel");
  };
  //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
  useEffect(() => {
    recoleccionDatos();
  }, []);
  //Función que borra el empleado e informa si todo ha ido bien o ha ocurrido algún error inesperado.
  const borrarEmpleado = async (e) => {
    SweetAlert.fire({
      title: "¿Estás seguro que quieres eliminar este empleado?",
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
          let url = URL_API + "empleados/";
          let peticion = await peticionDelete(`${url}${e.target.id}`, header);
          if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
            mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
          } else {
            mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
            Navigate("/accionesEmpleados");
            recoleccionDatos();
          }
        } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
        }
      } else {
      }
    });
  };

  return(
  
  <div>
  <BuscadorEmpleados datosEstaticos={setEmpleadosEstaticos} datosDinamicos={empleadosDinamicos}/>
    <div className='TablaDatosUser'>
        <Table id='tablaAccionesEmpleados' striped>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th className='campoOpcional'>Apellidos</th>
                    <th className='campoOpcional'>DNI</th>
                    <th className='campoOpcional'>Correo</th>
                    <th className='campoOpcional'>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {empleadosEstaticos.map((option) => {
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
                  <td>{option.nombre}</td>
                  <td className="campoOpcional">{option.apellidos}</td>
                  <td className="campoOpcional">{option.dni}</td>
                  <td className="campoOpcional">{option.correo}</td>
                  <td className="campoOpcional">{option.telefono}</td>
                  <td>
                    <button type="button" className="sinBorde" to="/modificarEmpleado" onClick={modificar}>
                      <img
                        title="Modificar Empleado"
                        className="imagenFotoGestionUsuarios"
                        id={option.id}
                        src={require("../../../img/modify-foto.png")}
                        alt="imagen Foto Modificar"
                      />
                    </button>
                    <button type="button" className="sinBorde" onClick={borrarEmpleado}>
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
                      onClick={verInfo}
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
  </div>)
}

export default ListarEmpleados;
