//Importamos los estilos CSS del pie de página.
import React, {useState, useEffect} from 'react';
import NavCliente from '../Nav/NavCliente.js';
import { Link } from "react-router-dom";
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina.js';
import { URL_API } from 'services/http/const.js';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';
import Form from 'react-bootstrap/Form';
import { generarUUID, formatoDateAFecha, peticionGetAuth, calculoFechaHoy } from 'Biblioteca/FuncionesAuxiliares/Funciones.js';

function CalendarioEmpleado(){
    const [fechasBuscador, setFechasBuscador] = useState({
        diaSeleccionado: formatoDateAFecha(new Date()),
    });

    const [datosJornada, setDatosJornada] = useState({
        horario: [],
    });

    const [nombreEmpleado, setNombreEmpleado] = useState();
    const [datosRegistro, setDatosTiempoEmpleado] = useState({});

    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos()
        recoleccionNombreUser();
    }, []);

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
        console.log(datosEmpleado)
        console.log(localStorage.getItem('tipoUsuario'))
        if(datosEmpleado !== undefined){
            if (datosEmpleado.data.length !== 0) {
            console.log(datosEmpleado)
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

    const TodoCorrecto = () =>{
        recoleccionDatos();
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

    const esNula = (fecha) =>{
        if(fecha !== null){
          return(<p>Salida  ➜  {fecha}</p>)
        }else{
          return(null);
        }
    }

    return(
    <React.Fragment>
        {anyadirBarraNav()}
            <div className='contenedorSectionParaFichar'>
            <h1 className='text-center tituloH1'>Calendario del empleado {nombreEmpleado}</h1>
                <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar pd10-0'>
                    <Form>
                        <div className="divContenedorCampo2 margin10-0">
                            <div className="divContenedorCampo3">
                                <p>Dia a buscar:</p>
                                <Form.Group className="mb-3">
                                        <Form.Control required size="lg" type="date"
                                        onInput={e=>{setFechasBuscador({ ...fechasBuscador, desde: e.target.value.trim() })}}
                                        defaultValue={fechasBuscador.desde}/>
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
                                <p>{calculoFechaHoy()}</p>
                            </article>
                            <article className='horas'>
                                <div className="horas2">
                                    {getEntradasYSalidas()}
                                </div>
                            </article>
                        </div>
                    </section>
                <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
                    <Link to="/fichar" className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">Volver</Link>
                </div>
            </div>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default CalendarioEmpleado;
