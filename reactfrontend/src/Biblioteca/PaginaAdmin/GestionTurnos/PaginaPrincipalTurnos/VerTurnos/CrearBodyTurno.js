//Importamos todos los .js que necesitamos para esta práctica.
import { generarUUID, peticionGetAuth, quitarSegundos } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, {useState, useEffect} from 'react';
import { URL_API } from 'services/http/const';

function CrearBodyTurno() {
    const [turno, setTurno] = useState({});

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosTurno = await peticionGetAuth(URL_API + "turnos/" + `${localStorage.getItem("idTurno")}`, header);
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

    const estaVacio = (hora) =>{
        if(hora === "00:00:00" || hora === undefined){
            return "-";
        }else{
            return hora;
        }
    }

    if(turno !== undefined && turno.dias !== undefined){
        return(
            <tbody>
                <tr>
                    <td>Hora Inicio Mañana</td>
                    {turno.dias.map((dia)=>{
                        return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioM)}</td>);
                    })}
                </tr>
                <tr>
                    <td>Hora Fin Mañana</td>
                    {turno.dias.map((dia)=>{
                        return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinM)}</td>);
                    })}
                </tr>
                <tr>
                    <td>Hora Inicio Tarde</td>
                    {turno.dias.map((dia)=>{
                        return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioT)}</td>);
                    })}
                </tr>
                <tr>
                    <td>Hora Fin Tarde</td>
                    {turno.dias.map((dia)=>{
                        return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinT)}</td>);
                    })}
                </tr>
                <tr>
                    <td>Hora Inicio Noche</td>
                    {turno.dias.map((dia)=>{
                        return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioN)}</td>);
                    })}
                </tr>
                <tr>
                    <td>Hora Fin Noche</td>
                    {turno.dias.map((dia)=>{
                        return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinN)}</td>);
                    })}
                </tr>
            </tbody>
        );
        
    }
            
}

export default CrearBodyTurno;
