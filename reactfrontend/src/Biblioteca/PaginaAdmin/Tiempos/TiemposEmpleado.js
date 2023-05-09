//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from 'react';
import { cogerFecha, generarUUID, peticionGetAuth,cogerHora, peticionDelete, mostrarAlertaErronea, mostrarAlertaCorrecta } from '../../FuncionesAuxiliares/Funciones';
import { URL_API } from 'services/http/const';
import Table from 'react-bootstrap/Table';
import BuscadorTiempos from 'Biblioteca/Buscador/BuscadorTiempos';
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
import PaginacionTiempos from 'Biblioteca/Paginacion/PaginacionTiempos';

function TiemposEmpleado() {
    //Creamos la variable para el uso del useNavigate.
    const Navigate = useNavigate();
    //Creamos la variable para el contenido de los empleados estaticos.
    const [tiemposDinamicos, setTiemposDinamicos] = useState([{}]);

    //Creamos la variable para el contenido de los empleados dinamicos.
    const [tiemposEstaticos, setTiemposEstaticos] = useState([{}]);

    //Función para recoger todos los empleados y los guarda en el estado.
    const recoleccionDatos = async () => {
        const header = {
        headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
        };
        let datosEmpresa = await peticionGetAuth(URL_API + "tiempos/" + `${localStorage.getItem("idEmpleado")}`, header);
        console.log(datosEmpresa)
        if (datosEmpresa.data.length !== 0) {
        var tiemposEmpleado = datosEmpresa.data.tiempos.map((datosE) => {
            var newTiempo = {
                id: datosE.id,
                fechaInicio: cogerFecha(datosE.inicio),
                fechaFin: cogerFecha(datosE.fin),
                horaInicio: cogerHora(datosE.inicio),
                horaFin: cogerHora(datosE.fin)
            };
            return newTiempo;
        });
        setTiemposEstaticos(tiemposEmpleado);
        setTiemposDinamicos(tiemposEmpleado);
        }
    };

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        recoleccionDatos();
    }, []);

    // const borrarTiempo = (e) =>{
    //     SweetAlert.fire({
    //         title: "¿Estás seguro que quieres eliminar este empleado?",
    //         text: "Los datos se eliminarán definitivamente",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Sí, eliminar",
    //         cancelButtonText: "Cancelar",
    //       }).then(async (resultado) => {
    //         if (resultado.value) {
    //             try {
    //                 const header = {
    //                   headers: {
    //                     Accept: "application/json",
    //                     Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
    //                   },
    //                 };
    //                 let url = URL_API + "tiempos/";
    //                 let peticion = await peticionDelete(`${url}${e.target.id}`, header);
    //                 if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
    //                   mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
    //                 } else {
    //                   mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
    //                   Navigate("/verTiemposEmpleado");
    //                   recoleccionDatos();
    //                 }
    //             } catch (error) {
    //             mostrarAlertaErronea(error.message, error.stack, null);
    //             }
                
    //         }
    //       })
    // }

    // const modificar = (e) =>{
    //     localStorage.setItem("idTiempoSeleccionado", e.target.id);
    //     Navigate("/modificarTiempo");
    // }

    if(tiemposEstaticos !== undefined){
        return(
            <PaginacionTiempos data={tiemposEstaticos} perPage={7} 
            setEstadoEstatico={setTiemposEstaticos} setEstadoDinamico={setTiemposDinamicos}/>)
        // <div>
        //     <BuscadorTiempos datosEstaticos={setTiemposEstaticos} datosDinamicos={tiemposDinamicos}/>
        //     <div className='TablaDatosUser'>
        //         <Table striped>
        //             <thead>
        //                 <tr>
        //                     <th>Fecha</th>
        //                     <th>Hora Inicio</th>
        //                     <th>Fecha</th>
        //                     <th>Hora Fin</th>
        //                     <th>Acciones</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //             {tiemposEstaticos.map((option)=> {
        //                 if(option.apellidos !== ""){
        //                     return(<tr key={generarUUID()}>
        //                         <td>{option.fechaInicio}</td>
        //                         <td>{option.horaInicio}</td>
        //                         <td>{option.fechaFin}</td>
        //                         <td>{option.horaFin}</td>
        //                         <td>
        //                             <button type="button" className="sinBorde" to="/modificarEmpleado" onClick={modificar}>
        //                                 <img
        //                                 title="Modificar Tiempo"
        //                                 className="imagenFotoGestionUsuarios"
        //                                 id={option.id}
        //                                 src={require("../../../img/modify-foto.png")}
        //                                 alt="imagen Foto Modificar"
        //                                 />
        //                             </button>
        //                             <button type="button" className="sinBorde" onClick={borrarTiempo}>
        //                                 <img
        //                                 title="Borrar Tiempo"
        //                                 className="imagenFotoGestionUsuarios"
        //                                 id={option.id}
        //                                 src={require("../../../img/delete-foto.png")}
        //                                 alt="imagen Foto Borrar"
        //                                 />
        //                             </button>
        //                         </td>
        //                     </tr>)
        //                 }
        //             })}
        //             </tbody>
        //         </Table>
        //     </div>
        // </div>
        //)
    // }else{
    //     return(
    //     <div className='TablaDatosUser'>
    //         <Table striped>
    //             <thead>
    //                 <tr>
    //                     <th>Fecha</th>
    //                     <th>Hora Inicio</th>
    //                     <th>Fecha</th>
    //                     <th>Hora Fin</th>
    //                     <th>Acciones</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr><td colSpan={"5"}>No hay tiempos en este empleado.</td></tr>
    //             </tbody>
    //         </Table>
    //     </div>
    //     )
    }
}

export default TiemposEmpleado;
