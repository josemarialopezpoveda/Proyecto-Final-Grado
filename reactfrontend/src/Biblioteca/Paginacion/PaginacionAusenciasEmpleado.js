import { cogerFecha, cogerHora, formatoFechaDDMMYYYY, formatoFechaDDMMYYYYGuiones, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

const PaginacionAusenciasEmpleado = ({ data, perPage, setEstadoDinamico, setEstadoEstatico, setEstaVacio, props }) => {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();

    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)

    const modificar = (e) =>{
        localStorage.setItem("idTiempoSeleccionado", e.target.id);
        Navigate("/modificarTiempo");
    }

    //Función para recoger todos los empleados y los guarda en el estado.
    const recoleccionDatos = async () => {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let datosAusencia = await peticionGetAuth(URL_API + "ausenciasEmpleados/" + `${localStorage.getItem("idEmpleado")}`, header);
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
                setEstadoDinamico(todosDatosAusencia);
                setEstadoEstatico(todosDatosAusencia);
            }
        }
      };

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
                  mostrarAlertaCorrecta("Todo correcto y funcionando perfectamente", "Ausencia borada correctamente.", "3000");
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

    const fechaNula = (fecha) =>{
      console.log(fecha)
        if(fecha === null){
            return "Fecha no indicada";
        }else{
            return formatoFechaDDMMYYYYGuiones(fecha);
        }
    }

    const estaJustificada = (justificacion) =>{
        if(justificacion===1){
            return "SI"
        }else{
            return "NO"
        }
    }

    const modificarAusencia = (e) =>{
      localStorage.setItem("idAusencia", e.target.id);
      Navigate(props.link);
    }

  

  const seleccionarBotonArrancar = () =>{
    let botonesPaginacion = document.getElementsByClassName("botonPaginacion");
    if(botonesPaginacion.length !== 0){   
        botonesPaginacion[0].classList.add("botonSeleccionado")
    }
  }

  useEffect(()=>{
    seleccionarBotonArrancar();
  },[])


//   Cosas Paginación
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / perPage);

  const handleClick = (page, e) => {
    setCurrentPage(page);

    setPaginaSeleccionada(page)
    
    let botonesSeleccionados = document.getElementsByClassName("botonSeleccionado");
    if(botonesSeleccionados.length !== 0){
      botonesSeleccionados[0].classList.remove("botonSeleccionado");
    }
    e.target.classList.add("botonSeleccionado");
  }

  const renderData = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    if(data.length !== 0){
      return data.slice(start, end).map((option, index) => (     
          <tr key={generarUUID()}>
                <td className='formatoTextoCorrecto'>{option.descripcion}</td>
                <td className='formatoTextoCorrecto'>{option.descripcionAusencia}</td>
                <td className='formatoTextoCorrecto campoOpcional'>{fechaNula(option.fInicio)}</td>
                <td className='formatoTextoCorrecto campoOpcional'>{fechaNula(option.fFin)}</td>
                <td className='formatoTextoCorrecto campoOpcional'>{estaJustificada(option.justificada)}</td>
                <td className='formatoTextoCorrecto campoOpcional'>{option.tipoAusencia}</td>
                <td>
                    <button type='button' onClick={modificarAusencia} className="sinBorde">
                        <img id={option.id} title='Boton Modificar' className='imagenFotoGestionUsuarios' src={require('../../img/modify-foto.png')} alt="imagen Foto Modificar"/>
                    </button>
                    <button type="button" className='sinBorde' onClick={borrarAusencia}>
                        <img id={option.id}  title='Boton Borrar' className='imagenFotoGestionUsuarios' src={require('../../img/delete-foto.png')} alt="imagen Foto Borrar"/>
                    </button>
                </td>
            </tr>            
      ));
    }else{
      return(<tr><td colSpan={"7"}>Este empleado no tiene ausencias.</td></tr>)
    }
  }

  return (
    <React.Fragment>
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
                {renderData()}
                </tbody>
        </Table>
    </div>
        <div className='botonesPaginacion'>
        {Array.from({ length: totalPages }, (_, i) => {
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  i === paginaSeleccionada - 2 ||
                  i === paginaSeleccionada - 1 ||
                  i === paginaSeleccionada ||
                  i === paginaSeleccionada + 1
                ) {
                  return (
                    <button
                      className="botonPaginacion"
                      key={i}
                      onClick={(e) => handleClick(i + 1, e)}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (
                  (i === 1 && paginaSeleccionada !== 3) ||
                  (i === totalPages - 2 && paginaSeleccionada !== totalPages - 2)
                ) {
                  return (
                    <div key={i}>
                      <button className="botonPaginacionPuntos" key={i}>
                        ...
                      </button>
                    </div>
                  );
                }
                return null;
              })}
        </div>
    </React.Fragment>
  );
}

export default PaginacionAusenciasEmpleado;
