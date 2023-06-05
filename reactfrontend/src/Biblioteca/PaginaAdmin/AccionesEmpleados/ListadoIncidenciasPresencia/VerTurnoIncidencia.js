import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { useNavigate } from "react-router-dom";
import PaginacionTodosLosTurnos from 'Biblioteca/Paginacion/PaginacionTodosLosTurnos';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';
import { formatoFechaDDMMYYYYGuiones } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { formatoFechaDDMMYYYY } from 'Biblioteca/FuncionesAuxiliares/Funciones';

function VerTurnoIncidencia() {
  //Creamos la variable para el uso del useNavigate.
  const [turno, setTurno] = useState([{}]);
  const Navigate = useNavigate();

  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
      let datosTurno = undefined;
      datosTurno = await peticionGetAuth(URL_API + "turnoEmpleado/" + `${localStorage.getItem("empleados_turnos_id")}`, header);
      if(datosTurno !== undefined){
          if(datosTurno.data.turnoEmpleado !== undefined){
            var newTurno = {
                descripcion: datosTurno.data.turnoEmpleado.descripcion,
                activo: estaActivo(datosTurno.data.turnoEmpleado.activo),
                FechaInicioTurno: datosTurno.data.turnoEmpleado.fechaInicioTurno,
                FechaFinTurno: datosTurno.data.turnoEmpleado.fechaFinTurno,
                id_turno: datosTurno.data.turnoEmpleado.turno_id
            };
            setTurno(newTurno);
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

  const modificar = (e) =>{
    localStorage.setItem("idTurno", e.target.id);
    Navigate("/modificarTurnoIncidencia");
  }

  return (
    <React.Fragment>
        <NavAdmin/>
        <section className="contenedorEmpleadosAcciones">
            <h1 className='text-center tituloH1'>Turno con problemas</h1>
            <div className='TablaDatosUser'>
            </div>
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
                      <tr>
                        <td>{turno.descripcion}</td>
                        <td className='campoOpcional'>{formatoFechaDDMMYYYYGuiones(turno.FechaInicioTurno)}</td>
                        <td className='campoOpcional'>{formatoFechaDDMMYYYYGuiones(turno.FechaFinTurno)}</td>
                        <td>{turno.activo}</td>
                        <td>
                          <button type="button" className="sinBorde" to="/modificarEmpleado" onClick={modificar}>
                          <img
                              title="Modificar Empleado"
                              className="imagenFotoGestionUsuarios"
                              id={turno.id_turno}
                              src={require("../../../../img/modify-foto.png")}
                              alt="imagen Foto Modificar"
                          />
                          </button>
                        </td>
                      </tr>
                  </tbody>
              </Table>
            </div>
            <div className='contenedorBotonVolver verHorarioClienteVolver divFlexTurnoSelEmpleado'>
                <Link to="/empleadosProblemasTurnos" className="botonInfoCliente margin10">Volver</Link>
            </div>
        </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerTurnoIncidencia;
