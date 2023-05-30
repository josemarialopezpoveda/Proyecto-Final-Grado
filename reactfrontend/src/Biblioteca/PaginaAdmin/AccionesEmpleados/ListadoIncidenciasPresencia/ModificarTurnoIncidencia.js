import React, {useState, useEffect} from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { mostrarAlertaErronea, mostrarAlertaCorrecta, recogerFechaAPartirFecha, peticionGetAuth, peticionPut } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';

function ModificarTurnoIncidencia() {

    const [form, setForm] = useState({
        fFin: recogerFechaAPartirFecha(new Date()),
        fInicio: recogerFechaAPartirFecha(new Date()),
        activo: 1,
    });

    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();

    const TodoCorrecto = async() =>{
        let correcto = form.descripcion !== "";
        if(correcto){
            if(form.tipo !== "-"){
                var raw = {
                    "turno_id": form.turno_id,
                    "empleados_turnos_id": localStorage.getItem('empleados_turnos_id'),
                    "fechaInicioTurno": form.fInicio,
                    "fechaFinTurno": form.fFin
                }
            }else{
                mostrarAlertaErronea("Tipo Erróneo","El campo tipo no ha sido correcto.", null);
            }
            try {
                const header = {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                    }
                }
              let peticion = await peticionPut(URL_API + "modificarTurnoAEmpleado/" + form.id_empleado, raw, header)
              if(peticion.data.errores !== undefined && peticion.data.errores !== null){
                  mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
              }else{
                  mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
                  Navigate("/empleadosProblemasTurnos")
              }
            } catch (error) {
              mostrarAlertaErronea(error.message, error.stack, null);
            }
        }
    }

    const recoleccionDatos = async() =>{
        const header = {
              headers: {
                  "Accept": "application/json",
                  "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
              }
          }
      let datosTurno = await peticionGetAuth(URL_API + "empleadoTurno/" + `${localStorage.getItem('empleados_turnos_id')}`, header);
      console.log(datosTurno)
        if(datosTurno.data !== undefined){
            if(datosTurno.data.id == localStorage.getItem('idTipoAusencia')) {
                setForm({
                    fInicio: datosTurno.data.fechaInicioTurno,
                    fFin: datosTurno.data.fechaFinTurno,
                    id_empleado: datosTurno.data.empleado_id,
                    turno_id: datosTurno.data.turno_id
                })
            }
        }else{
              mostrarAlertaErronea("Ruta de la petición incorrecta", "Error de red", null);
        }
  }

  //Recoger los datos para el formulario.
  useEffect(() => {
    recoleccionDatos();
}, []);

  return (
    <React.Fragment>
        <NavAdmin/>
            <pre>{JSON.stringify(form,null,3)}</pre>
            <div>
                <h1 className='tituloh1noMarBot'>Modificar Turno Incidencia</h1>
                <section className='estiloFormularios sectionPequenyo sectionFormMarginBottomTipoAusencia'>
                    <Form id="anyadir" className='formAnyadirTipoAusencia'>
                    <div className="divContenedorCampo2">
                        <div className="divContenedorCampo">
                        <p className="letrapequenya">Fecha Inicio</p>
                        <Form.Group className="grupoInputPequenyo">
                            <Form.Control
                            disabled
                            size="lg"
                            type="date"
                            onChange={(e) => setForm({ ...form, fInicio: e.target.value.trim() })}
                            defaultValue={form.fInicio}
                            />
                        </Form.Group>
                        </div>
                        <div className="divContenedorCampo">
                        <p className="letrapequenya">Fecha Fin</p>
                        <Form.Group className="grupoInputPequenyo">
                            <Form.Control
                            size="lg"
                            type="date"
                            onChange={(e) => setForm({ ...form, fFin: e.target.value.trim() })}
                            defaultValue={form.fFin}
                            />
                        </Form.Group>
                        </div>
                    </div>
                        <div className="divContenedorCampo mt-20">
                            <p>Activo</p>
                            <Form.Check
                            type="switch"
                            placeholder="Activo"
                            onChange={(e) => setForm({ ...form, activo: e.target.checked })}
                            checked={form.activo}
                            />
                        </div>
                    </Form>
                    <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                        <Link to="/verTurnoIncidencia" className="anyadirUsuarioDatos">Volver</Link>
                        <button type='button' onClick={TodoCorrecto} className="anyadirUsuarioDatos">MODIFICAR</button>
                    </div>
                </section> 
            </div>
            <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarTurnoIncidencia;
