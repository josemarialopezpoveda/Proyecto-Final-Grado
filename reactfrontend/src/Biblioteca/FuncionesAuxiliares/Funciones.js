import axios from "axios";
import { URL_API } from "services/http/const";
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

export function separarFechaDiaSemana(fechaCompleta) {
  // Separar la fecha y la hora
  const partes = fechaCompleta.split(' ');
  const fecha = partes[0];
  
  // Crear la fecha y el día
  let diaSemana = new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long' });
  diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
  return [diaSemana];
}

export const separarFecha =(fechaCompleta) =>{
  // Separar la fecha y la hora
  const partes = fechaCompleta.split(' ');
  const fecha = partes[0];
  
  // Separar el año, mes y día
  const [anio, mes, dia] = fecha.split('-');
  
  // Crear la fecha y el día
  const fechaFormateada = new Date(fecha);

  const fechaFinal = `${fechaFormateada.getDate()} de ${fechaFormateada.toLocaleDateString('es-ES', { month: 'long' })} del ${fechaFormateada.getFullYear()}`;

  return [fechaFinal];
}

export const calculoFechaHoy = () =>{
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const hoy = new Date();
  const diaSemana = diasSemana[hoy.getDay()];
  const dia = hoy.getDate();
  const mes = meses[hoy.getMonth()];
  const anio = hoy.getFullYear();
  const fecha = `${diaSemana} ${dia} de ${mes} del ${anio}`;
  return fecha;
}

//Cálculo del numero segun el dia de hoy.
export const diaSemana = () =>{
  const hoy = new Date();
  const dia = hoy.getDay();
  return dia === 0 ? 7 : dia; // Convertir el domingo (0) a 7
}

export const convertirDiaSemanaNumero = (diaSemana) =>{
  switch (diaSemana.toLowerCase()) {
    case "lunes":
      return 1;
    case "martes":
      return 2;
    case "miércoles":
      return 3;
    case "jueves":
      return 4;
    case "viernes":
      return 5;
    case "sábado":
      return 6;
    case "domingo":
      return 7;
    default:
      throw new Error("El valor de día de semana debe ser un día válido en español.");
  }
}

export const convertirNumeroDiaSemana = (diaSemanaNumero)=> {
  switch (diaSemanaNumero) {
    case 1:
      return "Lunes";
    case 2:
      return "Martes";
    case 3:
      return "Miércoles";
    case 4:
      return "Jueves";
    case 5:
      return "Viernes";
    case 6:
      return "Sábado";
    case 7:
      return "Domingo";
    default:
      throw new Error("El valor de día de semana debe ser un número entre 1 y 7.");
  }
}

export const quitarSegundos = (hora) =>{
  if(hora !== "" && hora !== undefined){ 
    const partes = hora.split(":");
    return partes[0] + ":" + partes[1];
  }else{
    return hora;
  }
}

export const mirarActividad =(valor)=>{
  if (valor === 1) {
    return "Activo";
  } else if (valor === 0) {
    return "Acabado";
  }
}

//Función que según el parámetro de la actividad del empleado devuelve un booleano.
export const valorCheck = (actividad) => {
  if (actividad == 1) {
    return true;
  } else {
    return false;
  }
};

//Función que según el parámetro de la actividad del empleado devuelve un booleano.
export const booleanoANumber = (actividad) => {
  if (actividad == true) {
    return 1;
  } else {
    return 0;
  }
};

//funcion en javascript que a partir de esto 2023-04-19 06:55:51 me de 2023-04-19
export const cogerFecha = (fecha) =>{
  fecha = new Date(fecha);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const fechaFormateada = fecha.toLocaleDateString('es-ES', options);
  return fechaFormateada;
}

//funcion en javascript que a partir de esto 2023-04-19 06:55:51 me de 06:55:51
export const cogerHora = (hora) =>{
  hora = new Date(hora);
  const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const horaFormateada = hora.toLocaleTimeString('es-ES', opciones);
  return horaFormateada;
}

