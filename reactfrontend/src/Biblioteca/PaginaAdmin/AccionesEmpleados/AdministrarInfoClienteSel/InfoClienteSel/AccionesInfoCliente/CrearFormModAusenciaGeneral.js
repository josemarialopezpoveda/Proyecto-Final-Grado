import { mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPut } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import { useNavigate } from "react-router-dom";
import './AnyadirAusenciaGeneral.css';

function CrearFormModAusenciaGeneral(props) {
  const Navigate = useNavigate();
  const tipoBaja = useRef(null);
  const [form, setForm ] = useState({
    descripcion: '',
    justificada: 0,
    tipoausencias_id: "0",
    fechaInicio: "",
    fechaFin: undefined,
  });

  const [tipoAusencia, setTipoAusencia] = useState([]);

    const recoleccionDatosTipoAusencias = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosTipoAusencia = await peticionGetAuth(URL_API + "tipoAusencias/", header);
        if (datosTipoAusencia.data !== 0) {
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

      const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        console.log(URL_API + "ausencia/" + `${localStorage.getItem("idAusencia")}`)
        let datosAusencia = await peticionGetAuth(URL_API + "ausencia/" + `${localStorage.getItem("idAusencia")}`, header);
        console.log(datosAusencia)
        if (datosAusencia.data.ausencia !== undefined) {
            var newAusencia = {
              descripcion: datosAusencia.data.ausencia.descripcion,
              justificada: datosAusencia.data.ausencia.justificada,
              fechaInicio: datosAusencia.data.ausencia.fechaInicio,
              fechaFin: datosAusencia.data.ausencia.fechaFin,
              tipoausencias_id: datosAusencia.data.ausencia.tipoausencias_id
            };
          setForm(newAusencia);
        }
      };

    useEffect(() => {
      recoleccionDatos();
      recoleccionDatosTipoAusencias();
    }, []);

    const obtenerOptions = () =>{
      if(tipoAusencia !== {} && typeof(tipoAusencia) === 'object'){
        return(tipoAusencia.map((ausencia, index)=>{
          return(<option key={index} value={ausencia.id}>{ausencia.descripcion}</option>)
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
      let peticion = await peticionPut(URL_API + "ausencias/" + `${localStorage.getItem("idAusencia")}`, raw, header)
      if(peticion.data.errores !== undefined && peticion.data.errores !== null){
          mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
      }else{
          mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
          Navigate("/verAusencias")
      }
    } catch (error) {
        mostrarAlertaErronea(error.message, error.stack, null);
    }
  }
  if(form.descripcion !== null && form.justificada !== null && form.fechaInicio !== null && form.fechaFin !== undefined && form.tipoausencias_id !== null){
    return (
      <React.Fragment>
        <Form id="anyadir">
                    <div className='divContenedorCampo'>
                      <p>Descripción</p>
                      <Form.Group className="w-50 mb-3">
                            <Form.Control
                              defaultValue={form.descripcion}
                              onInput={(e) => setForm({ ...form, descripcion: e.target.value.trim() })}
                              size="lg" type="text"/>
                      </Form.Group>
                    </div>
                    <div className='divContenedorCampo'>
                      <p>Justificada</p>
                      <Form.Group className="w-50 mb-3">
                        <Form.Select
                          defaultValue={form.justificada}
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
                        defaultValue={form.fechaInicio}
                        size="lg"
                        type="date"
                        onChange={(e) => setForm({ ...form, fechaInicio: e.target.value.trim() })}
                      />
                      </Form.Group>
                    </div>
                    <div className='divContenedorCampo'>
                      <p>Fecha Fin</p>
                      <Form.Group className="w-50 mb-3">
                      <Form.Control
                        defaultValue={form.fechaFin}
                        size="lg"
                        type="date"
                        onChange={(e) => setForm({ ...form, fechaFin: e.target.value.trim() })}
                      />
                      </Form.Group>
                    </div>
                    <div className='contenedorBotonAñadirAusenciaGeneral'>
                      <button type='button' className='linkSignInLogin' onClick={TodoCorrecto} id="signIn">Modificar {props.titulo}</button>
                      <Link to="/pagInfoClienteSel" className="linkSignInLogin" id="signIn">Volver</Link>
                    </div>
                  </Form>
      </React.Fragment>
    );
  }
}

export default CrearFormModAusenciaGeneral;
