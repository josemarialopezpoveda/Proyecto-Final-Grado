import { cogerFecha, cogerHora, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

const PaginacionTiempos = ({ data, perPage, setEstadoDinamico, setEstadoEstatico }) => {
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
        let datosEmpresa = await peticionGetAuth(URL_API + "tiempos/" + `${localStorage.getItem("idEmpleado")}`, header);
        if (datosEmpresa.data.length !== 0) {
        var tiemposEmpleado = datosEmpresa.data.tiempos.map((datosE) => {
            if(datosE.fin !== null){
                var newTiempo = {
                    id: datosE.id,
                    fechaInicio: cogerFecha(datosE.inicio),
                    fechaFin: cogerFecha(datosE.fin),
                    horaInicio: cogerHora(datosE.inicio),
                    horaFin: cogerHora(datosE.fin)
                };
            }else{
                var newTiempo = {
                    id: datosE.id,
                    fechaInicio: cogerFecha(datosE.inicio),
                    fechaFin: cogerFecha(datosE.inicio),
                    horaInicio: cogerHora(datosE.inicio),
                    horaFin: "--:--:--"
                };
            }
            return newTiempo;
        });
        setEstadoEstatico(tiemposEmpleado);
        setEstadoDinamico(tiemposEmpleado);
        }
    };

  const borrarTiempo = (e) =>{
    SweetAlert.fire({
        title: "¿Estás seguro que quieres eliminar este tiempo?",
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
                let url = URL_API + "tiempos/";
                let peticion = await peticionDelete(`${url}${e.target.id}`, header);
                if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
                  mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
                } else {
                  mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
                  recoleccionDatos();
                  Navigate("/verTiemposEmpleado");
                }
            } catch (error) {
            mostrarAlertaErronea(error.message, error.stack, null);
            }
            
        }
      })
}

  const seleccionarBotonArrancar = () =>{
    let botonesPaginacion = document.getElementsByClassName("botonPaginacion");
    botonesPaginacion[0].classList.add("botonSeleccionado")
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
    botonesSeleccionados = document.getElementsByClassName("botonSeleccionado");
  }

  const renderData = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    if(data.length !== 0){
      return data.slice(start, end).map((option, index) => (     
          <tr key={generarUUID()}>
              <td>{option.fechaInicio}</td>
              <td>{option.horaInicio}</td>
              <td>{option.fechaFin}</td>
              <td>{option.horaFin}</td>
              <td>
                  <button type="button" className="sinBorde" to="/modificarEmpleado" onClick={modificar}>
                      <img
                      title="Modificar Tiempo"
                      className="imagenFotoGestionUsuarios"
                      id={option.id}
                      src={require("../../img/modify-foto.png")}
                      alt="imagen Foto Modificar"
                      />
                  </button>
                  <button type="button" className="sinBorde" onClick={borrarTiempo}>
                      <img
                      title="Borrar Tiempo"
                      className="imagenFotoGestionUsuarios"
                      id={option.id}
                      src={require("../../img/delete-foto.png")}
                      alt="imagen Foto Borrar"
                      />
                  </button>
              </td>
          </tr>                     
      ));
    }else{
      return(<tr><td colSpan={"5"}>No hay tiempos en este empleado.</td></tr>)
    }
  }

  return (
    <React.Fragment>
      <div className='TablaDatosUser'>
        <Table striped>
            <thead>
              <tr>
                  <th>Fecha</th>
                  <th>Hora Inicio</th>
                  <th>Fecha</th>
                  <th>Hora Fin</th>
                  <th>Acciones</th>
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

export default PaginacionTiempos;
