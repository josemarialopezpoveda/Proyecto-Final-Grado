//Importamos todos los .js que necesitamos para esta práctica.
import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  checkDNI,
  formatDate,
  formatearFechaHora,
  validarNumSecSoc,
  peticionPost,
  mostrarAlertaCorrecta,
  mostrarAlertaErronea,
} from "../../../FuncionesAuxiliares/Funciones";
import { URL_API } from "../../../../services/http/const";
import { Link } from "react-router-dom";

function CrearFormularioAltaEmpleados() {
  //Variable para tener una referencia al input tipo password.
  const passwordInput = useRef(null);
  //Estado para contener el icono con el "ojo" para cambiarlo según le hagamos click.
  const [verContrasenya, setVerContraseña] = useState(faEyeSlash);
  //Creamos la variable para poder usar el navigate.
  const Navigate = useNavigate();
  const [comprobarCampo, setComprobarCampo] = useState(false);
  /**
   * Devuelve un test del pattern informando el texto es correcto o incorrecto en el caso de que el estado este a true.
   * @param {testPattern} testPattern Es un RegEx.
   * @returns
   */
  const validarCampos = (testPattern) => {
    if (comprobarCampo === true) {
      return testPattern;
    }
  };
  //Creación del estado que contiene los datos que recogerá el formulario.
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    dni: "",
    email: "",
    fnac: "",
    numSegSoc: "",
    telefono: "",
    fotografia: "",
    fechaAlta: "",
    tipoUsuario: "Trabajador",
    poblacion: "",
    direccion: "",
    provincia: "",
    pais: "",
    codPostal: "",
    contrasenya: "",
  });
  //Función que valida el formato de la foto si no es nula.
  const validarFoto = (testPattern) => {
    if (comprobarCampo === true && form.fotografia !== "" && form.fotografia !== null) {
      return testPattern;
    }
  };
  //Esta función crea un objeto con los datos del formulario validado y se lo mandamos a servidor y dependiendo de la respuesta informamos al usuario de que ha ido bien o mal.
  const TodoCorrecto = async () => {
    console.log("paso?")
    setComprobarCampo(true);
    let correcto =
      /^(?!\s*$).+/.test(form.nombre) &&
      /^(?!\s*$).+/.test(form.apellidos) &&
      checkDNI(form.dni) &&
      validarNumSecSoc(form.numSegSoc) &&
      /[a-zA-Z0-9]+@[A-za-z]+\.[A-za-z]{2,3}/.test(form.email) &&
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fnac)) &&
      /^\d{9}$/.test(form.telefono) &&
      //validarFoto(/.+\.(png|jpg|jpeg)$/.test(form.fotografia)) &&
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/.test(formatDate(form.fechaAlta)) &&
      /^(?!\s*$).+/.test(form.direccion) &&
      /^(?!\s*$).+/.test(form.poblacion) &&
      /^(?!\s*$).+/.test(form.provincia) &&
      /^(?!\s*$).+/.test(form.pais) &&
      /^\d{5}$/.test(form.codPostal) &&
      /^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.contrasenya);
    if (correcto) {
      var raw = {
        empresa_id: localStorage.getItem("id"),
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
        password_confirmation: form.contrasenya,
        numSegSoc: form.numSegSoc,
        //fotografia: form.fotografia,
        ultimaConexion: formatearFechaHora(),
        activo: true,
        fechaAlta: form.fechaAlta,
        fechaBaja: formatearFechaHora(),
        tipoEmpleado: form.tipoUsuario,
      };
      try {
        const header = {
          headers: {
            Accept: "application/json",
            Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
          },
        };
        let peticion = await peticionPost(URL_API + "empleados", raw, header);
        if (peticion.data.errores !== undefined && peticion.data.errores !== null) {
          mostrarAlertaErronea(peticion.data.message, peticion.data.errores, null);
        } else {
          mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
          Navigate("/accionesEmpleados");
        }
      } catch (error) {
        mostrarAlertaErronea(error.message, error.stack, null);
      }
    }else{
      mostrarAlertaErronea("Error campos incorrectos.", "Algunos de los campos rellenados no tienen un formato correcto o están vacios.", null);
    }
  };
  //Función que oculta y muestra el icono del "ojo" partiendo de la contraseña.
  const ocultar = () => {
    if (passwordInput.current.type === "password") {
      setVerContraseña(faEye);
      passwordInput.current.type = "text";
    } else if (passwordInput.current.type === "text") {
      setVerContraseña(faEyeSlash);
      passwordInput.current.type = "password";
    }
  };
  return (
    <React.Fragment>
      <Form id="anyadir">
        <fieldset className="fieldset bordeRedondo">
          <legend>Información Personal Empleado</legend>
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
                isValid={validarCampos( /[a-zA-Z0-9]+@[A-za-z]+\.[A-za-z]{2,3}/.test(form.email))}
                isInvalid={validarCampos(! /[a-zA-Z0-9]+@[A-za-z]+\.[A-za-z]{2,3}/.test(form.email))}
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
                isValid={validarFoto(validarCampos(/.+\.(png|jpg|jpeg)$/.test(form.fotografia)))}
                isInvalid={validarFoto(validarCampos(!/.+\.(png|jpg|jpeg)$/.test(form.fotografia)))}
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
                  onChange={(e) => setForm({ ...form, tipoUsuario: e.target.value.trim() })}>
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
          <div className="divContenedorCampo cajaPasswordLogin">
            <p>Contraseña</p>
            <Form.Group className="mb-3 width500">
              <Form.Control
                size="lg"
                type="password"
                ref={passwordInput}
                isValid={validarCampos(
                  /^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.contrasenya)
                )}
                isInvalid={validarCampos(
                  !/^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.contrasenya)
                )}
                onChange={(e) => setForm({ ...form, contrasenya: e.target.value.trim() })}
                defaultValue={form.contrasenya}
              />
              <FontAwesomeIcon className="btnOcultar4" icon={verContrasenya} onClick={ocultar} />
            </Form.Group>
          </div>
        </fieldset>
        {/*HACER VALIDACIÓN Y CONFIRMACIÓN AL USUARIO DE QUE LO QUIERE AÑADIR Y COMPROBAR QUE TODO ESTÉ CORRECTO */}
        <div className='contenedorBotonVolver contenedorBotonVolverAnyadirTipoAusencia disFlex500px'> 
          <Link to="/accionesEmpleados" className="anyadirUsuarioDatos">Volver</Link>        
          <button type="button" onClick={TodoCorrecto} className="anyadirUsuarioDatos">
            AÑADIR
          </button>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default CrearFormularioAltaEmpleados;
