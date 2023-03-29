//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState, useEffect} from 'react';
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from '../../../../FuncionesAuxiliares/Funciones';
import {Link, useNavigate} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";

function VerInfoAusencia(props) {
    const Navigate = useNavigate();
    const [ausencia,setAusencia] = useState([]);
    const [estaVacio,setEstaVacio] = useState(false);

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosAusencia = await peticionGetAuth(URL_API + "ausencias", header);
        if (datosAusencia.data !== 0) {
            var todosDatosAusencia = datosAusencia.data.map((dia)=>{
              if(dia.tipoausencias.tipo === props.titulo.toUpperCase()){
                var newTurno = {
                    id: dia.id,
                    descripcion: dia.descripcion,
                    tipoAusencia: dia.tipoausencias.descripcion,
                    justificada: dia.justificada,
                    fInicio: dia.fechaInicio,
                    fFin: dia.fechaFin
                    };
                if(newTurno !== undefined){
                  setEstaVacio(true);
                  return newTurno;
                }
              }
            });
            if(todosDatosAusencia !== undefined){
              setAusencia(todosDatosAusencia);
            }
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

    const fechaNula = (fecha) =>{
        if(fecha === null){
            return "Fecha no indicada";
        }else{
            return fecha;
        }
    }

    const estaJustificada = (justificacion) =>{
        if(justificacion===1){
            return "SI"
        }else{
            return "no"
        }
    }

    const borrarAusencia = (e) =>{
        SweetAlert.fire({
            title: "¿Estás seguro que quieres eliminar este tipo de Ausencia?",
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
                let url = URL_API + "ausencias/";
                let peticion = await peticionDelete(`${url}${e.target.id}`);
                if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
                  mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
                } else {
                  mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
                  //Navigate(props.linkActual);
                  recoleccionDatos();
                }
              } catch (error) {
                mostrarAlertaErronea(error.message, error.stack, null);
              }
            } else {
            }
          });
    }

    const modificarAusencia = (e) =>{
      localStorage.setItem("idAusencia", e.target.id);
      Navigate(props.link);
    }

    if(estaVacio !== false){
        return (ausencia.map((option, index)=> {
          //return(<td><pre>{JSON.stringify(ausencia, null, 3)}</pre></td>)
          if(option !== undefined){
            return(<tr key={generarUUID()}>
                        <td className='formatoTextoCorrecto'>{option.descripcion}</td>
                        <td className='formatoTextoCorrecto campoOpcional'>{fechaNula(option.fInicio)}</td>
                        <td className='formatoTextoCorrecto campoOpcional'>{fechaNula(option.fFin)}</td>
                        <td className='formatoTextoCorrecto campoOpcional'>{estaJustificada(option.justificada)}</td>
                        <td className='formatoTextoCorrecto campoOpcional'>{option.tipoAusencia}</td>
                        <td>
                            <button type='button' onClick={modificarAusencia} className="sinBorde">
                                <img id={option.id} title='Boton Modificar' className='imagenFotoGestionUsuarios' src={require('../../../../../img/modify-foto.png')} alt="imagen Foto Modificar"/>
                            </button>
                            <button type="button" className='sinBorde' onClick={borrarAusencia}>
                                <img id={option.id}  title='Boton Borrar' className='imagenFotoGestionUsuarios' src={require('../../../../../img/delete-foto.png')} alt="imagen Foto Borrar"/>
                            </button>
                        </td>
                    </tr>

                )
          }
        }))  
    }else{
      if(props.titulo === "Vacaciones"){
        return(<tr key={generarUUID()}>
            <td colSpan={"6"}>Este empleado no dispone de {props.titulo}.</td>
          </tr>)
      }else{
      return(<tr key={generarUUID()}>
            <td colSpan={"6"}>Este empleado no dispone de {props.titulo}s.</td>
          </tr>)
      } 
    }
}
  

export default VerInfoAusencia;
