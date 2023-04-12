import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import './VerMensajes.css'
import { booleanoANumber, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPut, valorCheck } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';

function VerMensajes() {
    
    const [form, setForm] = useState([{
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
        console.log(datosCaso)
         if (datosCaso.data.mensajes !== undefined && datosCaso.data.mensajes !== null && datosCaso.data.mensajes.length !== 0) {
            var todosDatosCaso = datosCaso.data.mensajes.map((datosM) => {
                var newEmpresa = {
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


  return (
    <React.Fragment>
        <NavAdmin/>
        <div className='cabeceraVerMensaje'>
            <div className="genteMensaje">
                <h1>Involucrado 1: {form[0].receptor}</h1>
                <h1>Involucrado 2: {form[0].emisor}</h1>
            </div>
            <div className='botonCrearMensaje'>
                <Link to="/" className="anyadirUsuarioDatos">Crear Mensaje</Link>
            </div>
        </div>
        <div className="contenedorTexto">
            {form.map((option) => {
                {console.log(option)}
                return(
                <div key={generarUUID()}>
                    <div className='emisorReceptor'>
                        <h1>Para: {option.receptor}</h1>
                        <h1>De: {option.emisor}</h1>
                    </div>
                    <div className="textoMensaje">{option.mensaje}</div>
                    <div className="fechaMensaje">{option.horaEnvio}</div>
                </div>)
            })}
        </div>
        <PiePagina/>
    </React.Fragment>
  );
}

export default VerMensajes;