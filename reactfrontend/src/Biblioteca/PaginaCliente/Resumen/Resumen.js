//Importamos los estilos CSS del pie de página.
import React, {useRef, useState, useEffect} from 'react';
import NavCliente from '../Nav/NavCliente.js';
import { Link } from "react-router-dom";
import './Resumen.css';
import PiePagina from '../../PaginaPrincipal/Footer/PiePagina.js';
import { URL_API } from 'services/http/const.js';
import NavAdmin from 'Biblioteca/PaginaAdmin/Nav/NavAdmin.js';
import Form from 'react-bootstrap/Form';

function Resumen(){
    const canvasRef = useRef(null);

    const anyadirBarraNav = () =>{
        if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
            return(<NavAdmin/>)
        }else{
            return(<NavCliente/>)
        }
    }

    //Creamos un useEffect que nada más cargar recoge los datos de los empleados y los pinta.
    useEffect(() => {
        usoCanvas();
    }, []);

    const usoCanvas = () =>{
        const canvas = canvasRef.current;
        if(canvas !== null){
            const ctx = canvas.getContext('2d');
        const centro = canvas.width / 2;
            let num = +60;
            ctx.beginPath();
            ctx.moveTo(centro, 0);
            ctx.lineTo(centro, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.stroke();

            // Dibujar la línea verde o roja dependiendo del número
            ctx.beginPath();
            ctx.lineWidth = 150;
            ctx.strokeStyle = num > 0 ? 'green' : 'red';
            if(num < 0){
                ctx.moveTo(centro - 1, canvas.height/2);
            }else{
                ctx.moveTo(centro + 1, canvas.height/2);
            }
            ctx.lineTo(centro + num, canvas.height / 2);
            ctx.stroke();
        }
        
    }

    const TodoCorrecto = () =>{

    }

    return(
    <React.Fragment>
        {anyadirBarraNav()}
            <div className='contenedorSectionParaFichar'>
                <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar'>
                    <Form>
                        <div className="divContenedorCampo2">
                            <div className="divContenedorCampo3">
                                <p>Desde:</p>
                                <Form.Group className="mb-3">
                                        <Form.Control required size="lg" type="date"
                                        onInput={console.log("hola")}
                                        defaultValue={60}/>
                                </Form.Group>
                            </div>
                            <div className="divContenedorCampo3">
                                <p>Hacia:</p>
                                <Form.Group className="mb-3">
                                        <Form.Control required size="lg" type="date"
                                        onInput={console.log("hola2")}
                                        defaultValue={60}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div className='contenedorBuscarResumen'>
                            <button type='button' onClick={TodoCorrecto} className="anyadirUsuarioDatos">Buscar</button>
                        </div>
                        
                    </Form>
                </section>
                <section className='sectionPequenyo sectionParaFichar sectionFormMarginBottomFichar quitarEspacios'>
                    <h1 className='tituloResumen'>Saldo de horas</h1>
                    <canvas ref={canvasRef} id="canvas"></canvas>
                    <div className='flexDatosHorasResumen'>
                        <div>
                            <h1 className='tituloHoras'>Horas Planificadas</h1>
                            <div className='contenedorDatosHorasResumen'>
                                <p className='datosHorasResumen'>100 horas 30 min</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='tituloHoras'>Horas Trabajadas</h1>
                            <div className='contenedorDatosHorasResumen'>
                                <p className='datosHorasResumen'>98 horas 30 min</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='tituloHoras'>Balance</h1>
                            <div className='contenedorDatosHorasResumen'>
                                <p className='datosHorasResumen'>-2 horas 00 min</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        <PiePagina/>
    </React.Fragment>
    
    );
}

export default Resumen;
