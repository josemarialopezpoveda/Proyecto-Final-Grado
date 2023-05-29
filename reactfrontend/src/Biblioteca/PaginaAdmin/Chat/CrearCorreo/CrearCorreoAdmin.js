
//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './CrearCorreoAdmin.css';
import {Link, useNavigate} from 'react-router-dom';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import { mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPost, recogerIdEmpleadoLogueado } from "../../../FuncionesAuxiliares/Funciones";
import { URL_API } from 'services/http/const';

function CrearCorreoAdmin() {
    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();
    const [casoCreado, setCasoCreado] = useState({
        empleado_id: recogerIdEmpleadoLogueado(),
        asunto: ""
    });

    //Estado para almacenar el nombre del empleado.
    const [empleado, setEmpleado] = useState("");

    const [mensajeCreado, setMensajeCreado] = useState({
        casos_id: "",
        empresa_id: "",
        receptor:"",
        mensaje: ""
    });

    const [nombresUsuarios, setNombresUsuarios] = useState([{
        nombreCompleto: "",
        id: ""
    }]);

    const [emisor,setEmisor] = useState();

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpresaLogueada = undefined;
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){   
            datosEmpresaLogueada = await peticionGetAuth(URL_API + "empresaEmpleados/" + `${localStorage.getItem("id")}`, header);
        }else{
            datosEmpresaLogueada = await peticionGetAuth(URL_API + "empresaEmpleados/" + `${localStorage.getItem("idEmpresa")}`, header);
        }
        console.log(datosEmpresaLogueada)
        if (datosEmpresaLogueada.data.length !== 0) {
          var nombreCompletoEmpleado = datosEmpresaLogueada.data.map((datosEmpleado) => {
            if(`${localStorage.getItem('tipoUsuario')}` === "Trabajador" && datosEmpleado.id.toString() === `${localStorage.getItem("id")}`){
                setEmisor(datosEmpleado.empleado)
            }else if(`${localStorage.getItem('tipoUsuario')}` === "Administrador" && datosEmpleado.id.toString() === `${localStorage.getItem("idEmpleadoAdmin")}`){
                setEmisor(datosEmpleado.empleado)
            }



            if(`${localStorage.getItem('tipoUsuario')}` === "Administrador" && datosEmpleado.id.toString() !== `${localStorage.getItem("idEmpleadoAdmin")}`){
                if(datosEmpleado.empleado != empleado.nombre){ 
                    var newEmpleado = {
                        id: datosEmpleado.id,
                        nombreCompleto: datosEmpleado.empleado,
                    };
                    return newEmpleado;
                }else{
                    var newEmpleado = {
                        id: "",
                        nombreCompleto: "",
                    };
                    return newEmpleado;
                }
            }else if(`${localStorage.getItem('tipoUsuario')}` === "Trabajador" && datosEmpleado.id.toString() !== `${localStorage.getItem("id")}`){
                if(datosEmpleado.empleado != empleado.nombre){ 
                    var newEmpleado = {
                        id: datosEmpleado.id,
                        nombreCompleto: datosEmpleado.empleado,
                    };
                    return newEmpleado;
                }else{
                    var newEmpleado = {
                        id: "",
                        nombreCompleto: "",
                    };
                    return newEmpleado;
                }
            }
          });
          console.log(nombreCompletoEmpleado)
          setNombresUsuarios(nombreCompletoEmpleado);
        }
      };

    useEffect(() => {
        recoleccionDatos();
        recoleccionDatosNombre();
    }, []);

    const recoleccionDatosNombre = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
        console.log(datosEmpleado)
        if (datosEmpleado.data.nombre !== undefined) {
            var newEmpleado = {
              nombre: datosEmpleado.data.nombre + " " + datosEmpleado.data.apellidos,
            }
          setEmpleado(newEmpleado);
        }
      };

    const obtenerOptions = () =>{
        return(nombresUsuarios.map((empleado, index)=>{
            if(empleado !== undefined && empleado.id !== "" && empleado.nombreCompleto != ""){
                return(<option key={index} value={String(empleado.id)}>{empleado.nombreCompleto}</option>)
            }
        }))
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
            crearMensaje(peticion.data.caso.id, peticion.data.empresa_id);
        }
      } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
      }
    
    }

    const crearMensaje = async(idCaso, idEmpresa) =>{
        let raw = {
            "casos_id": idCaso,
            "empresa_id": idEmpresa,
            "emisor": recogerIdEmpleadoLogueado(),
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
            console.log(header)
            console.log(URL_API + "mensajes")
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
        <NavAdmin/>
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
                                <Form.Control disabled
                                    defaultValue={emisor}>
                                </Form.Control>
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
                                as="textarea"
                                defaultValue={mensajeCreado.mensaje}
                                onChange={(e) => setMensajeCreado({ ...mensajeCreado, mensaje: e.target.value.trim() })}
                            />
                            </Form.Group>
                        </div>
                        <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                            <Link to="/chatAdmin" className="anyadirUsuarioDatos">Volver</Link>
                            <button type='button' className='anyadirUsuarioDatos' onClick={TodoCorrecto}>Crear Caso</button>
                        </div>
                    </Form>
                    </section>
                </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default CrearCorreoAdmin;
