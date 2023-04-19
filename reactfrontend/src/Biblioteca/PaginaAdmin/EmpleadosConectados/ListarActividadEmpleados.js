//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import { generarUUID, peticionGetAuth } from '../../FuncionesAuxiliares/Funciones';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';

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
        let datosEmpresa = await peticionGetAuth(URL_API + "empleadosOnline", header);
        console.log(datosEmpresa)
        if (datosEmpresa.data.length !== 0) {
        var todosDatosEmpresa = datosEmpresa.data.map((datosE) => {
            var newEmpresa = {
                nombre: datosE.nombre,
                apellidos: datosE.apellidos,
                dni: datosE.nif,
                correo: datosE.email,
                telefono: datosE.telefono,
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

    if(empleadosEstaticos !== undefined && empleadosEstaticos[0].nombre !== ""){
        return empleadosEstaticos.map((option)=> {
            console.log(option)
            if(option.apellidos !== ""){
                return(<tr key={generarUUID()}>
                    <td>{option.nombre}</td>
                    <td className='campoOpcional'>{option.apellidos}</td>
                    <td className='campoOpcional'>{option.dni}</td>
                    <td className='campoOpcional'>{option.correo}</td>
                    <td className='campoOpcional'>{option.telefono}</td>
                </tr>)
            }
        });
    }else{
        return(<tr><td colSpan={"5"}>No hay empleados conectados en este momento.</td></tr>)
    }
   
}

export default ListarActividadEmpleados;
