import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import './VerMensajes.css'
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';
import SweetAlert from "sweetalert2";

function VerMensajes() {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();

    const [form, setForm] = useState([{
        id:"",
        emisor: "",
        receptor: "",
        mensaje: "",
        horaEnvio: "",
    }]);

    //Función para recoger todos los datos.
    const recoleccionDatos = async () => {
        const header = {
        headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
        };
        let datosCaso = await peticionGetAuth(URL_API + "mensajes/" + `${localStorage.getItem('idCaso')}`, header);
         if (datosCaso.data.mensajes !== undefined && datosCaso.data.mensajes !== null && datosCaso.data.mensajes.length !== 0) {
            var todosDatosCaso = datosCaso.data.mensajes.map((datosM) => {
                var newEmpresa = {
                  id:datosM.id,
                  emisor: datosM.emisor,
                  receptor: datosM.receptor,
                  mensaje: datosM.mensaje,
                  horaEnvio: datosM.horaEnvio,
                };
                return newEmpresa;
              });
              setForm(todosDatosCaso);
        }
    };

    //Creamos un useEffect que nada más cargar recoge los datos.
    useEffect(() => {
        recoleccionDatos();
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
                        Navigate("/chatAdmin");
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


  return (
    <React.Fragment>
        <NavAdmin/>
        <div className='cabeceraVerMensaje'>
            <div className="genteMensaje">
                <h1>Involucrado 1: {form[0].receptor}</h1>
                <h1>Involucrado 2: {form[0].emisor}</h1>
            </div>
            <div className='botonCrearMensaje'>
                <Link to="/crearMensaje" className="anyadirUsuarioDatos">Crear Mensaje</Link>
            </div>
        </div>
        <div className="contenedorTexto">
            {form.map((option, index) => {
                if(index === form.length-1){
                    return(
                        <div className="textoMensaje" key={generarUUID()}>
                            <div className='emisorReceptor emisorReceptorUltimoMensaje'>
                                <div>
                                    <h1>Para: {option.receptor}</h1>
                                    <h1>De: {option.emisor}</h1>
                                </div>
                                <div>
                                    <button type="button" className="sinBorde" onClick={modificarMensaje}>
                                        <img
                                            title="Borrar Empleado"
                                            className="imagenFotoGestionUsuarios"
                                            id={option.id}
                                            src={require("../../../../img/modify-foto.png")}
                                            alt="imagen Foto Borrar"
                                        />
                                    </button>
                                    <button type="button" className="sinBorde" onClick={borrarMensaje}>
                                        <img
                                            title="Borrar Empleado"
                                            className="imagenFotoGestionUsuarios"
                                            id={option.id}
                                            src={require("../../../../img/delete-foto.png")}
                                            alt="imagen Foto Borrar"
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="textoMensaje">{option.mensaje}</div>
                            <div className="fechaMensaje">{option.horaEnvio}</div>
                        </div>
                    )
                }else{
                    return(
                        <div className="textoMensaje" key={generarUUID()}>
                            <div className='emisorReceptor'>
                                <h1>Para: {option.receptor}</h1>
                                <h1>De: {option.emisor}</h1>
                            </div>
                            <div className="textoMensaje">{option.mensaje}</div>
                            <div className="fechaMensaje">{option.horaEnvio}</div>
                        </div>
                    )
                }
            })}
        </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerMensajes;