import { generarUUID } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { useFetcher } from 'react-router-dom';

function CrearBodyModificarTurno(props) {
    //Constante auxiliar para usar el .map que pase 7 veces.
    const arr = [1, 2, 3, 4, 5, 6, 7];

        if(props.turno.dias !== undefined){
            return (
                <tbody className='cuerpoModificarTurno'>
                    <tr>
                        <td>Hora Inicio Mañana</td>
                        {arr.map((valor, indice) => {
                            if(props.horasModificadas[indice] !== undefined){
                                return(
                                    <td key={generarUUID()}>
                                        <Form.Group className="selectsTurnos text-centrado mb-3">
                                            <Form.Control required size="lg" type="time" 
                                            onInput={e => props.setHorasModificadas({
                                                ...props.horasModificadas,
                                                [indice]: {
                                                ...props.horasModificadas[indice],
                                                horaInicioM: e.target.value.trim(),
                                                },
                                            })}
                                            defaultValue={props.horasModificadas[indice].horaInicioM}/>
                                        </Form.Group>
                                    </td>
                                )
                            }
                        })}
                    </tr>
                    <tr>
                        <td>Hora Fin Mañana</td>
                        {arr.map((valor, indice) => {
                            if(props.horasModificadas[indice] !== undefined){
                                return(
                                    <td key={generarUUID()}>
                                        <Form.Group className="selectsTurnos text-centrado mb-3">
                                            <Form.Control required size="lg" type="time" 
                                            onInput={e => props.setHorasModificadas({
                                                ...props.horasModificadas,
                                                [indice]: {
                                                ...props.horasModificadas[indice],
                                                horaFinM: e.target.value.trim(),
                                                },
                                            })}
                                            defaultValue={props.horasModificadas[indice].horaFinM}/>
                                        </Form.Group>
                                    </td>
                                )
                            }
                        })}
                    </tr>
                    <tr>
                        <td>Hora Inicio Tarde</td>
                        {arr.map((valor, indice) => {
                            if(props.horasModificadas[indice] !== undefined){
                                return(
                                    <td key={generarUUID()}>
                                        <Form.Group className="selectsTurnos text-centrado mb-3">
                                            <Form.Control required size="lg" type="time" 
                                            onInput={e => props.setHorasModificadas({
                                                ...props.horasModificadas,
                                                [indice]: {
                                                ...props.horasModificadas[indice],
                                                horaInicioT: e.target.value.trim(),
                                                },
                                            })}
                                            defaultValue={props.horasModificadas[indice].horaInicioT}/>
                                        </Form.Group>
                                    </td>
                                )
                            }
                        })}
                    </tr>
                    <tr>
                        <td>Hora Fin Tarde</td>
                        {arr.map((valor, indice) => {
                            if(props.horasModificadas[indice] !== undefined){
                                return(
                                    <td key={generarUUID()}>
                                        <Form.Group className="selectsTurnos text-centrado mb-3">
                                            <Form.Control required size="lg" type="time" 
                                            onInput={e => props.setHorasModificadas({
                                                ...props.horasModificadas,
                                                [indice]: {
                                                ...props.horasModificadas[indice],
                                                horaFinT: e.target.value.trim(),
                                                },
                                            })}
                                            defaultValue={props.horasModificadas[indice].horaFinT}/>
                                        </Form.Group>
                                    </td>
                                )
                            }
                        })}
                    </tr>
                    <tr>
                        <td>Hora Inicio Noche</td>
                        {
                        arr.map((valor, indice) => {
                            if(props.horasModificadas[indice] !== undefined){
                                return(
                                    <td key={generarUUID()}>
                                        <Form.Group className="selectsTurnos text-centrado mb-3">
                                            <Form.Control required size="lg" type="time" 
                                            onInput={e => props.setHorasModificadas({
                                                ...props.horasModificadas,
                                                [indice]: {
                                                ...props.horasModificadas[indice],
                                                horaInicioN: e.target.value.trim(),
                                                },
                                            })}
                                            defaultValue={props.horasModificadas[indice].horaInicioN}/>
                                        </Form.Group>
                                    </td>
                                )
                            }
                        })}
                    </tr>
                    <tr>
                        <td>Hora Fin Noche</td>
                        {arr.map((valor, indice) => {
                            if(props.horasModificadas[indice] !== undefined){
                                return(
                                    <td key={generarUUID()}>
                                        <Form.Group className="selectsTurnos text-centrado mb-3">
                                            <Form.Control required size="lg" type="time" 
                                            onInput={e => props.setHorasModificadas({
                                                ...props.horasModificadas,
                                                [indice]: {
                                                ...props.horasModificadas[indice],
                                                horaFinN: e.target.value.trim(),
                                                },
                                            })}
                                            defaultValue={props.horasModificadas[indice].horaFinN}/>
                                        </Form.Group>
                                    </td>
                                )
                            }
                        })}
                    </tr>
                </tbody>
            );
        }
}

export default CrearBodyModificarTurno;
