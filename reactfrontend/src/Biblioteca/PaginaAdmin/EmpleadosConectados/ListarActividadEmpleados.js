//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import { cogerFecha, generarUUID, peticionGetAuth,cogerHora } from '../../FuncionesAuxiliares/Funciones';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';
import BuscadorEmpleadosConectados from 'Biblioteca/Buscador/BuscadorEmpleadosConectados';

function ListarActividadEmpleados() {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();
    //Creamos la variable para el contenido de los empleados estaticos.
    const [empleadosDinamicos, setEmpleadosDinamicos] = useState([
        {
        id: "",
        nombre: "",
        apellidos: "",
        dni: "",
        correo: "",
        telefono: "",
        },
    ]);
    //Creamos la variable para el contenido de los empleados dinamicos.
    const [empleadosEstaticos, setEmpleadosEstaticos] = useState([
        {
        id: "",
        nombre: "",
        apellidos: "",
        dni: "",
        correo: "",
        telefono: "",
        },
    ]);

    //Función para recoger todos los empleados y los guarda en el estado.
    const recoleccionDatos = async () => {
        const header = {
        headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
        };
        console.log(URL_API + "empleadosOnline")
        let datosEmpresa = await peticionGetAuth(URL_API + "empleadosOnline", header);
        console.log(datosEmpresa)
        if (datosEmpresa.data.length !== 0) {
        var todosDatosEmpresa = datosEmpresa.data.map((datosE) => {
            var newEmpresa = {
                id: datosE.empleado_id,
                nombre: datosE.nombre,
                apellidos: datosE.apellidos,
                correo: datosE.email,
                telefono: datosE.telefono,
                fechaInicio: datosE.inicio,
                horaInicio: datosE.inicio,
                adelanto: datosE.adelanto,
                retraso: datosE.retraso,
                diferencia: datosE.diferencia
            };
            return newEmpresa;
        });
        setEmpleadosEstaticos(todosDatosEmpresa);
        setEmpleadosDinamicos(todosDatosEmpresa);
        }
    };

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
    }, []);

    //Función que guarda el ID del empleado a ver la información en localStorage y te lleva a la ruta para vel la información del empleado.
    const verJornada = (e) => {
        console.log(e.target.id)
        localStorage.setItem("idEmpleado", e.target.id);
        Navigate("/verJornadaEmpleado");
    }

    if(empleadosEstaticos !== undefined && empleadosEstaticos[0].nombre !== ""){
        return(
        <div>
            <BuscadorEmpleadosConectados datosEstaticos={setEmpleadosEstaticos} datosDinamicos={empleadosDinamicos}/>
            <div className='TablaDatosUser'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className='campoOpcional'>Correo</th>
                            <th className='campoOpcional'>Teléfono</th>
                            <th>Fecha Inicio</th>
                            <th>Hora Inicio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {empleadosEstaticos.map((option)=> {
                        if(option.apellidos !== ""){
                            return(<tr key={generarUUID()}>
                                <td>{option.nombre} {option.apellidos}</td>
                                <td className='campoOpcional'>{option.correo}</td>
                                <td className='campoOpcional'>{option.telefono}</td>
                                <td>{cogerFecha(option.fechaInicio)}</td>
                                <td>{cogerHora(option.horaInicio)}</td>
                                <td>
                                    <button type="button"
                                    title="Ver Jornada Del Empleado"
                                    onClick={verJornada}
                                    id={option.id}
                                    className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">
                                    Ver Jornada
                                    </button>
                                </td>
                            </tr>)
                        }
                    })}
                    </tbody>
                </Table>
            </div>
        </div>)
    }else{
        return(
        <div className='TablaDatosUser'>
            <Table striped>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th className='campoOpcional'>Correo</th>
                        <th className='campoOpcional'>Teléfono</th>
                        <th>Fecha Inicio</th>
                        <th>Hora Inicio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colSpan={"5"}>No hay empleados conectados en este momento.</td></tr>
                </tbody>
            </Table>
        </div>
        )
    }
}

export default ListarActividadEmpleados;
