//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState,useEffect} from 'react';
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from '../../../../FuncionesAuxiliares/Funciones';
import {useNavigate } from "react-router-dom";
import './ListarTurnos.css';
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";


function ListarTurnos() {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();
    const [turno, setTurno] = useState(
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
        let datosTurno = await peticionGetAuth(URL_API + "turnos", header);
        console.log(datosTurno)
        if (datosTurno.data !== 0) {
          var todosDatosEmpresa = datosTurno.data.map((datosE) => {
            var newEmpresa = {
              id: datosE.id,
              descripcion: datosE.descripcion,
            };
            return newEmpresa;
          });
          setTurno(todosDatosEmpresa);
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
                  mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
                  //Navigate("/paginaPrincipalTurnos");
                  recoleccionDatos();
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

    if(turno.id !== "" && turno.descripcion !== ""){
        return turno.map((option)=> {
            return(<tr key={generarUUID()}>
                <td className='contenedorTurnoTabla'>{option.descripcion}</td>
                <td className='contenedorTurnoTabla contenedorBotonesTurnoTabla'>
                    <button type='button' id={option.id} onClick={modificarTurno} className="botonTurnos">Ver Turno</button>
                    <button type='button' id={option.id} onClick={borrarTurno} className="botonTurnos">Eliminar Turno</button>
                </td>
            </tr>)
        });
    }else{
        return(<tr key={generarUUID()}>
                <td colSpan="2" className='contenedorTurnoTabla'>Tu empresa no dispone de turnos.</td>
            </tr>)
    }
}

export default ListarTurnos;
