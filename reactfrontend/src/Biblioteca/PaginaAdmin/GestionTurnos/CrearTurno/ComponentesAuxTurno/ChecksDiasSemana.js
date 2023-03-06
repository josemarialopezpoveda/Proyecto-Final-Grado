import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { contexto } from 'Biblioteca/Contextos/ContextoTurnos/ContextoTurnos.js';
import { convertirDiaSemanaNumero } from 'Biblioteca/FuncionesAuxiliares/Funciones';

function ChecksDiasSemana(props) {
  const contextoTurno = useContext(contexto);

  const seleccionarDia = () =>{
    let dia = convertirDiaSemanaNumero(props.diaSemana);
    contextoTurno.anyadirDia(dia);
  }

  return (
    <div>
          <Form.Check 
            type="switch"
            id="custom-switch"
            onChange={seleccionarDia}
          />
        <p className='tituloDiaSemana'>{props.diaSemana}</p>
      </div>
  );
}

export default ChecksDiasSemana;
