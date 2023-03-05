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
import Fichar from 'Biblioteca/PaginaCliente/Fichar/Fichar';
import Empleados from 'Biblioteca/PaginaAdmin/EmpleadosConectados/Empleados';
import ChatCliente from 'Biblioteca/PaginaCliente/Chat/ChatCliente';
import CrearCorreoCliente from 'Biblioteca/PaginaCliente/Chat/CrearCorreoCliente';
import InfoCorreoSeleccionadoCliente from 'Biblioteca/PaginaCliente/Chat/InfoCorreo/InfoCorreoSeleccionadoCliente';
import ChatAdmin from 'Biblioteca/PaginaAdmin/Chat/ChatAdmin';
import CrearCorreoAdmin from 'Biblioteca/PaginaAdmin/Chat/CrearCorreo/CrearCorreoAdmin';
import InfoCorreoSeleccionadoAdmin from 'Biblioteca/PaginaAdmin/Chat/InfoCorreoSeleccionadoAdmin';
import CambiarTurno from 'Biblioteca/PaginaAdmin/AccionesEmpleados/Turno/CambiarTurno';
import CrearTurno from 'Biblioteca/PaginaAdmin/GestionTurnos/CrearTurno/CrearTurno';
import PaginaPrincipalTurnos from 'Biblioteca/PaginaAdmin/GestionTurnos/PaginaPrincipalTurnos/PaginaPrincipalTurnos';
import VerTurno from 'Biblioteca/PaginaAdmin/GestionTurnos/PaginaPrincipalTurnos/VerTurnos/VerTurno';
import ModificarTurno from 'Biblioteca/PaginaAdmin/GestionTurnos/PaginaPrincipalTurnos/ModificarTurno/ModificarTurno';
import VerTurnoCliente from 'Biblioteca/PaginaAdmin/AccionesEmpleados/AdministrarInfoClienteSel/InfoClienteSel/VerTurnoCliente';
import Calendar from 'Biblioteca/Calendar/Calendar';
import PagInfoClienteSel from 'Biblioteca/PaginaAdmin/AccionesEmpleados/AdministrarInfoClienteSel/PagInfoClienteSel';
import VerAusenciasGenerales from 'Biblioteca/PaginaAdmin/AccionesEmpleados/AdministrarInfoClienteSel/InfoClienteSel/VerAusenciasGenerales';
import AnyadirAusenciaGeneral from 'Biblioteca/PaginaAdmin/AccionesEmpleados/AdministrarInfoClienteSel/InfoClienteSel/AccionesInfoCliente/AnyadirAusenciaGeneral';
import ModificarAusenciaGeneral from 'Biblioteca/PaginaAdmin/AccionesEmpleados/AdministrarInfoClienteSel/InfoClienteSel/AccionesInfoCliente/ModificarAusenciaGeneral';
import VerTiposAusencias from 'Biblioteca/PaginaAdmin/TiposAusencias/VerTiposAusencias';
import AnyadirTipoAusencia from 'Biblioteca/PaginaAdmin/TiposAusencias/AccionesTiposAusencias/AnyadirTipoAusencia';
import ModificarTipoAusencia from 'Biblioteca/PaginaAdmin/TiposAusencias/AccionesTiposAusencias/ModificarTipoAusencia';

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
                  <Route exact path="/chatCliente" element={<ChatCliente/>}/>
                  <Route exact path="/crearCorreoCliente" element={<CrearCorreoCliente/>}/>
                  <Route exact path="/verCorreoSeleccionadoCliente" element={<InfoCorreoSeleccionadoCliente/>}/>
                  <Route exact path="/fichar" element={<Fichar/>}/>
                  <Route exact path="/verCalendario" element={<Calendar/>}/>

                {/*PARTE ADMINISTRADOR/EMPRESA. */}
                  {/*Empleados*/}
                  <Route exact path="/totalEmpleados" element={<Empleados/>} />
                  <Route exact path="/accionesEmpleados" element={<AccionesEmpleados/>} />
                  <Route exact path="/altaEmpleado" element={<AltaEmpleados/>} />
                  <Route exact path="/modificarEmpleado" element={<Modificar/>} />
                  <Route exact path="/pagInfoClienteSel" element={<PagInfoClienteSel/>} />

                  {/*Ver datos empresa y modificarlos*/}
                  <Route exact path="/datosEmpresa" element={<DatosEmpresa/>}/>
                  <Route exact path="/modificarDatosEmpresa" element={<ModificarDatosEmpresa/>}/>

                  {/*Chat / Correo*/}
                  <Route exact path="/chatAdmin" element={<ChatAdmin/>} />
                  <Route exact path="/crearCorreoAdmin" element={<CrearCorreoAdmin/>} />
                  <Route exact path="/verCorreoSeleccionadoAdmin" element={<InfoCorreoSeleccionadoAdmin/>}/>

                  {/*Turno / Horario*/}
                  <Route exact path="/cambiarTurno" element={<CambiarTurno/>} />
                  <Route exact path="/crearTurno" element={<CrearTurno/>} />
                  <Route exact path="/paginaPrincipalTurnos" element={<PaginaPrincipalTurnos/>} />
                  <Route exact path="/verTurno" element={<VerTurno/>} />
                  <Route exact path="/modificarTurno" element={<ModificarTurno/>} />
                  <Route exact path="/verTurnoCliente" element={<VerTurnoCliente/>} />

                  {/*Vacaciones / Bajas / Ausencias*/}
                  <Route exact path="/verBajas" element={<VerAusenciasGenerales titulo="Bajas" link="/modificarBaja"/>}/>
                  <Route exact path="/verVacaciones" element={<VerAusenciasGenerales titulo="Vacaciones" link="/modificarVacaciones"/>}/>
                  <Route exact path="/verAusencias" element={<VerAusenciasGenerales titulo="Ausencias" link="/modificarAusencia"/>}/>
                  <Route exact path="/anyadirAusencia" element={<AnyadirAusenciaGeneral titulo="Ausencia"/>}/>
                  <Route exact path="/anyadirVacaciones" element={<AnyadirAusenciaGeneral titulo="Vacaciones"/>}/>
                  <Route exact path="/anyadirBaja" element={<AnyadirAusenciaGeneral titulo="Baja"/>}/>
                  <Route exact path="/modificarBaja" element={<ModificarAusenciaGeneral titulo="Baja" link="/verBajas"/>}/>
                  <Route exact path="/modificarVacaciones" element={<ModificarAusenciaGeneral titulo="Vacaciones" link="/verVacaciones"/>}/>
                  <Route exact path="/modificarAusencia" element={<ModificarAusenciaGeneral titulo="Ausencia" link="/verAusencias"/>}/>

                  {/*Tipos de Ausencias */}
                  <Route exact path="/verTipoAusencias" element={<VerTiposAusencias/>}/>
                  <Route exact path="/anyadirTipoAusencia" element={<AnyadirTipoAusencia/>}/>
                  <Route exact path="/modificarTipoAusencia" element={<ModificarTipoAusencia/>}/>

                {/*Cualquier otra página*/}
                  <Route exact path="*" element={<ErrorNotFound/>}/>
                </Routes>
        </React.Fragment>
      </BrowserRouter>
    )
}

export default App;
