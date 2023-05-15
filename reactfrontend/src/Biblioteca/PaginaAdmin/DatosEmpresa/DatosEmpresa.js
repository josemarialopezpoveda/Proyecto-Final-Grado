//Importamos los estilos CSS del pie de página.
import React, {useState,useEffect, useContext} from 'react';
import Table from 'react-bootstrap/Table';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../Nav/NavAdmin';
import { Link } from 'react-router-dom';
import { mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import './DatosEmpresa.css';
import {useNavigate} from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL_API } from "../../../services/http/const";

function DatosEmpresa(){
    //Variable para el uso del useNavigate.
    const Navigate = useNavigate();
    //Variable para el almacenamiento de los datos de la empresa.
    const [datos, setDatos] = useState({});
    //Variable para el almacenamiento de los datos de la empresa.
    const [foto, setFoto] = useState();
    //Función que recoge los datos de la empresa y los almacena y en caso de que algo no funcione correctamente se avisa al usuario.
    const recoleccionDatos = async() =>{
        const header = {
            headers: {
                "Accept": "application/json",
                "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
            }
        }
        let url = URL_API + "empresa/" + `${localStorage.getItem('id')}`;
        console.log(url)
        let datosEmpresa = await peticionGetAuth(`${url}`, header);
        console.log(datosEmpresa)
            if(datosEmpresa !== undefined && datosEmpresa.data.empresa !== undefined){
                setDatos({
                    razonSocial: datosEmpresa.data.empresa.razonSocial,
                    nombreComercial: datosEmpresa.data.empresa.nombreComercial,
                    CIF: datosEmpresa.data.empresa.cif,
                    telFijo: datosEmpresa.data.empresa.telefonoFijo,
                    telMovil: datosEmpresa.data.empresa.telefonoMovil,
                    Direccion: datosEmpresa.data.empresa.direccion,
                    Poblacion: datosEmpresa.data.empresa.poblacion,
                    Provincia: datosEmpresa.data.empresa.provincia,
                    Pais: datosEmpresa.data.empresa.pais,
                    email: datosEmpresa.data.empresa.email,
                    cPostal: datosEmpresa.data.empresa.cPostal
                })

                //"../../../../../laravelbackend/storage/app/public/images/M3jRf9q9AHJcglVsh2J6NCCogf0mAiaDpD221r3v.jpg"
                setFoto(datosEmpresa.data.logo)
            }else{
                mostrarAlertaErronea("Error: algo raro ha pasado...", "Error inesperado algo no ha funcionado correctamente.", "7000");
            }
    }

    //Función que manda una alerta avisando de que los datos de la empresa se borrarán y pidiendo una confirmación si la acepta hago una petición de tipo delete para borrar la empresa mandándole también un header con los datos de la sesión e informando de si ha ido correctamente o algo no ha salido como lo esperábamos.
     const borrarEmpresa = async() =>{
        SweetAlert.fire({
                title: "¿Estás seguro que quieres eliminar tu empresa?",
                text: "Los datos se eliminarán definitivamente",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            })
            .then(async resultado => {
                if (resultado.value) {
                    const header = {
                        headers: {
                        "Accept": "application/json",
                        "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                        }
                    }
                    try{
                        let url = URL_API + "empresa/" + `${localStorage.getItem('id')}`;
                        let peticion = await peticionDelete(`${url}`, header);
                        if(peticion.data.errores !== undefined && peticion.data.errores !== null){
                            mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
                        }else{
                            mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
                            Navigate("/");
                        }
                    }catch(error){
                        mostrarAlertaErronea(error.message, error.stack, null);
                    }
                }
            })
     }
    //Un useEffect para nada más cargar la página muestre también los datos de la empresa.
    useEffect(() => {
        recoleccionDatos();
    },[]);

    const verificarUserAdmin = () =>{
        if(localStorage.getItem('tipoUsuario') !== undefined && localStorage.getItem('tipoUsuario') !== "Administrador" ){
            return(<button type='button' onClick={borrarEmpresa} className="linkSignInLogin" id="signIn">Eliminar</button>)
        }
    }

    const botonVolver = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(
                <Link className="linkSignInLogin" id="signIn" to="/misDatos">Volver</Link>
            );
        }
      }

      //Función que guarda el ID del empleado a modificar en localStorage y te lleva a la ruta del formulario de modificar el empleado.
        const modificar = (e) => {
            localStorage.setItem("idEmpresaDatos", e.target.id);
            Navigate("/modificarDatosEmpresa");
        };

    return(
    <React.Fragment>
        <NavAdmin/>
        <section>
            <pre>{JSON.stringify(foto,null,3)}</pre>
            <div className='TablaDatosUser'>
                {foto ? (
                    <div className='fotoUsuarioLogueado'>
                        <h1>Foto {datos.nombreComercial}</h1>
                        <img className='fotoMisDatosUsuario' src={foto} alt="logotipo"/> 
                        <img className='fotoMisDatosUsuario' src={"../../../../../laravelbackend/storage/app/public/images/M3jRf9q9AHJcglVsh2J6NCCogf0mAiaDpD221r3v.jpg"} alt="logotipo"/> 
                        <img className='fotoMisDatosUsuario' src={require("../../../img/logoClaro.png")} alt="logotipo"/> 
                    </div>
                    ) : (
                        <div className='fotoUsuarioLogueado'>
                            <h1>Foto {datos.nombreComercial}</h1>
                            <h2>No has subido una foto aún.</h2>
                        </div>
                    )

                }
                <section className='sectionPequenyo sectionFormMarginBottom'>
                    <Table className='tablaAjustar' striped>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Razón social</td>
                                <td>{datos.razonSocial}</td>
                            </tr>
                            <tr>
                                <td>Nombre Comercial</td>
                                <td>{datos.nombreComercial}</td>
                            </tr>
                            <tr>
                                <td>CIF</td>
                                <td>{datos.CIF}</td>
                            </tr>
                            <tr>
                                <td>Teléfono Fijo</td>
                                <td>{datos.telFijo}</td>
                            </tr>
                            <tr>
                                <td>Teléfono Móvil</td>
                                <td>{datos.telMovil}</td>
                            </tr>
                            <tr>
                                <td>Direccion</td>
                                <td>{datos.Direccion}</td>
                            </tr>
                            <tr>
                                <td>Poblacion</td>
                                <td>{datos.Poblacion}</td>
                            </tr>
                            <tr>
                                <td>Código Postal</td>
                                <td>{datos.cPostal}</td>
                            </tr>
                            <tr>
                                <td>Provincia</td>
                                <td>{datos.Provincia}</td>
                            </tr>
                            <tr>
                                <td>Pais</td>
                                <td>{datos.Pais}</td>
                            </tr>
                            <tr>
                                <td>Correo Electrónico</td>
                                <td>{datos.email}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className='text-center classFlexBotones'>
                        <button type='button' onClick={modificar} className="linkSignInLogin" id="signIn">Modificar</button>
                        {verificarUserAdmin()}
                        {botonVolver()}
                    </div>
                </section>
            </div>
        </section>
        <PiePagina/>
    </React.Fragment>

    );
}

export default DatosEmpresa;
