import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ListarOpciones from "../../../FuncionesAuxiliares/ListarOpciones";

function NavAdminLogin() {
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
              <img className="logoEmpresa" src={require("../../../../img/logoClaro.png")} alt="Imagen logo claro" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
                <ListarOpciones listadoOpciones={opciones}/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default NavAdminLogin;
