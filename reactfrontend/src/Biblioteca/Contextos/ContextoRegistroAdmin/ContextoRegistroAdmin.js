import React, { useEffect,useState, createContext, useRef} from "react";
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
// Se crea el contexto general.
const contexto = createContext();

    const ContextoRegistroAdmin = (props) =>{
        const passwordInput = useRef(null);
        const passwordInputConfirmar = useRef(null);
        const [verContrasenya, setVerContraseña] = useState(faEyeSlash);
        const [verContrasenyaConfirmada, setVerContraseñaConfirmada] = useState(faEyeSlash);
        const [contrasenya, setContrasenya] = useState("");
        const [contraseyaConfirmada, setContrasenyaConfirmada] = useState(undefined);
        const [comprobarCampo, setComprobarCampo] = useState(false);

        const [form, setForm] = useState({
            nombreComercial: "",
            password: contraseyaConfirmada,
            cif: "",
            telefonoMovil: "",
            telefonoFijo: "",
            razonSocial: "",
            direccion: "",
            poblacion: "",
            provincia: "",
            password: "",
            email: "",
            pais: "",
            logotipo: "",
            codPostal: "",
        });

        const validarContrasenyas = (tipoValid) => {
            if (comprobarCampo == true && contraseyaConfirmada !== undefined) {
                if (tipoValid === "valido") {
                    return (/^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(contrasenya) &&
                        /^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(contraseyaConfirmada) &&
                        /^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.password));
                } else if (tipoValid === "invalido") {
                    return (!(/^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(contrasenya) &&
                        /^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(contraseyaConfirmada) &&
                        /^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.password)));
                }
            }
        }
    
        const ocultar = () => {
            if (passwordInput.current.type === "password") {
                setVerContraseña(faEye);
                passwordInput.current.type = "text";
            } else if (passwordInput.current.type === "text") {
                setVerContraseña(faEyeSlash);
                passwordInput.current.type = "password";
            }
        }
    
        const ocultarConfirmar = () => {
            if (passwordInputConfirmar.current.type === "password") {
                setVerContraseñaConfirmada(faEye);
                passwordInputConfirmar.current.type = "text";
            } else if (passwordInputConfirmar.current.type === "text") {
                setVerContraseñaConfirmada(faEyeSlash);
                passwordInputConfirmar.current.type = "password";
            }
        }
    
        useEffect(() => {
            if (contrasenya === contraseyaConfirmada) {
                setForm({...form, password: contrasenya})
            }
        }, [contrasenya])
    
        useEffect(() => {
            if (contrasenya === contraseyaConfirmada) {
                setForm({...form, password: contrasenya})
            }
        }, [contraseyaConfirmada])
    
        const validarCampos = (testPattern) => {
            if (comprobarCampo === true) {
                return testPattern;
            }
        }

        const validarFoto = (testPattern) => {
            if (comprobarCampo === true && form.logotipo !== "" && form.logotipo !== null) {
                return testPattern;
            }
        }

        const datos =  {
            contrasenya,contraseyaConfirmada,verContrasenya,verContrasenyaConfirmada,
            form,
            passwordInput,passwordInputConfirmar,comprobarCampo,

            validarCampos,validarFoto,
            ocultar,ocultarConfirmar,
            setComprobarCampo,
            setContrasenya,setContrasenyaConfirmada,setVerContraseñaConfirmada,setVerContraseña,validarContrasenyas,
            setForm
        };


        return (
            // Se crea el proveedor del contexto a través del children.
            <contexto.Provider value={datos}>
            {props.children}
            </contexto.Provider>
        );
    }

export default ContextoRegistroAdmin;

export { contexto };