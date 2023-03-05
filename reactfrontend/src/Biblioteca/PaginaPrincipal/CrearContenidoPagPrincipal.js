import React from 'react';
import { generarUUID } from '../FuncionesAuxiliares/Funciones';

function CrearContenidoPagPrincipal() {
    let arrayProductosTitulo2 = [
        {
            name: "Facilidad de uso para los empleados",
            imagen: "",
            descripcion: "Su equipo puede fichar en cualquier dispositivo con TimeMana. Los trabajadores de oficina pueden fichar desde su escritorio. Los trabajadores sin escritorio pueden iniciar sesión en el móvil. Y los supervisores pueden usar el golpe de grupo para todo el equipo a la vez. Tú eliges lo que funciona mejor para tu equipo."
        },
        {
            name: "Vea lo que está sucediendo al instante",
            imagen: "",
            descripcion: "Nunca más te preguntes quién se presentó a trabajar hoy. Verifique quién está adentro y vea quién está en el reloj en tiempo real. Y use la mensajería para comunicarse rápidamente con su equipo."
        },
        {
            name: "Facilidad de comunicación trabajador empresario",
            imagen: "",
            descripcion: "Disponemos de un sistema de comunicación de casos para comunicarse, e informarse el uno al otro de incidencias, vacaciones,bajas,ausencias..."
        }
    ]

  return (
    arrayProductosTitulo2.map((valor)=>{
        return(
        <li className="one_third" key={generarUUID()}>
            <article className='articulosPagWeb'><i className="fas fa-spray-can"></i>
                <h6 className="heading">{valor.name}</h6>
                <p>{valor.descripcion}</p>
            </article>
        </li>
        );
    })
  );
}

export default CrearContenidoPagPrincipal;
