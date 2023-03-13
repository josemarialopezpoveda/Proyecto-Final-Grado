//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState, useEffect} from 'react';
import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from '../../../../FuncionesAuxiliares/Funciones';
import {Link, useNavigate} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";

function VerInfoAusencia(props) {
    const Navigate = useNavigate();
    const [ausencia,setAusencia] = useState([]);

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
                var newTurno = {
                    id: dia.id,
                    descripcion: dia.descripcion,
                    tipoAusencia: dia.tipoausencias.descripcion,
                    justificada: dia.justificada,
                    fInicio: dia.fechaInicio,
                    fFin: dia.fechaFin
                    };
                return newTurno;
            });
            setAusencia(todosDatosAusencia);
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
        console.log(e.target.id)
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
                console.log(url + `${e.target.id}`)
                let peticion = await peticionDelete(`${url}${e.target.id}`);
                console.log(peticion)
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

    if(ausencia !== undefined && ausencia.length !== undefined){
        return (ausencia.map((option)=> {
            return(<tr key={generarUUID()}>
                    <td className='formatoTextoCorrecto'>{option.descripcion}</td>
                    <td className='formatoTextoCorrecto campoOpcional'>{fechaNula(option.fInicio)}</td>
                    <td className='formatoTextoCorrecto campoOpcional'>{fechaNula(option.fFin)}</td>
                    <td className='formatoTextoCorrecto campoOpcional'>{estaJustificada(option.justificada)}</td>
                    <td className='formatoTextoCorrecto campoOpcional'>{option.tipoAusencia}</td>
                    <td>
                        <Link to={props.link} className="sinBorde">
                            <img title='Boton Modificar' className='imagenFotoGestionUsuarios' src={require('../../../../../img/modify-foto.png')} alt="imagen Foto Modificar"/>
                        </Link>
                        <button id={option.id} type="button" className='sinBorde' onClick={borrarAusencia}>
                            <img  id={option.id} title='Boton Borrar' className='imagenFotoGestionUsuarios' src={require('../../../../../img/delete-foto.png')} alt="imagen Foto Borrar"/>
                        </button>
                    </td>
                </tr>

            )
        }))
    }else{
        <tr>
            <td>ALGO PASA</td>
            <td><pre>{JSON.stringify(ausencia, null, 3)}</pre></td>
        </tr>
    }
}
  

export default VerInfoAusencia;
