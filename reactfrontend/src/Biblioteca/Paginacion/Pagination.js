import { generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';

const PaginationItem = ({ data, perPage }) => {
  console.log(data)
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
          }
        } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
        }
      } else {
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / perPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  }

  const renderData = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return data.slice(start, end).map((option, index) => (
      <tr className="EmpleadoTablaApartado" key={generarUUID()}>
        <td>{option.nombre}</td>
        <td className="campoOpcional">{option.apellidos}</td>
        <td className="campoOpcional">{option.dni}</td>
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
  }

  return (
    <React.Fragment>
      <Table id='tablaAccionesEmpleados' striped>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th className='campoOpcional'>Apellidos</th>
                    <th className='campoOpcional'>DNI</th>
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
          {Array.from({ length: totalPages }, (_, i) => (
              <button className='botonPaginacion' key={i} onClick={() => handleClick(i + 1)}>
                {i + 1}
              </button>
            ))}
        </div>
    </React.Fragment>
  );
}

export default PaginationItem;
