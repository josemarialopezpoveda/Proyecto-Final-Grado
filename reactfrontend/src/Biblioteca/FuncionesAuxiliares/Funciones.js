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

//Función que depara el dia de la semana de una fecha.
export function separarFechaDiaSemana(fechaCompleta) {
  // Separar la fecha y la hora
  const partes = fechaCompleta.split(' ');
  const fecha = partes[0];
  
  // Crear la fecha y el día
  let diaSemana = new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long' });
  diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
  return [diaSemana];
}

//Función que a partir de una fecha la devuelve en formato 23 de Mayo del 2023.
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

//Función qwue devuelve la fecha de hoy en formato Domingo 7 de Mayo del 2023.
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

//Función que a partir del dia de la semana devuelve un número.
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

//Función que a partir de un número devuelve el dia de la semana.
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

//Función que quita los segundos de una hora.
export const quitarSegundos = (hora) =>{
  if(hora !== "" && hora !== undefined){ 
    const partes = hora.split(":");
    return partes[0] + ":" + partes[1];
  }else{
    return hora;
  }
}

//Función que a partir de la actividad devuelve un valor.
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

//Función para recoger el id de los trabajadores de localStorage.
export const recogerIdEmpleadoLogueado = () =>{
  if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
      return(`${localStorage.getItem("idEmpleadoAdmin")}`)
  }else{
      return(`${localStorage.getItem("id")}`)
  }
}

//Función que a partir de una fecha 2023/05/04 te da 04/05/2023.
export const formatoFechaDDMMYYYY = (dateStr) =>{
  var partes = dateStr.split('/');
  var dia = partes[0];
  var mes = partes[1]; // Restamos 1 al mes, ya que en JavaScript los meses van de 0 a 11.
  var anio = partes[2];

  return `${dia}/${mes}/${anio}`;
}

//Función que a partir de una fecha 2023-05-04 te da 04/05/2023.
export const formatoFechaDDMMYYYYGuiones = (dateStr) =>{
  var partes = dateStr.split('-');
  var dia = partes[0];
  var mes = partes[1] - 1; // Restamos 1 al mes, ya que en JavaScript los meses van de 0 a 11.
  var anio = partes[2];

  return `${dia}/${mes}/${anio}`;
}


//Función para restar dos horas en formato "HH:MM:SS" .
export const restarHoras = (fecha2, fecha1) => {
  // Convierte las cadenas de fecha en milisegundos
  let fecha1_ms = fechaEnMs(fecha1);
  let fecha2_ms = fechaEnMs(fecha2);

  // Resta las fechas y convierte el resultado en una cadena en formato "HH:mm:ss"
  let diff_ms = fecha2_ms - fecha1_ms;
  let signo = diff_ms < 0 ? "-" : "";
  diff_ms = Math.abs(diff_ms);
  let horas = Math.floor(diff_ms / 3600000);
  let rem = diff_ms % 3600000;
  let minutos = Math.floor(rem / 60000);
  rem %= 60000;
  let segundos = Math.floor(rem / 1000);
  let resultado = signo + horas.toString().padStart(2, "0") + ":" + minutos.toString().padStart(2, "0") + ":" + segundos.toString().padStart(2, "0");
  
  return resultado;
}

function fechaEnMs(fecha) {
  // Divide la cadena de fecha en horas, minutos y segundos
  let partes = fecha.split(":");
  let horas = parseInt(partes[0]);
  let minutos = parseInt(partes[1]);
  let segundos = parseInt(partes[2]);
  
  // Convierte cada componente en milisegundos y suma
  let ms = (((horas * 60) + minutos) * 60 + segundos) * 1000;
  
  return ms;
}

export const ponerNumeroBalanceFormatoCorrecto = (total) =>{
  const partes = total.split(':');
  const diasSeparados = parseInt(partes[0]);
  const horasSeparadas = parseInt(partes[1]);
  const minutosSeparados = parseInt(partes[2]);
  const segundosSeparados = parseInt(partes[3]);

  return `${diasSeparados} dias ${horasSeparadas} horas ${minutosSeparados} minutos ${segundosSeparados} segundos.`;
}

//Función para sumar dos horas en formato "HH:MM:SS" .
export const sumarHoras = (hora1, hora2) => {
  // Convertir las horas en segundos
  var arr1 = hora1.split(":");
  var arr2 = hora2.split(":");
  var segundos1 = (+arr1[0]) * 60 * 60 + (+arr1[1]) * 60 + (+arr1[2]);
  var segundos2 = (+arr2[0]) * 60 * 60 + (+arr2[1]) * 60 + (+arr2[2]);

  // Calcular la diferencia en segundos
  var diferenciaSegundos = segundos1 + segundos2;

  // Convertir la diferencia en formato "HH:MM:SS"
  var horas = Math.floor(diferenciaSegundos / 3600);
  diferenciaSegundos %= 3600;
  var minutos = Math.floor(diferenciaSegundos / 60);
  var segundos = diferenciaSegundos % 60;

  // Formatear el resultado
  var resultadoHoras = horas.toString();
  var resultadoMinutos = ("0" + minutos).slice(-2);
  var resultadoSegundos = ("0" + segundos).slice(-2);

  if (resultadoHoras.length < 2) {
    resultadoHoras = "0" + resultadoHoras;
  }else if(resultadoHoras.length < 3 && restarHoras.length > 2){
    resultadoHoras = "00" + resultadoHoras;
  }
  return resultadoHoras + ":" + resultadoMinutos + ":" + resultadoSegundos;
}


//Funcion que pasa de "HH:MM:SS" a  44 horas y 40 min por ejemplo.
export const convertirHorasFormatoExplicativo = (tiempo) =>{
  const [horas, minutos, segundos] = tiempo.split(':').map(Number);
  let signo = tiempo.charAt(0);

  if (signo === "-") {
    signo = "-"; // Agregar "-" al inicio
  } else {
    signo = "+"; // Agregar "+" al inicio
  }

  const horasAbs = Math.abs(horas);
  const minutosAbs = Math.floor((segundos / 60) + minutos + (horasAbs * 60));
  const horasResultado = Math.floor(minutosAbs / 60);
  const minutosResultado = minutosAbs % 60;
  return `${signo}${horasResultado} horas y ${minutosResultado} minutos y ${segundos} segundos`;
}

//Convierte una hora en un número.
export const convertirHoraANumero = (hora)=>{
  console.log(hora)
  const [horas, minutos, segundos] = hora.split(':').map(Number);
  const horaEnNumero = horas + minutos / 60 + segundos / 3600;
  return parseFloat(horaEnNumero.toFixed(2));
}

//Una funcion que reciba una fechainicio una fechaFin y una fecha y si dicha decha esta entre la de inicio y la de fin devuelva true.
export const fechaEntreRango = (fechaInicio, fechaFin, fechaComprobar) =>{
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);
  const comprobar = new Date(fechaComprobar);
  return comprobar >= inicio && comprobar <= fin;
}

//Función que a partir de 2023-12-30T23:00:00.000Z saque 2023-12-30.
export const formatoDateAFecha = (fechaAFormatear) =>{
  const fecha = new Date(fechaAFormatear);
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  return `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
}

//Función que a partir de 2023-12-30 saque 2023-12-30T23:00:00.000Z.
export const convertirFechaISO = (fecha) =>{
  if(fecha !== null && fecha !== undefined){
    const fechaISO = new Date(fecha + "T00:00:00.000Z").toISOString();
    return fechaISO;
  }else{
    return null;
  }
}

//Función en JavaScript que formatea una fecha en el formato "Domingo 7 de Mayo del 2023"
export const formatearFechaFormatoDiaDeMesDelAnyo =(fecha) =>{
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const partesFecha = fecha.split('-');
  const anio = parseInt(partesFecha[0]);
  const mes = parseInt(partesFecha[1]);
  const dia = parseInt(partesFecha[2]);

  const fechaFormateada = `${diasSemana[new Date(fecha).getDay()]} ${dia} de ${meses[mes - 1]} del ${anio}`;

  return fechaFormateada;
}

//Función en JavaScript que formatea una fecha en el formato "Domingo 7 de Mayo del 2023" y me devuelves el dia.
export const recogerDiaSemanaFecha =(fecha) =>{
  const partesFecha = fecha.split('-');
  const dia = parseInt(partesFecha[2]);
  return dia;
}

//Función que devuelve el dia de la semana de hoy.
export const obtenerDiaSemana =() =>{
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const fechaActual = new Date();
  const diaSemana = fechaActual.getDay();
  return diasSemana[diaSemana];
}

//Función que recoge los milisegundos de una hora.
export const obtenerMilisegundosDesdeHora = (hora) =>{
  const [horas, minutos] = hora.split(':');
  const milisegundos = (parseInt(horas) * 60 * 60 + parseInt(minutos) * 60) * 1000;
  return milisegundos;
}

//Función que a partir de "2023-05-08" y "19:02" las une con el formato "2023-05-07 09:34:37".
export const unirFechaYHora = (fechaStr, horaStr) =>{
  const fechaHora = new Date(`${fechaStr}T${horaStr}:00`);
  const fechaFormateada = fechaHora.toISOString().slice(0, 10);
  const horaFormateada = fechaHora.toTimeString().slice(0, 5);
  return `${fechaFormateada} ${horaFormateada}`;
}

//Una función que a partir de "2023-02-02 15:17:22" recoge la fecha y la devuelve en formato "yyyy-MM-dd".
export const recogerFechaAPartirFecha = (stringFecha) =>{
  const fecha = new Date(stringFecha);
  const anio = fecha.getFullYear().toString();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const dia = fecha.getDate().toString().padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

//Una función que a partir de "2023-02-02 15:17:22" recoge la hora.
export const recogerHoraAPartirFecha = (stringFecha) =>{
  const fecha = new Date(stringFecha);
  var horas = fecha.getHours();
  var minutos = fecha.getMinutes();
  if(horas < 10){
    horas = "0" + horas;
  }

  if(minutos < 10){
    minutos = "0" + minutos;
  }
  return `${horas}:${minutos}`;
}