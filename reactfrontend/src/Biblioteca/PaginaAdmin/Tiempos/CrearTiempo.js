import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { mostrarAlertaCorrecta, mostrarAlertaErronea, obtenerMilisegundosDesdeHora, peticionGetAuth, peticionPost, unirFechaYHora } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import './CrearTiempo.css';
import { URL_API } from 'services/http/const';
import NavAdmin from '../Nav/NavAdmin';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';

function CrearTiempo() {
  const Navigate = useNavigate();

  const [horas,setHoras] = useState({
    empleado_id: localStorage.getItem("idEmpleado"),
    fechaEntrada:"",
    fechaSalida:"",
    horaEntrada:"",
    horaSalida:"",
    turno_id: 1
  })

  const [idTurno, setIdTurno] = useState()

  //Recoger los datos para el formulario.
  useEffect(() => {
    recoleccionDatos();
  }, []);

  //Función para recoger todos los datos.
  const recoleccionDatos = async () => {
    const header = {
    headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
    },
    };
    let datosTiempo = await peticionGetAuth(URL_API + "turnosEmpleado/" + `${localStorage.getItem('idEmpleado')}`, header);
    console.log(datosTiempo)
    if (datosTiempo.data !== undefined) {
        setIdTurno(datosTiempo.data.turnoId);
    }
};

  const crearTiempo = async() =>{
    if(obtenerMilisegundosDesdeHora(horas.horaEntrada) < obtenerMilisegundosDesdeHora(horas.horaSalida)){
      var raw = {
        "empleado_id": horas.empleado_id,
        "inicio":unirFechaYHora(horas.fechaEntrada, horas.horaEntrada),
        "fin":unirFechaYHora(horas.fechaSalida, horas.horaSalida),
        "turno_id": idTurno
      };
      console.log(raw)
      try {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let peticion = await peticionPost(URL_API + "tiempos", raw, header);
        console.log(peticion)
        if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
          mostrarAlertaErronea(peticion.data.message, peticion.data.errores, 5000);
        } else {
          mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
          Navigate("/verTiemposEmpleado");
        }
      } catch (error) {
        mostrarAlertaErronea(error.message, error.stack, 5000);
      }
    }else{
      mostrarAlertaErronea("ERROR a la hora de crear el tiempo", "La hora de entrada no puede ser posterior a la hora de salida", 5000);
    }
  }

  return (
    <React.Fragment>
    <NavAdmin/>
      <pre>{JSON.stringify(horas, null, 3)}</pre>
      <pre>{JSON.stringify(idTurno, null, 3)}</pre>
      <h1 className='text-center tituloH1'>Crear Tiempo </h1>
      <div className='contenedorCrearTurnoForm divPequenyo '>
        <Form id="anyadir">
          <div className='contenedorDescripcionCrearTurno contenedorFormCrearTurno'>
            <div className='turnoDia'>
                <div className='contenedorInputTurno'>
                      <p className='tituloSelectTurno'>Fecha entrada</p>
                      <Form.Group className="selectsTurnos mb-3">
                            <Form.Control className='inputGrande' required size="lg" type="date"
                            onInput={e => setHoras({...horas,fechaEntrada: e.target.value.trim()})}
                            defaultValue={horas.fechaEntrada}/>
                      </Form.Group>
                </div>
                <div className='contenedorInputTurno'>
                  <p className='tituloSelectTurno'>Hora entrada</p>
                  <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"
                        onInput={e => setHoras({...horas,horaEntrada: e.target.value.trim()})}
                        defaultValue={horas.horaEntrada}/>
                  </Form.Group>
                </div>
                <div className='contenedorInputTurno'>
                      <p className='tituloSelectTurno'>Fecha salida</p>
                      <Form.Group className="selectsTurnos mb-3">
                            <Form.Control className='inputGrande' required size="lg" type="date"
                            onInput={e => setHoras({...horas,fechaSalida: e.target.value.trim()})}
                            defaultValue={horas.fechaSalida}/>
                      </Form.Group>
                </div>
                <div className='contenedorInputTurno'>
                  <p className='tituloSelectTurno'>Hora salida</p>
                  <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"
                        onInput={e => setHoras({...horas,horaSalida: e.target.value.trim()})}
                        defaultValue={horas.horaSalida}/>
                  </Form.Group>
                </div>
            </div>
          </div>
          <div className='botonAnyadirTurnoDiv'>
            <button type="button" onClick={crearTiempo} className="anyadirTurnoBoton" id='botonCrearTurno'>
              Crear Tiempo
            </button>
            <Link to="/verTiemposEmpleado" className="margin0-20 anyadirTurnoBoton" id="botonCrearTurno">Volver</Link>
          </div>
        </Form>
      </div>
    <PiePagina/>
    </React.Fragment>
  );
}

export default CrearTiempo;
