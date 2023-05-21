//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState, useEffect, useRef} from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import './CambiarTurno.css';
import {Link, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { calculoFechaHoy, convertirNumeroDiaSemana, formatoDateAFecha, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPost, peticionPut, quitarSegundos } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';


function CambiarTurno() {
  //Creamos la variable para poder usar el navigate.
  const Navigate = useNavigate();
  const tipoBaja = useRef(null);
  const [datosTurnos,setDatosTurnos] = useState([{
    id: "",
    descripcion: ""
  }])

  const [turno, setTurno] = useState({
    id:""
  });

  const [turnoDias, setTurnoDias] = useState();

  const [empleado, setEmpleado] = useState({
    nombre:"",
  })

  const [fechasBuscador, setFechasBuscador] = useState({
    inicio: "",
    fin: "",
  });

  const recoleccionNombre = async () => {
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

  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosTurnos = await peticionGetAuth(URL_API + "turnosEmpresa/" + `${localStorage.getItem("id")}`, header);
    if(datosTurnos.data.length !== 0){
      var todosLosTurnos = datosTurnos.data.turnos.map((turno)=>{
        var newTurno = {
          id: turno.id,
          descripcion: turno.descripcion,
        };
        return newTurno;
      })
      setDatosTurnos(todosLosTurnos)
    }
  };

  const obtenerOptions = () =>{
    if(datosTurnos !== {} && typeof(datosTurnos) === 'object' && datosTurnos.length !== 0){
      return(datosTurnos.map((turno, index)=>{
        return(<option key={index} value={String(turno.id)}>{turno.descripcion}</option>)
      }))
    }
  }

    useEffect(() => {
      recoleccionDatos();
      recoleccionNombre();
  }, []);

  useEffect(()=>{
    if(turno.id !== ""){  
      recogerHorasTurno();
    }
  },[turno])

  const recogerHorasTurno = async() =>{
    if(turno.id !== ""){
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      if(turno.id !== "-" && turno.id !== ""){
        let datosTurno = await peticionGetAuth(URL_API + "turnos/" + `${turno.id}`, header);
        if (datosTurno.data !== undefined) {
          setTurnoDias(datosTurno.data.turno.dias);
        }
      }
    }
  }

  const mostrarTurnoSeleccionado = () =>{
    if(turno.id !== "-" && turno.id !== ""){
      if(turnoDias !== undefined && turnoDias.length !== 0){
        return(<div>
          <h1 className='tituloCambiarTurno'>Turno seleccionado:</h1>
          <div className='tablaMediaQuery TablaDatosUser'>
            <Table striped>
              <thead>
                  {diasTurno()}
              </thead>
              <tbody>
                  <tr>
                      {verExistenHoras("horaInicioM","Hora Inicio Mañana")}
                      {turnoDias.map((dia)=>{
                          if(dia.horaInicioM !== "00:00:00"){
                          return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioM)}</td>);
                          }
                      })}
                  </tr>
                  <tr>
                      {verExistenHoras("horaFinM","Hora Fin Mañana")}
                      {turnoDias.map((dia)=>{
                          if(dia.horaFinM !== "00:00:00"){
                              return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinM)}</td>);
                          }
                      })}
                  </tr>
                  <tr>
                      {verExistenHoras("horaInicioT","Hora Inicio Tarde")}
                      {turnoDias.map((dia)=>{
                          if(dia.horaInicioT !== "00:00:00"){
                              return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioT)}</td>);
                          }
                      })}
                  </tr>
                  <tr>
                      {verExistenHoras("horaFinT","Hora Fin Tarde")}
                      {turnoDias.map((dia)=>{
                          if(dia.horaFinT !== "00:00:00"){
                              return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinT)}</td>);
                          }
                      })}
                  </tr>
                  <tr>
                      {verExistenHoras("horaInicioN","Hora Inicio Tarde")}
                      {turnoDias.map((dia)=>{
                          if(dia.horaInicioN !== "00:00:00"){
                              return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioN)}</td>);
                          }
                      })}
                  </tr>
                  <tr>
                      {verExistenHoras("horaFinN","Hora Fin Noche")}
                      {turnoDias.map((dia)=>{
                          if(dia.horaFinN !== "00:00:00"){
                              return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinN)}</td>);
                          }
                      })}
                  </tr>
              </tbody>
          </Table>
        </div>
      </div>)
      }
    }
  }

  const verExistenHoras = (horaBuscar, texto) =>{
    let existenHoras = false;
    turnoDias.map((dia)=>{
        if(dia[horaBuscar] !== "00:00:00"){
            existenHoras= true;
        }
    })

    if(existenHoras === true){
        return(<td>{texto}</td>); 
    }
}

const diasTurno = () =>{
  if(turnoDias !== undefined){
  return(
      <tr>
          <th>Horas Asignadas</th>
          {turnoDias.map((dia)=>{
            if(dia.horaInicioM !== "00:00:00" && dia.horaFinM !== "00:00:00" ||
               dia.horaInicioT !== "00:00:00" && dia.horaFinT !== "00:00:00" ||
               dia.horaInicioN !== "00:00:00" && dia.horaFinN !== "00:00:00"){
              return(<th key={generarUUID()}>{convertirNumeroDiaSemana(dia.diaSemana)}</th>)
            }
          })}
      </tr>
  );
  }
}

const cambiarTurno = async() =>{
    let raw = {
      "turno_id": parseInt(turno.id),
      "empleado_id": parseInt(localStorage.getItem('idEmpleado')),
      "fechaInicioTurno": fechasBuscador.inicio,
      "fechaFinTurno": fechasBuscador.fin
    }
    console.log(raw)
    if(turno.id === ""){
      mostrarAlertaErronea("Error en el turno", "No has seleccionado ningún turno.", null);
    }else if(fechasBuscador.inicio === "" && fechasBuscador.fin === ""){
      mostrarAlertaErronea("Error en las fechas seleccionadas", "Alguna de las fechas no la has rellenado.", null);
    }else if(fechasBuscador.inicio > fechasBuscador.fin){
      mostrarAlertaErronea("Error en las fechas seleccionadas", "La fecha de inicio no puede ser posterior a la de fin.", null);
    }else{
      try {
          const header = {
              headers: {
                  "Accept": "application/json",
                  "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
              }
          }
          console.log(URL_API + "asignarTurnoAEmpleado")
        let peticion = await peticionPost(URL_API + "asignarTurnoAEmpleado", raw, header)
        console.log(peticion)
        if(peticion.data.error !== undefined && peticion.data.error !== null){
            mostrarAlertaErronea("Error de turnos", peticion.data.error, null);
        }else{
            mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
            Navigate("/verTurnoCliente")
        }
      } catch (error) {
        mostrarAlertaErronea(error.message, error.stack, null);
      }
    }
  }

  return (
    <React.Fragment>
        <NavAdmin/>
        <section className="contenedorEmpleadosAcciones classAlturaDefinida">
          <h1 className='tituloCambiarTurno'>Cambiar Turno del {empleado.nombre}</h1>
          <section className='sectionPequenyo sectionCambiarTurno'>
            <Form key={generarUUID()} id="anyadir">
                <div className='divContenedorCampo'>
                  <p className='widthp'>Turno a añadir</p>
                  <Form.Select
                    ref={tipoBaja}
                    value={turno.id}
                    onInput={(e) => setTurno({ ...turno, id: e.target.value.trim()})}
                    className='selectpequenyo selectCrearCorreoAdmin'>
                    <option value="-"> - </option>
                    {obtenerOptions()}
                  </Form.Select>
                </div>
                <div className="divContenedorCampo2 margin10-0">
                    <div className="divContenedorCampo3">
                        <p>Fecha Inicio:</p>
                        <Form.Group className="mb-3">
                                <Form.Control required size="lg" type="date"
                                onInput={e=>{setFechasBuscador({ ...fechasBuscador, inicio: e.target.value.trim() })}}
                                defaultValue={fechasBuscador.inicio}/>
                        </Form.Group>
                    </div>
                    <div className="divContenedorCampo3">
                        <p>Fecha Fin:</p>
                        <Form.Group className="mb-3">
                                <Form.Control required size="lg" type="date"
                                onInput={e=>{setFechasBuscador({ ...fechasBuscador, fin: e.target.value.trim() })}}
                                defaultValue={fechasBuscador.fin}/>
                        </Form.Group>
                    </div>
                </div>
            </Form>
          </section>
          <div className='botonAnyadirTurnoDiv'>
            <button type='button' className="anyadirTurnoBoton margin0-10" onClick={cambiarTurno}>
              Cambiar Turno
            </button>
            <Link to="/verTurnoCliente" className="anyadirTurnoBoton margin0-10">Volver</Link>
          </div>
          {mostrarTurnoSeleccionado()}
        </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default CambiarTurno;
