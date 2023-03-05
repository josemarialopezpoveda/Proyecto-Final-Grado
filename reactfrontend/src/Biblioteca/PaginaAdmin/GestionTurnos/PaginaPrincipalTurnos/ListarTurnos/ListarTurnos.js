//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import { generarUUID } from '../../../../FuncionesAuxiliares/Funciones';
import { Link } from "react-router-dom";
import './ListarTurnos.css';

function ListarTurnos() {
    var datos = [
        {
            desc: "Lunes-Viernes 7:00-14:00",
        },
        {
            desc: "Lunes-Viernes 7:00-14:00 15:00-19:00",
        },
    ]
    return datos.map((option)=> {
        return(<tr key={generarUUID()}>
            <td className='contenedorTurnoTabla'>{option.desc}</td>
            <td className='contenedorTurnoTabla contenedorBotonesTurnoTabla'>
                <Link className="botonTurnos" to="/verTurno">Ver Turno</Link>
                <Link className="botonTurnos">Eliminar Turno</Link>
            </td>
        </tr>)
    });
}

export default ListarTurnos;
