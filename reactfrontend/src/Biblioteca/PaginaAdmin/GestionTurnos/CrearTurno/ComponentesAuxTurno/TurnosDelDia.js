import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import { generarUUID } from '../../../../FuncionesAuxiliares/Funciones';
import './TurnosDelDia.css';
import { contexto } from 'Biblioteca/Contextos/ContextoTurnos/ContextoTurnos.js';

function TurnosDelDia() {
  const contextoTurno = useContext(contexto);

    const handleChange = (event) => {
      console.log(event.target.checked)
      console.log(contextoTurno);
      contextoTurno.setForm(estadoAnteriorForm => ({
        ...estadoAnteriorForm,
        dias: [
          ...estadoAnteriorForm.dias,
          {
            horaInicioM: contextoTurno.horaEntradaM,
            horaFinM: contextoTurno.horaSalidaM,
            horaInicioT: contextoTurno.horaEntradaT,
            horaFinT: contextoTurno.horaSalidaT,
            horaInicioN: contextoTurno.horaEntradaN,
            horaFinN: contextoTurno.horaSalidaN,
          },
        ]
      }))
    }

    const handleChangeDesc = (event) =>{
      let contextoTemporal = {...contextoTurno.form, descripcion: event.target.value};
      contextoTurno.setForm(contextoTemporal);
      console.log(contextoTurno.form)
    }

  return (
    <Form key={generarUUID()}>
      <div className='contenedorDescripcionCrearTurno contenedorFormCrearTurno'>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control className="input"
                  onChange={handleChangeDesc} 
                  value={contextoTurno.form.descripcion}
                  type="email" 
                  placeholder="Descripción del turno"/>
        </Form.Group>


        <div className='turnoDia'>
            <div className='contenedorInputTurno'>
                  <p className='tituloSelectTurno'>Hora mañana entrada</p>
                  <Form.Group onChange={(valorNuevo) => {contextoTurno.setHoraEntradaM(valorNuevo.target.value)}} className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"/>
                        <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
                  </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora mañana salida</p>
              <Form.Group onChange={(valorNuevo) => {contextoTurno.setHoraSalidaM(valorNuevo.target.value)}} className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora tarde entrada</p>
              <Form.Group onChange={(valorNuevo) => {contextoTurno.setHoraEntradaT(valorNuevo.target.value)}} className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora tarde salida</p>
              <Form.Group onChange={(valorNuevo) => {contextoTurno.setHoraSalidaT(valorNuevo.target.value)}} className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora noche entrada</p>
              <Form.Group onChange={(valorNuevo) => {contextoTurno.setHoraEntradaN(valorNuevo.target.value)}} className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className='contenedorInputTurno'>
              <p className='tituloSelectTurno'>Hora noche salida</p>
              <Form.Group onChange={(valorNuevo) => {contextoTurno.setHoraSalidaN(valorNuevo.target.value)}} className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
              </Form.Group>
            </div>
        </div>
      </div>
    </Form>
  );
}

export default TurnosDelDia;
