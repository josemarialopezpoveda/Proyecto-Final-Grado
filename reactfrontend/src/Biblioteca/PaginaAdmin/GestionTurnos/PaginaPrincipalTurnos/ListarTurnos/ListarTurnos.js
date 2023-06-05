//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState,useEffect} from 'react';
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from '../../../../FuncionesAuxiliares/Funciones';
import {useNavigate } from "react-router-dom";
import './ListarTurnos.css';
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import BuscadorTurnos from 'Biblioteca/Buscador/BuscadorTurnos';
import PaginacionTurnos from 'Biblioteca/Paginacion/PaginacionTurnos';

function ListarTurnos() {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();
    //Creamos la variable para el contenido de los empleados estaticos.
    const [turnoEstatico, setTurnoEstatico] = useState(
        {
          id: "",
          descripcion: "",
        });
    //Creamos la variable para el contenido de los empleados dinámicos.
    const [turnoDinamico, setTurnoDinamico] = useState(
      {
        id: "",
        descripcion: "",
      });

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosTurno = await peticionGetAuth(URL_API + "turnosEmpresa/" + `${localStorage.getItem("id")}`, header);
        if (datosTurno.data !== 0) {
          if(datosTurno.data.turnos !== undefined){
            var todosDatosEmpresa = datosTurno.data.turnos.map((datosE) => {
              var newEmpresa = {
                id: datosE.id,
                descripcion: datosE.descripcion,
              };
              return newEmpresa;
            });
            setTurnoDinamico(todosDatosEmpresa);
            setTurnoEstatico(todosDatosEmpresa);
          }else{
            var newEmpresa = {
              id: "",
              descripcion: "",
            };
            setTurnoDinamico(newEmpresa);
            setTurnoEstatico(newEmpresa);
          }
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

    if(turnoEstatico.id !== "" && turnoEstatico.descripcion !== ""){
      return(
        <div className='TablaDatosUser'>
          <BuscadorTurnos datosEstaticos={setTurnoEstatico} datosDinamicos={turnoDinamico}/>
          <PaginacionTurnos data={turnoEstatico} perPage={4} 
                setEstadoEstatico={setTurnoEstatico} setEstadoDinamico={setTurnoDinamico}/>
        </div>)
    }else{
        return(
        <div className='TablaDatosUser'>
          <Table striped>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td colSpan="2" className='contenedorTurnoTabla'>Tu empresa no dispone de turnos.</td>
                </tr>
            </tbody>
          </Table>
        </div>)
    }
}

export default ListarTurnos;
