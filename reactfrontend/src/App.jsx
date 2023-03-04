import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PagPrincipal from 'Biblioteca/PaginaPrincipal/PagPrincipal.js';
import MisDatos from 'Biblioteca/PaginaCliente/MisDatos/MisDatos.js';
import LoginAdmin from 'Biblioteca/PaginaPrincipal/Login/LoginAdmin/LoginAdmin.js';
import LoginCliente from 'Biblioteca/PaginaPrincipal/Login/LoginCliente/LoginCliente.js';
import RegistrarseAdmin from 'Biblioteca/PaginaPrincipal/Login/LoginAdmin/RegistrarseAdmin.js';
import AccionesEmpleados from 'Biblioteca/PaginaAdmin/AccionesEmpleados/AccionesEmpleados.js';
import Modificar from 'Biblioteca/PaginaAdmin/AccionesEmpleados/Modificar/Modificar.js';
import AltaEmpleados from 'Biblioteca/PaginaAdmin/AccionesEmpleados/AltaEmpleados/AltaEmpleados.js';
import DatosEmpresa from 'Biblioteca/PaginaAdmin/DatosEmpresa/DatosEmpresa';
import ModificarDatosEmpresa from 'Biblioteca/PaginaAdmin/DatosEmpresa/ModificarDatosEmpresa/ModificarDatosEmpresa.js';
import VerEmpresas from 'Biblioteca/PaginaPrincipal/VerEmpresas/VerEmpresas';
import ErrorNotFound from 'Biblioteca/ErrorNotFound/ErrorNotFound';

function App() {
  return(
    <BrowserRouter>
        <React.Fragment>
              <Routes>
                {/*PARTE SIN CREAR USUARIO */}
                  <Route exact path="/" element={<PagPrincipal/>} />
                  <Route exact path="/loginAdmin" element={<LoginAdmin/>} />
                  <Route exact path="/loginCliente" element={<LoginCliente/>} />
                  <Route exact path="/registrarseAdmin" element={<RegistrarseAdmin/>} />
                  <Route exact path="/verEmpresas" element={<VerEmpresas/>} />

                {/*PARTE CLIENTE. */}
                  <Route exact path="/misDatos" element={<MisDatos/>}/>

                {/*PARTE ADMINISTRADOR/EMPRESA. */}
                  {/*Empleados*/}
                  <Route exact path="/accionesEmpleados" element={<AccionesEmpleados/>} />
                  <Route exact path="/altaEmpleado" element={<AltaEmpleados/>} />
                  <Route exact path="/modificarEmpleado" element={<Modificar/>} />

                  {/*Ver datos empresa y modificarlos*/}
                  <Route exact path="/datosEmpresa" element={<DatosEmpresa/>}/>
                  <Route exact path="/modificarDatosEmpresa" element={<ModificarDatosEmpresa/>}/>

                {/*Cualquier otra página*/}
                  <Route exact path="*" element={<ErrorNotFound/>}/>
                </Routes>
        </React.Fragment>
      </BrowserRouter>
    )
}

export default App;
