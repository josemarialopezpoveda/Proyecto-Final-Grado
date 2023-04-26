//Importamos los estilos CSS del pie de página.
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { calculoFechaHoy, peticionGetAuth, restarHoras, generarUUID } from 'Biblioteca/FuncionesAuxiliares/Funciones.js';
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

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
        recoleccionNombreUser();
        recoleccionRegistroHorario()
    }, []);

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosEmpleado =  await peticionGetAuth(URL_API + "empleadoOnline/" + `${localStorage.getItem("idEmpleado")}`, header);
        if(datosEmpleado !== undefined){
            console.log(datosEmpleado)
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
            console.log(datosEmpleado)
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
      console.log(datosEmpleado)
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
                            {getEntradasYSalidas()}
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
