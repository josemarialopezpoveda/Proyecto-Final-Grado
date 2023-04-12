import {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Buscador.css"

function BuscadorAusencia(props) {
  const [busqueda, setBusqueda]= useState(""); // Texto a buscar

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);
}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=props.datosDinamicos.filter((elemento)=>{
    if(elemento !== undefined){   
        console.log(elemento)
        if(elemento.fFin === null){
            if(elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.fInicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.justificada.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.tipoAusencia.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
                return elemento;
            }
        }else{
            if(elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.fFin.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.fInicio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.justificada.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                elemento.tipoAusencia.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
                return elemento;
            }
        }
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

export default BuscadorAusencia;
