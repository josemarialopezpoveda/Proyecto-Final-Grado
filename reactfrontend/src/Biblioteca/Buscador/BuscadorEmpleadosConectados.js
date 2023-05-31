import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Buscador.css"

function BuscadorEmpleadosConectados(props) {
  const [busqueda, setBusqueda]= useState(""); // Texto a buscar

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=props.datosDinamicos.filter((elemento)=>{
    if(elemento.apellidos.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
      elemento.correo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      elemento.fechaInicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      elemento.horaInicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
      return elemento;
    }
  });
  props.datosEstaticos(resultadosBusqueda);
}

  return (
      <div className='contenedorBuscador'>
        <input
          className="form-control inputBuscar"
          id="Buscador"
          value={busqueda}
          placeholder="Búscador de empleados conectados..."
          onChange={handleChange}
        />
      </div>

  );
}

export default BuscadorEmpleadosConectados;
