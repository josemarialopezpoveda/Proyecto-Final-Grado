import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';

const PaginationEmpleados = ({ data, perPage, setEstadoDinamico, setEstadoEstatico }) => {
  const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)
  //Creamos la variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Función que guarda el ID del empleado a modificar en localStorage y te lleva a la ruta del formulario de modificar el empleado.
  const modificar = (e) => {
    localStorage.setItem("idEmpleado", e.target.id);
    Navigate("/modificarEmpleado");
  };
  //Función que guarda el ID del empleado a ver la información en localStorage y te lleva a la ruta para vel la información del empleado.
  const verInfo = (e) => {
    localStorage.setItem("idEmpleado", e.target.id);
    Navigate("/pagInfoClienteSel");
  };

  //Función para recoger todos los empleados y los guarda en el estado.
  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosEmpresa = await peticionGetAuth(URL_API + "empresa/" + localStorage.getItem("id"), header);
    console.log(datosEmpresa)
    if(datosEmpresa.data.empleados !== undefined){
      if (datosEmpresa.data.empleados.length !== 0) {
        var todosDatosEmpresa = datosEmpresa.data.empleados.map((datosE) => {
          var newEmpresa = {
            id: datosE.id,
            nombre: datosE.nombre,
            apellidos: datosE.apellidos,
            poblacion: datosE.poblacion,
            correo: datosE.email,
            telefono: datosE.telefono,
          };
          return newEmpresa;
        });
        setEstadoDinamico(todosDatosEmpresa);
        setEstadoEstatico(todosDatosEmpresa);
      }
    }
  };

  const seleccionarBotonArrancar = () =>{
    let botonesPaginacion = document.getElementsByClassName("botonPaginacion");
    botonesPaginacion[0].classList.add("botonSeleccionado")
  }

  useEffect(()=>{
    seleccionarBotonArrancar();
  },[])

  //Función que borra el empleado e informa si todo ha ido bien o ha ocurrido algún error inesperado.
  const borrarEmpleado = async (e) => {
    SweetAlert.fire({
      title: "¿Estás seguro que quieres eliminar este empleado?",
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
          let url = URL_API + "empleados/";
          let peticion = await peticionDelete(`${url}${e.target.id}`, header);
          if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
            mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
          } else {
            mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
            Navigate("/accionesEmpleados");
            recoleccionDatos();            
          }
        } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
        }
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / perPage);

  const handleClick = (page,e) => {
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
          <td>{option.nombre}</td>
          <td className="campoOpcional">{option.apellidos}</td>
          <td className="campoOpcional">{option.poblacion}</td>
          <td className="campoOpcional">{option.correo}</td>
          <td className="campoOpcional">{option.telefono}</td>
          <td>
            <button type="button" className="sinBorde" to="/modificarEmpleado" onClick={modificar}>
              <img
                title="Modificar Empleado"
                className="imagenFotoGestionUsuarios"
                id={option.id}
                src={require("../../img/modify-foto.png")}
                alt="imagen Foto Modificar"
              />
            </button>
            <button type="button" className="sinBorde" onClick={borrarEmpleado}>
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
              onClick={verInfo}
              id={option.id}
              className="botonPadPequeño botonInfoCliente anyadirTurnoBoton">
              Ver Info.
            </button>
          </td>
        </tr>
      ));
    }else{
      <tr>
        <td colSpan={"6"}>La empresa no dispone de empleados.</td>
      </tr>
    }
  }

  return (
    <React.Fragment>
      <Table id='tablaAccionesEmpleados' striped>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th className='campoOpcional'>Apellidos</th>
                    <th className='campoOpcional'>Población</th>
                    <th className='campoOpcional'>Correo</th>
                    <th className='campoOpcional'>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
        <tbody>
        {renderData()}
        </tbody>
        </Table>
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

export default PaginationEmpleados;
