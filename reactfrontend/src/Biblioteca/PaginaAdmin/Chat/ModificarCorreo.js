import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import NavAdmin from '../Nav/NavAdmin';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';
import { booleanoANumber, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPut, valorCheck } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import NavCliente from 'Biblioteca/PaginaCliente/Nav/NavCliente';

function ModificarCorreo() {
    
    const [form, setForm] = useState({
        asunto: "",
        activo: 1
    });

    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();

    const TodoCorrecto = async() =>{
        let correcto = form.asunto !== "";
        console.log(correcto)
        if(correcto){
            var raw = {
                "asunto": form.asunto,
                "activo": booleanoANumber(form.activo)
            }
            console.log(raw)
            try {
                const header = {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                    }
                }
              let peticion = await peticionPut(URL_API + "casos/" + `${localStorage.getItem('idCaso')}`, raw, header)
              console.log(peticion)
              if(peticion.data.errores !== undefined && peticion.data.errores !== null){
                  mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
              }else{
                if(peticion.data.message == "No estás autorizado."){
                    mostrarAlertaErronea(peticion.data.message, "No eres el creador del caso por lo que no lo puedes modificar", null);
                }else{
                    mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
                    Navigate("/chatAdmin")
                }
              }
          } catch (error) {
              mostrarAlertaErronea(error.message, error.stack, null);
          }
        }
    }

    //Función para recoger todos los datos.
    const recoleccionDatos = async () => {
        const header = {
        headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
        };
        let datosCasos = await peticionGetAuth(URL_API + "casos/" + `${localStorage.getItem('idCaso')}`, header);
        console.log(datosCasos)
        if (datosCasos.data.caso.asunto !== undefined && datosCasos.data.caso.asunto !== null) {
            let datos = {
                asunto: datosCasos.data.caso.asunto,
                activo: valorCheck(datosCasos.data.caso.activo)
            }
            setForm(datos);
        }
    };

    //Creamos un useEffect que nada más cargar recoge los datos.
    useEffect(() => {
        recoleccionDatos();
    }, []);


    const botonVolver = () =>{
        console.log(`${localStorage.getItem('tipoUsuario')}`)
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<Link to="/chatAdmin" className="anyadirUsuarioDatos">Volver</Link>);
        }else{
            return(<Link to="/chatCliente" className="anyadirUsuarioDatos">Volver</Link>);
        }
    }

    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }
  return (
    <React.Fragment>
        {anyadirBarraNav()}
            <pre>{JSON.stringify(form, null, 3)}</pre>
            <div>
                <section className='estiloFormularios sectionPequenyo sectionFormMarginBottomTipoAusencia'>
                    <h1 className='tituloh1noMarBot'>Modificar Caso</h1>
                    <Form id="anyadir" className='formAnyadirTipoAusencia'>
                        <p>Asunto</p>
                        <Form.Group className="mb-3">
                                <Form.Control required size="lg" type="text" placeholder={"Asunto del caso"}
                                onChange={e=>setForm({...form,asunto:e.target.value.trim()})}
                                defaultValue={form.asunto}/>
                        </Form.Group>
                        <div className="divContenedorCampo">
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
                        {botonVolver()}
                        <button type='button' onClick={TodoCorrecto} className="anyadirUsuarioDatos">MODIFICAR</button>
                    </div>
                </section>  
            </div>
            <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarCorreo;