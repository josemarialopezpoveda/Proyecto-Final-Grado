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
        console.log(correcto)
        if(correcto){
            var raw = {
                "descripcion": form.descripcion,
            }
            try {
                const header = {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                    }
                }
              let peticion = await peticionPut(URL_API + "tipoAusencias/" + `${localStorage.getItem('idAusencia')}`, raw)
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
      let datosAusencia = await peticionGetAuth(URL_API + "tipoAusencias/" + `${localStorage.getItem('idAusencia')}`);
      console.log(datosAusencia)
        if(datosAusencia.data !== undefined){
            if(datosAusencia.data.id == localStorage.getItem('idAusencia')) {
                setForm({
                    descripcion: datosAusencia.data.descripcion,
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
                <section className='estiloFormularios sectionPequenyo sectionFormMarginBottomTipoAusencia'>
                    <h1 className='tituloh1noMarBot'>Modificar Tipo ausencia</h1>
                    <Form id="anyadir" className='formAnyadirTipoAusencia'>
                            <p>Tipo Ausencia</p>
                            <Form.Group className="mb-3">
                                    <Form.Control required size="lg" type="text"
                                    onInput={e=>setForm({...form,descripcion:e.target.value.trim()})}
                                    defaultValue={form.descripcion}/>
                            </Form.Group>
                    </Form>
                    <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                        <Link to="/verTipoAusencias" className="anyadirUsuarioDatos">Volver</Link>
                        <button type='button' onClick={TodoCorrecto} className="anyadirUsuarioDatos">MODIFICAR</button>
                    </div>
                </section> 
                <pre>{JSON.stringify(form, null, 3)}</pre> 
            </div>
            <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarTipoAusencia;
