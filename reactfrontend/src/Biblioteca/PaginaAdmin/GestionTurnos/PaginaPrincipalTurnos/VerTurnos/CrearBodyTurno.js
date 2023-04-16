//Importamos todos los .js que necesitamos para esta práctica.
import { convertirNumeroDiaSemana, generarUUID, peticionGetAuth, quitarSegundos } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, {useState, useEffect} from 'react';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';

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
        if(datosTurno.data.dias !== undefined){
            if (datosTurno.data.dias.length !== 0) {
                    var newTurno = {
                        descripcion: datosTurno.data.descripcion,
                        dias: datosTurno.data.dias,
                    };
                    setTurno(newTurno);
            }
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

    const diasTurno = () =>{
        if(turno !== {} && turno.dias !== undefined){
        return(
            <tr>
                <th>Horas Asignadas</th>
                {turno.dias.map((dia)=>{
                  if(dia.horaInicioM !== "00:00:00" && dia.horaFinM !== "00:00:00" ||
                     dia.horaInicioT !== "00:00:00" && dia.horaFinT !== "00:00:00" ||
                     dia.horaInicioN !== "00:00:00" && dia.horaFinN !== "00:00:00"){
                    return(<th key={generarUUID()}>{convertirNumeroDiaSemana(dia.diaSemana)}</th>)
                  }
                })}
            </tr>
        );
        }
    }

    if(turno !== undefined && turno.dias !== undefined){
        return(
            <Table striped>
                <thead>
                    {diasTurno()}
                </thead>
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
            </Table>
        );
        
    }else{
        return(
            <Table>
                <tbody>
                    <tr>
                        <td>El empleado seleccionado no tiene un turno activado.</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
            
}

export default CrearBodyTurno;
