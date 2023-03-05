//Importamos los estilos CSS del pie de página.
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './MisDatos.css'
import NavCliente from '../Nav/NavCliente';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import { mostrarAlertaErronea, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from "services/http/const";

function MisDatos(){
    /**
     * Estado para almacenar los datos de la petición.
     */
    const [datos, setDatos] = useState({});
    /**
     * Esta función recoge los datos de la petición y le pasa los datos del login si existen y si no existen debido a que la petición ha devuelto algo inesperado se avisa al usuario
     */
    const recoleccionDatos = async() =>{
        const header = {
            headers: {
                "Accept": "application/json",
                "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
            }
        }
        let url = URL_API + "empleado/";
        let datosEmpleado = await peticionGetAuth(`${url}`, header);
            if(datosEmpleado !== undefined && datosEmpleado.data !== undefined){
                setDatos({
                    apellidos: datosEmpleado.data.apellidos,
                    cPostal: datosEmpleado.data.cPostal,
                    direccion: datosEmpleado.data.direccion,
                    email: datosEmpleado.data.email,
                    fechaNacimiento: datosEmpleado.data.fechaNacimiento,
                    nif: datosEmpleado.data.nif,
                    nombre: datosEmpleado.data.nombre,
                    numSegSoc: datosEmpleado.data.numSegSoc,
                    pais: datosEmpleado.data.pais,
                    poblacion: datosEmpleado.data.poblacion,
                    provincia: datosEmpleado.data.provincia,
                    telefono: datosEmpleado.data.telefono
                })
            }else{
                mostrarAlertaErronea("Algo ha fallado...", "La sesión ha fallado o la url de la petición ha sido modificada.", "7000");
            }
    }
    /**
     * Un useEffect para que cada vez que se cargue la página traiga los datos con una petición get de nuevo.
     */
    useEffect(() => {
        recoleccionDatos();
    },[]);


    return(
    <React.Fragment>
        <NavCliente/>
        <section>
            <div className='TablaDatosUser'>
                <div className='fotoUsuarioLogueado'>
                    <h1>Foto {datos.nombre}</h1>
                    {/* <img className='fotoMisDatosUsuario' src={require('./fotoprueba.jpg')} alt="foto usuario"/> */}
                </div>
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
                                <td>Nombre</td>
                                <td>{datos.nombre}</td>
                            </tr>
                            <tr>
                                <td>Apellidos</td>
                                <td>{datos.apellidos}</td>
                            </tr>
                            <tr>
                                <td>DNI/NIF</td>
                                <td>{datos.nif}</td>
                            </tr>
                            <tr>
                                <td>Número Seguridad Social</td>
                                <td>{datos.numSegSoc}</td>
                            </tr>
                            <tr>
                                <td>Fecha Nacimiento</td>
                                <td>{datos.fechaNacimiento}</td>
                            </tr>
                            <tr>
                                <td>Dirección</td>
                                <td>{datos.direccion}</td>
                            </tr>
                            <tr>
                                <td>Código Postal</td>
                                <td>{datos.cPostal}</td>
                            </tr>
                            <tr>
                                <td>País</td>
                                <td>{datos.pais}</td>
                            </tr>
                            <tr>
                                <td>Población</td>
                                <td>{datos.poblacion}</td>
                            </tr>
                            <tr>
                                <td>Provincia</td>
                                <td>{datos.provincia}</td>
                            </tr>
                            <tr>
                                <td>Correo Eléctronico</td>
                                <td>{datos.email}</td>
                            </tr>
                            <tr>
                                <td>Teléfono</td>
                                <td>{datos.telefono}</td>
                            </tr>
                        </tbody>
                    </Table>
                </section>
            </div>
        </section>
        <PiePagina/>
    </React.Fragment>

    );
}

export default MisDatos;
