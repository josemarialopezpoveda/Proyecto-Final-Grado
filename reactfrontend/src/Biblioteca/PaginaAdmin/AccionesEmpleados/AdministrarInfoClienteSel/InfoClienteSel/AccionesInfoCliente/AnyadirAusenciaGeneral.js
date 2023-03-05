import React, { useState, useRef } from 'react';
import PiePagina from '../../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../../Nav/NavAdmin';
import Form from 'react-bootstrap/Form';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { generarUUID } from '../../../../../FuncionesAuxiliares/Funciones';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './AnyadirAusenciaGeneral.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function AnyadirAusenciaGeneral(props) {
  const Navigate = useNavigate();
  const descInput = useRef(null);
  const [form, setForm ] = useState({
    desc: '',
    justificada: false,
    tipoDeBaja: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleSubmit = () => {
    console.log(form);
  };

  const TodoCorrecto = (e) =>{
    handleSubmit();
    let correcto = (/^[a-zA-Z0-9ñÑ\s]{8,30}$/.test(form.desc));
    console.log(correcto)
    if(correcto){
      console.log("paso");
      Navigate("/pagInfoClienteSel");
    }
  }

  const prueba = (e) =>{
    console.log(e.target.value)
    setForm({...form,desc:e.target.value})
  }

  let desc = `Descripcion de la ${props.titulo}`;
  let jus = `Justificación de la ${props.titulo}`;
  return (
    <React.Fragment>
        <NavAdmin/>
          <div className='sectionAnyadirAusenciaGeneral'>
            <h1>Añadir {props.titulo}</h1>
              <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottom'>
                <Form key={generarUUID()} id="anyadir">
                  <div className='divContenedorCampo'>
                    <p>Descripción</p>
                    <Form.Group className="mb-3">
                          <Form.Control
                            ref={descInput}
                            isValid={/^[a-zA-Z0-9ñÑ\s]{8,30}$/.test(form.desc)}
                            isInvalid={!/^[a-zA-Z0-9ñÑ\s]{8,30}$/.test(form.desc)}
                            onChange={prueba}
                            size="lg" type="text"/>
                    </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                    <p>Justificada</p>
                    <Form.Group className="mb-3">
                          <Form.Control required size="lg" type="text" placeholder={jus}/>
                    </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                    <p>Tipo de {props.titulo}</p>
                    <Form.Group className="mb-3">
                      <Form.Select className='selectpequenyo  selectCrearCorreoAdmin' aria-label="Default select example">
                        <option value="Baja por enfermedad">Baja por enfermedad</option>
                        <option value="Baja por accidente">Baja por accidente</option>
                        <option value="Baja por maternidad">Baja por maternidad</option>
                        <option value="Vacaciones">Vacaciones</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker 
                        label='FECHA INICIO' 
                        renderInput={(e) => <TextField {...e}/>}
                        onChange={(valorNuevo) => { console.log("hola")}}
                    />
                    <DatePicker 
                        label='FECHA FIN' 
                        renderInput={(d) => <TextField {...d}/>}
                        onChange={(valorNuevo) => { console.log("hola")}}
                    />
                  </LocalizationProvider>
                  <div className='contenedorBotonAñadirAusenciaGeneral'>
                    <button className='linkSignInLogin' id="signIn">Añadir {props.titulo}</button>
                    <Link to="/pagInfoClienteSel" className="linkSignInLogin" id="signIn">Volver</Link>
                  </div>
                </Form>
              </section>
          </div>
        
        <PiePagina/>
    </React.Fragment>
  );
}

export default AnyadirAusenciaGeneral;
