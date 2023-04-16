//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPost } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';
import NavCliente from '../Nav/NavCliente';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';

function CrearCorreoCliente() {
    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();
    const [casoCreado, setCasoCreado] = useState({
        empleado_id: `${localStorage.getItem("id")}`,
        asunto: ""
    });

    const [mensajeCreado, setMensajeCreado] = useState({
        casos_id: "",
        empresa_id: `${localStorage.getItem("id")}`,
        emisor: "",
        receptor:"",
        mensaje: ""
    });

    const [nombresUsuarios, setNombresUsuarios] = useState({
        nombreCompleto: "",
        id: ""
    });

    const recoleccionDatos = async () => {
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

    useEffect(() => {
        recoleccionDatos();
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
          "empleado_id": casoCreado.empleado_id,
          "asunto": casoCreado.asunto,
        }
        console.log(raw)
        try {
          const header = {
              headers: {
                  "Accept": "application/json",
                  "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
              }
          }
        let peticion = await peticionPost(URL_API + "casos", raw, header)
        console.log(peticion)
        if(peticion.data.errores !== undefined && peticion.data.errores !== null){
            mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
        }else{
            mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
            setMensajeCreado({...mensajeCreado, casos_id: peticion.data.caso.id});
            crearMensaje();
            Navigate("/chatCliente")
        }
      } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
      }
    
    }

    const crearMensaje = async() =>{
        console.log(mensajeCreado.casos_id,)
        let raw = {
            "casos_id": mensajeCreado.casos_id,
            "empresa_id": mensajeCreado.empresa_id,
            "emisor": mensajeCreado.emisor,
            "receptor": mensajeCreado.receptor,
            "mensaje": mensajeCreado.mensaje,
          }
          console.log(raw)
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
              Navigate("/chatAdmin")
          }
        } catch (error) {
            mostrarAlertaErronea(error.message, error.stack, null);
        }
      
    }

  return (
    <React.Fragment>
        <NavCliente/>
                <div className=''>
                    <h1 className='text-center tituloH1'>Crear Caso</h1>
                    <section className='sectionPequenyo sectionFormAccionesUsuario sectionFormMarginBottomTipoAusencia'>
                    <Form id="anyadir">
                        <div className="divContenedorCampo divMensajeCorreo">
                                <p>Asunto</p>
                                <Form.Group className="mb-3 w-50">
                                <Form.Control
                                    defaultValue={casoCreado.asunto}
                                    onInput={(e) => setCasoCreado({ ...casoCreado, asunto: e.target.value.trim() })}
                                    size="lg"
                                    type="text"
                                />
                                </Form.Group>
                        </div>
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
                            <Link to="/chatCliente" className="anyadirUsuarioDatos">Volver</Link>
                            <button type='button' className='anyadirUsuarioDatos' onClick={TodoCorrecto}>Enviar Correo</button>
                        </div>
                    </Form>
                    </section>
                </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default CrearCorreoCliente;
