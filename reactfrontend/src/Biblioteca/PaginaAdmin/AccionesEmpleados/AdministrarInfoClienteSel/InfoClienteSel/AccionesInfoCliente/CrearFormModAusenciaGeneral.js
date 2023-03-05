import React from 'react';
import Form from 'react-bootstrap/Form';
import { generarUUID } from '../../../../../FuncionesAuxiliares/Funciones';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Link} from 'react-router-dom';
import './AnyadirAusenciaGeneral.css';

function CrearFormModAusenciaGeneral(props) {
    var option = 
    {
        desc: "Caída de una escalera en el trabajo",
        fecIni: "1/1/2023",
        fecFin:"1/2/2023",
        justificada: "SI",
        tipoAusencia: "Accidente",
        
    };

  return (
    <React.Fragment>
        <Form key={generarUUID()} id="anyadir">
          <div className='divContenedorCampo'>
            <p>Descripción</p>
            <Form.Group className="mb-3">
                  <Form.Control required size="lg" type="text" placeholder={option.desc}/>
            </Form.Group>
          </div>
          <div className='divContenedorCampo'>
            <p>Fecha Inicio</p>
            <Form.Group className="mb-3">
                  <Form.Control required size="lg" type="date" placeholder={option.fecIni}/>
            </Form.Group>
          </div>
          <div className='divContenedorCampo'>
            <p>Fecha Fin</p>
            <Form.Group className="mb-3">
                  <Form.Control required size="lg" type="date" placeholder={option.fecFin}/>
            </Form.Group>
          </div>
          <div className='divContenedorCampo'>
            <p>Justificada</p>
            <Form.Group className="mb-3">
                  <Form.Control required size="lg" type="date" placeholder={option.justificada}/>
            </Form.Group>
          </div>
          <div className='divContenedorCampo'>
                <p>Tipo de {props.titulo}</p>
                <Form.Select className='optionModAusenciaGeneral selectpequenyo' aria-label="Default select example">
                  <option value="Baja por enfermedad">Baja por enfermedad</option>
                  <option value="Baja por accidente">Baja por accidente</option>
                  <option value="Baja por maternidad">Baja por maternidad</option>
                  <option value="Vacaciones">Vacaciones</option>
                </Form.Select>
            </div>
            <div className='contenedorBotonModAusenciaGen'>
                <Link className="linkSignInLogin botonModAusenciaGen" id="signIn" to={props.link}>Modificar</Link>
            </div>
        </Form>
    </React.Fragment>
  );
}

export default CrearFormModAusenciaGeneral;
