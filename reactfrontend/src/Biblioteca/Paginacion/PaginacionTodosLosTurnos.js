import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth} from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './Paginacion.css';
import SweetAlert from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';


const PaginacionTodosLosTurnos = ({ data, perPage, setEstado }) => {
    const Navigate = useNavigate();
    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)

    const seleccionarBotonArrancar = () =>{
      let botonesPaginacion = document.getElementsByClassName("botonPaginacion");
      botonesPaginacion[0].classList.add("botonSeleccionado")
    }
  
    useEffect(()=>{
      seleccionarBotonArrancar();
    },[])

    const estaActivo = (activo) =>{
        if(activo === 0){
          return("NO");
        }else if(activo === 1){
          return("SI");
        }
      }

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
          let datosTurno = undefined;
          datosTurno = await peticionGetAuth(URL_API + "todosLosTurnos/" + `${localStorage.getItem("idEmpleado")}`, header);
          if(datosTurno !== undefined){
              if(datosTurno.data.turnoSEmpleado !== undefined){
                  if (datosTurno.data.turnoSEmpleado.length !== 0) {
                    let todosLosTurnos = datosTurno.data.turnoSEmpleado.map((turno)=>{
                        var newTurno = {
                          descripcion: turno.descripcion,
                          activo: estaActivo(turno.activo),
                          FechaInicioTurno: turno.fechaInicioTurno,
                          FechaFinTurno: turno.fechaFinTurno,
                          id_turno: turno.turno_id
                      };
                      return newTurno;
                    })
                    setEstado(todosLosTurnos);
                  }
              }
          }
      };

    //Función que guarda el ID del empleado a modificar en localStorage y te lleva a la ruta del formulario de modificar el empleado.
  const modificar = (e) => {
    localStorage.setItem("idTurno", e.target.id);
    Navigate("/modificarTurno");
  };

  const borrar = (e) =>{
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
              let peticion = await peticionDelete(`${url}${e.target.id}`, header);
              if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
                mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
              } else {
                if(peticion.data.message === "El turno no se puede borrar, está asignado a un empleado"){
                  mostrarAlertaErronea(peticion.data.message, "Error de turno asignado a un empleado.", null);
                }else{
                  mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
                  Navigate("/paginaPrincipalTurnos");
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
    return data.slice(start, end).map((option, index) => (     
        <tr key={generarUUID()}>
            <td>{option.descripcion}</td>
            <td className='campoOpcional'>{option.FechaInicioTurno}</td>
            <td className='campoOpcional'>{option.FechaFinTurno}</td>
            <td>{option.activo}</td>
            <td>
                <button type="button" className="sinBorde" to="/modificarEmpleado" onClick={modificar}>
                <img
                    title="Modificar Empleado"
                    className="imagenFotoGestionUsuarios"
                    id={option.id_turno}
                    src={require("../../img/modify-foto.png")}
                    alt="imagen Foto Modificar"
                />
                </button>
                <button type="button" className="sinBorde" onClick={borrar}>
                <img
                    title="Borrar Empleado"
                    className="imagenFotoGestionUsuarios"
                    id={option.id_turno}
                    src={require("../../img/delete-foto.png")}
                    alt="imagen Foto Borrar"
                />
                </button>
            </td>
            </tr>       
    ));
    }else{
      return(
        <tr><td colSpan={"4"}>El empleado no ha tenido turnos aún...</td></tr>
      );
    }
  }

  return (
    <div>
        <div className='TablaDatosUser'>
            <Table id='tablaAccionesEmpleados' striped>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th className='campoOpcional'>Fecha Inicio</th>
                        <th className='campoOpcional'>Fecha Fin</th>
                        <th>Activo</th>
                        <th>Acciones</th>
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

export default PaginacionTodosLosTurnos;
