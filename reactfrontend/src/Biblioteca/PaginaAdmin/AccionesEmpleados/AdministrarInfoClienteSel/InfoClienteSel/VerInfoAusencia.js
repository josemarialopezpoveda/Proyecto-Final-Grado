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

    if(estaVacio !== false){
         return(
          <div className='TablaDatosUser'>
            <BuscadorAusencia datosEstaticos={setAusenciaEstatico} datosDinamicos={ausenciaDinamico}/>
            <PaginacionAusenciasEmpleado data={ausenciaEstatico} perPage={2} 
                setEstadoEstatico={setAusenciaEstatico} setEstadoDinamico={setAusenciaDinamico} setEstaVacio={setEstaVacio} props={props}/>
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
