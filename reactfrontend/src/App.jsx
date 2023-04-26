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
import ModificarCorreo from 'Biblioteca/PaginaAdmin/Chat/ModificarCorreo';
import CrearMensaje from 'Biblioteca/PaginaAdmin/Chat/Mensajes/CrearMensaje';
import ModificarMensaje from 'Biblioteca/PaginaAdmin/Chat/Mensajes/ModificarMensaje';
import VerMensajesEmpresaAdmin from 'Biblioteca/PaginaAdmin/Chat/Mensajes/VerMensajesEmpresaAdmin';
import VerMensajesEmpleado from 'Biblioteca/PaginaAdmin/Chat/Mensajes/VerMensajesEmpleado';
import VerTiemposEmpleado from 'Biblioteca/PaginaAdmin/Tiempos/VerTiemposEmpleado';
import Resumen from 'Biblioteca/PaginaCliente/Resumen/Resumen';
import VerJornada from 'Biblioteca/PaginaAdmin/EmpleadosConectados/VerJornada/VerJornada';

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
                  <Route exact path="/verResumenLaboral" element={<Resumen/>}/>

                {/*PARTE ADMINISTRADOR/EMPRESA. */}
                  {/*Empleados*/}
                  <Route exact path="/totalEmpleados" element={<Empleados/>} />
                  <Route exact path="/accionesEmpleados" element={<AccionesEmpleados/>} />
                  <Route exact path="/altaEmpleado" element={<AltaEmpleados/>} />
                  <Route exact path="/modificarEmpleado" element={<Modificar/>} />
                  <Route exact path="/pagInfoClienteSel" element={<PagInfoClienteSel/>} />

                  {/* Ver jornada del empleado */}
                  <Route exact path="/verJornadaEmpleado" element={<VerJornada/>} />

                  {/*Ver datos empresa y modificarlos*/}
                  <Route exact path="/datosEmpresa" element={<DatosEmpresa/>}/>
                  <Route exact path="/modificarDatosEmpresa" element={<ModificarDatosEmpresa/>}/>

                  {/*Ver tiempos de un empleado*/}
                  <Route exact path="/verTiemposEmpleado" element={<VerTiemposEmpleado/>}/>

                  {/*Chat / Correo*/}
                  <Route exact path="/chatAdmin" element={<ChatAdmin/>} />
                  <Route exact path="/crearCorreoAdmin" element={<CrearCorreoAdmin/>} />
                  <Route exact path="/verCorreoSeleccionadoAdmin" element={<InfoCorreoSeleccionadoAdmin/>}/>
                  <Route exact path="/modificarCorreo" element={<ModificarCorreo/>}/>
                  
                  {/* Mensajes */}
                  <Route exact path="/verMensajes" element={<VerMensajesEmpresaAdmin/>}/>
                  <Route exact path="/verMensajesEmpleado" element={<VerMensajesEmpleado/>}/>
                  <Route exact path="/crearMensaje" element={<CrearMensaje/>}/>
                  <Route exact path="/modificarMensaje" element={<ModificarMensaje/>}/>

                  {/*Turno / Horario*/}
                  <Route exact path="/cambiarTurno" element={<CambiarTurno/>} />
                  <Route exact path="/crearTurno" element={<CrearTurno/>} />
                  <Route exact path="/paginaPrincipalTurnos" element={<PaginaPrincipalTurnos/>} />
                  <Route exact path="/verTurno" element={<VerTurno/>} />
                  <Route exact path="/modificarTurno" element={<ModificarTurno/>} />
                  <Route exact path="/verTurnoCliente" element={<VerTurnoCliente/>} />

                  {/*Vacaciones / Bajas / Ausencias*/}
                  <Route exact path="/verAusencias" element={<VerAusenciasGenerales titulo="Ausencia" link="/modificarAusencia" linkActual="verAusencias"/>}/>
                  <Route exact path="/anyadirAusencia" element={<AnyadirAusenciaGeneral titulo="Ausencia"/>}/>
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
