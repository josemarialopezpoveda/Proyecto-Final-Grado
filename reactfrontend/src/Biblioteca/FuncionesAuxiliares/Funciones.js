import axios from "axios";
import SweetAlert from "sweetalert2";
/**
 *
 * @returns Devuelve un uuid aleatorio que es muy dificil que se repita.
 */
export const generarUUID = () => {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  };

/**
 *
 * @param {*} dni Función para comprobar que el DNI es válido.
 * @returns
 */
export const checkDNI = (dni) => {
    // DNI debe tener 8 números y 1 letra
    if (!/^\d{8}[A-Za-z]$/.test(dni)) {
      return false;
    }

    // Cálculo de la letra del DNI
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const number = dni.substr(0, 8);
    const letter = dni.substr(8, 1).toUpperCase();
    const calculatedLetter = letters[number % 23];

    // Verificación de que la letra del DNI es correcta
    return calculatedLetter === letter;
  }

  /**
   *
   * @param {*} date Una fecha en formato yyyy-mm-dd lo pasa a dd/mm/yyyy.
   * @returns
   */
  export const formatDate = (date)=>{
    if(date !== "" && date !== undefined){
      let dateParts = date.split("-");
      return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    }
  }

  /**
   * 
   * @param {*} url La url a la que le vamos a hacer la petición.
   * @returns La respuesta de la petición. O un error.
   */
export const peticionGet = (url) =>{
    try {
      const response = axios.get(url);
      return response;
    } catch (error) {
      return error;
    }
}

/**
 * 
 * @param {*} url La url a la que le vamos a hacer la petición.
 * @param {*} header La cabecera con el token y el tipo de token.
 * @returns La respuesta de la petición. O un error.
 */
export const peticionGetAuth = (url, header) =>{
  try {
    const response = axios.get(url, header);
    return response;
  } catch (error) {
    return error;
  }
}
/**
 * 
 * @param {*} url La url a la que le vamos a hacer la petición.
 * @param {*} header La cabecera con el token y el tipo de token.
 * @returns La respuesta de la petición. O un error.
 */
export const peticionDelete = (url, header) =>{
  try {
    const response = axios.delete(url, header);
    return response;
  } catch (error) {
    return error;
  }
}
/**
 * 
 * @param {*} url La url a la que le vamos a hacer la petición.
 * @param {*} header La cabecera con el token y el tipo de token.
 * @returns La respuesta de la petición. O un error.
 */
export const peticionPost = async (url,objetoPost, header) =>{
  try {
    return axios.post(url,objetoPost, header);
  } catch (error) {
    return error;
  }
}
/**
 * 
 * @param {*} url La url a la que le vamos a hacer la petición.
 * @param {*} header La cabecera con el token y el tipo de token.
 * @returns La respuesta de la petición. O un error.
 */
export const peticionPut = async (url, objetoPost, header) =>{
  try {
    return await axios.put(url,objetoPost, header);
  } catch (error) {
    return error;
  }
}

/**
 * 
 * @param {*} num Un número.
 * @returns True o false dependiento si es un número válido.
 */
export const validarNumSecSoc = (num) =>{
  num = num.toString();
	if(/^\d{12}$/.test(num)){
  	 var first10 = num.substring(0, 10);
    var last2 = num.substring(10, 12);
    var mod = parseInt(first10) % 97;
    var resultado = mod === parseInt(last2);
    return (resultado);
  }else{
  return false;
  }
}

/**
 * 
 * @param {*} titulo Título del alert.
 * @param {*} texto El texto explicativo del alert.
 * @param {*} tiempoEspera El tiempo que tardará la alerta en desparecer.
 */
export const mostrarAlertaCorrecta = (titulo, texto, tiempoEspera) =>{
  SweetAlert.fire({
        title: titulo,
        text: texto,
        imageUrl: "https://static.vecteezy.com/system/resources/previews/006/900/704/original/green-tick-checkbox-illustration-isolated-on-white-background-free-vector.jpg",
        imageHeight: 150,
        imageWidth: 150,
        timer: tiempoEspera,
  })
};
/**
 * 
 * @param {*} titulo Título del alert.
 * @param {*} texto El texto explicativo del alert.
 * @param {*} tiempoEspera El tiempo que tardará la alerta en desparecer.
 */
export const mostrarAlertaErronea = (titulo, texto, tiempoEspera) =>{
  SweetAlert.fire({
        title: titulo,
        text: texto,
        imageUrl: "https://icones.pro/wp-content/uploads/2021/08/icone-x-avec-cercle-rouge.png",
        imageHeight: 150,
        imageWidth: 150,
        timer: tiempoEspera,
  })
};
/**
 * 
 * @returns El día y hora de hoy formateado para poder almacenarlo correctamente.
 */
export const formatearFechaHora = ()=>{
  var date = new Date();
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hours = ('0' + date.getHours()).slice(-2);
  var minutes = ('0' + date.getMinutes()).slice(-2);
  var seconds = ('0' + date.getSeconds()).slice(-2);
  return (year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds);
}
/**
 * 
 * @returns El día de hoy formateado para poder almacenarlo correctamente.
 */
export const formatearFecha = ()=>{
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return (year + '-' + month + '-' + day);
}
