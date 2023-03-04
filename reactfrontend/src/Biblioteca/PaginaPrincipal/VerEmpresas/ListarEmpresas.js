//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from "react";
import { generarUUID, mostrarAlertaErronea, peticionGet } from "../../FuncionesAuxiliares/Funciones";
import { URL_API } from "services/http/const";

function ListarEmpresas() {
  //Creo un estado que principalmente avisa que no hay empresas aún.
  const [empresas, setEmpresas] = useState([
    {
      nombreComercial: "No se han registrado empresas aún",
      poblacion: "No se han registrado empresas aún",
      provincia: "No se han registrado empresas aún",
      pais: "No se han registrado empresas aún",
    },
  ]);
  //Esta función hace una petición y almacena los datos de la empresa y si falla avisamos al usuario
  const recoleccionDatos = async () => {
    let datosEmpresa = await peticionGet(URL_API + "empresas");
    if (datosEmpresa !== undefined) {
      var todosDatosEmpresa = datosEmpresa.data.map((datosE) => {
        var newEmpresa = {
          nombreComercial: datosE.nombreComercial,
          poblacion: datosE.poblacion,
          provincia: datosE.provincia,
          pais: datosE.pais,
        };
        return newEmpresa;
      });
      setEmpresas(todosDatosEmpresa);
    } else {
      mostrarAlertaErronea(
        "Error: algo raro ha pasado...",
        "Error inesperado algo no ha funcionado correctamente.",
        "7000"
      );
    }
  };
  //Creo un useEffect que hace que se recoja la información siempre al cargar la página.
  useEffect(() => {
    recoleccionDatos();
  }, []);
  return empresas.map((option) => {
    return (
      <tr className="EmpleadoTablaApartado" key={generarUUID()}>
        <td>{option.nombreComercial}</td>
        <td>{option.poblacion}</td>
        <td className="campoOpcional">{option.provincia}</td>
        <td className="campoOpcional">{option.pais}</td>
      </tr>
    );
  });
}

export default ListarEmpresas;
