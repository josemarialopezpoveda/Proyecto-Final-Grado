import { generarUUID} from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './Paginacion.css';

const PaginacionNuestrosClientes = ({ data, perPage, setEstadoDinamico, setEstadoEstatico }) => {
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
    console.log(data)
    if(data.length !== 0){
    return data.slice(start, end).map((option, index) => (     
        <tr className="EmpleadoTablaApartado" key={generarUUID()}>
            <td>{option.nombreComercial}</td>
            <td>{option.poblacion}</td>
            <td className="campoOpcional">{option.provincia}</td>
            <td className="campoOpcional">{option.pais}</td>
        </tr>         
    ));
    }else{
      return(
        <tr><td colSpan={"4"}>No hay empresas que usan nuestra tecnologia..</td></tr>
      );
    }
  }

  return (
    <div>
        <div className='TablaDatosUser'>
            <Table id='tablaAccionesEmpleados' striped>
                <thead>
                    <tr>
                        <th>Nombre Comercial</th>
                        <th>Población</th>
                        <th className='campoOpcional'>Provincia</th>
                        <th className='campoOpcional'>País</th>
                    </tr>
                </thead>
                <tbody>
                    {renderData()}
                </tbody>
            </Table>
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

export default PaginacionNuestrosClientes;
