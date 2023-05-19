import { cogerFecha, cogerHora, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

const PaginacionListadoIncidencias = ({ data, perPage }) => {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();

    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)

    const seleccionarBotonArrancar = () =>{
      let botonesPaginacion = document.getElementsByClassName("botonPaginacion");
      botonesPaginacion[0].classList.add("botonSeleccionado")
    }
  
    useEffect(()=>{
      seleccionarBotonArrancar();
    },[])

//   Cosas Paginación
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / perPage);

  const handleClick = (page, e) => {
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
        return (data.slice(start, end).map((falta)=>{
            if(falta !== null && falta !== undefined){
                return(
                    <tr key={generarUUID()}>
                        <td>{falta.nombre}</td>
                        <td>{falta.tipo}</td>
                        <td>{falta.descripcion}</td>
                    </tr>
                )
            }
        }))
    }else{
      return(
        <tr><td colSpan={"3"}>No hay empleados que falten ese dia.</td></tr>
      );
    }
  }

  return (
    <div>
        <div className="horas2">
            <h2>Ausencias</h2>
            <div className='TablaDatosUser'>
                <Table className='sinMargen' striped>
                    <thead>
                        <tr>
                            <th className='sinBorde'>Nombre</th>
                            <th className='sinBorde'>Tipo</th>
                            <th className='sinBorde'>Ausencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                </Table>
            </div>
        </div>
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
    </div>
  );
}

export default PaginacionListadoIncidencias;
