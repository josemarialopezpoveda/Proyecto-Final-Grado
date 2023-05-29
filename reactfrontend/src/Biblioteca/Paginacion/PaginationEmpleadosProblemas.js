import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';

const PaginationEmpleadosProblemas = ({ data, perPage, setEstadoDinamico, setEstadoEstatico }) => {
  const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Función que guarda el ID del empleado a ver la información en localStorage y te lleva a la ruta para vel la información del empleado.
  const verInfo = (e) => {
    localStorage.setItem("idEmpleado", e.target.id);
    Navigate("/verTurnoCliente");
  };

  const seleccionarBotonArrancar = () =>{
    let botonesPaginacion = document.getElementsByClassName("botonPaginacion");
    if(botonesPaginacion.length !== 0){      
        botonesPaginacion[0].classList.add("botonSeleccionado")
    }
  }

  useEffect(()=>{
    seleccionarBotonArrancar();
  },[])

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / perPage);

  const handleClick = (page,e) => {
    setCurrentPage(page);
    setPaginaSeleccionada(page)
    let botonesSeleccionados = document.getElementsByClassName("botonSeleccionado");
    if(botonesSeleccionados.length !== 0){
      botonesSeleccionados[0].classList.remove("botonSeleccionado");
    }
    e.target.classList.add("botonSeleccionado");
  }

  const renderData = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    
    if(data.length !== 0){
        console.log(data)
      return data.slice(start, end).map((option, index) => (
        <tr className="EmpleadoTablaApartado" key={generarUUID()}>
          <td>{option.nombre}</td>
          <td className="campoOpcional">{option.apellidos}</td>
          <td>{option.problema}</td>
          <td>
            <button type="button"
              title="Ver Información Del Empleado"
              onClick={verInfo}
              id={option.id_empleado}
              className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">
              Ver Info.
            </button>
          </td>
        </tr>
      ));
    }else{
      <tr>
        <td colSpan={"4"}>La empresa no dispone de empleados con problemas en los turnos.</td>
      </tr>
    }
  }

  return (
    <React.Fragment>
      <Table id='tablaAccionesEmpleados' striped>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th className='campoOpcional'>Apellidos</th>
                    <th>Problema</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        <tbody>
        {renderData()}
        </tbody>
        </Table>
        <div className='botonesPaginacion'>
        {Array.from({ length: totalPages }, (_, i) => {
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  i === paginaSeleccionada - 2 ||
                  i === paginaSeleccionada - 1 ||
                  i === paginaSeleccionada ||
                  i === paginaSeleccionada + 1
                ) {
                  return (
                    <button
                      className="botonPaginacion"
                      key={i}
                      onClick={(e) => handleClick(i + 1, e)}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (
                  (i === 1 && paginaSeleccionada !== 3) ||
                  (i === totalPages - 2 && paginaSeleccionada !== totalPages - 2)
                ) {
                  return (
                    <div key={i}>
                      <button className="botonPaginacionPuntos" key={i}>
                        ...
                      </button>
                    </div>
                  );
                }
                return null;
              })}
        </div>
    </React.Fragment>
  );
}

export default PaginationEmpleadosProblemas;
