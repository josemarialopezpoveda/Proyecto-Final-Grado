//Importamos los estilos CSS del pie de página.
import "./header.css";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { generarUUID } from "../../FuncionesAuxiliares/Funciones";
import ListarOpciones from "Biblioteca/FuncionesAuxiliares/ListarOpciones";

function Header() {
  const opciones = [
    {
        titulo:"Nuestros Clientes",
        path:"/verEmpresas"
    },
    {
      titulo: "Login Empresa",
      path: "/loginAdmin",
    },
    {
      titulo: "Login Empleado",
      path: "/loginCliente",
    },
  ];

  return (
    <React.Fragment>
      <Navbar id="barraNavegacion" collapseOnSelect expand="md" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img className="logoEmpresa" src={require("../../../img/logoClaro.png")} alt="Imagen logo claro" />
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

export default Header;
