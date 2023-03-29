//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function CrearOpcionHorarioCorreo() {
  return (
    <React.Fragment>
      <div className='funcionCrearHorarioCorreo'>
            <div>
                <p className='tituloSelectTurno'>Hora mañana entrada</p>
                <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"/>
                        <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">El nombre es incorrecto</Form.Control.Feedback>
                </Form.Group>
            </div>
            <div>
                <p className='tituloSelectTurno'>Hora mañana salida</p>
                <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"/>
                        <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">El nombre es incorrecto</Form.Control.Feedback>
                </Form.Group>
            </div>
            <div>
                <p className='tituloSelectTurno'>Hora tarde entrada</p>
                <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"/>
                        <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">El nombre es incorrecto</Form.Control.Feedback>
                </Form.Group>
            </div>
            <div>
                <p className='tituloSelectTurno'>Hora tarde salida</p>
                <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"/>
                        <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">El nombre es incorrecto</Form.Control.Feedback>
                </Form.Group>
            </div>
            <div>
                <p className='tituloSelectTurno'>Hora noche entrada</p>
                <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"/>
                        <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">El nombre es incorrecto</Form.Control.Feedback>
                </Form.Group>
            </div>
            <div>
                <p className='tituloSelectTurno'>Hora noche salida</p>
                <Form.Group className="selectsTurnos mb-3">
                        <Form.Control required size="lg" type="time"/>
                        <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">El nombre es incorrecto</Form.Control.Feedback>
                </Form.Group>
            </div>
        </div>
    </React.Fragment>
  );
}

export default CrearOpcionHorarioCorreo;
