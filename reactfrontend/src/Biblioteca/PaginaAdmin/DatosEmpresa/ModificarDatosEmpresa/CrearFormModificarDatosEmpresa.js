//Importamos todos los .js que necesitamos para esta práctica.
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from "react-bootstrap/FormControl";
import './CrearFormModificarDatosEmpresa.css';
import { useNavigate } from "react-router-dom";
import {peticionPut,mostrarAlertaCorrecta, mostrarAlertaErronea, formatearFecha, formatearFechaHora, peticionGetAuth } from 'Biblioteca/FuncionesAuxiliares/Funciones';
import { isValidCif } from "nif-dni-nie-cif-validation";
import {Link} from 'react-router-dom';
import { URL_API } from "services/http/const";

function CrearFormModificarDatosEmpresa() {
      //Variable para el uso del navigate.
      const Navigate = useNavigate();
      //Variable para comprobar todos los campos en cuanto le das al botón de modificar.
      const [comprobarCampo, setComprobarCampo] = useState(false);
      //Variable para almacenar los datos de la empresa.
      const [datos, setDatos] = useState({
            razonSocial: "",
            nombreComercial: "",
            cif:"",
            telFijo: "",
            telMovil: "",
            logotipo: "",
            direccion: "",
            poblacion: "",
            provincia: "",
            pais: "",
            email: ""
      });
      //Función que recoge los datos de la empresa y los almacena en el estado.
      const recoleccionDatos = async() =>{
            const header = {
                  headers: {
                      "Accept": "application/json",
                      "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                  }
              }
            let datosEmpresa = await peticionGetAuth(URL_API+"empresas", header);
            if(datosEmpresa.data !== undefined){
                  console.log(datosEmpresa.data)
                  datosEmpresa.data.map(datosE => {
                        if(datosE.id == localStorage.getItem('id')){
                              return (setDatos({
                                    id:datosE.id,
                                    razonSocial: datosE.razonSocial,
                                    nombreComercial: datosE.nombreComercial,
                                    cif: datosE.cif,
                                    telFijo: datosE.telefonoFijo,
                                    telMovil: datosE.telefonoMovil,
                                    logotipo: datosE.logotipo,
                                    direccion: datosE.direccion,
                                    poblacion: datosE.poblacion,
                                    provincia: datosE.provincia,
                                    codPostal: datosE.cPostal,
                                    pais: datosE.pais,
                                    email: datosE.email
                              }))
                        }
                  });
            }else{
                  mostrarAlertaErronea("Ruta de la petición incorrecta", "Error de red", null);
            }
      }
      //Creo un useEffect para nada más cargar la web, cargue los datos de la empresa.
      useEffect(() => {
            recoleccionDatos();
      }, []);
      //Función para validar todos los campos al darle al botón de modificar.
      const validarCampos = (testPattern) =>{
            if(comprobarCampo ===true){
            return testPattern;
            }
      }
      //Función que válida que si la foto esta vacía devuelve true, pero si contiene algo valide el pattern.
      const validarFoto = (testPattern) => {
            if (comprobarCampo === true && datos.logotipo !== "" && datos.logotipo !== null) {
                return testPattern;
            }else{
                  return true;
            }
      }
      //Válido que todo este correcto creo el objeto, lo mando con la petición put y luego según el resultado aviso al usuario diciéndole si ha ido bien o algo ha fallado.
      const TodoCorrecto = async() =>{
            setComprobarCampo(true);
            console.log(isValidCif(datos.cif))
            console.log(datos.cif)
            let correcto = (
                  /^\d{9}$/.test(datos.telMovil) &&
                  /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(datos.email)&&
                  isValidCif(datos.cif) &&
                  /^\d{9}$/.test(datos.telFijo) &&
                  /^(?!\s*$).+/.test(datos.direccion) &&
                  /^(?!\s*$).+/.test(datos.poblacion) &&
                  /^(?!\s*$).+/.test(datos.provincia) &&
                  /^(?!\s*$).+/.test(datos.pais) &&
                  /^(?!\s*$).+/.test(datos.razonSocial) &&
                  /^(?!\s*$).+/.test(datos.nombreComercial)
            );
            console.log(correcto)
            if(correcto){
                console.log(datos.poblacion);
                  const raw = {
                        "cif": datos.cif,
                        "razonSocial": datos.razonSocial,
                        "nombreComercial": datos.nombreComercial,
                        "direccion": datos.direccion,
                        "poblacion": datos.poblacion,
                        "provincia": datos.provincia,
                        "pais": datos.pais,
                        "telefonoFijo": datos.telFijo,
                        "telefonoMovil": datos.telMovil,
                        "email": datos.email,
                        "logotipo": datos.logotipo,
                        "cPostal": datos.codPostal,
                        "ultimaConexion": formatearFechaHora(),
                        "fechaAlta": formatearFecha(),
                        "activo": true
                  }
                  const header = {
                        headers: {
                        "Accept": "application/json",
                        "Authorization": `${localStorage.getItem('tipoToken')} ${localStorage.getItem('token')}`
                        }
                  }
                    try {
                        let url = URL_API + "empresa/";
                        let peticion = await peticionPut(`${url}`, raw, header);
                        console.log(peticion)
                        if(peticion.data !== undefined){
                              if(peticion.data.errores !== undefined && peticion.data.errores !== null){
                                    mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
                                }else{
                                    mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
                                    Navigate("/datosEmpresa")
                              }
                        }

                    } catch (error) {
                        console.log("ERROR");
                        console.log(error)
                        mostrarAlertaErronea()
                    }
            }else{
                  mostrarAlertaErronea("Algo ha fallado...", "Algun campo está mal escrito.", "7000");
            }
      }
  return (
    <React.Fragment>
      <Form id="anyadir">
            <fieldset className='bordeRedondo fieldset'>
                  <legend>Datos Entidad</legend>
                  <div className='divContenedorCampo'>
                        <p>Razón Social</p>
                        <Form.Group className="mb-3 width500">
                              <FormControl
                              title="Razon social"
                              className='inputReducido'
                              type="text"
                              onChange={e=>setDatos({...datos,razonS:e.target.value.trim()})}
                              defaultValue={datos.razonSocial}
                              isValid={validarCampos(/^(?!\s*$).+/.test(datos.razonSocial))}
                              isInvalid={validarCampos(!/^(?!\s*$).+/.test(datos.razonSocial))}
                              />
                        </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                        <p>Nombre Comercial</p>
                        <Form.Group className="mb-3 width500">
                            <Form.Control type="text"
                            onChange={e=>setDatos({...datos,nombreComercial:e.target.value.trim()})}
                            defaultValue={datos.nombreComercial}
                            isValid={validarCampos(/^(?!\s*$).+/.test(datos.nombreComercial))}
                            isInvalid={validarCampos(!/^(?!\s*$).+/.test(datos.nombreComercial))}
                            />
                        </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                        <p>CIF</p>
                        <Form.Group className="mb-3 width500">
                            <Form.Control className='inputReducido' type="text"
                            isValid={validarCampos(isValidCif(datos.cif))}
                            isInvalid={validarCampos(!isValidCif(datos.cif))}
                            onChange={e=>setDatos({...datos,cif:e.target.value.trim()})}
                            defaultValue={datos.cif}
                            />
                        </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                        <p>Teléfono fijo</p>
                        <Form.Group className="mb-3 width500">
                              <Form.Control title='Teléfono Fijo' className='inputReducido'  type="tel"
                              onChange={e=>setDatos({...datos,telFijo:e.target.value.trim()})}
                              defaultValue={datos.telFijo}
                              isValid={validarCampos(/^\d{9}$/.test(datos.telFijo))}
                              isInvalid={validarCampos(!/^\d{9}$/.test(datos.telFijo))}
                              />
                        </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                        <p>Logotipo</p>
                        <Form.Group controlId="formFileLg" className="mb-3 width500">
                              <Form.Control type="file"
                              isValid={validarFoto(/.+\.(png|jpg|jpeg)$/.test(datos.logotipo))}
                              isInvalid={validarFoto(!/.+\.(png|jpg|jpeg)$/.test(datos.logotipo))}
                              onChange={e=>setDatos({...datos,logotipo:e.target.value.trim()})}
                              defaultValue={datos.logotipo} />
                        </Form.Group>
                  </div>
            </fieldset>
            <fieldset className='bordeRedondo fieldset'>
                  <legend>Localización</legend>
                  <div className='divContenedorCampo'>
                        <p>Dirección</p>
                        <Form.Group className="mb-3 width500">
                              <Form.Control title='Dirección'  type="text"
                              isValid={validarCampos(/^(?!\s*$).+/.test(datos.direccion))}
                              isInvalid={validarCampos(!/^(?!\s*$).+/.test(datos.direccion))}
                              onChange={e=>setDatos({...datos,direccion:e.target.value.trim()})}
                              defaultValue={datos.direccion} />
                        </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                        <p>Población</p>
                        <Form.Group className="mb-3 width500">
                              <Form.Control title='Población'  type="text"
                              onChange={e=>setDatos({...datos,poblacion:e.target.value.trim()})}
                              defaultValue={datos.poblacion}
                              isValid={validarCampos(/^(?!\s*$).+/.test(datos.poblacion))}
                              isInvalid={validarCampos(!/^(?!\s*$).+/.test(datos.poblacion))}/>
                        </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                        <p>Provincia</p>
                        <Form.Group className="mb-3 width500">
                              <Form.Control title='Provincia' className='inputReducido'  type="text"
                              onChange={e=>setDatos({...datos,provincia:e.target.value.trim()})}
                              defaultValue={datos.provincia}
                              isValid={validarCampos(/^(?!\s*$).+/.test(datos.provincia))}
                              isInvalid={validarCampos(!/^(?!\s*$).+/.test(datos.provincia))}/>
                        </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                        <p>País</p>
                        <Form.Group className="mb-3 width500">
                              <Form.Control title='País' className='inputReducido'  type="text"
                              onChange={e=>setDatos({...datos,pais:e.target.value.trim()})}
                              defaultValue={datos.pais}
                              isValid={validarCampos(/^(?!\s*$).+/.test(datos.pais))}
                              isInvalid={validarCampos(!/^(?!\s*$).+/.test(datos.pais))}/>
                        </Form.Group>
                  </div>
            </fieldset>
            <fieldset className='bordeRedondo fieldset'>
                  <legend>Datos Accesibilidad</legend>
                  <div className='divContenedorCampo'>
                        <p>Teléfono móvil</p>
                        <Form.Group className="mb-3 width500">
                              <Form.Control title='Teléfono Móvil'  type="tel"
                              onChange={e=>setDatos({...datos,telMovil:e.target.value.trim()})}
                              defaultValue={datos.telMovil}
                              isValid={validarCampos(/^\d{9}$/.test(datos.telMovil))}
                              isInvalid={validarCampos(!/^\d{9}$/.test(datos.telMovil))}
                              />
                        </Form.Group>
                  </div>
                  <div className='divContenedorCampo'>
                        <p>Correo electrónico</p>
                        <Form.Group className="mb-3 width500">
                              <Form.Control title='Correo Electrónico' type="email"
                                        onChange={e => setDatos({...datos, email: e.target.value.trim()})}
                                        defaultValue={datos.email}
                                        isValid={validarCampos(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(datos.email))}
                                        isInvalid={validarCampos(!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(datos.email))}/>
                        </Form.Group>
                  </div>
            </fieldset>
          {/*HACER VALIDACIÓN Y CONFIRMACIÓN AL USUARIO DE QUE LO QUIERE AÑADIR Y COMPROBAR QUE TODO ESTÉ CORRECTO */}
            <button type='button' onClick={TodoCorrecto} className="marginBotonesModVolver anyadirUsuarioDatos">MODIFICAR</button>
           <Link to="/datosEmpresa" className="anyadirUsuarioDatos">VOLVER</Link>
        </Form>
    </React.Fragment>
  );
}

export default CrearFormModificarDatosEmpresa;
