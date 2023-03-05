import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { contexto } from 'Biblioteca/Contextos/ContextoTurnos/ContextoTurnos.js';

function ChecksDiasSemana(props) {
  const contextoTurno = useContext(contexto);

    const handleChange = (event) => {
      let dia = props.diaSemana;
      if(event.target.checked){
        console.log(event.target.checked)
        console.log(contextoTurno);
        contextoTurno.setForm(estadoAnteriorForm => ({
          ...estadoAnteriorForm,
          dias: [
            ...estadoAnteriorForm.dias,
            {diaSemana: dia},
          ]
        }))
      }else{
        let todosLosDias = contextoTurno.form.dias;
        console.log(todosLosDias)
        todosLosDias.filter(()=>{});
      }
      //COGER EL ESTADO QUITAR EL e.target.checked si es false.
      //Hacer con un map.
      /* Array.filter(funcion) //Compara el campo y con que objeto.dia. */
    }

    /* const addDia = newDia => {
      setForm({
        ...form,
        dias: [...form.dias, newDia]
      });
    }; */

  return (
    <div>
          <Form.Check 
            type="switch"
            id="custom-switch"
            onChange={handleChange}
          />
        <p className='tituloDiaSemana'>{props.diaSemana}</p>
      </div>
  );
}

export default ChecksDiasSemana;
