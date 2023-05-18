//Importamos los estilos CSS del pie de página.
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { peticionGetAuth, cogerFecha, formatoFechaDDMMYYYY, cogerHora, formatearFechaFormatoDiaDeMesDelAnyo, formatoDateAFecha, fechaEntreRango, generarUUID } from "../../../FuncionesAuxiliares/Funciones.js";
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';
import { URL_API } from 'services/http/const.js';
import PiePagina from 'Biblioteca/PaginaPrincipal/Footer/PiePagina.js';
import './ListadoIncidenciasPresencia.css';
import { Table } from 'react-bootstrap';
import { faListSquares } from '@fortawesome/free-solid-svg-icons';

function ListadoIncidenciasPresencia(){

    //Estados para los datos de la base de datos.
    const [fechasBuscador, setFechasBuscador] = useState({
        diaSeleccionado: formatoDateAFecha(new Date()),
    });

    const [datosFaltas, setDatosFaltas] = useState([{}]);

    //Creamos un useEffect que nada más cargar recoge los datos.
    useEffect(() => {
        recoleccionDatos()
    }, []);

    //Recogemos el horario del empleado del dia seleccionado.
    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        console.log(URL_API + "ausencias")
        let datosAusencias = await peticionGetAuth(URL_API + "ausenciasEmpleados", header);
        console.log(datosAusencias)
            let datos = datosAusencias.data.ausencias.map((ausencia)=>{
                if(ausencia.fechaFin === null){
                    return({
                        nombre: ausencia.nombre + " " + ausencia.apellidos,
                        descripcion: ausencia.descripcion,
                        tipo: ausencia.tipo
                    })
                }else{   
                    if(fechaEntreRango(ausencia.fechaInicio,ausencia.fechaFin,fechasBuscador.diaSeleccionado)){
                        return({
                            nombre: ausencia.nombre + " " + ausencia.apellidos,
                            descripcion: ausencia.descripcion,
                            tipo: ausencia.tipo
                        })
                    }
                }
            })
            setDatosFaltas(datos);
      };

    //Al pulsar al botón recoge los datos con las nuevas fechas.
    const TodoCorrecto = () =>{
        recoleccionDatos();
    }
  
    return(
    <React.Fragment>
        <NavAdmin/>
            <div className='contenedorSectionParaFichar'>
            <h1 className='text-center tituloH1'>Listado de Incidencias</h1>
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
                <section className='padding0 sectionPequenyo sectionParaFichar'>
                        <div>
                            <article className='Fecha'>
                                <p>{formatearFechaFormatoDiaDeMesDelAnyo(fechasBuscador.diaSeleccionado)}</p>
                            </article>
                            <article className='horas'>
                                <div className="horas2">
                                    <h2>Ausencias</h2>
                                    <Table className='sinMargen' striped>
                                        <thead>
                                            <tr>
                                                <th className='sinBorde'>Nombre</th>
                                                <th className='sinBorde'>Tipo</th>
                                                <th className='sinBorde'>Ausencia</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datosFaltas.map((falta)=>{
                                                if(falta !== null && falta !== undefined){
                                                    return(
                                                        <tr key={generarUUID()}>
                                                            <td>{falta.nombre}</td>
                                                            <td>{falta.tipo}</td>
                                                            <td>{falta.descripcion}</td>
                                                        </tr>
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </article>
                        </div>
                    </section>
            </div>
            <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'> 
          <Link to="/accionesEmpleados"  className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">Volver</Link>
        </div>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default ListadoIncidenciasPresencia;
