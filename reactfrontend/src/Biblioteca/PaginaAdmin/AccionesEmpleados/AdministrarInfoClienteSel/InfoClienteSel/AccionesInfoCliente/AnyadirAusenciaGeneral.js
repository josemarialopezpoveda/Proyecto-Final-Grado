import React, { useState, useEffect, useRef } from 'react';
import PiePagina from '../../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../../Nav/NavAdmin';
import Form from 'react-bootstrap/Form';
import {mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPost } from '../../../../../FuncionesAuxiliares/Funciones';
import './AnyadirAusenciaGeneral.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';

function AnyadirAusenciaGeneral(props) {
  const Navigate = useNavigate();
  const tipoBaja = useRef(null);
  const [form, setForm ] = useState({
    descripcion: '',
    justificada: 0,
    tipoausencias_id: "0",
    fechaInicio: "",
    fechaFin: null,
  });

  const [tipoAusencia, setTipoAusencia] = useState([]);

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        console.log(URL_API + "tipoAusencias")
        let datosTipoAusencia = await peticionGetAuth(URL_API + "tipoAusencias", header);
        console.log(datosTipoAusencia)
        if (datosTipoAusencia.data.length !== 0) {
          var todosDatosAusencia = datosTipoAusencia.data.map((datosA) => {
            var newAusencia = {
              id: datosA.id,
              descripcion: datosA.descripcion,
            };
            return newAusencia;
          });
          setTipoAusencia(todosDatosAusencia);
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

    const obtenerOptions = () =>{
      if(tipoAusencia !== {} && typeof(tipoAusencia) === 'object'){
        return(tipoAusencia.map((ausencia, index)=>{
          return(<option key={index} value={String(ausencia.id)}>{ausencia.descripcion}</option>)
        }))
      }
    }
  
  const TodoCorrecto = async() =>{
    console.log(tipoBaja)
    let raw = {
      "descripcion": form.descripcion,
      "tipoausencias_id": parseInt(tipoBaja.current.value.trim()),
      "empleado_id": parseInt(localStorage.getItem('idEmpleado')),
      "fechaInicio": form.fechaInicio,
      "fechaFin": form.fechaFin,
      "justificada": parseInt(form.justificada)
    }
    console.log(raw)
    try {
      const header = {
          headers: {
              "Accept": "application/json",
              "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
          }
      }
    let peticion = await peticionPost(URL_API + "ausencias", raw, header)
    if(peticion.data.errores !== undefined && peticion.data.errores !== null){
        mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
    }else{
        mostrarAlertaCorrecta("Todo correcto y funcionando perfectamente","Ausencia añadida correctamente", "5000");
        Navigate("/verAusencias")
    }
  } catch (error) {
      mostrarAlertaErronea(error.message, error.stack, null);
  }

  }
  return (
    <React.Fragment>
        <NavAdmin/>
          <div className='sectionAnyadirAusenciaGeneral'>
            <h1>Añadir {props.titulo}</h1>
              <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottom'>
                <Form id="anyadir">
                  <div className='divContenedorCampo'>
                    <p>Descripción</p>
                    <Form.Group className="w-50 mb-3">
                          <Form.Control
                            onInput={(e) => setForm({ ...form, descripcion: e.target.value.trim() })}
                            size="lg" type="text"/>
                    </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                    <p>Justificada</p>
                    <Form.Group className="w-50 mb-3">
                      <Form.Select
                        value={form.justificada}
                        className="selectCrearCorreoAdmin selectpequenyo"
                        onInput={(e) => setForm({ ...form, justificada: e.target.value.trim() })}>
                        <option value="1">Si</option>
                        <option value="0">No</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                    <p>Tipo de {props.titulo}</p>
                    <Form.Group className="w-50 mb-3">
                      <Form.Select 
                        ref={tipoBaja}
                        value={form.tipoausencias_id}
                        onInput={(e) => setForm({ ...form, tipoausencias_id: e.target.value.trim() })}
                        className='selectpequenyo selectCrearCorreoAdmin'>
                        <option value="0"> - </option>
                        {obtenerOptions()}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                    <p>Fecha Inicio</p>
                    <Form.Group className="w-50 mb-3">
                    <Form.Control
                      size="lg"
                      type="date"
                      onChange={(e) => setForm({ ...form, fechaInicio: e.target.value.trim() })}
                      defaultValue={form.fnac}
                    />
                    </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                    <p>Fecha Fin</p>
                    <Form.Group className="w-50 mb-3">
                    <Form.Control
                      size="lg"
                      type="date"
                      onChange={(e) => setForm({ ...form, fechaFin: e.target.value.trim() })}
                      defaultValue={form.fnac}
                    />
                    </Form.Group>
                  </div>
                  <div className='contenedorBotonAñadirAusenciaGeneral'>
                    <button type='button' className='linkSignInLogin' onClick={TodoCorrecto} id="signIn">Añadir {props.titulo}</button>
                    <Link to="/verAusencias" className="linkSignInLogin" id="signIn">Volver</Link>
                  </div>
                </Form>
              </section>
          </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default AnyadirAusenciaGeneral;
