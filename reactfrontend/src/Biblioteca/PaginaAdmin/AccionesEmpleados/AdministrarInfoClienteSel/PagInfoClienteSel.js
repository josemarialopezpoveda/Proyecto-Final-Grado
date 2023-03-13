import React, {useEffect, useState} from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import {Link} from 'react-router-dom';
import './PagInfoClienteSel.css';
import { URL_API } from 'services/http/const';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

function PagInfoClienteSel() {

    const [empleado, setEmpleado] = useState({
        nombre:"",
    })

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
    }, []);

  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosEmpleado = await peticionGetAuth(URL_API + "ausenciasEmpleados/" + `${localStorage.getItem("idEmpleado")}`, header);
    console.log(datosEmpleado)
    if (datosEmpleado.data.empleado.length !== 0) {
        var newEmpleado = {
          nombre: datosEmpleado.data.empleado.nombre,
        }
      setEmpleado(newEmpleado);
    }
  };

  return (
    <React.Fragment>
      <NavAdmin/>
        <section>
            <h1 className='tituloPagInfoClienteSel'>Datos de {empleado.nombre}</h1>
            <div className='contenedorInfoClienteSel'>
                <div className='infoclienteSel'>
                    <h3>Turno</h3>
                    <div>
                        <p><Link className="botonInfoCliente"to="/verTurnoCliente">Ver Turno</Link></p>
                        <p><Link className="botonInfoCliente">Quitar Turno</Link></p>
                    </div>
                </div>
                <div className='infoclienteSel'>
                    <h3>Bajas</h3>
                    <div>
                        <p><Link className="botonInfoCliente" to="/verBajas">Ver Bajas</Link></p>
                        <p><Link className="botonInfoCliente" to="/anyadirBaja">Añadir Baja</Link></p>
                    </div>
                </div>
                <div className='infoclienteSel'>
                    <h3>Ausencias</h3>
                    <div>
                        <p><Link className="botonInfoCliente" to="/verAusencias">Ver Ausencias</Link></p>
                        <p><Link className="botonInfoCliente" to="/anyadirAusencia">Añadir Ausencias</Link></p>
                    </div>
                </div>
                <div className='infoclienteSel'>
                    <h3>Vacaciones</h3>
                    <div>
                        <p><Link className="botonInfoCliente" to="/verVacaciones">Ver Vacaciones</Link></p>
                        <p><Link className="botonInfoCliente" to="/anyadirVacaciones">Añadir Vacaciones</Link></p>
                    </div>
                </div>
            </div>
            <div className='contenedorBotonVolver pagInfoClienteSelVolver'>
                <Link to="/accionesEmpleados" className="botonInfoCliente">Volver</Link>
            </div>
        </section>
      <PiePagina/>
    </React.Fragment>
  );
}

export default PagInfoClienteSel;
