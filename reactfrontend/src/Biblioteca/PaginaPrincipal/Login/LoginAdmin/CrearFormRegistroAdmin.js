//Importamos los estilos CSS del pie de página.
import React, {useContext} from 'react';
import './RegistrarseAdmin.css';
import Form from 'react-bootstrap/Form';
import FormControl from "react-bootstrap/FormControl";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate} from "react-router-dom";
import {peticionPost, mostrarAlertaErronea, mostrarAlertaCorrecta, formatearFecha, formatearFechaHora} from 'Biblioteca/FuncionesAuxiliares/Funciones';
import {isValidCif} from "nif-dni-nie-cif-validation";
import {Link} from 'react-router-dom';
import { contexto } from 'Biblioteca/Contextos/ContextoRegistroAdmin/ContextoRegistroAdmin';
import { URL_API } from "services/http/const";


function CrearFormRegistroAdmin() {
    //Variable para el uso del useNavigate.
    const Navigate = useNavigate();
    //Importamos el contexto.
    const contextoReg = useContext(contexto);

    //Función que valida todos los campos, posteriormente si es correcto lo almacena en un objeto (raw) y luego hace una petición y si es errónea aviso al usuario mostrando un error y si es correcta aviso diciendo que todo ha ido bien y lo muevo dentro de nuestra web.
    const TodoCorrecto = async() => {
        contextoReg.setComprobarCampo(true);
        let correcto = (
            isValidCif(contextoReg.form.cif) &&
            /^\d{9}$/.test(contextoReg.form.telefonoFijo) &&
            /^\d{9}$/.test(contextoReg.form.telefonoMovil) &&
            /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(contextoReg.form.email)&&
            contextoReg.validarContrasenyas("valido")&&

            /^(?!\s*$).+/.test(contextoReg.form.direccion) &&
            /^(?!\s*$).+/.test(contextoReg.form.poblacion) &&
            /^(?!\s*$).+/.test(contextoReg.form.provincia) &&
            /^(?!\s*$).+/.test(contextoReg.form.pais)&&
            /^(?!\s*$).+/.test(contextoReg.form.razonSocial) &&
            /^(?!\s*$).+/.test(contextoReg.form.nombreComercial)
        );

        if (correcto) {
            var raw = {
                "cif": contextoReg.form.cif,
                "razonSocial": contextoReg.form.razonSocial,
                "nombreComercial": contextoReg.form.nombreComercial,
                "direccion": contextoReg.form.direccion,
                "poblacion": contextoReg.form.poblacion,
                "provincia": contextoReg.form.provincia,
                "pais": contextoReg.form.pais,
                "telefonoFijo": contextoReg.form.telefonoFijo,
                "telefonoMovil": contextoReg.form.telefonoMovil,
                "email": contextoReg.form.email,
                "password": contextoReg.form.password,
                "password_confirmation": contextoReg.form.password,
                "logotipo": contextoReg.form.logotipo,
                "cPostal": contextoReg.form.codPostal,
                "ultimaConexion": formatearFechaHora(),
                "fechaAlta": formatearFecha(),
                "activo": true,
                "empleados": []
            };
            try {
                let peticion = await peticionPost(URL_API+"empresas", raw)
                if(peticion.data.errores !== undefined && peticion.data.errores !== null){
                    mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
                }else{
                    mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "5000");
                    localStorage.setItem('token', peticion.data.token);
                    localStorage.setItem('tipoToken', peticion.data.token_type);
                    localStorage.setItem('id', peticion.data.empresa);
                    Navigate("/accionesEmpleados")
                }
            } catch (error) {
                mostrarAlertaErronea(error.message, error.stack, null);
            }
        }else{
            mostrarAlertaErronea("Algo ha fallado...", "Algun campo está mal escrito.", "7000");
        }
    }


    //Devolvemos un div con varios p con el contenido props de la incontextoReg.formación de un por de página.
    return (
        <React.Fragment>
            <Form>
                <h1 className="tituloLogin">Registro</h1>
                <fieldset className='fieldset'>
                    <legend>Datos Entidad</legend>
                    <div className='divFlex'>
                        <Form.Group className="mb-3">
                            <FormControl
                                title="Razon social"
                                className='input inputReducido'
                                type="text"
                                placeholder='Razón Social'
                                onChange={e => contextoReg.setForm({...contextoReg.form, razonSocial: e.target.value.trim()})}
                                defaultValue={contextoReg.form.razonSocial}
                                isValid={contextoReg.validarCampos(/^(?!\s*$).+/.test(contextoReg.form.razonSocial))}
                                isInvalid={contextoReg.validarCampos(!/^(?!\s*$).+/.test(contextoReg.form.razonSocial))}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control title="Nombre Comercial" className='input' type="text"
                                            placeholder='Nombre Comercial'
                                            onChange={e => contextoReg.setForm({...contextoReg.form,nombreComercial: e.target.value.trim()})}
                                            defaultValue={contextoReg.form.nombreComercial}
                                            isValid={contextoReg.validarCampos(/^(?!\s*$).+/.test(contextoReg.form.nombreComercial))}
                                            isInvalid={contextoReg.validarCampos(!/^(?!\s*$).+/.test(contextoReg.form.nombreComercial))}
                            />
                        </Form.Group>
                    </div>
                    <div className='divFlex'>
                        <Form.Group className="mb-3">
                            <Form.Control title='CIF/NIF' className='input inputReducido' type="text"
                                            placeholder='CIF'
                                            isValid={contextoReg.validarCampos(isValidCif(contextoReg.form.cif))}
                                            isInvalid={contextoReg.validarCampos(!isValidCif(contextoReg.form.cif))}
                                            onChange={e => contextoReg.setForm({...contextoReg.form, cif: e.target.value.trim()})}
                                            defaultValue={contextoReg.form.cif}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control title='Teléfono Fijo' className='input inputReducido'
                                            type="tel" placeholder='Teléfono Fijo'
                                            onChange={e => contextoReg.setForm({
                                                ...contextoReg.form,
                                                telefonoFijo: e.target.value.trim()
                                            })}
                                            defaultValue={contextoReg.form.telefonoFijo}
                                            isValid={contextoReg.validarCampos(/^\d{9}$/.test(contextoReg.form.telefonoFijo))}
                                            isInvalid={contextoReg.validarCampos(!/^\d{9}$/.test(contextoReg.form.telefonoFijo))}
                            />
                        </Form.Group>
                    </div>
                    <Form.Group controlId="contextoReg.formFileLg" className="mb-3">
                        <Form.Label>Logotipo</Form.Label>
                        <Form.Control type="file"
                                        isValid={contextoReg.validarFoto(/.+\.(png|jpg|jpeg)$/.test(contextoReg.form.logotipo))}
                                        isInvalid={contextoReg.validarFoto(!/.+\.(png|jpg|jpeg)$/.test(contextoReg.form.logotipo))}
                                        onChange={e => contextoReg.setForm({...contextoReg.form,logotipo: e.target.value.trim()})}/>
                    </Form.Group>
                </fieldset>
                <fieldset className='fieldset'>
                    <legend>Localización</legend>
                    <div className='divFlex'>
                        <Form.Group className="mb-3">
                            <Form.Control title='Dirección' className='input inputReducido' type="text"
                                placeholder='Dirección'
                                isValid={contextoReg.validarCampos(/^(?!\s*$).+/.test(contextoReg.form.direccion))}
                                isInvalid={contextoReg.validarCampos(!/^(?!\s*$).+/.test(contextoReg.form.direccion))}
                                onChange={e => contextoReg.setForm({...contextoReg.form,direccion: e.target.value.trim()})}
                                defaultValue={contextoReg.form.direccion}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                title="Razon social"
                                className='input inputReducido'
                                type="text"
                                placeholder='Código Postal'
                                defaultValue={contextoReg.form.codPostal}
                                onChange={e=>contextoReg.setForm({...contextoReg.form,codPostal:e.target.value})}
                                isValid={contextoReg.validarCampos(/^\d{5}$/.test(contextoReg.form.codPostal))}
                                isInvalid={contextoReg.validarCampos(!/^\d{5}$/.test(contextoReg.form.codPostal))}
                            />
                        </Form.Group>
                    </div>
                    <div className='divFlex2'>
                        <Form.Group className="mb-3">
                            <Form.Control title='Población' className='input' type="text"
                                            placeholder='Población'
                                            onChange={e => contextoReg.setForm({
                                                ...contextoReg.form,
                                                poblacion: e.target.value.trim()
                                            })}
                                            defaultValue={contextoReg.form.poblacion}
                                            isValid={contextoReg.validarCampos(/^(?!\s*$).+/.test(contextoReg.form.poblacion))}
                                            isInvalid={contextoReg.validarCampos(!/^(?!\s*$).+/.test(contextoReg.form.poblacion))}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control title='Provincia' className='input inputReducido' type="text"
                                            placeholder='Provincia'
                                            onChange={e => contextoReg.setForm({
                                                ...contextoReg.form,
                                                provincia: e.target.value.trim()
                                            })}
                                            defaultValue={contextoReg.form.provincia}
                                            isValid={contextoReg.validarCampos(/^(?!\s*$).+/.test(contextoReg.form.provincia))}
                                            isInvalid={contextoReg.validarCampos(!/^(?!\s*$).+/.test(contextoReg.form.provincia))}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control title='País' className='input inputReducido' type="text"
                                            placeholder='País'
                                            onChange={e => contextoReg.setForm({
                                                ...contextoReg.form,
                                                pais: e.target.value.trim()
                                            })}
                                            defaultValue={contextoReg.form.pais}
                                            isValid={contextoReg.validarCampos(/^(?!\s*$).+/.test(contextoReg.form.pais))}
                                            isInvalid={contextoReg.validarCampos(!/^(?!\s*$).+/.test(contextoReg.form.pais))}/>
                        </Form.Group>
                    </div>
                </fieldset>
                <fieldset className='fieldset'>
                    <legend>Datos Accesibilidad</legend>
                    <Form.Group className="mb-3">
                        <Form.Control title='Teléfono Móvil' className='input' type="tel"
                                        placeholder='Teléfono Movil'
                                        onChange={e => contextoReg.setForm({
                                            ...contextoReg.form,
                                            telefonoMovil: e.target.value.trim()
                                        })}
                                        defaultValue={contextoReg.form.telefonoMovil}
                                        isValid={contextoReg.validarCampos(/^\d{9}$/.test(contextoReg.form.telefonoMovil))}
                                        isInvalid={contextoReg.validarCampos(!/^\d{9}$/.test(contextoReg.form.telefonoMovil))}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control title='Correo Electrónico' className='input' type="email"
                                        placeholder='Correo electrónico'
                                        onChange={e => contextoReg.setForm({...contextoReg.form, email: e.target.value.trim()})}
                                        defaultValue={contextoReg.form.email}
                                        isValid={contextoReg.validarCampos(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(contextoReg.form.email))}
                                        isInvalid={contextoReg.validarCampos(!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(contextoReg.form.email))}/>
                    </Form.Group>
                    <div className='divFlex divFlexquitar'>
                        <div className="cajaPasswordLogin">
                            <Form.Group className="mb-3">
                                <Form.Control title='Contraseña' placeholder='Contraseña'
                                                className='input' type="password"
                                                ref={contextoReg.passwordInput}
                                                isValid={contextoReg.validarContrasenyas("valido")}
                                                isInvalid={contextoReg.validarContrasenyas("invalido")}
                                                onChange={e => contextoReg.setContrasenya(e.target.value.trim())}
                                                defaultValue={contextoReg.contrasenya}/>
                                <FontAwesomeIcon className="btnOcultar3" icon={contextoReg.verContrasenya}
                                                    onClick={contextoReg.ocultar}/>
                            </Form.Group>
                        </div>
                        <div className="cajaPasswordLogin">
                            <Form.Group className="mb-3">
                                <Form.Control title='Confirmar contraseña'
                                                placeholder="Confirmar contraseña" className='input'
                                                type="password"
                                                ref={contextoReg.passwordInputConfirmar}
                                                isValid={contextoReg.validarContrasenyas("valido")}
                                                isInvalid={contextoReg.validarContrasenyas("invalido")}
                                                onChange={e => contextoReg.setContrasenyaConfirmada(e.target.value.trim())}
                                                defaultValue={contextoReg.contraseyaConfirmada}/>
                                <FontAwesomeIcon className="btnOcultar3" icon={contextoReg.verContrasenyaConfirmada}
                                                    onClick={contextoReg.ocultarConfirmar}/>
                            </Form.Group>
                        </div>
                    </div>
                </fieldset>
                <p className='botonCrearCuentaEmpresa'>
                    <button type='button' id="signIn" onClick={TodoCorrecto}
                            className='linkSignInLogin'>CREAR CUENTA
                    </button>
                    <Link id="signIn" className='linkSignInLogin' to="/loginAdmin">VOLVER</Link>
                </p>
            </Form>
        </React.Fragment>
    );
}

export default CrearFormRegistroAdmin;
