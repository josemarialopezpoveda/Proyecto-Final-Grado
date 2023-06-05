//Importamos todos los .js que necesitamos para esta práctica.
import { convertirNumeroDiaSemana, formatearFechaFormatoDiaDeMesDelAnyo, generarUUID, peticionGetAuth, quitarSegundos } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, {useState, useEffect} from 'react';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';

function CrearBodyTurno() {
    const [turno, setTurno] = useState({});

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosTurno = undefined;
            datosTurno = await peticionGetAuth(URL_API + "turnosEmpleado/" + `${localStorage.getItem("idEmpleado")}`, header);
        if(datosTurno.data.message !== "No se encontró turno activo para el empleado"){
            if(datosTurno !== undefined){
                if(datosTurno.data.turno === undefined){
                    if (datosTurno.data.dias.length !== 0) {
                            var newTurno = {
                                descripcion: datosTurno.data.descripcion,
                                dias: datosTurno.data.dias,
                                FechaInicioTurno: datosTurno.data.FechaInicioTurno,
                                FechaFinTurno: datosTurno.data.FechaFinTurno
                            };
                            setTurno(newTurno);
                    }
                }
            }
        }
    };

    useEffect(() => {
        recoleccionDatos();
        recoleccionDatosEmpleado();
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

    const [empleado, setEmpleado] = useState({
        nombre:"",
    })

  const recoleccionDatosEmpleado = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("idEmpleado")}`, header);
    if (datosEmpleado.data.nombre !== undefined) {
        var newEmpleado = {
          nombre: datosEmpleado.data.nombre,
        }
      setEmpleado(newEmpleado);
    }
  };

    if(turno !== undefined && turno.dias !== undefined){
        return(
            <div className='tablaMediaQuery tablaMargin'>
                <h1 className='text-center tituloH1'>Turno de {empleado.nombre}</h1>
                <h1 className='text-center tituloH1'>Descripcion: {turno.descripcion}</h1>
                <div className='ContenedorFechasTurno'>   
                    <h5>Fecha de inicio del turno 🡺 {formatearFechaFormatoDiaDeMesDelAnyo(turno.FechaInicioTurno)}</h5>
                    <h5>Fecha de fin del turno 🡺 {formatearFechaFormatoDiaDeMesDelAnyo(turno.FechaFinTurno)}</h5>
                </div>
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
            </div>
        );
        
    }else{
        return(
            <div>
                <h1 className='text-center tituloH1'>Turno de {empleado.nombre}</h1>
                <h1 className='text-center tituloH1'>Descripcion: {turno.descripcion}</h1>
                <Table>
                    <tbody>
                        <tr>
                            <td>No se encontró turno activo para el empleado.</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
            
}

export default CrearBodyTurno;
