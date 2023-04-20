//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import { cogerFecha, generarUUID, peticionGetAuth,cogerHora } from '../../FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';
import BuscadorEmpleadosConectados from 'Biblioteca/Buscador/BuscadorEmpleadosConectados';
import BuscadorTiempos from 'Biblioteca/Buscador/BuscadorTiempos';

function TiemposEmpleado() {
    //Creamos la variable para el contenido de los empleados estaticos.
    const [tiemposDinamicos, setTiemposDinamicos] = useState([{}]);

    //Creamos la variable para el contenido de los empleados dinamicos.
    const [tiemposEstaticos, setTiemposEstaticos] = useState([{}]);

    //Función para recoger todos los empleados y los guarda en el estado.
    const recoleccionDatos = async () => {
        const header = {
        headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
        };
        let datosEmpresa = await peticionGetAuth(URL_API + "tiempos/" + `${localStorage.getItem("idEmpleado")}`, header);
        console.log(datosEmpresa)
        if (datosEmpresa.data.length !== 0) {
        var tiemposEmpleado = datosEmpresa.data.map((datosE) => {
            var newTiempo = {
                fechaInicio: cogerFecha(datosE.inicio),
                fechaFin: cogerFecha(datosE.fin),
                horaInicio: cogerHora(datosE.inicio),
                horaFin: cogerHora(datosE.fin)
            };
            return newTiempo;
        });
        setTiemposEstaticos(tiemposEmpleado);
        setTiemposDinamicos(tiemposEmpleado);
        }
    };

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
    }, []);

    if(tiemposEstaticos !== undefined){
        return(
        <div>
            <BuscadorTiempos datosEstaticos={setTiemposEstaticos} datosDinamicos={tiemposDinamicos}/>
            <div className='TablaDatosUser'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora Inicio</th>
                            <th>Fecha</th>
                            <th>Hora Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tiemposEstaticos.map((option)=> {
                        if(option.apellidos !== ""){
                            return(<tr key={generarUUID()}>
                                <td>{option.fechaInicio}</td>
                                <td>{option.horaInicio}</td>
                                <td>{option.fechaFin}</td>
                                <td>{option.horaFin}</td>
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
                        <th>Fecha</th>
                        <th>Hora Inicio</th>
                        <th>Fecha</th>
                        <th>Hora Fin</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td colSpan={"5"}>No hay tiempos en este empleado.</td></tr>
                </tbody>
            </Table>
        </div>
        )
    }
}

export default TiemposEmpleado;
