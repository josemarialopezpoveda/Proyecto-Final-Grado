import React, {useState, useEffect} from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { mostrarAlertaErronea, mostrarAlertaCorrecta, peticionGetAuth, peticionPut } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';

function ModificarTipoAusencia() {

    const [form, setForm] = useState({
        descripcion: ""
    });

    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();

    const TodoCorrecto = async() =>{
        let correcto = form.descripcion !== "";
        if(correcto){
            if(form.tipo !== "-"){
                var raw = {
                    "empresa_id": localStorage.getItem('id'),
                    "descripcion": form.descripcion,
                    "tipo": form.tipo,
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
              let peticion = await peticionPut(URL_API + "tipoAusencias/" + `${localStorage.getItem('idTipoAusencia')}`, raw, header)
              if(peticion.data.errores !== undefined && peticion.data.errores !== null){
                  mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
              }else{
                  mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
                  Navigate("/verTipoAusencias")
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
      let datosAusencia = await peticionGetAuth(URL_API + "tipoAusencias/" + `${localStorage.getItem('idTipoAusencia')}`, header);
        if(datosAusencia.data !== undefined){
            if(datosAusencia.data.id == localStorage.getItem('idTipoAusencia')) {
                setForm({
                    descripcion: datosAusencia.data.descripcion,
                    tipo: datosAusencia.data.tipo
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
            <div>
                <div className='FlexBoton'>
                    <h1 className='text-center tituloH1'>Modificar Tipo Ausencia</h1>
                    <div className='contenedorBotonCrearCorreo'>
                        <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/verTipoAusencias">Volver</Link>
                    </div>
                </div>
                <section className='estiloFormularios sectionPequenyo sectionFormMarginBottomTipoAusencia'>
                    <Form id="anyadir" className='formAnyadirTipoAusencia'>
                            <p>Tipo Ausencia</p>
                            <Form.Group className="mb-3">
                                    <Form.Control required size="lg" type="text"
                                    onInput={e=>setForm({...form, descripcion:e.target.value.trim()})}
                                    defaultValue={form.descripcion}/>
                            </Form.Group>
                            <p>Tipo Ausencia</p>
                            <div className='centrarDivSelect'>
                                <Form.Group className="w-15 mb-3">
                                    <Form.Select
                                        value={form.tipo}
                                        className="selectCrearCorreoAdmin"
                                        onInput={(e) => setForm({ ...form, tipo: e.target.value.trim() })}>
                                        <option value="BAJA">BAJA</option>
                                        <option value="AUSENCIA">AUSENCIA</option>
                                        <option value="VACACIONES">VACACIONES</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                    </Form>
                    <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                        <Link to="/verTipoAusencias" className="anyadirUsuarioDatos">Volver</Link>
                        <button type='button' onClick={TodoCorrecto} className="anyadirUsuarioDatos">MODIFICAR</button>
                    </div>
                </section> 
            </div>
            <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarTipoAusencia;
