import { cogerFecha, cogerHora, generarUUID, mostrarAlertaCorrecta, mostrarAlertaErronea, peticionDelete } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { URL_API } from 'services/http/const';
import SweetAlert from "sweetalert2";
import Table from 'react-bootstrap/Table';
import './Paginacion.css';
import { peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';

const PaginacionTipoAusencias = ({ data, perPage, setEstadoDinamico, setEstadoEstatico }) => {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();

    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1)

    //Función para recoger todos los empleados y los guarda en el estado.
    const recoleccionDatos = async () => {
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };
      let datosEmpresa = await peticionGetAuth(URL_API + "tipoAusencias", header);
      console.log(datosEmpresa)
      if (datosEmpresa.data !== 0) {
        var todosDatosEmpresa = datosEmpresa.data.map((datosE) => {
          var newEmpresa = {
            id: datosE.id,
            descripcion: datosE.descripcion,
            tipo: datosE.tipo
          };
          return newEmpresa;
        });
        setEstadoDinamico(todosDatosEmpresa);
        setEstadoEstatico(todosDatosEmpresa);
      }
    };

    const borrarTipoAusencia = (e) => {
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
            let url = URL_API + "tipoAusencias/";
            console.log(url + `${e.target.id}`)
            let peticion = await peticionDelete(`${url}${e.target.id}`, header);
            console.log(peticion)
            if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
              mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
            } else {
              mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
              Navigate("/verTipoAusencias");
              recoleccionDatos();
            }
          } catch (error) {
            mostrarAlertaErronea(error.message, error.stack, null);
          }
        } else {
        }
      });
    };
  
    const modificar = (e) => {
      localStorage.setItem("idTipoAusencia", e.target.id);
      Navigate("/modificarTipoAusencia");
    };

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
  }

  const renderData = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    if(data.length !== 0){
      return data.slice(start, end).map((option, index) => (     
          <tr key={generarUUID()}>
          <td>{option.descripcion}</td>
          <td className='campoOpcional'>{option.tipo}</td>
          <td>
            <button type="button" className="sinBorde" onClick={modificar}>
              <img
                id={option.id}
                title="Modificar Tipo de ausencia"
                className="imagenFotoGestionUsuarios"
                src={require("../../img/modify-foto.png")}
                alt="imagen Foto Modificar"
              />
            </button>
            <button id={option.id} type="button" className="sinBorde" onClick={borrarTipoAusencia}>
              <img
                id={option.id}
                title="Borrar el tipo de ausencia"
                className="imagenFotoGestionUsuarios"
                src={require("../../img/delete-foto.png")}
                alt="imagen Foto Borrar"
              />
            </button>
          </td>
        </tr>                
      ));
    }else{
      return(<tr><td colSpan={"3"}>No hay tipos de ausencias creados aun.</td></tr>)
    }
  }

  return (
    <React.Fragment>
      <div className='TablaDatosUser'>
        <Table striped>
            <thead>
                <tr>
                    <th>Descripción</th>
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

export default PaginacionTipoAusencias;
