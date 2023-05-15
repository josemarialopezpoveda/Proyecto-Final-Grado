import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import ListarOpciones from "../../FuncionesAuxiliares/ListarOpciones";


function NavAdmin() {
  var opciones = [{}];
  //Dependiendo de si eres empresa o empleado Administrados pintamos una barra o otra.
  if(localStorage.getItem('tipoUsuario') === "Administrador" ){
    opciones = [
      {
          titulo:"Fichar",
          path:"/fichar"
      },
      {
        titulo: "Gestion Empleados",
        path: "/accionesEmpleados",
      },
      // {
      //   titulo: "Alta Empleados",
      //   path: "/altaEmpleado",
      // },
      {
        titulo: "Chat",
        path: "/chatAdmin",
      },
      {
        titulo: "Tipos de Ausencias",
        path: "/verTipoAusencias",
      },
      {
        titulo: "Turnos",
        path: "/paginaPrincipalTurnos",
      },
      {
        titulo: "Mis Datos",
        path: "/misDatos",
      },
      {
        titulo: "Cerrar Sesión",
        path: "/",
      },
    ];
  }else if(localStorage.getItem('tipoUsuario') === null){
    opciones = [
      {
        titulo: "Gestion Empleados",
        path: "/accionesEmpleados",
      },
      // {
      //   titulo: "Alta Empleados",
      //   path: "/altaEmpleado",
      // },
      {
        titulo: "Chat",
        path: "/chatAdmin",
      },
      {
        titulo: "Tipos de Ausencias",
        path: "/verTipoAusencias",
      },
      {
        titulo: "Turnos",
        path: "/paginaPrincipalTurnos",
      },
      {
        titulo: "Mis Datos",
        path: "/datosEmpresa",
      },
      {
        titulo: "Cerrar Sesión",
        path: "/",
      },
    ];
  }

  return (
    <React.Fragment>
      <Navbar id="barraNavegacion" collapseOnSelect expand="md" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <Link>
              <img className="logoEmpresa" src={require("../../../img/logoClaro.png")} alt="Logo empresa claro" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav><ListarOpciones listadoOpciones={opciones}/></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default NavAdmin;
