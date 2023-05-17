//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import { cogerFecha, generarUUID, peticionGetAuth,cogerHora, peticionDelete, mostrarAlertaErronea, mostrarAlertaCorrecta } from '../../FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';
import BuscadorTiempos from 'Biblioteca/Buscador/BuscadorTiempos';
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
import PaginacionTiempos from 'Biblioteca/Paginacion/PaginacionTiempos';

function TiemposEmpleado() {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();
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
        var tiemposEmpleado = datosEmpresa.data.tiempos.map((datosE) => {
            if(datosE.fin !== null){
                var newTiempo = {
                    id: datosE.id,
                    fechaInicio: cogerFecha(datosE.inicio),
                    fechaFin: cogerFecha(datosE.fin),
                    horaInicio: cogerHora(datosE.inicio),
                    horaFin: cogerHora(datosE.fin)
                };
            }else{
                var newTiempo = {
                    id: datosE.id,
                    fechaInicio: cogerFecha(datosE.inicio),
                    fechaFin: cogerFecha(datosE.inicio),
                    horaInicio: cogerHora(datosE.inicio),
                    horaFin: "--:--:--"
                };
            }
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
                <PaginacionTiempos data={tiemposEstaticos} perPage={5} 
                setEstadoEstatico={setTiemposEstaticos} setEstadoDinamico={setTiemposDinamicos}/>
            </div>)
    }
}

export default TiemposEmpleado;
