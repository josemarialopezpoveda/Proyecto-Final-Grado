//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import {
  checkDNI,
  formatDate,
  validarNumSecSoc,
  peticionGetAuth,
  peticionPut,
  mostrarAlertaErronea,
  mostrarAlertaCorrecta,
  formatearFechaHora,
  valorCheck,
} from "Biblioteca/FuncionesAuxiliares/Funciones";
import { URL_API } from "../../../../services/http/const";
import { Link } from "react-router-dom";

function CrearFormModificar() {
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    email: "",
    fnac: "",
    numSegSoc: "",
    telefono: "",
    fotografia: "Foto base",
    fechaAlta: "",
    tipoUsuario: "",
    poblacion: "",
    direccion: "",
    localidad: "",
    provincia: "",
    pais: "",
    codPostal: "",
    tipoEmpleado: "Trabajador",
    activo: 1,
  });

  //Recoger los datos para el formulario.
  useEffect(() => {
    recoleccionDatos();
  }, []);
  //Función que recoge los datos del empleado y los guarda en la variable y si no funciona mostramos al usuario un error.
  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let url = URL_API + "empleado/" + localStorage.getItem("idEmpleado");
    let datosEmpleado = await peticionGetAuth(`${url}`, header);
    console.log(datosEmpleado)
          setForm({
            id: datosEmpleado.data.id,
            nombre: datosEmpleado.data.nombre,
            apellidos: datosEmpleado.data.apellidos,
            dni: datosEmpleado.data.nif,
            email: datosEmpleado.data.email,
            fnac: datosEmpleado.data.fechaNacimiento,
            numSegSoc: datosEmpleado.data.numSegSoc,
            telefono: datosEmpleado.data.telefono,
            //fotografia: datosEmpleado.data.fotografia,
            fechaAlta: datosEmpleado.data.fechaAlta,
            tipoEmpleado: datosEmpleado.data.tipoEmpleado,
            poblacion: datosEmpleado.data.poblacion,
            direccion: datosEmpleado.data.direccion,
            provincia: datosEmpleado.data.provincia,
            pais: datosEmpleado.data.pais,
            codPostal: datosEmpleado.data.cPostal,
            activo: valorCheck(datosEmpleado.data.activo),
      });
  };

  const [comprobarCampo, setComprobarCampo] = useState(false);
  /**
   * Devuelve un test del pattern informando el texto es correcto o incorrecto en el caso de que el estado este a true.
   * @param {testPattern}
   * testPattern es un RegEx.
   * @returns
   */
  const validarCampos = (testPattern) => {
    if (comprobarCampo === true) {
      return testPattern;
    }
  };
  const Navigate = useNavigate();

  //Función que valida el formato de la foto si no es nula.
  const validarFoto = (testPattern) => {
    if (comprobarCampo === true && form.fotografia !== "" && form.fotografia !== null) {
      return testPattern;
    }
  };

  //Función que valida los datos del formulario, los recoge y almacena en un objeto y hace la petición put y dependiendo del resultado informa al usuario.
  const TodoCorrecto = async () => {
    setComprobarCampo(true);
    let correcto =
      /^(?!\s*$).+/.test(form.nombre) &&
      /^(?!\s*$).+/.test(form.apellidos) &&
      checkDNI(form.dni) &&
      validarNumSecSoc(form.numSegSoc) &&
      /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email) &&
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fnac)) &&
      /^\d{9}$/.test(form.telefono) &&
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fechaAlta)) &&
      /^(?!\s*$).+/.test(form.direccion) &&
      /^(?!\s*$).+/.test(form.poblacion) &&
      /^(?!\s*$).+/.test(form.provincia) &&
      /^(?!\s*$).+/.test(form.pais) &&
      /^\d{5}$/.test(form.codPostal);
    if (correcto) {
      try {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        var raw = {
          empresa_id: 1,
          nif: form.dni,
          nombre: form.nombre,
          apellidos: form.apellidos,
          direccion: form.direccion,
          cPostal: form.codPostal,
          poblacion: form.poblacion,
          provincia: form.provincia,
          pais: form.pais,
          telefono: form.telefono,
          fechaNacimiento: form.fnac,
          email: form.email,
          password: form.contrasenya,
          numSegSoc: form.numSegSoc,
          fotografia: form.fotografia,
          ultimaConexion: formatearFechaHora(),
          activo: form.activo,
          fechaAlta: form.fechaAlta,
          fechaBaja: formatearFechaHora(),
          tipoEmpleado: form.tipoEmpleado,
        };
        console.log(raw)
        let url = URL_API + "empleados/";
        let peticion = await peticionPut(`${url}${localStorage.getItem("idEmpleado")}`, raw, header);
        if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
          mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
        } else {
          mostrarAlertaCorrecta(peticion.data.message, "Todo correcto y funcionando perfectamente", "3000");
          Navigate("/accionesEmpleados");
        }
      } catch (error) {
        mostrarAlertaErronea(error.message, error.stack, null);
      }
    }
  };

  return (
    <React.Fragment>
      <Form id="anyadir">
        <fieldset className="fieldset bordeRedondo">
          <legend>Información Personal Empelado</legend>
          <div className="divContenedorCampo">
            <p>Nombre</p>
            <Form.Group className="mb-3 width500">
              <Form.Control
                size="lg"
                type="text"
                defaultValue={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value.trim() })}
                isValid={validarCampos(/^(?!\s*$).+/.test(form.nombre))}
                isInvalid={validarCampos(!/^(?!\s*$).+/.test(form.nombre))}
              />
            </Form.Group>
          </div>
          <div className="divContenedorCampo">
            <p>Apellidos</p>
            <Form.Group className="mb-3 width500">
              <Form.Control
                size="lg"
                type="text"
                defaultValue={form.apellidos}
                onChange={(e) => setForm({ ...form, apellidos: e.target.value.trim() })}
                isValid={validarCampos(/^(?!\s*$).+/.test(form.apellidos))}
                isInvalid={validarCampos(!/^(?!\s*$).+/.test(form.apellidos))}
              />
            </Form.Group>
          </div>
          <div className="divContenedorCampo">
            <p>DNI/NIF</p>
            <Form.Group className="mb-3 width500">
              <Form.Control
                size="lg"
                type="text"
                defaultValue={form.dni}
                onChange={(e) => setForm({ ...form, dni: e.target.value.trim() })}
                isValid={validarCampos(checkDNI(form.dni))}
                isInvalid={validarCampos(!checkDNI(form.dni))}
              />
            </Form.Group>
          </div>
          <div className="divContenedorCampo2">
            <div className="divContenedorCampo">
              <p className="letrapequenya">Fecha de nacimiento</p>
              <Form.Group className="grupoInputPequenyo">
                <Form.Control
                  size="lg"
                  type="date"
                  onChange={(e) => setForm({ ...form, fnac: e.target.value.trim() })}
                  defaultValue={form.fnac}
                  isValid={validarCampos(
                    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fnac))
                  )}
                  isInvalid={validarCampos(
                    !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fnac))
                  )}
                />
              </Form.Group>
            </div>
            <div className="divContenedorCampo">
              <p className="letrapequenya">Fecha de alta</p>
              <Form.Group className="grupoInputPequenyo">
                <Form.Control
                  size="lg"
                  type="date"
                  onChange={(e) => setForm({ ...form, fechaAlta: e.target.value.trim() })}
                  defaultValue={form.fechaAlta}
                  isValid={validarCampos(
                    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fechaAlta))
                  )}
                  isInvalid={validarCampos(
                    !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fechaAlta))
                  )}
                />
              </Form.Group>
            </div>
          </div>
          <div className="divContenedorCampo">
            <p>Correo Electrónico</p>
            <Form.Group className="mb-3 width500">
              <Form.Control
                size="lg"
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value.trim() })}
                defaultValue={form.email}
                isValid={validarCampos(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email))}
                isInvalid={validarCampos(!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email))}
              />
            </Form.Group>
          </div>
          <div className="divContenedorCampo">
            <p>Número Seguridad Social</p>
            <Form.Group className="mb-3 width500">
              <Form.Control
                size="lg"
                type="text"
                onChange={(e) => setForm({ ...form, numSegSoc: e.target.value.trim() })}
                defaultValue={form.numSegSoc}
                isValid={validarCampos(validarNumSecSoc(form.numSegSoc))}
                isInvalid={validarCampos(!validarNumSecSoc(form.numSegSoc))}
              />
            </Form.Group>
          </div>
          <div className="divContenedorCampo">
            <p>Fotografía</p>
            <Form.Group controlId="formFileLg" className="mb-3 width500">
              <Form.Control
                size="lg"
                type="file"
                onChange={(e) => setForm({ ...form, fotografia: e.target.value.trim() })}
              />
            </Form.Group>
          </div>
          <div className="divContenedorCampo2">
            <div className="divContenedorCampo">
              <p className="m-0">Teléfono</p>
              <Form.Group className="grupoInputPequenyo mb-3">
                <Form.Control
                  size="lg"
                  type="tel"
                  onChange={(e) => setForm({ ...form, telefono: e.target.value.trim() })}
                  defaultValue={form.telefono}
                  isValid={validarCampos(/^\d{9}$/.test(form.telefono))}
                  isInvalid={validarCampos(!/^\d{9}$/.test(form.telefono))}
                />
              </Form.Group>
            </div>
            <div className="divContenedorCampo">
              <p>Tipo Usuario</p>
              <Form.Group className="grupoInputPequenyo mb-3">
                <Form.Select
                  className="selectCrearCorreoAdmin"
                  aria-label="Default select example"
                  onChange={(e) => setForm({ ...form, tipoEmpleado: e.target.value.trim() })}>
                  <option value="Trabajador">Trabajador</option>
                  <option value="Administrador">Administrador</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </fieldset>
        <fieldset className="fieldset bordeRedondo">
          <legend>Localización</legend>
          <div className="divContenedorCampo">
            <p>Dirección</p>
            <Form.Group className="mb-3 width500">
              <Form.Control
                size="lg"
                type="text"
                isValid={validarCampos(/^(?!\s*$).+/.test(form.direccion))}
                isInvalid={validarCampos(!/^(?!\s*$).+/.test(form.direccion))}
                onChange={(e) => setForm({ ...form, direccion: e.target.value.trim() })}
                defaultValue={form.direccion}
              />
            </Form.Group>
          </div>
          <div className="divContenedorCampo2">
            <div className="divContenedorCampo">
              <p>Código Postal</p>
              <Form.Group className="grupoInputPequenyo mb-3">
                <Form.Control
                  size="lg"
                  type="text"
                  defaultValue={form.codPostal}
                  onChange={(e) => setForm({ ...form, codPostal: e.target.value })}
                  isValid={validarCampos(/^\d{5}$/.test(form.codPostal))}
                  isInvalid={validarCampos(!/^\d{5}$/.test(form.codPostal))}
                />
              </Form.Group>
            </div>
            <div className="divContenedorCampo">
              <p>Población</p>
              <Form.Group className="grupoInputPequenyo mb-3">
                <Form.Control
                  size="lg"
                  type="text"
                  onChange={(e) => setForm({ ...form, poblacion: e.target.value.trim() })}
                  defaultValue={form.poblacion}
                  isValid={validarCampos(/^(?!\s*$).+/.test(form.poblacion))}
                  isInvalid={validarCampos(!/^(?!\s*$).+/.test(form.poblacion))}
                />
              </Form.Group>
            </div>
          </div>
          <div className="divContenedorCampo2">
            <div className="divContenedorCampo">
              <p>Provincia</p>
              <Form.Group className="grupoInputPequenyo mb-3">
                <Form.Control
                  size="lg"
                  type="text"
                  onChange={(e) => setForm({ ...form, provincia: e.target.value.trim() })}
                  defaultValue={form.provincia}
                  isValid={validarCampos(/^(?!\s*$).+/.test(form.provincia))}
                  isInvalid={validarCampos(!/^(?!\s*$).+/.test(form.provincia))}
                />
              </Form.Group>
            </div>
            <div className="divContenedorCampo">
              <p>País</p>
              <Form.Group className="grupoInputPequenyo mb-3">
                <Form.Control
                  size="lg"
                  type="text"
                  onChange={(e) => setForm({ ...form, pais: e.target.value.trim() })}
                  defaultValue={form.pais}
                  isValid={validarCampos(/^(?!\s*$).+/.test(form.pais))}
                  isInvalid={validarCampos(!/^(?!\s*$).+/.test(form.pais))}
                />
              </Form.Group>
            </div>
          </div>
          <div className="divContenedorCampo">
            <p>Activo</p>
            <Form.Check
              type="switch"
              placeholder="Activo"
              onChange={(e) => setForm({ ...form, activo: e.target.checked })}
              checked={form.activo}
            />
          </div>
        </fieldset>
        <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'>
          <Link to="/accionesEmpleados" className="anyadirUsuarioDatos">Volver</Link>
          <button type="button" onClick={TodoCorrecto} className="anyadirUsuarioDatos">MODIFICAR</button>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default CrearFormModificar;
