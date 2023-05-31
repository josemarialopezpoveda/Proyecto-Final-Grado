import React, {useEffect,useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { mostrarAlertaCorrecta, mostrarAlertaErronea, obtenerMilisegundosDesdeHora, peticionGetAuth, peticionPut, recogerFechaAPartirFecha, recogerHoraAPartirFecha, unirFechaYHora } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import './CrearTiempo.css';
import { URL_API } from 'services/http/const';
import NavAdmin from '../Nav/NavAdmin';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';

function ModificarTiempo() {
  const Navigate = useNavigate();

  const [horas,setHoras] = useState({
    fechaEntrada:"",
    fechaSalida:"",
    horaEntrada:"",
    horaSalida:"",
    turno_id: 1
  })

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
    let datosTiempo = await peticionGetAuth(URL_API + "tiempo/" + `${localStorage.getItem('idTiempoSeleccionado')}`, header);
    if (datosTiempo.data.tiempo !== undefined) {
      if(datosTiempo.data.tiempo.fin === null){
        let datos = {
          fechaEntrada: recogerFechaAPartirFecha(datosTiempo.data.tiempo.inicio),
          fechaSalida: recogerFechaAPartirFecha(datosTiempo.data.tiempo.inicio),
          horaEntrada: recogerHoraAPartirFecha(datosTiempo.data.tiempo.inicio),
          horaSalida: "00:00:00",
          turno_id: datosTiempo.data.tiempo.turno_id
        }
        setHoras(datos);
      }else{
        let datos = {
          fechaEntrada: recogerFechaAPartirFecha(datosTiempo.data.tiempo.inicio),
          fechaSalida: recogerFechaAPartirFecha(datosTiempo.data.tiempo.fin),
          horaEntrada: recogerHoraAPartirFecha(datosTiempo.data.tiempo.inicio),
          horaSalida: recogerHoraAPartirFecha(datosTiempo.data.tiempo.fin),
          turno_id: datosTiempo.data.tiempo.turno_id
        }
        setHoras(datos);
      }
    }
};

  const modificarTiempo = async() =>{
    if(horas.horaEntrada !== "" && horas.horaSalida !== "" && horas.fechaEntrada !== "" && horas.fechaSalida !== ""){
      if(obtenerMilisegundosDesdeHora(horas.horaEntrada) < obtenerMilisegundosDesdeHora(horas.horaSalida)){
        if(horas.fechaSalida === horas.fechaEntrada){
          var raw = {
            "empleado_id": parseInt(localStorage.getItem("idEmpleado")),
            "inicio":unirFechaYHora(horas.fechaEntrada, horas.horaEntrada),
            "fin":unirFechaYHora(horas.fechaSalida, horas.horaSalida),
            "turno_id":horas.turno_id
          };
          try {
            const header = {
              headers: {
                Accept: "application/json",
                Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
              },
            };
            let peticion = await peticionPut(URL_API + "tiempos/" + `${localStorage.getItem("idTiempoSeleccionado")}`, raw, header);
            if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
              mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
            } else {
              mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
              Navigate("/verTiemposEmpleado");
            }
          } catch (error) {
            mostrarAlertaErronea(error.message, error.stack, null);
          }
        }else{
          mostrarAlertaErronea("Error al modificar el turno", "Las fechas no son iguales", 5000)
        }
      }else{
        mostrarAlertaErronea("Error al modificar el turno", "La hora de entrada no puede ser posterior a la hora de salida", 5000)
      }
    }
  }

  const [empleado, setEmpleado] = useState({
    nombre:"",
  })

    useEffect(()=>{
        recoleccionDatosEmpleado();
    },[])

    const recoleccionDatosEmpleado = async () => {
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      let datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("idEmpleado")}`, header);
      if (datosEmpleado.data.nombre !== undefined) {
          var newEmpleado = {
            nombre: datosEmpleado.data.nombre,
          }
        setEmpleado(newEmpleado);
      }
    };

  return (
    <React.Fragment>
    <NavAdmin/>
      <div className='FlexBoton'>
        <h1 className='text-center tituloH1'>Modificar Tiempo del empleado {empleado.nombre}</h1>
        <div className='contenedorBotonCrearCorreo'>
            <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/verTiemposEmpleado">Volver</Link>
        </div>
      </div>
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
            <button type="button" onClick={modificarTiempo} className="anyadirTurnoBoton" id='botonCrearTurno'>
              Modificar Tiempo
            </button>
            <Link to="/verTiemposEmpleado" className="margin0-20 anyadirTurnoBoton" id="botonCrearTurno">Volver</Link>
          </div>
        </Form>
      </div>
    <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarTiempo;
