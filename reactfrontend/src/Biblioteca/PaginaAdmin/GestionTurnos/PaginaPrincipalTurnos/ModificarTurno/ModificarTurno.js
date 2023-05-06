import React, {useState, useEffect} from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import CrearBodyModificarTurno from './CrearBodyModificarTurno.js';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import './ModificarTurno.css';
import { convertirNumeroDiaSemana, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionGetAuth, peticionPut } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';
import ChecksDiasSemana from '../../CrearTurno/ComponentesAuxTurno/ChecksDiasSemana';
import Form from 'react-bootstrap/Form';

function ModificarTurno() {
    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();
    const [turno, setTurno] = useState({});
    const [horasModificadas, setHorasModificadas] = useState({});

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosTurno = await peticionGetAuth(URL_API + "turnos/" + `${localStorage.getItem("idTurno")}`, header);
        console.log(datosTurno)
        if (datosTurno.data.turno !== undefined) {
            var newTurno = {
              descripcion: datosTurno.data.turno.descripcion,
              dias: datosTurno.data.turno.dias,
            };
          setTurno(newTurno);
          setHorasModificadas(newTurno.dias);
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

    const modificarTurno = async() =>{
      console.log(horasModificadas)
      let raw = {
        "descripcion" : turno.descripcion,
        "empresa_id": `${localStorage.getItem('id')}`,
        "dias": horasModificadas
      }
      console.log(raw)
      try {
          const header = {
              headers: {
                  "Accept": "application/json",
                  "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
              }
          }
        let peticion = await peticionPut(URL_API + "turnos/" + `${localStorage.getItem('idTurno')}`, raw, header)
        console.log(peticion)
        if(peticion.data.errores !== undefined && peticion.data.errores !== null){
            mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
        }else{
            mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
            Navigate("/verTurno")
        }
      } catch (error) {
        mostrarAlertaErronea(error.message, error.stack, null);
      }
    }

    const diasTurno = () =>{
          if(turno !== {} && turno.dias !== undefined){
          return(
              <tr>
                  <th>Horas Asignadas</th>
                  {turno.dias.map((dia)=>{
                    return(<th key={generarUUID()}>{convertirNumeroDiaSemana(dia.diaSemana)}</th>)
                  })}
              </tr>
          );
          }
      }

    

  return (
    <React.Fragment>
        <NavAdmin/>
            <section>
                <h4 className='tituloH1 text-center'>Horario: {turno.descripcion}</h4>
                <div className='TablaDatosUser'>
                    {/*PENDIENTE BUSCADOR TURNOS*/ }
                    <Table striped>
                        <thead>
                          {diasTurno()}
                        </thead>
                            <CrearBodyModificarTurno setTurno={setTurno} turno={turno} horasModificadas={horasModificadas} setHorasModificadas={setHorasModificadas}/>
                    </Table>
                </div>
                <div className='divFlexBotones'>
                    <div className='contenedorBotonModificarTurno'>
                        <button type='button' onClick={modificarTurno} className="linkSignInLogin" id="signIn">Modificar Turno</button>
                        <Link to="/verTurno" className="linkSignInLogin" id="signIn">Volver</Link>
                    </div>
                </div>
            </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarTurno;
