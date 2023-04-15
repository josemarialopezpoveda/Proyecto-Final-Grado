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

    const [mensajeCreado, setMensajeCreado] = useState({
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

    const recoleccionDatosEmpresa = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpresaLogueada = await peticionGetAuth(URL_API + "empresa/", header);
        //console.log(datosEmpresaLogueada.data.empresa.empleados)
        if (datosEmpresaLogueada.data.empresa.empleados !== 0) {
          var nombreCompletoEmpleado = datosEmpresaLogueada.data.empresa.empleados.map((datosEmpleado) => {
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
        let datosEmpresaLogueada = await peticionGetAuth(URL_API + "empresa/", header);
        if (datosEmpresaLogueada.data.empresa.empleados !== 0) {
            var nombreCompletoEmpleado = datosEmpresaLogueada.data.empresa.empleados.map((datosEmpleado) => {
            var newEmpleado = {
                id: datosEmpleado.id,
                nombreCompleto: datosEmpleado.nombre + " " + datosEmpleado.apellidos,
            };
            return newEmpleado;
            });
            setNombresUsuarios(nombreCompletoEmpleado);
        }
    };

    useEffect(() => {
        recoleccionDatosEmpresa();
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
            "casos_id": mensajeCreado.casos_id,
            "empresa_id": mensajeCreado.empresa_id,
            "emisor": mensajeCreado.emisor,
            "receptor": mensajeCreado.receptor,
            "mensaje": mensajeCreado.mensaje,
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
            <pre>{JSON.stringify(mensajeCreado, null, 3)}</pre>
                <div className=''>
                    <h1 className='text-center tituloH1'>Crear Mensaje</h1>
                    <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottomTipoAusencia'>
                    <Form id="anyadir">
                        <div className='divContenedorCampo'>
                            <p>De:</p>
                            <Form.Group className="w-50 mb-3">
                                <Form.Select 
                                    value={mensajeCreado.emisor}
                                    onInput={(e) => setMensajeCreado({ ...mensajeCreado, emisor: e.target.value.trim() })}
                                    className='selectpequenyo selectCrearCorreoAdmin'>
                                    <option value="0"> - </option>
                                    {obtenerOptions()}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="divContenedorCampo divMensajeCorreo">
                                <p>Para:</p>
                                <Form.Group className="w-50 mb-3">
                                    <Form.Select 
                                        value={mensajeCreado.receptor}
                                        onInput={(e) => setMensajeCreado({ ...mensajeCreado, receptor: e.target.value.trim() })}
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
                                defaultValue={mensajeCreado.mensaje}
                                onChange={(e) => setMensajeCreado({ ...mensajeCreado, mensaje: e.target.value.trim() })}
                            />
                            </Form.Group>
                        </div>
                        <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                            <Link to="/verMensajes" className="anyadirUsuarioDatos">Volver</Link>
                            <button type='button' className='anyadirUsuarioDatos' onClick={TodoCorrecto}>Crear Mensaje</button>
                        </div>
                    </Form>
                    </section>
                </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarMensaje;
