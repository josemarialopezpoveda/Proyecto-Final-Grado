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
        let datosTurno = await peticionGetAuth(URL_API + "turnosEmpleado/" + `${localStorage.getItem("idEmpleado")}`, header);
        console.log(datosTurno)
        if (datosTurno.data.empleado.turnos !== null) {
            datosTurno.data.empleado.turnos.map((turnoDatos)=>{
                if(turnoDatos.activo === 1){
                    console.log(datosTurno.data.empleado.turnos)
                    var newTurno = {
                    descripcion: datosTurno.data.empleado.turnos.descripcion,
                    dias: datosTurno.data.empleado.turnos.dias,
                    };
                    setTurno(newTurno);
                }
            })
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
                <pre>{JSON.stringify(turno, null, 3)}</pre>
            </tbody>
        );
        
    }
            
}

export default CrearBodyTurno;
