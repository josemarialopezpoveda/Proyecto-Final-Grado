import React, {useState} from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import './AnyadirTipoAusencia.css';
import { mostrarAlertaErronea, mostrarAlertaCorrecta, peticionPost } from 'Biblioteca/FuncionesAuxiliares/Funciones';

function AnyadirTipoAusencia() {
    
    const [form, setForm] = useState({
        tipoAusencia: ""
    });

    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();

    const TodoCorrecto = async() =>{
        let correcto = form.tipoAusencia !== "";
        console.log(correcto)
        if(correcto){
            var raw = {
                "tipoAusencia": form.tipoAusencia,
            }

            try {
                const header = {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                    }
                }
              let peticion = await peticionPost("", raw, header)
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

  return (
    <React.Fragment>
        <NavAdmin/>
            <div>
                <section className='estiloFormularios sectionPequenyo sectionFormMarginBottomTipoAusencia'>
                    <h1 className='tituloh1noMarBot'>Añadir Tipo Ausencia</h1>
                    <Form id="anyadir" className='formAnyadirTipoAusencia'>
                            <p>Tipo Ausencia</p>
                            <Form.Group className="mb-3">
                                    <Form.Control required size="lg" type="text" placeholder={"Añade el tipo de ausencia"}
                                    onChange={e=>setForm({...form,tipoAusencia:e.target.value.trim()})}
                                    defaultValue={form.tipoAusencia}/>
                            </Form.Group>
                    </Form>
                    <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                        <Link to="/verTipoAusencias" className="anyadirUsuarioDatos">Volver</Link>
                        <button type='button' onClick={TodoCorrecto} className="anyadirUsuarioDatos">AÑADIR</button>
                    </div>
                </section>  
            </div>
            <PiePagina/>
    </React.Fragment>
  );
}

export default AnyadirTipoAusencia;
