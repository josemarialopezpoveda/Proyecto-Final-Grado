//Importamos todos los .js que necesitamos para esta práctica.
import React, { useContext } from "react";
import { generarUUID, peticionGetAuth, mostrarAlertaCorrecta, mostrarAlertaErronea } from "./Funciones";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../../services/http/const";
import './ListarOpciones.css'

const ListarOpciones = (props) => {
  //Variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Función que elimina los datos de la sesión.
  const cerrarSesion = async () => {
    try {
      const header = {
        headers: {
          Accept: "application/json",
          Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
        },
      };

      let peticion = undefined
      if(localStorage.getItem("tipoUsuario") === "Trabajador" || localStorage.getItem("tipoUsuario") === "Administrador"){
        peticion = await peticionGetAuth(URL_API + "logoutEmpleado", header);
      }else{
        peticion = await peticionGetAuth(URL_API + "logout", header);
      }
      console.log(peticion)
      if(peticion !== undefined){
        if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
          mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
        } else {
          mostrarAlertaCorrecta(peticion.data.message, "Tu sesión ha sido cerrada correctamente.", "3000");
          localStorage.clear();
          Navigate("/");
        }
      }
    } catch (error) {
      mostrarAlertaErronea(error.message, error.stack, null);
    }
  };

  return props.listadoOpciones.map((option) => {
    if (option.titulo === "Cerrar Sesión" && option.path === "/") {
      return (
        <Link key={generarUUID()} onClick={cerrarSesion} className="nav-link">
          {option.titulo} <span className="spanMod">|</span>
        </Link>
      );
    } 
    else {
      return (
        <Link key={generarUUID()} className="nav-link" to={option.path}>
          {option.titulo} <span className="spanMod">|</span>
        </Link>
      );
    }
  });
};

export default ListarOpciones;
