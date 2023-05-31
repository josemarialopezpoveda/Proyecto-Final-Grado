//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import { mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPut } from "../../../FuncionesAuxiliares/Funciones";
import { URL_API } from 'services/http/const';
import NavCliente from 'Biblioteca/PaginaCliente/Nav/NavCliente';

function ModificarMensaje() {
    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();

    const [mensajeCreado, setMensajeCreado] = useState({
        casos_id: `${localStorage.getItem('idCaso')}`,
        empresa_id: `${localStorage.getItem("id")}`,
        mensaje: ""
    });

    const [datosEmisor, setDatosEmisor] = useState({});

    const [datosReceptor, setDatosReceptor] = useState({});

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let url = undefined;
        url = URL_API + "casos/" + `${localStorage.getItem('idCaso')}`;
        if(url !== undefined){
            let datosCaso = await peticionGetAuth(url, header);
            let obj = {
                emisor: datosCaso.data.Intervinientes.Emisor,
                receptor: datosCaso.data.Intervinientes.Receptor,
                idEmisor: datosCaso.data.Intervinientes.idEmisor,
                idReceptor: datosCaso.data.Intervinientes.idReceptor,
            }

            if(`${localStorage.getItem("tipoUsuario")}` === "Administrador"){
                if(obj.idEmisor == `${localStorage.getItem("idEmpleadoAdmin")}`){
                    let emisor = {
                        nombre:obj.emisor,
                        id:obj.idEmisor
                    }
                    let receptor = {
                        nombre:obj.receptor,
                        id:obj.idReceptor
                    }
                    setDatosEmisor(emisor);
                    setDatosReceptor(receptor);
                }else{
                    let emisor = {
                        nombre:obj.emisor,
                        id:obj.idEmisor
                    }
                    let receptor = {
                        nombre:obj.receptor,
                        id:obj.idReceptor
                    }
                    setDatosEmisor(receptor);
                    setDatosReceptor(emisor);
                }
            }else if(`${localStorage.getItem("tipoUsuario")}` === "Trabajador"){
                if(obj.idEmisor == `${localStorage.getItem("id")}`){
                    let emisor = {
                        nombre:obj.emisor,
                        id:obj.idEmisor
                    }
                    let receptor = {
                        nombre:obj.receptor,
                        id:obj.idReceptor
                    }
                    setDatosEmisor(emisor);
                    setDatosReceptor(receptor);
                }else{
                    let emisor = {
                        nombre:obj.emisor,
                        id:obj.idEmisor
                    }
                    let receptor = {
                        nombre:obj.receptor,
                        id:obj.idReceptor
                    }
                    setDatosEmisor(receptor);
                    setDatosReceptor(emisor);
                }
            }
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

    const TodoCorrecto = async() =>{
        let raw = {
            "receptor": datosReceptor.id,
            "mensaje": mensajeCreado.mensaje,
          }
          try {
            const header = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                }
            }
          let peticion = await peticionPut(URL_API + "mensajes/" +  `${localStorage.getItem('idMensaje')}`, raw, header)
          if(peticion.data.errores !== undefined && peticion.data.errores !== null){
              mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
          }else{
              mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
              Navigate("/verMensajes")
          }
        } catch (error) {
            mostrarAlertaErronea(error.message, error.stack, null);
        }
    }

    const botonVolver = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<Link to="/verMensajes" className="anyadirUsuarioDatos">Volver</Link>)
        }else{
            return(<Link to="/verMensajesEmpleado" className="anyadirUsuarioDatos">Volver</Link>)
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
                    <div className=''>
                        <div className='FlexBoton'>
                            <h1 className='text-center tituloH1'>Modificar Mensaje</h1>
                            <div className='contenedorBotonCrearCorreo'>
                                <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/verMensajes">Volver</Link>
                            </div>
                        </div>
                        <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottomTipoAusencia'>
                        <Form id="anyadir">
                            <div className='divContenedorCampo'>
                                <p>De:</p>
                                <Form.Group className="w-50 mb-3">
                                    <Form.Control disabled
                                        defaultValue={datosEmisor.nombre}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="divContenedorCampo divMensajeCorreo">
                                    <p>Para:</p>
                                    <Form.Group className="w-50 mb-3">
                                        <Form.Control disabled
                                            defaultValue={datosReceptor.nombre}>
                                        </Form.Control>
                                    </Form.Group>
                            </div>
                            <div className="divContenedorCampo divMensajeCorreo">
                                <p>Mensaje</p>
                                <Form.Group className="mb-3 w-50">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    as="textarea"
                                    defaultValue={mensajeCreado.mensaje}
                                    onChange={(e) => setMensajeCreado({ ...mensajeCreado, mensaje: e.target.value.trim() })}
                                />
                                </Form.Group>
                            </div>
                            <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                                {botonVolver()}
                                <button type='button' className='anyadirUsuarioDatos' onClick={TodoCorrecto}>Modificar Mensaje</button>
                            </div>
                        </Form>
                        </section>
                    </div>
            <PiePagina/>
        </React.Fragment>
      );
}

export default ModificarMensaje;
