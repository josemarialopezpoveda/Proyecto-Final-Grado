//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState,useEffect} from 'react';
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from '../../../../FuncionesAuxiliares/Funciones';
import {useNavigate } from "react-router-dom";
import './ListarTurnos.css';
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import BuscadorTurnos from 'Biblioteca/Buscador/BuscadorTurnos';

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
        console.log(URL_API + "turnosEmpresa/" + `${localStorage.getItem("id")}`)
        let datosTurno = await peticionGetAuth(URL_API + "turnosEmpresa/" + `${localStorage.getItem("id")}`, header);
        console.log(datosTurno)
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

    const borrarTurno = (e) =>{
        console.log(e.target.id);
        SweetAlert.fire({
            title: "¿Estás seguro que quieres eliminar este turno?",
            text: "Los datos se eliminarán definitivamente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
          }).then(async (resultado) => {
            if (resultado.value) {
              try {
                const header = {
                  headers: {
                    Accept: "application/json",
                    Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
                  },
                };
                let url = URL_API + "turnos/";
                console.log(url + `${e.target.id}`)
                let peticion = await peticionDelete(`${url}${e.target.id}`, header);
                console.log(peticion)
                if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
                  mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
                } else {
                  if(peticion.data.message === "El turno no se puede borrar, está asignado a un empleado"){
                    mostrarAlertaErronea(peticion.data.message, "Error de turno asignado a un empleado.", null);
                  }else{
                    mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
                    //Navigate("/paginaPrincipalTurnos");
                    recoleccionDatos();
                  }
                }
              } catch (error) {
                mostrarAlertaErronea(error.message, error.stack, null);
              }
            } else {
            }
          });
    }

    const modificarTurno = (e) => {
        localStorage.setItem("idTurno", e.target.id);
        Navigate("/verTurno");
      };

    const getTurnos = () =>{
      return turnoEstatico.map((option)=> {
        return(<tr key={generarUUID()}>
            <td className='contenedorTurnoTabla'>{option.descripcion}</td>
            <td className='contenedorTurnoTabla contenedorBotonesTurnoTabla'>
                <button type='button' id={option.id} onClick={modificarTurno} className="botonTurnos">Ver Turno</button>
                <button type='button' id={option.id} onClick={borrarTurno} className="botonTurnos">Eliminar Turno</button>
            </td>
        </tr>)
      });
    }

    if(turnoEstatico.id !== "" && turnoEstatico.descripcion !== ""){
      return(
        <div className='TablaDatosUser'>
          <BuscadorTurnos datosEstaticos={setTurnoEstatico} datosDinamicos={turnoDinamico}/>
          <Table striped>
            <thead>
              <tr>
                  <th>Descripción</th>
                  <th>Opciones</th>
              </tr>
            </thead> 
            <tbody>
                {getTurnos()}
            </tbody>
          </Table>
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
                <tr key={generarUUID()}>
                  <td colSpan="2" className='contenedorTurnoTabla'>Tu empresa no dispone de turnos.</td>
                </tr>
            </tbody>
          </Table>
        </div>)
    }
}

export default ListarTurnos;
