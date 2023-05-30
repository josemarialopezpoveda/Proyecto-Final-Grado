import React, {useState, useEffect} from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import CrearBodyTurno from '../../../GestionTurnos/PaginaPrincipalTurnos/VerTurnos/CrearBodyTurno';
import NavAdmin from '../../../Nav/NavAdmin';
import {Link} from 'react-router-dom';
import './VerAusenciasGenerales.css';
import { URL_API } from 'services/http/const';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import PaginacionTodosLosTurnos from 'Biblioteca/Paginacion/PaginacionTodosLosTurnos';

function VerTurnoCliente() {
  //Creamos la variable para el uso del useNavigate.
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
                      descripcion: turno.descripcion,
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
              <PaginacionTodosLosTurnos data={turnos} perPage={3} setEstado={setTurnos}/>
          </div>
        </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerTurnoCliente;
