//Importamos los estilos CSS del pie de página.
import React, {useRef} from 'react';
import NavCliente from '../Nav/NavCliente.js';
import { Link } from "react-router-dom";
import './Fichar.css';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina.js';


function Fichar(){
    const estadoEmpleado = useRef(null);

    const fichar = (e) =>{
        if(estadoEmpleado !== null && estadoEmpleado !== undefined){
            if(estadoEmpleado.current.innerHTML === "ONLINE"){
                estadoEmpleado.current.innerHTML = "OFFLINE";
                estadoEmpleado.current.classList.remove("online");
                estadoEmpleado.current.classList.add("offline");
            }else if(estadoEmpleado.current.innerHTML === "OFFLINE"){
                estadoEmpleado.current.innerHTML = "ONLINE";
                estadoEmpleado.current.classList.remove("offline");
                estadoEmpleado.current.classList.add("online");
            }
        }
    }

    return(
    <React.Fragment>
        <NavCliente/>
        <div className='contenedorSectionParaFichar'>
            <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar'>
                <div>
                    <article className='Fecha'>
                        <p>Dia 5 de Febrero del 2023</p>
                    </article>
                    <article className='horas'>
                        <p>Las horas que se deben realizar hoy son de <span>12 horas</span></p>
                        <p>Estado Actual: <span ref={estadoEmpleado} className="online">ONLINE</span></p>
                        <div>
                            <h1>Horario (Mañana)</h1>
                            <p>08:30 - 14:00</p>
                            <p>15:00 - 18:00</p>
                        </div>
                        </article>
                    <article className='botonParaFichar'>
                        <Link onClick={fichar} className='anyadirTurnoBoton'>FICHAR</Link>
                    </article>
                </div>
            </section>
        </div>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default Fichar;
