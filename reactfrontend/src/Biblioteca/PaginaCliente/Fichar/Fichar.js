//Importamos los estilos CSS del pie de página.
import React, {useRef, useState, useEffect} from 'react';
import NavCliente from '../Nav/NavCliente.js';
import { Link } from "react-router-dom";
import './Fichar.css';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina.js';
import { peticionGet, calculoFechaHoy, diaSemana, quitarSegundos, formatearFechaHora, peticionPost, peticionPut, peticionGetAuth, restarHoras, generarUUID, mostrarAlertaCorrecta } from 'Biblioteca/FuncionesAuxiliares/Funciones.js';
import { URL_API } from 'services/http/const.js';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';


function Fichar(){
    const boton = useRef(null);
    const estadoTiempoEmpleado = useRef(null);
    const [datosRegistro, setDatosTiempoEmpleado] = useState({});
    const [datosJornada, setDatosJornada] = useState({
      horario: [],
    });
    const [datosHorarioEmpleado, setDatosHorarioEmpleado] = useState({});
    const [nombreEmpleado, setNombreEmpleado] = useState();

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
        recoleccionTiempoOnline();
        recoleccionRegistroHorario();
        recoleccionNombreUser();
    }, []);

    //Recoge el nombre completo del usuario.
    const recoleccionNombreUser = async () => {
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      let datosEmpleado = undefined;
      if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
          datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
      }else{
          datosEmpleado = await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("id")}`, header);
      }
      if(datosEmpleado !== undefined){
          setNombreEmpleado(datosEmpleado.data.nombre + " " + datosEmpleado.data.apellidos)
      }
  };

    //Recoge los datos de inicio y fin del empleado.
    const recoleccionDatos = async () => {
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      let datosEmpleado = undefined;
      if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
          datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
      }else{
          datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("id")}`, header);
      }
      if(datosEmpleado !== undefined){
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
      }
    };

    //Recoge el estado del empleado seleccionado si esta online o no.
    const recoleccionTiempoOnline = async() =>{
        const header = {
            headers: {
              Accept: "application/json",
              Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
          };
        let datosEmpleado = undefined;
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
        }else{
            datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("id")}`, header);
        }
        if(datosEmpleado !== undefined){
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
    }

    //Función que añade tiempo de fin al empleado.
    const salir = async() =>{
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado = undefined;
        let datosTurnoEmpleado = undefined;
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
            datosTurnoEmpleado = await peticionGetAuth(URL_API + "turnoActivo/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
        }else{
            datosEmpleado = await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("id")}`, header);
            datosTurnoEmpleado = await peticionGetAuth(URL_API + "turnoActivo/" + `${localStorage.getItem("id")}`, header);
        }
        console.log(datosEmpleado)
        console.log(datosTurnoEmpleado)
        if(datosEmpleado !== undefined && datosTurnoEmpleado !== undefined){
          if (datosEmpleado.data.length !== 0) {
                  const obj = {
                      empleado_id: datosEmpleado.data[0].empleado_id,
                      inicio: datosEmpleado.data[0].inicio,
                      fin: formatearFechaHora(),
                      turno_id:datosTurnoEmpleado.data.turnoId
                  }
                  console.log(obj)
                  let datosTiempoPost = await peticionPut(URL_API + "tiempos/" + datosEmpleado.data[0].id, obj, header);
                  console.log(datosTiempoPost)
                  mostrarAlertaCorrecta("Salida realizada correctamente", "¡Buen trabajo hoy! Esperamos verte mañana con energía y listo para otra jornada productiva 👋 ", "5000");
                  recoleccionRegistroHorario();
          }
        }
    }

    //Función que añade tiempo de inicio al empleado.
    const entrar = async() =>{
        const header = {
            headers: {
              Accept: "application/json",
              Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
            },
          };

          let datosTurnoEmpleado = undefined;
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            datosTurnoEmpleado = await peticionGetAuth(URL_API + "turnoActivo/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
        }else{
            datosTurnoEmpleado = await peticionGetAuth(URL_API + "turnoActivo/" + `${localStorage.getItem("id")}`, header);
        }
        console.log(datosTurnoEmpleado)
        let obj = undefined;
          if(localStorage.getItem("tipoUsuario") === "Administrador"){
             obj = {
              "empleado_id": localStorage.getItem("idEmpleadoAdmin"),
              "inicio": formatearFechaHora(),
              "fin": null,
              "turno_id": datosTurnoEmpleado.data.turnoId
            }
          }else{
             obj = {
              "empleado_id": localStorage.getItem("id"),
              "inicio": formatearFechaHora(),
              "fin": null,
              "turno_id": datosTurnoEmpleado.data.turnoId
            }
          }
          if(obj !== undefined){
            let datosEmpleado = await peticionPost(URL_API + "tiempos", obj, header);
            console.log(datosEmpleado)
            recoleccionRegistroHorario();
            mostrarAlertaCorrecta("Entrada realizada correctamente", "Buenos días, esperamos que tenga un excelente día lleno de productividad y logros. Recuerden que su trabajo es valioso y apreciado, y que su dedicación es clave para el éxito de nuestra empresa. ¡A darle con todo! 😊 ", "5000");
            return datosEmpleado.data.id;
          }
    }

    //Función que llama a entrar o salir dependiendo del estado y cambia la clase y el inner del botón.
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

    //Función que recoge los datos de la jornada del usuario.
    const recoleccionRegistroHorario = async() =>{
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      let datosEmpleado = undefined;
      if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
        datosEmpleado = await peticionGetAuth(URL_API + "tiempoActivo/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
      }else{
        datosEmpleado = await peticionGetAuth(URL_API + "tiempoActivo/" + `${localStorage.getItem("id")}`, header);
      }
      if(datosEmpleado !== undefined){
        const obj = {
          jornadaLaboral: datosEmpleado.data.jornadaLaboral,
          tiempoActivo: datosEmpleado.data.tiempoActivo,
          horario: datosEmpleado.data.horario,
          tiempoRestante: restarHoras(datosEmpleado.data.jornadaLaboral, datosEmpleado.data.tiempoActivo)
        }
        setDatosJornada(obj)
      }
    }

    //Función que dependiendo del tipo de usuario devuelve una barra de navegación o otra.
    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }

    //Informa de si la fecha esta nula.
    const esNula = (fecha) =>{
      if(fecha !== null){
        return(<p>Salida  ➜  {fecha}</p>)
      }else{
        return(null);
      }
    }

    //Función que devuelve las entradas y las salidas a partir del estado.
    const getEntradasYSalidas = () =>{
        if(datosJornada.horario.length !== 0){
          return(datosJornada.horario.map((horario)=>{
            return(
              <div key={generarUUID()}>
                <p>Entrada  ➜ {horario.inicio}</p>
                {esNula(horario.fin)}
              </div>
            )
          }))
        }else{
          return(<p>No hay registros de entrada o salida.</p>)
        }
    }

    //Funcion que di es positivo devuelve horas restantes y si es negativo horas extras.
    const horasQueLleva = () =>{
      const num = parseFloat(datosJornada.tiempoRestante);
      if (num < 0) {
        return(<p>Horas extras: {datosJornada.tiempoRestante}</p>)
      } else {
        return(<p>Horas restantes: {datosJornada.tiempoRestante}</p>)
      }
    }

    return(
    <React.Fragment>
      {anyadirBarraNav()}
        <div className='contenedorSectionParaFichar'>
          <div className='contenedorBotonCrearCorreo divFlexFichar'>
            <Link to="/verResumenLaboral" className='crearCorreoBoton'>Resumen</Link>
            <Link to="/verJornadaPorDia" className='crearCorreoBoton'>Buscar jornada por dia</Link>
            <Link to="/verCalendarioEmpleado" className='crearCorreoBoton'>Calendario</Link>
          </div>
          <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar'>
              <div>
                  <article className='Fecha'>
                      <p>{calculoFechaHoy()}</p>
                  </article>
                  <article className='horas'>
                      <div className='jornadaPrevista'>
                          <h1>Jornada Prevista para {nombreEmpleado}</h1>
                          <p className="horasPrevistas">{datosJornada.jornadaLaboral}</p>
                      </div>
                  </article>
                  <article className='horas'>
                      <p>Estado Actual: <span ref={estadoTiempoEmpleado} className="mayus"></span></p>
                      {horasQueLleva()}
                      <p>Horas realizadas: {datosJornada.tiempoActivo}</p>
                      <article className='botonParaFichar'>
                        <Link onClick={fichar} ref={boton} className='anyadirTurnoBoton'></Link>
                      </article>
                      <div className="horas2">
                          {getEntradasYSalidas()}
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
