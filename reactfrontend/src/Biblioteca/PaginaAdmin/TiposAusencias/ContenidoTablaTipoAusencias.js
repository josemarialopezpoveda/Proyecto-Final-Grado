import React, { useState, useEffect } from "react";
import {
  generarUUID,
  peticionGetAuth,
  mostrarAlertaCorrecta,
  mostrarAlertaErronea,
  peticionDelete,
} from "../../FuncionesAuxiliares/Funciones";
import {useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL_API } from "../../../services/http/const";
import Table from 'react-bootstrap/Table';
import BuscadorTipoAusencia from "Biblioteca/Buscador/BuscadorTipoAusencia";

function ContenidoTablaTipoAusencias() {
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Creamos la variable para el contenido de los empleados.
  const [tipoAusenciasEstatico, setTipoAusenciaEstatico] = useState(
    {
      id: "",
      descripcion: "",
    },
  );
  const [tipoAusenciasDinamico, setTipoAusenciaDinamico] = useState(
    {
      id: "",
      descripcion: "",
    },
  );
  //Función para recoger todos los empleados y los guarda en el estado.
  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosEmpresa = await peticionGetAuth(URL_API + "tipoAusencias", header);
    console.log(datosEmpresa)
    if (datosEmpresa.data !== 0) {
      var todosDatosEmpresa = datosEmpresa.data.map((datosE) => {
        var newEmpresa = {
          id: datosE.id,
          descripcion: datosE.descripcion,
          tipo: datosE.tipo
        };
        return newEmpresa;
      });
      setTipoAusenciaEstatico(todosDatosEmpresa);
      setTipoAusenciaDinamico(todosDatosEmpresa);
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
          let url = URL_API + "tipoAusencias/";
          console.log(url + `${e.target.id}`)
          let peticion = await peticionDelete(`${url}${e.target.id}`);
          console.log(peticion)
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

  const modificar = (e) => {
    localStorage.setItem("idTipoAusencia", e.target.id);
    Navigate("/modificarTipoAusencia");
  };

  const getTiposAusencias = () =>{
      return tipoAusenciasEstatico.map((option) => {
        return (
          <tr key={generarUUID()}>
            <td>{option.descripcion}</td>
            <td className='campoOpcional'>{option.tipo}</td>
            <td>
              <button type="button" className="sinBorde" onClick={modificar}>
                <img
                  id={option.id}
                  title="Modificar Tipo de ausencia"
                  className="imagenFotoGestionUsuarios"
                  src={require("../../../img/modify-foto.png")}
                  alt="imagen Foto Modificar"
                />
              </button>
              <button id={option.id} type="button" className="sinBorde" onClick={borrarTipoAusencia}>
                <img
                  id={option.id}
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

  
  if(tipoAusenciasEstatico.id !== "" && tipoAusenciasEstatico.descripcion !== ""){
    return(
      <div className='TablaDatosUser tablaTiposAusencias'>
          <BuscadorTipoAusencia datosEstaticos={setTipoAusenciaEstatico} datosDinamicos={tipoAusenciasDinamico}/>
          <Table striped>
          <thead>
              <tr>
                  <th>Descripción</th>
                  <th className='campoOpcional'>Tipo Ausencia</th>
                  <th>Opciones</th>
              </tr>
          </thead>
          <tbody>
            {getTiposAusencias()}
          </tbody>
          </Table>
      </div>
    );
  }else{
    return(
      <div className='TablaDatosUser tablaTiposAusencias'>
          <Table striped>
          <thead>
              <tr>
                  <th>Descripción</th>
                  <th className='campoOpcional'>Tipo Ausencia</th>
                  <th>Opciones</th>
              </tr>
          </thead>
          <tbody>
            <tr key={generarUUID()}>
              <td colSpan="6">Tu empresa no dispone de tipos de ausencias.</td>
            </tr>
          </tbody>
          </Table>
      </div>
    );
  }
}

export default ContenidoTablaTipoAusencias;
