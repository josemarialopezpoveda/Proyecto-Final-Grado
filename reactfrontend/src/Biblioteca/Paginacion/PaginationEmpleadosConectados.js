import { cogerFecha, cogerHora, generarUUID } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';

const PaginationEmpleadosConectados = ({ data, perPage }) => {
  const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();
  
    //Función que guarda el ID del empleado a ver la información en localStorage y te lleva a la ruta para vel la información del empleado.
    const verJornada = (e) => {
        console.log(e.target.id)
        localStorage.setItem("idEmpleado", e.target.id);
        Navigate("/verJornadaEmpleado");
    }

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

  const seleccionarBotonArrancar = () =>{
    let botonesPaginacion = document.getElementsByClassName("botonPaginacion");
    botonesPaginacion[0].classList.add("botonSeleccionado")
  }

  useEffect(()=>{
    seleccionarBotonArrancar();
  },[])

  const renderData = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    if(data.length !== 0){
    return data.slice(start, end).map((option, index) => (
          <tr key={generarUUID()}>
              <td>{option.nombre} {option.apellidos}</td>
              <td className='campoOpcional'>{option.correo}</td>
              <td className='campoOpcional'>{option.telefono}</td>
              <td>{cogerFecha(option.fechaInicio)}</td>
              <td>{cogerHora(option.horaInicio)}</td>
              <td>
                  <button type="button"
                  title="Ver Jornada Del Empleado"
                  onClick={verJornada}
                  id={option.id}
                  className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">
                  Ver Jornada
                  </button>
              </td>
          </tr>
      ));
    }else{
      <tr>
        <td colSpan={"6"}>La empresa no dispone de empleados.</td>
      </tr>
    }
  }

  return (
    <React.Fragment>
      <Table striped>
        <thead>
            <tr>
                <th>Nombre</th>
                <th className='campoOpcional'>Correo</th>
                <th className='campoOpcional'>Teléfono</th>
                <th>Fecha Inicio</th>
                <th>Hora Inicio</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        {renderData()}
        </tbody>
        </Table>
        <div className='botonesPaginacion'>
          {Array.from({ length: totalPages }, (_, i) => (
              i === 0 || i === (totalPages-1) || i === (paginaSeleccionada-2) || i === (paginaSeleccionada-1) || i === (paginaSeleccionada)  ? 
              <button className='botonPaginacion' key={i} onClick={(e) => handleClick(i + 1,e)}>
                {i + 1}
              </button>
              :
              null
              
            ))}
        </div>
    </React.Fragment>
  );
}

export default PaginationEmpleadosConectados;
