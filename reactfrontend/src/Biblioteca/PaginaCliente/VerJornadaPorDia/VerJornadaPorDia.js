//Importamos los estilos CSS del pie de página.
import React, {useState, useEffect} from 'react';
import NavCliente from '../Nav/NavCliente.js';
import { Link } from "react-router-dom";
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina.js';
import { URL_API } from 'services/http/const.js';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';
import Form from 'react-bootstrap/Form';
import { generarUUID, formatoDateAFecha, peticionGetAuth, calculoFechaHoy, cogerFecha, formatoFechaDDMMYYYY, cogerHora, formatearFechaFormatoDiaDeMesDelAnyo } from 'Biblioteca/FuncionesAuxiliares/Funciones.js';

function VerJornadaPorDia(){
    //Estados para los datos de la base de datos.
    const [fechasBuscador, setFechasBuscador] = useState({
        diaSeleccionado: formatoDateAFecha(new Date()),
    });

    const [datosJornada, setDatosJornada] = useState({
        horario: [],
    });

    const [nombreEmpleado, setNombreEmpleado] = useState();

    //Segun el tipo de usuario devyuelvo un barra de navegación o otra.
    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }

    //Creamos un useEffect que nada más cargar recoge los datos.
    useEffect(() => {
        recoleccionDatos()
        recoleccionNombreUser();
    }, []);

    //Recogemos el horario del empleado del dia seleccionado.
    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado = undefined;
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            datosEmpleado = await peticionGetAuth(URL_API + "registroHorario/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
        }else{
            datosEmpleado = await peticionGetAuth(URL_API + "registroHorario/" + `${localStorage.getItem("id")}`, header);
        }
        console.log(datosEmpleado)
        if(datosEmpleado !== undefined){
            if (datosEmpleado.data.turnos.length !== 0) {
            datosEmpleado.data.turnos.map((turno) => {
                if(turno.fecha === fechasBuscador.diaSeleccionado){
                    const obj = {
                        horario: turno.registroHorario,
                      }
                    console.log(obj)
                    setDatosJornada(obj)
                }
            });
            }
        }
      };

    //Recogemos el nombre del usuario logueado.
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

    //Al pulsar al botón recoge los datos con las nuevas fechas.
    const TodoCorrecto = () =>{
        recoleccionDatos();
    }

    //Recoge las entradas y salidas del estado.
    const getEntradasYSalidas = () =>{
        if(datosJornada.horario.length !== 0){
          return(datosJornada.horario.map((horario)=>{
            return(
              <div key={generarUUID()}>
                <p>Entrada  ➜ {formatoFechaDDMMYYYY(cogerFecha(horario.inicio)) + " " + cogerHora(horario.inicio)}</p>
                {esNula(horario.fin)}
              </div>
            )
          }))
        }else{
          return(<p>No hay registros para este dia.</p>)
        }
    }

    //Función para saber si la fecha es nula.
    const esNula = (fecha) =>{
        if(fecha !== null){
          return(<p>Salida  ➜  {formatoFechaDDMMYYYY(cogerFecha(fecha)) + " " + cogerHora(fecha)}</p>)
        }else{
          return(null);
        }
    }

    return(
    <React.Fragment>
        {anyadirBarraNav()}
            <div className='contenedorSectionParaFichar'>
                <div className='contenedorBotonCrearCorreo divFlexFichar'>   
                    <Link to="/fichar" className='crearCorreoBoton'>Fichar</Link>
                    <Link to="/verResumenLaboral" className='crearCorreoBoton'>Resumen</Link>
                    <Link to="/verCalendarioEmpleado" className='crearCorreoBoton'>Calendario</Link>
                </div>
            <h1 className='text-center tituloH1'>Buscar jornada del empleado {nombreEmpleado}</h1>
                <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar pd10-0'>
                    <Form>
                        <div className="divContenedorCampo2 margin10-0">
                            <div className="divContenedorCampo3">
                                <p>Dia a buscar:</p>
                                <Form.Group className="mb-3">
                                        <Form.Control required size="lg" type="date"
                                        onInput={e=>{setFechasBuscador({ ...fechasBuscador, diaSeleccionado: e.target.value.trim() })}}
                                        defaultValue={fechasBuscador.diaSeleccionado}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='contenedorBuscarResumen margin10-0'>
                            <button type='button' onClick={TodoCorrecto} className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">Buscar</button>
                        </div>
                        
                    </Form>
                </section>
                <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar'>
                        <div>
                            <article className='Fecha'>
                                <p>{formatearFechaFormatoDiaDeMesDelAnyo(fechasBuscador.diaSeleccionado)}</p>
                            </article>
                            <article className='horas'>
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

export default VerJornadaPorDia;
