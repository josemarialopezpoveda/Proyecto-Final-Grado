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
import PaginacionTipoAusencias from "Biblioteca/Paginacion/PaginacionTipoAusencias";

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
    console.log(URL_API + "tipoAusencias")
    let datosEmpresa = await peticionGetAuth(URL_API + "tipoAusencias", header);
    console.log(datosEmpresa)
    if (datosEmpresa.data.length !== 0) {
      let valores = Object.values(datosEmpresa.data);
      var todosDatosEmpresa = valores.map((datosE) => {
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

  if(tipoAusenciasEstatico.id !== "" && tipoAusenciasEstatico.descripcion !== ""){
    return(
      <div className='TablaDatosUser tablaTiposAusencias'>
          <BuscadorTipoAusencia datosEstaticos={setTipoAusenciaEstatico} datosDinamicos={tipoAusenciasDinamico}/>
          <PaginacionTipoAusencias data={tipoAusenciasEstatico} perPage={5} 
                setEstadoEstatico={setTipoAusenciaEstatico} setEstadoDinamico={setTipoAusenciaDinamico}/>
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
              <td colSpan="3">Tu empresa no dispone de tipos de ausencias.</td>
            </tr>
          </tbody>
          </Table>
      </div>
    );
  }
}

export default ContenidoTablaTipoAusencias;
