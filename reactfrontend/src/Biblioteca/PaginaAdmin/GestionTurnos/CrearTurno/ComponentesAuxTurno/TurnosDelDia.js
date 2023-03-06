import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import './TurnosDelDia.css';
import { contexto } from 'Biblioteca/Contextos/ContextoTurnos/ContextoTurnos.js';
import { mostrarAlertaCorrecta, mostrarAlertaErronea, peticionPost } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';

function TurnosDelDia() {
  const contextoTurno = useContext(contexto);
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    descripcion:""
  });

  const [horas,setHoras] = useState({
    horaInicioM: "",
    horaInicioT: "",
    horaInicioN: "",
    horaFinM:"", 
    horaFinT: "",
    horaFinN: "", 
  })

  const crearTurno = () =>{
    let dias = [];
    contextoTurno.dias.map((dia)=>{
      let obj = {
        "diaSemana":dia,
        "horaInicioM": horas.horaInicioM,
        "horaInicioT": horas.horaInicioT,
        "horaInicioN": horas.horaInicioN,
        "horaFinM": horas.horaFinM, 
        "horaFinT": horas.horaFinT,
        "horaFinN": horas.horaFinN, 
      }
      dias.push(obj);
    })
    let raw = {
      "descripcion": form.descripcion,
      "dias": dias
    }
    postTurno(raw);
  }

  const postTurno = async(raw) =>{
    try {
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      console.log(raw)
      let peticion = await peticionPost(URL_API + "turnos", raw, header);
      console.log(peticion)
      // if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
      //   mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
      // } else {
      //   mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
      //   //Navigate("/paginaPrincipalTurnos");
      // }
    } catch (error) {
      mostrarAlertaErronea(error.message, error.stack, null);
    }
  }

  return (
    <Form>
      <div className='contenedorDescripcionCrearTurno contenedorFormCrearTurno'>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control className="input"
            type="email" 
            placeholder="Descripción del turno"
            onInput={e => setForm({...form,descripcion: e.target.value.trim()})}
            defaultValue={form.descripcion}
          />
        </Form.Group>
        <div className='turnoDia'>
            <div className='contenedorInputTurno'>
                  <p className='tituloSelectTurno'>Hora mañana entrada</p>
                  <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"
                        onInput={e => setHoras({...horas,horaInicioM: e.target.value.trim()})}
                        defaultValue={horas.horaInicioM}/>
                  </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora mañana salida</p>
              <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"
                    onInput={e => setHoras({...horas,horaFinM: e.target.value.trim()})}
                    defaultValue={horas.horaFinM}/>
              </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora tarde entrada</p>
              <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"
                    onInput={e => setHoras({...horas,horaInicioT: e.target.value.trim()})}
                    defaultValue={horas.horaInicioT}/>
              </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora tarde salida</p>
              <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"
                    onInput={e => setHoras({...horas,horaFinT: e.target.value.trim()})}
                    defaultValue={horas.horaFinT}/>
              </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora noche entrada</p>
              <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"
                    onInput={e => setHoras({...horas,horaInicioN: e.target.value.trim()})}
                    defaultValue={horas.horaInicioN}/>
              </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora noche salida</p>
              <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time" 
                    onInput={e => setHoras({...horas,horaFinN: e.target.value.trim()})}
                    defaultValue={horas.horaFinN}/>
              </Form.Group>
            </div>
        </div>
      </div>
      <div className='botonAnyadirTurnoDiv'>
        <button type="button" onClick={crearTurno} className="anyadirTurnoBoton" id='botonCrearTurno'>
          Crear Turno
        </button>
      </div>
    </Form>
  );
}

export default TurnosDelDia;
