//Importamos los estilos CSS del pie de página.
import React, {useRef, useState, useEffect} from 'react';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';
import NavCliente from '../Nav/NavCliente';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';
import { URL_API } from 'services/http/const';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { Link } from "react-router-dom";
import Calendario from 'Biblioteca/Calendar/Calendario.js';


function CalendarioGeneral(){
    const [nombreEmpleado, setNombreEmpleado] = useState();

    //Función que dependiendo del tipo de usuario que seas pinta una barra de navegacíon o otra.
    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }

    //Función que recoge el nombre del empleado y la pone en el estado.
    const recoleccionNombreUser = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado = undefined;
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
        }else{
            datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("id")}`, header);
        }
        if(datosEmpleado !== undefined){
            setNombreEmpleado(datosEmpleado.data.nombre + " " + datosEmpleado.data.apellidos)
        }
    };

    //Creamos un useEffect que nada más cargar recoge los datos.
    useEffect(() => {
        recoleccionNombreUser();
    }, []);

    return(
    <React.Fragment>
      {anyadirBarraNav()}
        <div className='contenedorBotonCrearCorreo divFlexFichar'>
            <Link to="/fichar" className='crearCorreoBoton'>Fichar</Link>
            <Link to="/verJornadaPorDia" className='crearCorreoBoton'>Buscar jornada por dia</Link>
            <Link to="/verCalendarioEmpleado" className='crearCorreoBoton'>Calendario</Link>
        </div>
        <h1 className='text-center tituloH1'>Calendario del empleado {nombreEmpleado}</h1>
        <Calendario/>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default CalendarioGeneral;
