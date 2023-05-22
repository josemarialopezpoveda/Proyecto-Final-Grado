import React, {useState, useEffect} from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table';
import CrearBodyVerTurno from './CrearBodyVerTurno';
import { Link } from "react-router-dom";
import './VerTurno.css'
import { URL_API } from 'services/http/const';
import { convertirNumeroDiaSemana, generarUUID, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';


function VerTurno() {

    const [turno, setTurno] = useState({});

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosTurno = await peticionGetAuth(URL_API + "turnos/" + `${localStorage.getItem("idTurno")}`, header);
        console.log(datosTurno)
        if (datosTurno.data !== undefined) {
            var newTurno = {
              descripcion: datosTurno.data.turno.descripcion,
            };
          setTurno(newTurno);
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

  return (
    <React.Fragment>
        <NavAdmin/>
        <section>
            <div>
                <div className='tablaMediaQuery tablaMargin TablaDatosUser'>
                    {/*PENDIENTE BUSCADOR TURNOS*/ }
                    <CrearBodyVerTurno/>
                </div>
                <div className='contenedorBotonModificarTurno disFlex500px'>
                    <Link className="linkSignInLogin" id="signIn" to="/modificarTurno">Modificar Turno</Link>
                    <Link to="/paginaPrincipalTurnos" className="linkSignInLogin" id="signIn">Volver</Link>
                </div>
            </div>
        </section>
                <PiePagina/>
    </React.Fragment>
  );
}

export default VerTurno;
