import React, {useState, useEffect} from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { mostrarAlertaErronea, mostrarAlertaCorrecta, recogerFechaAPartirFecha, peticionGetAuth, peticionPut, convertirFechaYYYY_MM_DD, booleanoANumber } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';

function ModificarTurnoIncidencia() {

    const [form, setForm] = useState({
        activo: 1,
    });

    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();

    const TodoCorrecto = async() =>{
        let correcto = form.descripcion !== "";
        if(correcto){
            var raw = {
                "turno_id": form.turno_id,
                "empleados_turnos_id": parseInt(localStorage.getItem('empleados_turnos_id')),
                "fechaInicioTurno": form.fInicio,
                "fechaFinTurno": form.fFin
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
                  //Navigate("/empleadosProblemasTurnos")
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
      let datosTurno = await peticionGetAuth(URL_API + "turnoEmpleado/" + `${localStorage.getItem('empleados_turnos_id')}`, header);
      console.log(datosTurno)
        if(datosTurno.data !== undefined){
            console.log(datosTurno.data.turnoEmpleado.fechaFinTurno)
            let turnoCreado = {
                fInicio: convertirFechaYYYY_MM_DD(datosTurno.data.turnoEmpleado.fechaInicioTurno),
                fFin: convertirFechaYYYY_MM_DD(datosTurno.data.turnoEmpleado.fechaFinTurno),
                id_empleado: datosTurno.data.turnoEmpleado.empleado_id,
                turno_id: datosTurno.data.turnoEmpleado.turno_id,
                activo: datosTurno.data.turnoEmpleado.activo
            }
            setForm(turnoCreado)
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
            <div>
                <div className='FlexBoton'>
                    <h1 className='text-center tituloH1 tituloh1noMarBot'>Modificar Turno Incidencia</h1>
                    <div className='contenedorBotonCrearCorreo'>
                        <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/verTurnoIncidencia">Volver</Link>
                    </div>
                </div>
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
                            onChange={(e) => setForm({ ...form, activo: booleanoANumber(e.target.checked) })}
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
