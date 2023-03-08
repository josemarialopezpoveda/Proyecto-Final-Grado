//Importamos todos los .js que necesitamos para esta práctica.
import { generarUUID, peticionGetAuth, quitarSegundos } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, {useState, useEffect} from 'react';
import { URL_API } from 'services/http/const';

function CrearBodyTurno() {
    const [turno, setTurno] = useState({});
    const [fila, setFila] = useState("");

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

    const verExistenHoras = (horaBuscar, texto) =>{
        let existenHoras = false;
        turno.dias.map((dia)=>{
            if(dia[horaBuscar] !== "00:00:00"){
                existenHoras= true;
            }
        })

        if(existenHoras === true){
            return(<td>{texto}</td>); 
        }
    }

    if(turno !== undefined && turno.dias !== undefined){
        return(
            <tbody>
                <tr>
                    {verExistenHoras("horaInicioM","Hora Inicio Mañana")}
                    {turno.dias.map((dia)=>{
                        if(dia.horaInicioM !== "00:00:00"){
                        return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioM)}</td>);
                        }
                    })}
                </tr>
                <tr>
                    {verExistenHoras("horaFinM","Hora Fin Mañana")}
                    {turno.dias.map((dia)=>{
                        if(dia.horaFinM !== "00:00:00"){
                            return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinM)}</td>);
                        }
                    })}
                </tr>
                <tr>
                    {verExistenHoras("horaInicioT","Hora Inicio Tarde")}
                    {turno.dias.map((dia)=>{
                        if(dia.horaInicioT !== "00:00:00"){
                            return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioT)}</td>);
                        }
                    })}
                </tr>
                <tr>
                    {verExistenHoras("horaFinT","Hora Fin Tarde")}
                    {turno.dias.map((dia)=>{
                        if(dia.horaFinT !== "00:00:00"){
                            return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinT)}</td>);
                        }
                    })}
                </tr>
                <tr>
                    {verExistenHoras("horaInicioN","Hora Inicio Tarde")}
                    {turno.dias.map((dia)=>{
                        if(dia.horaInicioN !== "00:00:00"){
                            return(<td key={generarUUID()}>{quitarSegundos(dia.horaInicioN)}</td>);
                        }
                    })}
                </tr>
                <tr>
                    {verExistenHoras("horaFinN","Hora Fin Noche")}
                    {turno.dias.map((dia)=>{
                        if(dia.horaFinN !== "00:00:00"){
                            return(<td key={generarUUID()}>{quitarSegundos(dia.horaFinN)}</td>);
                        }
                    })}
                </tr>
            </tbody>
        );
        
    }
            
}

export default CrearBodyTurno;
