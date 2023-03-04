//Importamos los estilos CSS del pie de página.
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";
import { mostrarAlertaCorrecta,
    mostrarAlertaErronea,
    peticionPost
} from "../../../FuncionesAuxiliares/Funciones";
import NavClienteLogin from "../Nav/NavClienteLogin";
import { URL_API } from "services/http/const";

function LoginCliente() {
  //Referencia para el input con el tipo password.
  const passwordInput = useRef(null);
  //Estado para almacenar el icono del ojo de la contraseña.
  const [verContrasenya, setVerContraseña] = useState(faEyeSlash);
  //Variable para el uso del useNavigate.
  const Navigate = useNavigate();
  //Estado para almacenar los datos del login.
  const [form,setForm] = useState({
    email:"",
    password:"",
  });
  //Función para ocultar o enseñar la contraseña modificando el icono del "ojo"
  const ocultar = ()=>{
    if(passwordInput.current.type==="password"){
      setVerContraseña(faEye);
      passwordInput.current.type="text";
    }else if(passwordInput.current.type==="text"){
      setVerContraseña(faEyeSlash);
      passwordInput.current.type="password";
    }
  }
  //Función que hace una petición post a la URL de la API pasándole el objeto recogido del formulario y a partir de ahí informo si ha habido un error o si funciona correctamente, guardo los datos de la sesión en localStorage y accede a nuestra web.
    const TodoCorrecto = async() => {
      var raw = {
          "email":form.email,
          "password": form.password,
      };
      try {
          let peticion = await peticionPost(URL_API+"loginEmpleado", raw);
          if(peticion.data.errores !== undefined && peticion.data.errores !== null){
              mostrarAlertaErronea(peticion.data.message, peticion.data.errores, "7000");
          }else{
              mostrarAlertaCorrecta(peticion.statusText, "Todo correcto y funcionando perfectamente", "3000");
              localStorage.setItem('token', peticion.data.token);
              localStorage.setItem('tipoToken', peticion.data.token_type);
              localStorage.setItem('id', peticion.data.empresa);
              Navigate("/misDatos");
          }
      } catch (error) {
          mostrarAlertaErronea(error.message, error.stack, null);
      }
        
    }

  //Devolvemos un div con varios p con el contenido props de la información de un por de página.
  return (
    <React.Fragment>
      <NavClienteLogin/>
      <div id="contenedorLogin">
        <img
          className="fotoFondoLogin"
          alt="foto de fondo del login"
          src={require("../../../../img/imagenFondoLogin.jpg")}
        />
        <div className="imagenDeFondoLogin">
          <div className="container" id="container">
            <div className="form-container sign-in-container">
              <Form >
                <h1 className="tituloLogin">Login Empleado</h1>
                <FormControl
                  className="input"
                  onChange={e=>setForm({...form,email:e.target.value.trim()})}
                  defaultValue={form.email}
                  type="email"
                  placeholder="Correo electrónico"/>
                <div className="cajaPasswordLogin">
                <FormControl
                  className="input"
                  ref={passwordInput}
                  defaultValue={form.password}
                  onChange={e=>setForm({...form,password:e.target.value.trim()})}
                  type="password"
                  placeholder="Contraseña"/>
                  <FontAwesomeIcon className="btnOcultar" icon={verContrasenya} onClick={ocultar}/>

                </div>
                <div className="ContenedorLoginBotones">
                  <button type='button' className="linkSignInLogin" id="signIn" onClick={TodoCorrecto}>Login</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default LoginCliente;
