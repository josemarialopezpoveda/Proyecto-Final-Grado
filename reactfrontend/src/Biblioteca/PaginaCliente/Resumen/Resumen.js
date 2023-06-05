//Importamos los estilos CSS del pie de página.
import React, {useRef, useState, useEffect} from 'react';
import NavCliente from '../Nav/NavCliente.js';
import { Link } from "react-router-dom";
import './Resumen.css';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina.js';
import { URL_API } from 'services/http/const.js';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';
import Form from 'react-bootstrap/Form';
import { convertirHoraANumero, convertirHorasFormatoExplicativo, fechaEntreRango, formatoDateAFecha, peticionGetAuth, ponerNumeroBalanceFormatoCorrecto, restarHoras, sumarHoras } from 'Biblioteca/FuncionesAuxiliares/Funciones.js';

function Resumen(){
    //Un useref para el boton de tikar.
    const canvasRef = useRef(null);
    //Estados para los datos de lab base de datos.
    const [datosJornada, setDatosJornada] = useState({
        contadorHorasPlanificadas: "00:00:00",
        contadorHorasTrabajadas: "00:00:00",
        contadorBalanceHorario: "00:00:00",
    });

    const [fechasBuscador, setFechasBuscador] = useState({
        desde: formatoDateAFecha(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
        hasta: formatoDateAFecha(new Date()),
    });

    const [nombreEmpleado, setNombreEmpleado] = useState();

    //Según el tipo de usuario devuelvo una barra de navegación o otra.
    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
        recoleccionNombreUser();
    }, []);

    //Recoge el nombre del usuario logueado.
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

    //Recoge los datos de las horas planificadas, trabajadas y el balance de las mismas.
    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado = undefined
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            datosEmpleado = await peticionGetAuth(URL_API + "registroHorario/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
        }else{
            datosEmpleado = await peticionGetAuth(URL_API + "registroHorario/" + `${localStorage.getItem("id")}`, header);
        }
        if(datosEmpleado !== undefined){
            if(datosEmpleado.data.turnos.length !== 0){
                let contadores = {
                    contadorHorasPlanificadas: "00:00:00",
                    contadorHorasTrabajadas: "00:00:00",
                    contadorBalanceHorario: "00:00:00"
                }

                datosEmpleado.data.turnos.forEach(turno => {
                    if(fechaEntreRango(fechasBuscador.desde, fechasBuscador.hasta, turno.fecha)){
                        contadores.contadorHorasPlanificadas = sumarHoras(turno.horasJornada,contadores.contadorHorasPlanificadas);
                        contadores.contadorHorasTrabajadas = sumarHoras(turno.horasTrabajadas,contadores.contadorHorasTrabajadas);
                        contadores.contadorBalanceHorario = restarHoras(contadores.contadorHorasTrabajadas,contadores.contadorHorasPlanificadas);
                    }

                });
                usoCanvas(convertirHoraANumero(contadores.contadorBalanceHorario));

                contadores = {
                    contadorHorasPlanificadas: convertirHorasFormatoExplicativo(contadores.contadorHorasPlanificadas),
                    contadorHorasTrabajadas: convertirHorasFormatoExplicativo(contadores.contadorHorasTrabajadas),
                    contadorBalanceHorario: convertirHorasFormatoExplicativo(contadores.contadorBalanceHorario)
                }
                setDatosJornada(contadores)  
            }
        }
      };

    //Canvas a partir del balance horario
    const usoCanvas = (num) =>{
        const canvas = canvasRef.current;
        if(canvas !== null){
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centro = canvas.width / 2;
            ctx.beginPath();
            ctx.moveTo(centro, 0);
            ctx.lineTo(centro, canvas.height);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.stroke();

            // Dibujar la línea verde o roja dependiendo del número
            ctx.beginPath();
            ctx.lineWidth = 150;
            ctx.strokeStyle = num > 0 ? 'green' : 'red';
            if(num < 0){
                ctx.moveTo(centro - 1, canvas.height/2);
            }else{
                ctx.moveTo(centro + 1, canvas.height/2);
            }
            ctx.lineTo(centro + num , canvas.height / 2);
            ctx.stroke();
        }
        
    }

    //Función que una vez puestas las fechas recoge los datos entre una fecha y la otra.
    const TodoCorrecto = () =>{
        recoleccionDatos();
    }

    return(
    <React.Fragment>
        {anyadirBarraNav()}
            <div className='contenedorSectionParaFichar'>
                <div className='contenedorBotonCrearCorreo divFlexFichar'>
                    <Link to="/fichar" className='crearCorreoBoton'>Fichar</Link>
                    <Link to="/verJornadaPorDia" className='crearCorreoBoton'>Buscar jornada por dia</Link>
                    <Link to="/verCalendarioEmpleado" className='crearCorreoBoton'>Calendario</Link>
                </div>
            <h1 className='text-center tituloH1'>Resumen de la jornada de {nombreEmpleado}</h1>
                <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar pd10-0'>
                    <Form>
                        <div className="divContenedorCampo2 margin10-0">
                            <div className="divContenedorCampo3">
                                <p>Desde:</p>
                                <Form.Group className="mb-3">
                                        <Form.Control required size="lg" type="date"
                                        onInput={e=>{setFechasBuscador({ ...fechasBuscador, desde: e.target.value.trim() })}}
                                        defaultValue={fechasBuscador.desde}/>
                                </Form.Group>
                            </div>
                            <div className="divContenedorCampo3">
                                <p>Hasta:</p>
                                <Form.Group className="mb-3">
                                        <Form.Control required size="lg" type="date"
                                        onInput={e=>{setFechasBuscador({ ...fechasBuscador, hasta: e.target.value.trim() })}}
                                        defaultValue={fechasBuscador.hasta}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='contenedorBuscarResumen margin10-0'>
                            <button type='button' onClick={TodoCorrecto} className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">Buscar</button>
                        </div>
                        
                    </Form>
                </section>
                <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar quitarEspacios pd10-0'>
                    <h1 className='tituloResumen'>Saldo de horas</h1>
                    <p className='infoPBalance'>{datosJornada.contadorBalanceHorario}</p>
                    <canvas ref={canvasRef} id="canvas"></canvas>
                    <div className='flexDatosHorasResumen'>
                        <div>
                            <h1 className='tituloHoras'>Horas Planificadas</h1>
                            <div className='contenedorDatosHorasResumen'>
                                <p className='datosHorasResumen'>{datosJornada.contadorHorasPlanificadas}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='tituloHoras'>Horas Trabajadas</h1>
                            <div className='contenedorDatosHorasResumen'>
                                <p className='datosHorasResumen'>{datosJornada.contadorHorasTrabajadas}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='tituloHoras'>Balance</h1>
                            <div className='contenedorDatosHorasResumen'>
                                <p className='datosHorasResumen'>{datosJornada.contadorBalanceHorario}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default Resumen;
