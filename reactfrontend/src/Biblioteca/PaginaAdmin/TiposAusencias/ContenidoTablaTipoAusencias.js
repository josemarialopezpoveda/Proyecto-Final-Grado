import React, { useState, useEffect } from "react";
import {
  generarUUID,
  peticionGetAuth,
  mostrarAlertaCorrecta,
  mostrarAlertaErronea,
  peticionDelete,
} from "../../FuncionesAuxiliares/Funciones";
import { Link, useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL_API } from "../../../services/http/const";

function ContenidoTablaTipoAusencias() {
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Creamos la variable para el contenido de los empleados.
  const [empleados, setEmpleados] = useState([
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
    let datosEmpresa = await peticionGetAuth("", header);
    if (datosEmpresa.data.empresa.empleados.length !== 0) {
      var todosDatosEmpresa = datosEmpresa.data.empresa.empleados.map((datosE) => {
        var newEmpresa = {
          idAusencia: datosE.id,
          nombreAusencia: datosE.nombreAusencia,
        };
        return newEmpresa;
      });
      setEmpleados(todosDatosEmpresa);
    }
  };
  //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
  useEffect(() => {
    recoleccionDatos();
  }, []);

  const borrarTipoAusencia = (e) => {
    SweetAlert.fire({
      title: "¿Estás seguro que quieres eliminar este tipo de Ausencia?",
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
            Navigate("/verTipoAusencias");
            recoleccionDatos();
          }
        } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
        }
      } else {
      }
    });
  };

  let datos = [
    {
      desc: "Enfermedad",
    },
    {
      desc: "Maternidad",
    },
  ];
  return datos.map((option) => {
    return (
      <tr key={generarUUID()}>
        <td>{option.desc}</td>
        <td>
          <Link to="/modificarTipoAusencia">
            <img
              title="Modificar Tipo de ausencia"
              className="imagenFotoGestionUsuarios"
              src={require("../../../img/modify-foto.png")}
              alt="imagen Foto Modificar"
            />
          </Link>
          <button type="button" className="sinBorde" onClick={borrarTipoAusencia}>
            <img
              title="Borrar el tipo de ausencia"
              className="imagenFotoGestionUsuarios"
              src={require("../../../img/delete-foto.png")}
              alt="imagen Foto Borrar"
            />
          </button>
        </td>
      </tr>
    );
  });
}

export default ContenidoTablaTipoAusencias;
