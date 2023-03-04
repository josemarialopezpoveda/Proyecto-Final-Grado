//Importamos los estilos CSS del pie de página.
import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import PiePagina from "../../PaginaPrincipal/Footer/PiePagina";
import NavAdmin from "../Nav/NavAdmin";
import { Link } from "react-router-dom";
import {
  mostrarAlertaCorrecta,
  mostrarAlertaErronea,
  peticionDelete,
  peticionGetAuth,
} from "Biblioteca/FuncionesAuxiliares/Funciones";
import "./DatosEmpresa.css";
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
import { URL_API } from "services/http/const";

function DatosEmpresa() {
  //Variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Variable para el almacenamiento de los datos de la empresa.
  const [datos, setDatos] = useState({});
  //Función que recoge los datos de la empresa y los almacena y en caso de que algo no funcione correctamente se avisa al usuario.
  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let url = URL_API + "empresa";
    let datosEmpresa = await peticionGetAuth(`${url}`, header);
    if (datosEmpresa !== undefined && datosEmpresa.data.empresa !== undefined) {
      setDatos({
        razonSocial: datosEmpresa.data.empresa.razonSocial,
        nombreComercial: datosEmpresa.data.empresa.nombreComercial,
        CIF: datosEmpresa.data.empresa.cif,
        telFijo: datosEmpresa.data.empresa.telefonoFijo,
        telMovil: datosEmpresa.data.empresa.telefonoMovil,
        Logotipo: datosEmpresa.data.empresa.logotipo,
        Direccion: datosEmpresa.data.empresa.direccion,
        Poblacion: datosEmpresa.data.empresa.poblacion,
        Provincia: datosEmpresa.data.empresa.provincia,
        Pais: datosEmpresa.data.empresa.pais,
        email: datosEmpresa.data.empresa.email,
        cPostal: datosEmpresa.data.empresa.cPostal,
      });
    } else {
      mostrarAlertaErronea(
        "Error: algo raro ha pasado...",
        "Error inesperado algo no ha funcionado correctamente.",
        "7000"
      );
    }
  };

  //Función que manda una alerta avisando de que los datos de la empresa se borrarán y pidiendo una confirmación si la acepta hago una petición de tipo delete para borrar la empresa mandándole también un header con los datos de la sesión e informando de si ha ido correctamente o algo no ha salido como lo esperábamos.
  const borrarEmpresa = async () => {
    SweetAlert.fire({
      title: "¿Estás seguro que quieres eliminar tu empresa?",
      text: "Los datos se eliminarán definitivamente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (resultado) => {
      if (resultado.value) {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let url = URL_API + "empresa";
        try {
          let peticion = await peticionDelete(`${url}`, header);
          if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
            mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
          } else {
            mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
            Navigate("/");
          }
        } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
        }
      }
    });
  };
  //Un useEffect para nada más cargar la página muestre también los datos de la empresa.
  useEffect(() => {
    recoleccionDatos();
  }, []);

  return (
    <React.Fragment>
      <NavAdmin />
      <section>
        <div className="TablaDatosUser">
          <div className="fotoUsuarioLogueado">
            <h1>Foto {datos.nombreComercial}</h1>
            {/* <img className='fotoMisDatosUsuario' alt="logotipo"/> */}
          </div>
          <section className="sectionPequenyo sectionFormMarginBottom">
            <Table className="tablaAjustar" striped>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Razón social</td>
                  <td>{datos.razonSocial}</td>
                </tr>
                <tr>
                  <td>Nombre Comercial</td>
                  <td>{datos.nombreComercial}</td>
                </tr>
                <tr>
                  <td>CIF</td>
                  <td>{datos.CIF}</td>
                </tr>
                <tr>
                  <td>Teléfono Fijo</td>
                  <td>{datos.telFijo}</td>
                </tr>
                <tr>
                  <td>Teléfono Móvil</td>
                  <td>{datos.telMovil}</td>
                </tr>
                <tr>
                  <td>Direccion</td>
                  <td>{datos.Direccion}</td>
                </tr>
                <tr>
                  <td>Poblacion</td>
                  <td>{datos.Poblacion}</td>
                </tr>
                <tr>
                  <td>Código Postal</td>
                  <td>{datos.cPostal}</td>
                </tr>
                <tr>
                  <td>Provincia</td>
                  <td>{datos.Provincia}</td>
                </tr>
                <tr>
                  <td>Pais</td>
                  <td>{datos.Pais}</td>
                </tr>
                <tr>
                  <td>Correo Electrónico</td>
                  <td>{datos.email}</td>
                </tr>
              </tbody>
            </Table>
            <div className="text-center classFlexBotones">
              <Link className="linkSignInLogin" id="signIn" to="/modificarDatosEmpresa">
                Modificar
              </Link>
              <button type="button" onClick={borrarEmpresa} className="linkSignInLogin" id="signIn">
                Eliminar
              </button>
            </div>
          </section>
        </div>
      </section>
      <PiePagina />
    </React.Fragment>
  );
}

export default DatosEmpresa;
