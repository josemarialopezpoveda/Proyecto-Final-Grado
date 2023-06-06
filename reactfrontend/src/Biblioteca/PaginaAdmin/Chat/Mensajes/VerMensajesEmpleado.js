import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import './VerMensajes.css'
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';
import SweetAlert from "sweetalert2";
import NavCliente from 'Biblioteca/PaginaCliente/Nav/NavCliente';

function VerMensajesEmpleado() {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();

    const [form, setForm] = useState([{
        id:"",
        emisor: "",
        receptor: "",
        mensaje: "",
        horaEnvio: "",
        tituloCaso:""
    }]);

    const [intervenientes, setIntervenientes] = useState({
        idInterveniente1: "",
        nombreCompletoInterveniente1:"",
        idInterveniente2: "",
        nombreCompletoInterveniente2:"",
    });

    const [tituloCaso, setTituloCaso] = useState("");

    //Función para recoger todos los datos.
    const recoleccionDatos = async () => {
        const header = {
        headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
        };
        let datosMensaje = await peticionGetAuth(URL_API + "mensajes/" + `${localStorage.getItem('idCaso')}`, header);
        let datosCaso = await peticionGetAuth(URL_API + "casos/" + `${localStorage.getItem('idCaso')}`, header);
         if (datosMensaje.data.mensajes !== undefined && datosMensaje.data.mensajes !== null && datosMensaje.data.mensajes.length !== 0) {
            var todosDatosCaso = datosMensaje.data.mensajes.map((datosM) => {
                let empleados = {
                    emisor:"",
                    receptor:"",
                };
                if(datosMensaje.data.Intervinientes.idEmisor === datosM.emisor || datosMensaje.data.Intervinientes.idReceptor === datosM.receptor){
                    empleados.emisor = datosMensaje.data.Intervinientes.Emisor;
                    empleados.receptor = datosMensaje.data.Intervinientes.Receptor;
                }else if(datosMensaje.data.Intervinientes.idEmisor === datosM.receptor || datosMensaje.data.Intervinientes.idReceptor === datosM.emisor){
                    empleados.emisor = datosMensaje.data.Intervinientes.Receptor;
                    empleados.receptor = datosMensaje.data.Intervinientes.Emisor;
                }
                var newObj = {
                  id:datosM.id,
                  emisor: empleados.emisor,
                  receptor: empleados.receptor,
                  mensaje: datosM.mensaje,
                  horaEnvio: datosM.horaEnvio,
                  tituloCaso: datosCaso.data.caso.asunto
                };
                return newObj;
              });
              setForm(todosDatosCaso);
        }
        setTituloCaso(datosCaso.data.caso.asunto)
        var intervinientes = {
            idInterveniente1: datosMensaje.data.Intervinientes.idEmisor,
            nombreCompletoInterveniente1: datosMensaje.data.Intervinientes.Emisor,
            idInterveniente2: datosMensaje.data.Intervinientes.idReceptor,
            nombreCompletoInterveniente2: datosMensaje.data.Intervinientes.Receptor,
        }
        setIntervenientes(intervinientes);
    };

    //Creamos un useEffect que nada más cargar recoge los datos.
    useEffect(() => {
        recoleccionDatos();
        recoleccionDatosEmpleado();
    }, []);

    const borrarMensaje = (e) =>{
        SweetAlert.fire({
            title: "¿Estás seguro que quieres eliminar este mensaje?",
            text: "Los datos se eliminarán definitivamente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (resultado) => {
            if (resultado.value) {
            try {
                const header = {
                headers: {
                    Accept: "application/json",
                    Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
                },
                };
                let url = URL_API + "mensajes/";
                let peticion = await peticionDelete(`${url}${e.target.id}`, header);
                if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
                    mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
                } else {
                    if(peticion.data.message === "No se puede eliminar, no estás autorizado"){
                        mostrarAlertaErronea(peticion.data.message, "Tu no puedes eliminar este mensaje debido a que no es su emisor.", "7000");
                    }else{
                        mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
                        Navigate("/verMensajesEmpleado");
                        recoleccionDatos();
                    }
                }
            } catch (error) {
                mostrarAlertaErronea(error.message, error.stack, null);
            }
            } else {
            }
        });
    }

    const modificarMensaje = (e) =>{
        localStorage.setItem("idMensaje", e.target.id);
        Navigate("/modificarMensaje");
    }

    const [empleado, setEmpleado] = useState({
        nombre:"",
    })

    const recoleccionDatosEmpleado = async () => {
        const header = {
        headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
        };
        let datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("id")}`, header);
        if (datosEmpleado.data.nombre !== undefined) {
            var newEmpleado = {
                nombre: datosEmpleado.data.nombre + "  " + datosEmpleado.data.apellidos
            }
        setEmpleado(newEmpleado);
        }
    };


    const verificarEmpleadoAdministrador = (option) =>{
        if(localStorage.getItem("tipoUsuario") !== undefined && localStorage.getItem("tipoUsuario") === "Trabajador"  
        && option.emisor === empleado.nombre){
            return(
                <div>
                    <button type="button" className="sinBorde" onClick={modificarMensaje}>
                        <img
                            title="Modificar Mensaje"
                            className="imagenFotoGestionUsuarios"
                            id={option.id}
                            src={require("../../../../img/modify-foto.png")}
                            alt="imagen Foto Borrar"
                        />
                    </button>
                    <button type="button" className="sinBorde" onClick={borrarMensaje}>
                        <img
                            title="Borrar Mensaje"
                            className="imagenFotoGestionUsuarios"
                            id={option.id}
                            src={require("../../../../img/delete-foto.png")}
                            alt="imagen Foto Borrar"
                        />
                    </button>
                </div>
            )
        }
    }

    const verificarPuedeCrearMensaje = () =>{
        if(localStorage.getItem("tipoUsuario") !== undefined && localStorage.getItem("tipoUsuario") === "Administrador" || localStorage.getItem("tipoUsuario") === "Trabajador"){
            return(
                <div className='botonCrearMensaje'>
                    <Link to="/crearMensaje" className="crearCorreoBoton">Crear Mensaje</Link>
                </div>
            )
        }
    }

  return (
    <React.Fragment>
        <NavCliente/>
        <h1 className='text-center tituloH1'>{tituloCaso}</h1>
        <div className='cabeceraVerMensaje'>
            {verificarPuedeCrearMensaje()}
        </div>
        <div className="contenedorTexto">
            {form.map((option, index) => {
                //console.log(option)
                if(option.id === "" && option.emisor === "" && option.receptor === "" && option.mensaje === "" && option.horaEnvio === "" ){
                    return(
                        <div className="textoMensaje" key={generarUUID()}>
                            <h1 className='text-center tituloH1'>Este caso todavia no tiene mensajes</h1>
                        </div>
                    );
                }else{
                    if(index === form.length-1){
                        return(
                            <div className="textoMensaje" key={generarUUID()}>
                                <div className='emisorReceptor emisorReceptorUltimoMensaje'>
                                    <div>   
                                        <h1>De: {option.emisor}</h1>
                                        <h1>Para: {option.receptor}</h1>
                                    </div>
                                    {verificarEmpleadoAdministrador(option)}
                                </div>
                                <div className="textoMensaje">{option.mensaje}</div>
                                <div className="fechaMensaje">{option.horaEnvio}</div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="textoMensaje" key={generarUUID()}>
                                <div className='emisorReceptor'>  
                                    <h1>De: {option.emisor}</h1>
                                    <h1>Para: {option.receptor}</h1>
                                </div>
                                <div className="textoMensaje">{option.mensaje}</div>
                                <div className="fechaMensaje">{option.horaEnvio}</div>
                            </div>
                        )
                    }
                }           
            })}
        </div>
        <div className='contenedorBotonModificarTurno disFlex500px'>
            <Link to="/chatCliente" className="linkSignInLogin" id="signIn">Volver</Link>
        </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerMensajesEmpleado;