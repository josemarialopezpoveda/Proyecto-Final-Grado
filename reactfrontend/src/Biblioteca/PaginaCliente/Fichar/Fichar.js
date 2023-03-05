//Importamos los estilos CSS del pie de página.
import React, {useRef, useState, useEffect} from 'react';
import NavCliente from '../Nav/NavCliente.js';
import { Link } from "react-router-dom";
import './Fichar.css';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina.js';
import { peticionGet, calculoFechaHoy, diaSemana, quitarSegundos, formatearFechaHora, peticionPost, peticionPut } from 'Biblioteca/FuncionesAuxiliares/Funciones.js';
import { URL_API } from 'services/http/const.js';


function Fichar(){
    const estadoEmpleado = useRef(null);
    const [datosTiempoEmpleado, setDatosTiempoEmpleado] = useState({});
    const [datosTablaPibot, setDatosTablaPibot] = useState({});
    const [datosHorarioEmpleado, setDatosHorarioEmpleado] = useState({});

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
        recoleccionDatosTablaPibot();
    }, []);

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado = await peticionGet(URL_API + "tiempos/" + `${localStorage.getItem("id")}`);
        //console.log("1º PETICION")
        //console.log(datosEmpleado)
        if (datosEmpleado.data.length !== 0) {
          datosEmpleado.data.map((datosE) => {
            if(`${localStorage.getItem("id")}` == datosE.id){
                var newTiempo = {
                    inicio: datosE.inicio,
                    fin: datosE.fin,
                  };
                setDatosTiempoEmpleado(newTiempo);
            }
          });
        }
      };

    const recoleccionDatosTablaPibot = async() =>{
        const header = {
            headers: {
              Accept: "application/json",
              Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
          };
          //console.log("2º PETICION")
          let datosHorario = await peticionGet(URL_API + "turnosEmpleado/" + `${localStorage.getItem("id")}`);
          //console.log(datosHorario)
          if (datosHorario.data.length !== 0) {
            datosHorario.data.turnos.map((datosE) => {
              if(`${localStorage.getItem("id")}` == datosE.id){
                  let obj = {
                    idTurno: datosE.pivot.turno_id,
                  }
                  setDatosTablaPibot(obj);
                  recoleccionHorario(obj);
              }
            });
          }
    }

    const recoleccionHorario = async(obj) =>{
        const header = {
            headers: {
              Accept: "application/json",
              Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
          };
          //console.log(obj)
          let datosHorario = await peticionGet(URL_API + "turnos/" + `${obj.idTurno}`);
          //console.log("3º PETICION")
          //console.log(datosHorario)

          let diaNumeroHoy = diaSemana();
          if(diaNumeroHoy == 0){
            diaNumeroHoy = 7;
          }
          //console.log(diaNumeroHoy)
          if (datosHorario.data.dias.length !== 0) {
            datosHorario.data.dias.map((datosE) => {
              //if(diaNumeroHoy == datosE.diaSemana){

                  let obj = {
                    horaInicioM: quitarSegundos(estaVacio(datosE.horaInicioM)),
                    horaInicioT: quitarSegundos(estaVacio(datosE.horaInicioT)),
                    horaInicioN: quitarSegundos(estaVacio(datosE.horaInicioN)),
                    horaFinM: quitarSegundos(estaVacio(datosE.horaFinM)),
                    horaFinT: quitarSegundos(estaVacio(datosE.horaFinT)),
                    horaFinN: quitarSegundos(estaVacio(datosE.horaFinN)),
                  }
                  setDatosHorarioEmpleado(obj);
              //}
            });
          }
    }

    const recoleccionTiempoOnline = async() =>{
        const header = {
            headers: {
              Accept: "application/json",
              Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
          };
          let datosEmpleado = await peticionGet(URL_API + "empleadoOnline/" + `${localStorage.getItem("id")}`);
          console.log("4º PETICION")
          console.log(datosEmpleado)
            if (datosEmpleado.data.length !== 0) {
                    const obj = {
                        empleado_id: datosEmpleado.data[0].empleado_id,
                        inicio: datosEmpleado.data[0].inicio,
                        fin: formatearFechaHora(),
                    }
                    console.log(obj)
                    let datosTiempoPost = await peticionPut(URL_API + "tiempos/" + datosEmpleado.data[0].id, obj);
                    console.log(datosTiempoPost)
            }
    }

    const estaVacio = (hora) =>{
        if(hora !== "00:00:00"){
            return hora;
        }else{
            return "";
        }
    }

    const entrar = async() =>{
        const header = {
            headers: {
              Accept: "application/json",
              Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
          };
          console.log(formatearFechaHora());
          const obj = {
            "empleado_id": localStorage.getItem("id"),
            "inicio": formatearFechaHora(),
            "fin": null
          }

          let datosEmpleado = await peticionPost(URL_API + "tiempos", obj);
          console.log("4º PETICION")
          console.log(datosEmpleado)
            if (datosEmpleado.data.length !== 0) {
                return datosEmpleado.data.id;
        }
    }

    const fichar = (e) =>{
        if(estadoEmpleado !== null && estadoEmpleado !== undefined){
            //Si esta conectado.
            if(estadoEmpleado.current.innerHTML === "ONLINE"){
                estadoEmpleado.current.innerHTML = "OFFLINE";
                estadoEmpleado.current.classList.remove("online");
                estadoEmpleado.current.classList.add("offline");
                e.target.innerHTML = "ENTRADA";

                recoleccionTiempoOnline();

            //Si no esta conectado.
            }else if(estadoEmpleado.current.innerHTML === "OFFLINE"){
                estadoEmpleado.current.innerHTML = "ONLINE";
                estadoEmpleado.current.classList.remove("offline");
                estadoEmpleado.current.classList.add("online");
                e.target.innerHTML = "SALIDA";

                entrar();
            }
        }
    }

    return(
    <React.Fragment>
        <NavCliente/>
        <div className='contenedorSectionParaFichar'>
            <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar'>
                <div>
                    <article className='Fecha'>
                        <p>{calculoFechaHoy()}</p>
                    </article>
                    <article className='horas'>
                        <p>Estado Actual: <span ref={estadoEmpleado} className="offline">OFFLINE</span></p>
                        <div>
                            <h1>Horario Hoy</h1>
                            <p>{datosHorarioEmpleado.horaInicioM} {datosHorarioEmpleado.horaFinM}</p>
                            <p>{datosHorarioEmpleado.horaInicioT} {datosHorarioEmpleado.horaFinT}</p>
                            <p>{datosHorarioEmpleado.horaInicioN} {datosHorarioEmpleado.horaFinN}</p>
                        </div>
                        </article>
                    <article className='botonParaFichar'>
                        <Link onClick={fichar} className='anyadirTurnoBoton'>ENTRADA</Link>
                    </article>
                </div>
            </section>
        </div>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default Fichar;
