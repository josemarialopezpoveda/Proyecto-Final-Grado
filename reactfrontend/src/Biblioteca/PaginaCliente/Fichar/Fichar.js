//Importamos los estilos CSS del pie de página.
import React, {useRef, useState, useEffect} from 'react';
import NavCliente from '../Nav/NavCliente.js';
import { Link } from "react-router-dom";
import './Fichar.css';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina.js';
import { peticionGet, calculoFechaHoy, diaSemana, quitarSegundos, formatearFechaHora, peticionPost, peticionPut, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones.js';
import { URL_API } from 'services/http/const.js';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';


function Fichar(){
    const boton = useRef(null);
    const estadoTiempoEmpleado = useRef(null);
    const [datosTiempoEmpleado, setDatosTiempoEmpleado] = useState({});
    const [datosTablaPibot, setDatosTablaPibot] = useState({});
    const [datosHorarioEmpleado, setDatosHorarioEmpleado] = useState({});

    const [datosHorario, setDatosHorario] = useState({});

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
        // recoleccionDatosTablaPibot();
        recoleccionTiempoOnline();

        recoleccionRegistroHorario()

    }, []);

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("id")}`, header);
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

    // const recoleccionDatosTablaPibot = async() =>{
    //     const header = {
    //         headers: {
    //           Accept: "application/json",
    //           Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
    //         },
    //       };
    //       let datosHorario = await peticionGetAuth(URL_API + "turnosEmpleado/" + `${localStorage.getItem("id")}`, header);
    //       //console.log(datosHorario)
    //       if (datosHorario.data.dias.length !== 0) {
    //         if(`${localStorage.getItem("id")}` == datosHorario.data.id || `${localStorage.getItem("idEmpleadoAdmin")}` == datosHorario.data.id){
    //             let obj = {
    //               idTurno: datosHorario.data.dias,
    //             }
    //             setDatosTablaPibot(obj);
    //             recoleccionHorario(obj);
    //         }
    //       }

    // }

    // const recoleccionHorario = async(obj) =>{
    //     const header = {
    //         headers: {
    //           Accept: "application/json",
    //           Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
    //         },
    //       };
    //       let datosHorario = await peticionGetAuth(URL_API + "turnosEmpleado/" + `${obj.idTurno}`, header);
    //       console.log(datosHorario)
    //       let diaNumeroHoy = diaSemana();
    //       if(diaNumeroHoy == 0){
    //         diaNumeroHoy = 7;
    //       }
    //       if (datosHorario.data.dias.length !== 0) {
    //         datosHorario.data.dias.map((datosE) => {
    //           //if(diaNumeroHoy == datosE.diaSemana){
    //             let obj = {
    //               horaInicioM: quitarSegundos(estaVacio(datosE.horaInicioM)),
    //               horaInicioT: quitarSegundos(estaVacio(datosE.horaInicioT)),
    //               horaInicioN: quitarSegundos(estaVacio(datosE.horaInicioN)),
    //               horaFinM: quitarSegundos(estaVacio(datosE.horaFinM)),
    //               horaFinT: quitarSegundos(estaVacio(datosE.horaFinT)),
    //               horaFinN: quitarSegundos(estaVacio(datosE.horaFinN)),
    //             }
    //             setDatosHorarioEmpleado(obj);
    //           //}
    //         });
    //       }
    // }

    const recoleccionTiempoOnline = async() =>{
        const header = {
            headers: {
              Accept: "application/json",
              Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
          };
        let datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("id")}`, header);
          if(datosEmpleado.data.length === 0){
            boton.current.innerHTML = "ENTRADA";
            estadoTiempoEmpleado.current.innerHTML = "OFFLINE";
            estadoTiempoEmpleado.current.classList.add("offline");
          }else{
            boton.current.innerHTML = "SALIDA";
            estadoTiempoEmpleado.current.innerHTML = "ONLINE";
            estadoTiempoEmpleado.current.classList.add("online");
          }
    }

    const salir = async() =>{
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("id")}`, header);
          if (datosEmpleado.data.length !== 0) {
                  const obj = {
                      empleado_id: datosEmpleado.data[0].empleado_id,
                      inicio: datosEmpleado.data[0].inicio,
                      fin: formatearFechaHora(),
                  }
                  let datosTiempoPost = await peticionPut(URL_API + "tiempos/" + datosEmpleado.data[0].id, obj, header);
          }
    }

    // const estaVacio = (hora) =>{
    //     if(hora !== "00:00:00"){
    //         return hora;
    //     }else{
    //         return "";
    //     }
    // }

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

          let datosEmpleado = await peticionPost(URL_API + "tiempos", obj, header);
          console.log("4º PETICION")
          console.log(datosEmpleado)
            if (datosEmpleado.data.length !== 0) {
                return datosEmpleado.data.id;
            }   
    }

    const fichar = (e) =>{
        if(estadoTiempoEmpleado !== null && estadoTiempoEmpleado !== undefined){
            //Si esta conectado.
            if(estadoTiempoEmpleado.current.innerHTML === "ONLINE"){
                estadoTiempoEmpleado.current.innerHTML = "OFFLINE";
                estadoTiempoEmpleado.current.classList.remove("online");
                estadoTiempoEmpleado.current.classList.add("offline");
                e.target.innerHTML = "ENTRADA";

                salir();

            //Si no esta conectado.
            }else if(estadoTiempoEmpleado.current.innerHTML === "OFFLINE"){
                estadoTiempoEmpleado.current.innerHTML = "ONLINE";
                estadoTiempoEmpleado.current.classList.remove("offline");
                estadoTiempoEmpleado.current.classList.add("online");
                e.target.innerHTML = "SALIDA";

                entrar();
            }
        }
    }

    const recoleccionRegistroHorario = async() =>{
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      let datosEmpleado = await peticionGetAuth(URL_API + "registroHorario/" + `${localStorage.getItem("id")}`, header);
      console.log(datosEmpleado);
      //datosEmpleado.turnos[0]
      //setDatosHorario
    }

    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }

    return(
    <React.Fragment>
      {anyadirBarraNav()}
      <pre>{JSON.stringify(datosHorarioEmpleado, null, 3)}</pre>
        <div className='contenedorSectionParaFichar'>
          <div className='contenedorBotonCrearCorreo'>
            <Link to="/verResumenLaboral" className='crearCorreoBoton'>Ver Resumen</Link>
          </div>
          <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar'>
              <div>
                  <article className='Fecha'>
                      <p>{calculoFechaHoy()}</p>
                  </article>
                  <article className='horas'>
                      <div>
                          <h1>Jornada Prevista</h1>
                          <p className="horasPrevistas">08:00:00</p>
                      </div>
                  </article>
                  <article className='horas'>
                      <p>Estado Actual: <span ref={estadoTiempoEmpleado} className="mayus offline"></span></p>
                      <p>Horas restantes: 00:15</p>
                      <article className='botonParaFichar'>
                        <Link onClick={fichar} ref={boton} className='anyadirTurnoBoton'></Link>
                      </article>
                      <div className="horas2">
                          <p>Entrada  ➜ 08:01</p>
                          <p>Salida  ➜  14:25</p>
                          <p>Entrada  ➜  14:45</p>
                          <p>Salida  ➜  17:00</p>
                      </div>
                  </article>
                  
              </div>
          </section>
        </div>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default Fichar;
