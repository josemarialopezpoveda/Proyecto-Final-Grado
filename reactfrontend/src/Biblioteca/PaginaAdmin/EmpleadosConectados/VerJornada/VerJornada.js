//Importamos los estilos CSS del pie de página.
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { calculoFechaHoy, peticionGetAuth, restarHoras, generarUUID, convertirNumeroDiaSemana, obtenerDiaSemana } from 'Biblioteca/FuncionesAuxiliares/Funciones.js';
import { URL_API } from 'services/http/const.js';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina';
import NavCliente from 'Biblioteca/PaginaCliente/Nav/NavCliente';


function VerJornada(){
    const [datosRegistro, setDatosTiempoEmpleado] = useState({});
    const [datosJornada, setDatosJornada] = useState({
      horario: [],
    });
    const [nombreEmpleado, setNombreEmpleado] = useState();
    const [horasEnSaPredefinidas, setHorasEnSaPredefinidas] = useState([]);

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
        recoleccionNombreUser();
        recoleccionRegistroHorario();
        recoleccionHorasEnSaPredefinidas();
    }, []);

    //Recoge la hora de entrada y salida que debería tener el usuario.
    const recoleccionHorasEnSaPredefinidas = async () => {
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      let datosHoras = undefined;
      if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
          datosHoras = await peticionGetAuth(URL_API + "turnoActivo/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
      }else{
          datosHoras = await peticionGetAuth(URL_API + "turnoActivo/" + `${localStorage.getItem("id")}`, header);
      }
      console.log(datosHoras)
      if(datosHoras !== undefined){
        if(datosHoras.data.dias !== undefined){
          setHorasEnSaPredefinidas(datosHoras.data.dias)
        }
      }
  };

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado =  await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("idEmpleado")}`, header);
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

    const recoleccionNombreUser = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado =  await peticionGetAuth(URL_API + "empleado/" + `${localStorage.getItem("idEmpleado")}`, header);
        if(datosEmpleado !== undefined){
            setNombreEmpleado(datosEmpleado.data.nombre + " " + datosEmpleado.data.apellidos)
        }
    };

    

    const recoleccionRegistroHorario = async() =>{
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      let datosEmpleado = await peticionGetAuth(URL_API + "tiempoActivo/" + `${localStorage.getItem("idEmpleado")}`, header);
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



    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador" || `${localStorage.getItem('tipoUsuario')}` === "null"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }

    const esNula = (fecha) =>{
      if(fecha !== null){
        return(<p>Salida  ➜  {fecha}</p>)
      }else{
        return(null);
      }
    }

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

    //Informa de si la fecha esta nula.
    const estaVaciaFecha = (fecha, texto) =>{
      if(fecha !== "00:00:00"){
        return(<p>{texto}  {fecha}</p>)
      }else{
        return(null);
      }
    }


    //Función que devuelve las entradas y salidas que debería tener el usuario.
    const getEntradasYSalidasPredefinidas = () =>{
      if(horasEnSaPredefinidas.length !== 0){
        let hayRegistrosPlaneados = false;

        const elementos =(horasEnSaPredefinidas.map((dia)=>{
          if(convertirNumeroDiaSemana(dia.diaSemana) === obtenerDiaSemana()){
            if(dia.horaInicioM !== "00:00:00" && dia.horaFinM !== "00:00:00" ||
            dia.horaInicioT !== "00:00:00" && dia.horaFinT!== "00:00:00" ||
            dia.horaInicioN !== "00:00:00" && dia.horaFinN!== "00:00:00"){

              hayRegistrosPlaneados = true;

              return(
                <div key={generarUUID()}>
                  {estaVaciaFecha(dia.horaInicioM,"Entrada  ➜")}
                  {estaVaciaFecha(dia.horaFinM, "Salida  ➜" )}
                  {estaVaciaFecha(dia.horaInicioT,"Entrada  ➜")}
                  {estaVaciaFecha(dia.horaFinT, "Salida  ➜" )}
                  {estaVaciaFecha(dia.horaInicioN,"Entrada  ➜")}
                  {estaVaciaFecha(dia.horaFinN, "Salida  ➜" )}
                </div>
              )
            }
          }
         }))

         if (!hayRegistrosPlaneados) {
          elementos.push(
            <div key={generarUUID()}>
              <p>Hoy no tienes registros de entrada o salida planeados</p>
            </div>
          );
        }

        return elementos;

      }else{
        return(<p>No hay registros de entrada o salida.</p>)
      }
  }

    return(
    <React.Fragment>
      {anyadirBarraNav()}
        <div className='contenedorSectionParaFichar'>
            <h1 className='text-center tituloH1'>Jornada de {nombreEmpleado}</h1>
            <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar'>
                <div>
                    <article className='Fecha'>
                        <p>{calculoFechaHoy()}</p>
                    </article>
                    <article className='horas'>
                        <div className='jornadaPrevista'>
                            <h1>Jornada Prevista</h1>
                            <p className="horasPrevistas">{datosJornada.jornadaLaboral}</p>
                        </div>
                    </article>
                    <article className='horas'>
                        <p>Horas restantes: {datosJornada.tiempoRestante}</p>
                        <p>Horas realizadas: {datosJornada.tiempoActivo}</p>
                        <div className="horas2">
                          <h2>Entradas y salidas realizadas</h2>
                          {getEntradasYSalidas()}
                        </div>
                        <div className="horas2">
                          <h2>Entradas y salidas planeadas</h2>
                          {getEntradasYSalidasPredefinidas()}
                        </div>
                    </article>
                </div>
                <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                    <Link to="/totalEmpleados" className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">Volver</Link>
                </div>
            </section>
        </div>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default VerJornada;
