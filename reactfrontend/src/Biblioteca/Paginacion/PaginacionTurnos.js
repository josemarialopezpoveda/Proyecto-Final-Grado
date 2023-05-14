import {generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

const PaginacionTurnos = ({ data, perPage, setEstadoDinamico, setEstadoEstatico }) => {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();

    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1);

    //Función para recoger todos los empleados y los guarda en el estado.
    const recoleccionDatos = async () => {
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      console.log(URL_API + "turnosEmpresa/" + `${localStorage.getItem("id")}`)
      let datosTurno = await peticionGetAuth(URL_API + "turnosEmpresa/" + `${localStorage.getItem("id")}`, header);
      console.log(datosTurno)
      if (datosTurno.data !== 0) {
        if(datosTurno.data.turnos !== undefined){
          var todosDatosEmpresa = datosTurno.data.turnos.map((datosE) => {
            var newEmpresa = {
              id: datosE.id,
              descripcion: datosE.descripcion,
            };
            return newEmpresa;
          });
          setEstadoDinamico(todosDatosEmpresa);
          setEstadoEstatico(todosDatosEmpresa);
        }else{
          var newEmpresa = {
            id: "",
            descripcion: "",
          };
          setEstadoDinamico(newEmpresa);
          setEstadoEstatico(newEmpresa);
        }
      }
    };

    const borrarTurno = (e) =>{
      console.log(e.target.id);
      SweetAlert.fire({
          title: "¿Estás seguro que quieres eliminar este turno?",
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
              let url = URL_API + "turnos/";
              console.log(url + `${e.target.id}`)
              let peticion = await peticionDelete(`${url}${e.target.id}`, header);
              console.log(peticion)
              if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
                mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
              } else {
                if(peticion.data.message === "El turno no se puede borrar, está asignado a un empleado"){
                  mostrarAlertaErronea(peticion.data.message, "Error de turno asignado a un empleado.", null);
                }else{
                  mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
                  //Navigate("/paginaPrincipalTurnos");
                  recoleccionDatos();
                }
              }
            } catch (error) {
              mostrarAlertaErronea(error.message, error.stack, null);
            }
          } else {
          }
        });
      }

      const modificarTurno = (e) => {
          localStorage.setItem("idTurno", e.target.id);
          Navigate("/verTurno");
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
    if(data.length !== 0){
      console.log(data)
      return data.slice(start, end).map((option, index) => (     
        <tr key={generarUUID()}>
            <td className='contenedorTurnoTabla'>{option.descripcion}</td>
            <td className='contenedorTurnoTabla contenedorBotonesTurnoTabla'>
                <button type='button' id={option.id} onClick={modificarTurno} className="botonTurnos">Ver Turno</button>
                <button type='button' id={option.id} onClick={borrarTurno} className="botonTurnos">Eliminar Turno</button>
            </td>
        </tr>                  
      ));
    }else{
      return(<tr><td colSpan={"3"}>Esta empresa todavia no tiene turnos.</td></tr>)
    }
  }

  return (
    <React.Fragment>
      <div className='TablaDatosUser'>
        <Table striped>
              <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Opciones</th>
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
    </React.Fragment>
  );
}

export default PaginacionTurnos;
