import React, {useState, useEffect} from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table';
import CrearBodyTurno from './CrearBodyTurno';
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
        if (datosTurno.data !== 0) {
            var newTurno = {
              descripcion: datosTurno.data.descripcion,
              dias: datosTurno.data.dias,
            };
          setTurno(newTurno);
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

    const diasTurno = () =>{
        if(turno !== {} && turno.dias !== undefined){
        return(
            <tr>
                <th>Horas Asignadas</th>
                {turno.dias.map((dia)=>{
                    return(<th key={generarUUID()}>{convertirNumeroDiaSemana(dia.diaSemana)}</th>)
                })}
            </tr>
        );
        }
    }

  return (
    <React.Fragment>
        <NavAdmin/>
        <section>
            <h4 className='tituloH1 text-center'>Horario: {turno.descripcion}</h4>
            <div>
                <div className='tablaMediaQuery TablaDatosUser'>
                    {/*PENDIENTE BUSCADOR TURNOS*/ }
                    <Table striped>
                        <thead>
                            {diasTurno()}
                        </thead>
                        <CrearBodyTurno/>
                    </Table>
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
