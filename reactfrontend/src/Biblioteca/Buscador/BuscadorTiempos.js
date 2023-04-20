import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Buscador.css"

function BuscadorTiempos(props) {
  const [busqueda, setBusqueda]= useState(""); // Texto a buscar

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=props.datosDinamicos.filter((elemento)=>{
    if(elemento.fechaFin.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) || 
    elemento.fechaInicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    elemento.horaFin.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
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
          placeholder="Búscador de empresas que trabajan con nosotros..."
          onChange={handleChange}
        />
      </div>

  );
}

export default BuscadorTiempos;
