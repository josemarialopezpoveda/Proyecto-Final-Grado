import { cogerFecha, cogerHora, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

const PaginacionNuestrosClientes = ({ data, perPage, setEstadoDinamico, setEstadoEstatico }) => {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();

    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)

    const modificar = (e) =>{
        localStorage.setItem("idTiempoSeleccionado", e.target.id);
        Navigate("/modificarTiempo");
    }

    //Función para recoger todos los empleados y los guarda en el estado.
    const recoleccionDatos = async () => {
        const header = {
        headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
        };
        let datosEmpresa = await peticionGetAuth(URL_API + "tiempos/" + `${localStorage.getItem("idEmpleado")}`, header);
        console.log(datosEmpresa)
        if (datosEmpresa.data.length !== 0) {
        var tiemposEmpleado = datosEmpresa.data.tiempos.map((datosE) => {
            var newTiempo = {
                id: datosE.id,
                fechaInicio: cogerFecha(datosE.inicio),
                fechaFin: cogerFecha(datosE.fin),
                horaInicio: cogerHora(datosE.inicio),
                horaFin: cogerHora(datosE.fin)
            };
            return newTiempo;
        });
        setEstadoDinamico(tiemposEmpleado);
        setEstadoEstatico(tiemposEmpleado);
        }
    };

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
            <td className="campoOpcional">{option.pais}</td>
            <td className="campoOpcional">{option.provincia}</td>
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
                        <th className='campoOpcional'>País</th>
                        <th className='campoOpcional'>Provincia</th>
                    </tr>
                </thead>
                <tbody>
                    {renderData()}
                </tbody>
            </Table>
        </div>
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
    </div>
  );
}

export default PaginacionNuestrosClientes;
