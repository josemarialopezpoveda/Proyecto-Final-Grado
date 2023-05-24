//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {peticionGetAuth} from "../../../FuncionesAuxiliares/Funciones";
import { useNavigate } from "react-router-dom";
import { URL_API } from "services/http/const";
import PaginationEmpleadosProblemas from "Biblioteca/Paginacion/PaginationEmpleadosProblemas";
import BuscadorEmpleadosProblemas from "Biblioteca/Buscador/BuscadorEmpleadosProblemas";

function ListarEmpleadosConProblemas() {
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Creamos la variable para el contenido de los empleados estaticos.
  const [empleadosDinamicos, setEmpleadosDinamicos] = useState([]);
  //Creamos la variable para el contenido de los empleados dinamicos.
  const [empleadosEstaticos, setEmpleadosEstaticos] = useState([]);

  //Función para recoger todos los empleados y los guarda en el estado.
  const recoleccionDatos = async () => {
    setEmpleadosEstaticos([]);
    setEmpleadosDinamicos([]);
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosEmpleados = await peticionGetAuth(URL_API + "incidenciasTurnos", header);
    console.log(datosEmpleados)
    let datosTotales = [];
    if(datosEmpleados.data.empleadosSinTurnoActivo !== undefined && datosEmpleados.data.empleadosSinTurnoActivo.length !== 0){
      datosEmpleados.data.empleadosSinTurnoActivo.map((datos)=>{
        datosTotales.push({
            nombre: datos.nombre,
            apellidos: datos.apellidos,
            problema: "Este empleado no tiene ningún turno activo"
        })
      })
    }else if(datosEmpleados.data.turnoCaducado !== undefined && datosEmpleados.data.turnoCaducado.length !== 0){
      datosEmpleados.data.turnoCaducado.map((datos)=>{
        datosTotales.push({
          nombre: datos.nombre,
          apellidos: datos.apellidos,
          problema: "Este empleado no tiene ningún turno activo"
        })
      })
    }
    if(datosTotales !== undefined){
      setEmpleadosDinamicos(datosTotales);
      setEmpleadosEstaticos(datosTotales);
    }
  };

  //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
  useEffect(() => {
    recoleccionDatos();
  }, []);
  
  return(
  
  <div>
  <BuscadorEmpleadosProblemas datosEstaticos={setEmpleadosEstaticos} datosDinamicos={empleadosDinamicos}/>
    <div className='TablaDatosUser'>
      <PaginationEmpleadosProblemas data={empleadosEstaticos} perPage={5}
            setEstadoEstatico={setEmpleadosEstaticos} setEstadoDinamico={setEmpleadosDinamicos}/>
    </div>
  </div>)
}

export default ListarEmpleadosConProblemas;
