import React from 'react';
import Form from 'react-bootstrap/Form';

function CrearBodyModificarTurno(props) {
  return (
        <tr>
            <td>{props.horaAsignada}</td>
            <td>
            
                <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
            
                <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
                </Form.Group>
            </td>
            
            <td>
            
                <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
            
                <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
            
                <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
            
                <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
                </Form.Group>
            </td>
            <td>
            
                <Form.Group className="selectsTurnos mb-3">
                    <Form.Control required size="lg" type="time"/>
                    <Form.Control.Feedback>Todo Correcto</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Hora Válida</Form.Control.Feedback>
                </Form.Group>
            </td>
        </tr>
  );
}

export default CrearBodyModificarTurno;
