//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './CrearCorreoAdmin.css';
import {Link} from 'react-router-dom';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CrearOpcionHorarioCorreo from './CrearOpcionHorarioCorreo.js';

function CrearCorreoAdmin() {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("Informar Vacaciones");
    const [fechaInicio, setFechaInicio] = useState("Fecha Inicio a Introducir");
    const [fechaFin, setFechaFin] = useState("Fecha Fin a Introducir");
    
    const crearCorreo = () =>{
        if(opcionSeleccionada === "Informar Vacaciones"){
            return(
                <div className='contenedorDatePickerCorreo'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker 
                            label='FECHA INICIO' 
                            renderInput={(e) => <TextField {...e}/>}
                            value={fechaInicio}
                            onChange={(valorNuevo) => {setFechaInicio(valorNuevo)}}
                        />
                        <DatePicker 
                            label='FECHA FIN' 
                            renderInput={(d) => <TextField {...d}/>}
                            value={fechaFin}
                            onChange={(valorNuevo) => {setFechaFin(valorNuevo)}}
                        />
                        <InputGroup>
                            <InputGroup.Text>Mensaje:</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="With textarea" />
                        </InputGroup>
                    </LocalizationProvider>
                </div>
            );
        }else if(opcionSeleccionada === "Informar Baja"){
            return(
                <div className='contenedorDatePickerCorreo'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker 
                            label='FECHA INICIO' 
                            renderInput={(e) => <TextField {...e}/>}
                            value={fechaInicio}
                            onChange={(valorNuevo) => {setFechaInicio(valorNuevo)}}
                        />
                        <DatePicker 
                            label='FECHA FIN' 
                            renderInput={(d) => <TextField {...d}/>}
                            value={fechaFin}
                            onChange={(valorNuevo) => {setFechaFin(valorNuevo)}}
                        />
                    </LocalizationProvider>
                    <InputGroup>
                        <InputGroup.Text>Mensaje:</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" />
                    </InputGroup>
                </div>
            );
        }else if(opcionSeleccionada === "Informar Nuevo Horario"){
            return(
                <div>
                    <CrearOpcionHorarioCorreo/>
                </div>
            );
        }else if(opcionSeleccionada === "Otros"){
            return(
            <div>
                <Form.Group className="mb-3">
                    <Form.Label>Título:</Form.Label>
                    <Form.Control required size="lg" type="text"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Para:</Form.Label>
                    <Form.Control required size="lg" type="email"/>
                </Form.Group>
                <InputGroup>
                    <InputGroup.Text>Mensaje:</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="With textarea" />
                </InputGroup>
            </div>
            );
        }
    }
  return (
    <React.Fragment>
        <NavAdmin/>
        <div className='contenedorFormularioCrearCorreo'>
            <div className='contenedorSelectCrearCorreoAdmin'>
                <Form.Select className='selectCrearCorreoAdmin' aria-label="Default select example" onChange={(e)=>{setOpcionSeleccionada(e.target.value) }}>
                    <option value="Informar Vacaciones">Informar Vacaciones</option>
                    <option value="Informar Baja">Informar Baja</option>
                    <option value="Informar Nuevo Horario">Informar Nuevo Horario</option>
                    <option value="Otros">Otros</option>
                </Form.Select>
            </div>

            <h1>Crear Correo</h1>
            {crearCorreo()}
            <div className='contenedorLinkEnviarCorreo'>
                <Link className='enviarCorreoBoton' to="/chatAdmin">Enviar Correo</Link>
            </div>
        </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default CrearCorreoAdmin;
