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
import PaginationEmpleados from "Biblioteca/Paginacion/PaginationEmpleados";

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
    console.log(URL_API + "empresa/" + localStorage.getItem("id"))
    let datosEmpresa = await peticionGetAuth(URL_API + "empresa/" + localStorage.getItem("id"), header);
    console.log(datosEmpresa)
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

  //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
  useEffect(() => {
    recoleccionDatos();
  }, []);
  
  return(
  
  <div>
  <BuscadorEmpleados datosEstaticos={setEmpleadosEstaticos} datosDinamicos={empleadosDinamicos}/>
    <div className='TablaDatosUser'>
      <PaginationEmpleados data={empleadosEstaticos} perPage={5}
            setEstadoEstatico={setEmpleadosEstaticos} setEstadoDinamico={setEmpleadosDinamicos}/>
    </div>
  </div>)
}

export default ListarEmpleados;
