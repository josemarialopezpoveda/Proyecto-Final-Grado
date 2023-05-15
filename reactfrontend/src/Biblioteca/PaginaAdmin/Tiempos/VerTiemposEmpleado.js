//Importamos los estilos CSS del pie de página.
import React, { useEffect, useState } from 'react';
import NavAdmin from '../Nav/NavAdmin';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina';
import {Link} from 'react-router-dom';
import TiemposEmpleado from './TiemposEmpleado';
import { URL_API } from 'services/http/const';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

function VerTiemposEmpleado(){

    const [empleado, setEmpleado] = useState({
        nombre:"",
    })

    useEffect(()=>{
        recoleccionDatosEmpleado();
    },[])

  const recoleccionDatosEmpleado = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("idEmpleado")}`, header);
    console.log(datosEmpleado)
    if (datosEmpleado.data.nombre !== undefined) {
        var newEmpleado = {
          nombre: datosEmpleado.data.nombre,
        }
      setEmpleado(newEmpleado);
    }
  };


    return(
    <React.Fragment>
        <NavAdmin/>
        <section>
            <h1 className='text-center tituloH1'>Tiempos de {empleado.nombre}</h1>
            <div className='contenedorBotonCrearCorreo divFlexFichar'>
                <Link to="/crearTiempo" className='crearCorreoBoton'>Crear Tiempo</Link>
            </div>
            <TiemposEmpleado/>
            <div className='contenedorBotonVolver text-center'>
                <Link to="/pagInfoClienteSel" className="linkSignInLogin botonInfoCliente" id="signIn">Volver</Link>
            </div>
        </section>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default VerTiemposEmpleado;
