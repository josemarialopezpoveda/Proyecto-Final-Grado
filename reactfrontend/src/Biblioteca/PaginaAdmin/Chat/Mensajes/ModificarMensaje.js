//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import { mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPost } from "../../../FuncionesAuxiliares/Funciones";
import { URL_API } from 'services/http/const';

function ModificarMensaje() {
    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();

    const [mensaje, setMensaje] = useState({
        casos_id: `${localStorage.getItem('idCaso')}`,
        empresa_id: `${localStorage.getItem("id")}`,
        emisor: "",
        receptor:"",
        mensaje: ""
    });

    const [nombresUsuarios, setNombresUsuarios] = useState({
        nombreCompleto: "",
        id: ""
    });

    const recoleccionEmpleados = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleados = await peticionGetAuth(URL_API + "empresa/", header);
        if (datosEmpleados.data.empresa.empleados !== 0) {
          var nombreCompletoEmpleado = datosEmpleados.data.empresa.empleados.map((datosEmpleado) => {
            var newEmpleado = {
              id: datosEmpleado.id,
              nombreCompleto: datosEmpleado.nombre + " " + datosEmpleado.apellidos,
            };
            return newEmpleado;
          });
          setNombresUsuarios(nombreCompletoEmpleado);
        }
    };

    const recoleccionDatosMensaje = async () => {
        const header = {
            headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
        };
        let datosMensaje = await peticionGetAuth(URL_API + "mensaje/" + `${localStorage.getItem("idMensaje")}`, header);
        console.log(datosMensaje)
        if (datosMensaje.data.mensaje !== undefined) {
            var datosMensajeObj = {
                receptor: datosMensaje.data.mensaje.receptor,
                mensaje: datosMensaje.data.mensaje.mensaje,
            };
            setMensaje(datosMensajeObj);
        }
    };

    useEffect(() => {
        recoleccionEmpleados();
        recoleccionDatosMensaje();
    }, []);

    const obtenerOptions = () =>{
        if(nombresUsuarios.id !== "" && typeof(nombresUsuarios) === 'object'){
            return(nombresUsuarios.map((empleado, index)=>{
                return(<option key={index} value={String(empleado.id)}>{empleado.nombreCompleto}</option>)
            }))
        }
    }

    const TodoCorrecto = async() =>{
        let raw = {
            "casos_id": mensaje.casos_id,
            "empresa_id": mensaje.empresa_id,
            "emisor": mensaje.emisor,
            "receptor": mensaje.receptor,
            "mensaje": mensaje.mensaje,
          }
          try {
            const header = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                }
            }
          let peticion = await peticionPost(URL_API + "mensajes", raw, header)
          console.log(peticion)
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

  return (
    <React.Fragment>
        <NavAdmin/>
            <pre>{JSON.stringify(mensaje, null, 3)}</pre>
                <div className=''>
                    <h1 className='text-center tituloH1'>Modificar Mensaje</h1>
                    <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottomTipoAusencia'>
                    <Form id="anyadir">
                        <div className="divContenedorCampo divMensajeCorreo">
                                <p>Para:</p>
                                <Form.Group className="w-50 mb-3">
                                    <Form.Select 
                                        value={mensaje.receptor}
                                        onInput={(e) => setMensaje({ ...mensaje, receptor: e.target.value.trim() })}
                                        className='selectpequenyo selectCrearCorreoAdmin'>
                                        <option value="0"> - </option>
                                        {obtenerOptions()}
                                    </Form.Select>
                                </Form.Group>
                        </div>
                        <div className="divContenedorCampo divMensajeCorreo">
                            <p>Mensaje</p>
                            <Form.Group className="mb-3 w-50">
                            <Form.Control
                                size="lg"
                                type="text"
                                defaultValue={mensaje.mensaje}
                                onChange={(e) => setMensaje({ ...mensaje, mensaje: e.target.value.trim() })}
                            />
                            </Form.Group>
                        </div>
                        <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                            <Link to="/verMensajes" className="anyadirUsuarioDatos">Volver</Link>
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
