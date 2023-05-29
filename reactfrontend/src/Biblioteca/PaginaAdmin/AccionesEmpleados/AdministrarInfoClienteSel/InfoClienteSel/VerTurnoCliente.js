import React, {useState, useEffect} from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import CrearBodyTurno from '../../../GestionTurnos/PaginaPrincipalTurnos/VerTurnos/CrearBodyTurno';
import NavAdmin from '../../../Nav/NavAdmin';
import {Link} from 'react-router-dom';
import './VerAusenciasGenerales.css';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";

function VerTurnoCliente() {
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();
  const [turnos, setTurnos] = useState([{}]);

  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
      let datosTurno = undefined;
      console.log(URL_API + "todosLosTurnos/" + `${localStorage.getItem("idEmpleado")}`)
      datosTurno = await peticionGetAuth(URL_API + "todosLosTurnos/" + `${localStorage.getItem("idEmpleado")}`, header);
      console.log(datosTurno)
      if(datosTurno !== undefined){
          if(datosTurno.data.turnoSEmpleado !== undefined){
              if (datosTurno.data.turnoSEmpleado.length !== 0) {
                let todosLosTurnos = datosTurno.data.turnoSEmpleado.map((turno)=>{
                    var newTurno = {
                      //descripcion: datosTurno.data.descripcion,
                      activo: estaActivo(turno.activo),
                      FechaInicioTurno: turno.fechaInicioTurno,
                      FechaFinTurno: turno.fechaFinTurno,
                      id_turno: turno.turno_id
                  };
                  return newTurno;
                })
                setTurnos(todosLosTurnos);
              }
          }
      }
  };

  const estaActivo = (activo) =>{
    if(activo === 0){
      return("NO");
    }else if(activo === 1){
      return("SI");
    }
  }

  useEffect(() => {
      recoleccionDatos();
  }, []);

  //Función que guarda el ID del empleado a modificar en localStorage y te lleva a la ruta del formulario de modificar el empleado.
  const modificar = (e) => {
    localStorage.setItem("idTurno", e.target.id);
    Navigate("/modificarTurno");
  };

  const borrar = (e) =>{
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

  return (
    <React.Fragment>
        <NavAdmin/>
        <section className="contenedorEmpleadosAcciones">
                <div className='TablaDatosUser'>
                    {/*PENDIENTE BUSCADOR TURNOS*/ }
                    <CrearBodyTurno/>
                </div>
            <div className='contenedorBotonVolver verHorarioClienteVolver divFlexTurnoSelEmpleado'>
                <Link className="botonInfoCliente margin10" to="/cambiarTurno">Cambiar Turno</Link>
                <Link to="/pagInfoClienteSel" className="botonInfoCliente margin10">Volver</Link>
            </div>

            <h1 className='text-center tituloH1'>Turnos que ha tenido el empleado</h1>
            <div className='TablaDatosUser'>
              <Table striped>
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
                      {turnos.map((turno)=>{
                        return(
                          <tr key={generarUUID()}>
                            <td>Descripción</td>
                            <td className='campoOpcional'>{turno.FechaInicioTurno}</td>
                            <td className='campoOpcional'>{turno.FechaFinTurno}</td>
                            <td>{turno.activo}</td>
                            <td>
                              <button type="button" className="sinBorde" to="/modificarEmpleado" onClick={modificar}>
                                <img
                                  title="Modificar Empleado"
                                  className="imagenFotoGestionUsuarios"
                                  id={turno.id_turno}
                                  src={require("../../../../../img/modify-foto.png")}
                                  alt="imagen Foto Modificar"
                                />
                              </button>
                              <button type="button" className="sinBorde" onClick={borrar}>
                                <img
                                  title="Borrar Empleado"
                                  className="imagenFotoGestionUsuarios"
                                  id={turno.id_turno}
                                  src={require("../../../../../img/delete-foto.png")}
                                  alt="imagen Foto Borrar"
                                />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
              </Table>
          </div>
        </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerTurnoCliente;
