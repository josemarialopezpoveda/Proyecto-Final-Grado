//Importamos todos los .js que necesitamos para esta práctica.
import React, {useState, useEffect} from 'react';
import { formatoFechaDDMMYYYY, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from '../../../../FuncionesAuxiliares/Funciones';
import {useNavigate} from 'react-router-dom';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table'
import SweetAlert from "sweetalert2";
import BuscadorAusencia from 'Biblioteca/Buscador/BuscadorAusencia';
import PaginacionAusenciasEmpleado from 'Biblioteca/Paginacion/PaginacionAusenciasEmpleado';

function VerInfoAusencia(props) {
    const Navigate = useNavigate();
    const [ausenciaDinamico,setAusenciaDinamico] = useState([]);
    const [ausenciaEstatico,setAusenciaEstatico] = useState([]);
    const [estaVacio,setEstaVacio] = useState(false);

    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosAusencia = await peticionGetAuth(URL_API + "ausenciasEmpleado/" + `${localStorage.getItem("idEmpleado")}`, header);
        console.log(datosAusencia)
        if (datosAusencia.data.ausencias !== 0 && datosAusencia.data.message !== "El empleado no tiene ausencias") {
            var todosDatosAusencia = datosAusencia.data.ausencias.map((dia)=>{
              var newTurno = {
                id: dia.id,
                descripcion: dia.descripcion,
                descripcionAusencia: dia.descripcionAusencia,
                tipoAusencia: dia.tipo,
                justificada: dia.justificada,
                fInicio: dia.fechaInicio,
                fFin: dia.fechaFin
              };
              if(newTurno !== undefined){
                setEstaVacio(true);
                return newTurno;
              }
            });
            if(todosDatosAusencia !== undefined){
              setAusenciaEstatico(todosDatosAusencia);
              setAusenciaDinamico(todosDatosAusencia);
            }
        }
      };

    useEffect(() => {
        recoleccionDatos();
    }, []);

    // const fechaNula = (fecha) =>{
    //     if(fecha === null){
    //         return "Fecha no indicada";
    //     }else{
    //         return formatoFechaDDMMYYYY(fecha);
    //     }
    // }

    // const estaJustificada = (justificacion) =>{
    //     if(justificacion===1){
    //         return "SI"
    //     }else{
    //         return "NO"
    //     }
    // }

    // const borrarAusencia = (e) =>{
    //     SweetAlert.fire({
    //         title: "¿Estás seguro que quieres eliminar este tipo de Ausencia?",
    //         text: "Los datos se eliminarán definitivamente",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Sí, eliminar",
    //         cancelButtonText: "Cancelar",
    //       }).then(async (resultado) => {
    //         if (resultado.value) {
    //           try {
    //             const header = {
    //               headers: {
    //                 Accept: "application/json",
    //                 Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
    //               },
    //             };
    //             let url = URL_API + "ausencias/";
    //             let peticion = await peticionDelete(`${url}${e.target.id}`);
    //             if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
    //               mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
    //             } else {
    //               mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
    //               //Navigate(props.linkActual);
    //               recoleccionDatos();
    //             }
    //           } catch (error) {
    //             mostrarAlertaErronea(error.message, error.stack, null);
    //           }
    //         } else {
    //         }
    //       });
    // }

    // const modificarAusencia = (e) =>{
    //   localStorage.setItem("idAusencia", e.target.id);
    //   Navigate(props.link);
    // }

    // const getInfoAusencia = () =>{
    //   return (ausenciaEstatico.map((option, index)=> {
    //     //return(<td><pre>{JSON.stringify(ausencia, null, 3)}</pre></td>)
    //     if(option !== undefined){
    //       return(<tr key={generarUUID()}>
    //                   <td className='formatoTextoCorrecto'>{option.descripcion}</td>
    //                   <td className='formatoTextoCorrecto'>{option.descripcionAusencia}</td>
    //                   <td className='formatoTextoCorrecto campoOpcional'>{fechaNula(option.fInicio)}</td>
    //                   <td className='formatoTextoCorrecto campoOpcional'>{fechaNula(option.fFin)}</td>
    //                   <td className='formatoTextoCorrecto campoOpcional'>{estaJustificada(option.justificada)}</td>
    //                   <td className='formatoTextoCorrecto campoOpcional'>{option.tipoAusencia}</td>
    //                   <td>
    //                       <button type='button' onClick={modificarAusencia} className="sinBorde">
    //                           <img id={option.id} title='Boton Modificar' className='imagenFotoGestionUsuarios' src={require('../../../../../img/modify-foto.png')} alt="imagen Foto Modificar"/>
    //                       </button>
    //                       <button type="button" className='sinBorde' onClick={borrarAusencia}>
    //                           <img id={option.id}  title='Boton Borrar' className='imagenFotoGestionUsuarios' src={require('../../../../../img/delete-foto.png')} alt="imagen Foto Borrar"/>
    //                       </button>
    //                   </td>
    //               </tr>

    //           )
    //     }
    //   })) 
    // }

    if(estaVacio !== false){
         return(
          <div className='TablaDatosUser'>
            <BuscadorAusencia datosEstaticos={setAusenciaEstatico} datosDinamicos={ausenciaDinamico}/>
            <PaginacionAusenciasEmpleado data={ausenciaEstatico} perPage={2} 
                setEstadoEstatico={setAusenciaEstatico} setEstadoDinamico={setAusenciaDinamico} setEstaVacio={setEstaVacio} props={props}/>
                {/* <Table striped>
                  <thead>
                      <tr>
                          <th>Descripción</th>
                          <th>Descripción Ausencia</th>
                          <th className='campoOpcional'>Fecha Inicio</th>
                          <th className='campoOpcional'>Fecha Fin</th>
                          <th className='campoOpcional'>Justificada</th>
                          <th className='campoOpcional'>Tipo Ausencia</th>
                          <th>Opciones</th>
                      </tr>
                  </thead>
                  <tbody>
                    {getInfoAusencia()}
                  </tbody>
            </Table>*/}
          </div> 
         )
    }else{
      if(props.titulo === "Vacaciones"){
        return(
          <div className='TablaDatosUser'>
            <Table striped>
              <thead>
                  <tr>
                      <th>Descripción</th>
                      <th>Descripción Ausencia</th>
                      <th className='campoOpcional'>Fecha Inicio</th>
                      <th className='campoOpcional'>Fecha Fin</th>
                      <th className='campoOpcional'>Justificada</th>
                      <th className='campoOpcional'>Tipo Ausencia</th>
                      <th>Opciones</th>
                  </tr>
              </thead>
              <tbody>
                <tr key={generarUUID()}>
                  <td colSpan={"6"}>Este empleado no dispone de {props.titulo}.</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )
      }else{
      return(
        <div className='TablaDatosUser'>
            <Table striped>
              <thead>
                  <tr>
                      <th>Descripción</th>
                      <th>Descripción Ausencia</th>
                      <th className='campoOpcional'>Fecha Inicio</th>
                      <th className='campoOpcional'>Fecha Fin</th>
                      <th className='campoOpcional'>Justificada</th>
                      <th className='campoOpcional'>Tipo Ausencia</th>
                      <th>Opciones</th>
                  </tr>
              </thead>
              <tbody>
                <tr key={generarUUID()}>
                  <td colSpan={"7"}>Este empleado no dispone de {props.titulo}s.</td>
                </tr>
              </tbody>
            </Table>
          </div>)
      } 
    }
}
  

export default VerInfoAusencia;
