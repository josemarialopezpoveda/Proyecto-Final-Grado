import React, {useState, useEffect} from 'react';
import PiePagina from '../../../../PaginaPrincipal/Footer/PiePagina';
import CrearBodyModificarTurno from './CrearBodyModificarTurno.js';
import NavAdmin from '../../../Nav/NavAdmin';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import './ModificarTurno.css';
import { convertirNumeroDiaSemana, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, obtenerMilisegundosDesdeHora, peticionGetAuth, peticionPut } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';
import ChecksDiasSemana from '../../CrearTurno/ComponentesAuxTurno/ChecksDiasSemana';
import Form from 'react-bootstrap/Form';

function ModificarTurno() {
    //Creamos la variable para poder usar el navigate.
    const Navigate = useNavigate();
    const [turno, setTurno] = useState({});
    const [horasModificadas, setHorasModificadas] = useState([{}]);

    //Función que ordena los el array de los turnos de la semana a partir del dia de la semana.
    const ordenarPorDiaSemana =(array) =>{
      array.sort((a, b) => a.diaSemana - b.diaSemana);
      return array;
    }

    const verificarTodosCero = (objeto) =>{
      const valores = Object.values(objeto);
      const resultados = valores.map(elemento => {
        return (
          elemento.horaFinM === '00:00:00' &&
          elemento.horaFinN === '00:00:00' &&
          elemento.horaFinT === '00:00:00' &&
          elemento.horaInicioM === '00:00:00' &&
          elemento.horaInicioN === '00:00:00' &&
          elemento.horaInicioT === '00:00:00'
        );
      });

      return resultados.every(resultado => resultado);
    }

    const comprobarInicioAntesFin = (objeto)=>{
      for (const key in objeto) {
        if (objeto.hasOwnProperty(key)) {
          const horas = objeto[key];
            // Realiza las operaciones necesarias con cada elemento
            if(obtenerMilisegundosDesdeHora(horas.horaInicioM) > obtenerMilisegundosDesdeHora(horas.horaFinM) ||
            obtenerMilisegundosDesdeHora(horas.horaInicioT) > obtenerMilisegundosDesdeHora(horas.horaFinT) ||
            obtenerMilisegundosDesdeHora(horas.horaInicioN) > obtenerMilisegundosDesdeHora(horas.horaFinN)){
              return true;
            }else{
              return false;
            }
        }
      }
    }

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosTurno = await peticionGetAuth(URL_API + "turnos/" + `${localStorage.getItem("idTurno")}`, header);
        if (datosTurno.data.turno !== undefined) {
            var newTurno = {
              descripcion: datosTurno.data.turno.descripcion,
              dias: datosTurno.data.turno.dias,
            };
          setTurno(newTurno);
          setHorasModificadas(ordenarPorDiaSemana(newTurno.dias));
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

    const goBack = () => {
      window.history.go(-1); // Retrocede una página en el historial
    };

    const modificarTurno = async() =>{
      let raw = {
        "descripcion" : turno.descripcion,
        "empresa_id": `${localStorage.getItem('id')}`,
        "dias": horasModificadas
      }
      if(verificarTodosCero(horasModificadas)){
        mostrarAlertaErronea("Error al modificar el turno", "Todas las horas estan a cero.", 5000)
      }else if(comprobarInicioAntesFin(horasModificadas)){
        mostrarAlertaErronea("Error al modificar el turno", "La hora de fin no puede ser antes de la hora de inicio.", 5000)
      }else{
        try {
            const header = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                }
            }
          let peticion = await peticionPut(URL_API + "turnos/" + `${localStorage.getItem('idTurno')}`, raw, header)
          console.log(peticion)
          if(peticion.data.error !== undefined){
            mostrarAlertaErronea(peticion.data.error, "", null);
          }else{
            if(peticion.data.message !== undefined && peticion.data.message !== null){
                mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
            }else{
                mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
                goBack();
            }
          }
        } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
        }
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
              <div className='FlexBoton'>
                    <h4 className='text-center tituloH1'>Horario: {turno.descripcion}</h4>
                    <div className='contenedorBotonCrearCorreo'>
                        <Link className='crearCorreoBoton margin0-10 heightDefinido' to="/verMensajes">Volver</Link>
                    </div>
                </div>
                <div className='tablaMediaQuery tablaMargin TablaDatosUser'>
                  <p className='desc-Titulo'>Descripcion del turno</p>
                  <div className="divContenedorCampo">
                    <Form.Group className="mb-3 width500">
                      <Form.Control
                        size="lg"
                        type="text"
                        defaultValue={turno.descripcion}
                        onChange={(e) => setTurno({ ...turno, descripcion: e.target.value.trim() })}
                      />
                    </Form.Group>
                  </div>

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
                        <button onClick={goBack} className="linkSignInLogin" id="signIn">Volver</button>
                    </div>
                </div>
            </section>
        <PiePagina/>
    </React.Fragment>
  );
}

export default ModificarTurno;
