import { cogerFecha, cogerHora, generarUUID, mirarActividad, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

const PaginacionChatAdmin = ({ data, perPage, setEstadoDinamico, setEstadoEstatico }) => {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();

    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)

  const seleccionarBotonArrancar = () =>{
    let botonesPaginacion = document.getElementsByClassName("botonPaginacion");
    botonesPaginacion[0].classList.add("botonSeleccionado")
  }

  useEffect(()=>{
    seleccionarBotonArrancar();
  },[])

  //Función para recoger todos los empleados y los guarda en el estado.
  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosCasos = await peticionGetAuth(URL_API + "casos", header);
    if (datosCasos.data.casos.length !== 0) {
      var todosDatosEmpresa = datosCasos.data.casos.map((datosE) => {
        var newEmpresa = {
          id: datosE.id,
          asunto: datosE.asunto,
          activo: mirarActividad(datosE.activo),
          fCreacion: datosE.fechaCreacion,
          creadoPor: datosE.empleado.nombre + " " + datosE.empleado.apellidos
        };
        return newEmpresa;
      });
      setEstadoDinamico(todosDatosEmpresa);
      setEstadoEstatico(todosDatosEmpresa);
    }
  };

  const comprobarEmpleadoAdmin = (option) =>{
    if(localStorage.getItem("tipoUsuario") !== undefined && localStorage.getItem("tipoUsuario") !== "Administrador"){
      return(<td>
        <button type="button"
          title="Ver Información Del Empleado"
          onClick={verInfoChat}
          id={option.id}
          className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">
          Ver Info.
        </button>
      </td>)
    }else{
      return(
      <td>
        <button type="button" className="sinBorde" to="/modificarEmpleado" onClick={modificarCaso}>
          <img
            title="Modificar Empleado"
            className="imagenFotoGestionUsuarios"
            id={option.id}
            src={require("../../img/modify-foto.png")}
            alt="imagen Foto Modificar"
          />
        </button>
        <button type="button" className="sinBorde" onClick={borrarCaso}>
          <img
            title="Borrar Empleado"
            className="imagenFotoGestionUsuarios"
            id={option.id}
            src={require("../../img/delete-foto.png")}
            alt="imagen Foto Borrar"
          />
        </button>
        <button type="button"
          title="Ver Información Del Empleado"
          onClick={verInfoChat}
          id={option.id}
          className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">
          Ver Info.
        </button>
      </td>)
    }
  }

   //Función que guarda el ID del empleado a ver la información en localStorage y te lleva a la ruta para vel la información del empleado.
   const verInfoChat = (e) => {
    localStorage.setItem("idCaso", e.target.id);
    // PENDIENTE DE CREAR PÁGINA DE VER MENSAJES DEL CASO
    Navigate("/verMensajes");
  };

  const estaActivo = (activo) =>{
    if(activo === "Activo"){
      return(<td className="campoOpcional activo">{activo}</td>)
    }else{
      return(<td className="campoOpcional acabado">{activo}</td>)
    }
  }

  const modificarCaso = (e) =>{
    localStorage.setItem("idCaso", e.target.id);
    Navigate("/modificarCorreo");
  }

  //BorrarCaso
  const borrarCaso = async (e) => {
    SweetAlert.fire({
      title: "¿Estás seguro que quieres eliminar este caso?",
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
          let url = URL_API + "casos/";
          let peticion = await peticionDelete(`${url}${e.target.id}`, header);
          if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
            mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
          } else {
            console.log(peticion.data.message)
            if(peticion.data.message == "Error, no se puede borrar, el caso tiene mensajes."){
              mostrarAlertaErronea(peticion.data.message, "Error mensaje con errores.", "3000")
            }else{
              mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente.", "3000");
              Navigate("/chatAdmin");
              recoleccionDatos();
            }
          }
        } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
        }
      } else {
      }
    });
  };

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
        <tr className="EmpleadoTablaApartado" key={generarUUID()}>
            <td>{option.creadoPor}</td>
            <td>{option.asunto}</td>
            {estaActivo(option.activo)}
            <td>{option.fCreacion}</td>
            {comprobarEmpleadoAdmin(option)}
        </tr>                 
      ));
    }else{
      return(<tr><td colSpan={"5"}>No hay tiempos en este empleado.</td></tr>)
    }
  }

  return (
    <React.Fragment>
      <div className='TablaDatosUser'>
        <Table id='tablaAccionesEmpleados' striped>
                <thead>
                    <tr>
                        <th>Creado Por:</th>
                        <th>Asunto</th>
                        <th className='campoOpcional'>Estado</th>
                        <th className='campoOpcional'>Fecha Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
        <tbody>
        {renderData()}
        </tbody>
        </Table>
    </div>
        <div className='botonesPaginacion'>
          {Array.from({ length: totalPages }, (_, i) => (
              i === 0 || i === (totalPages-1) || i === (paginaSeleccionada-2) || i === (paginaSeleccionada-1) || i === (paginaSeleccionada)  ? 
              <button className='botonPaginacion' key={i} onClick={(e) => handleClick(i + 1,e)}>
                {i + 1}
              </button>
              :
              null
              
            ))}
        </div>
    </React.Fragment>
  );
}

export default PaginacionChatAdmin;
