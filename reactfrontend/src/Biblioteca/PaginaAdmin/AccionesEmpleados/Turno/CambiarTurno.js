//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import PiePagina from '../../../PaginaPrincipal/Footer/PiePagina';
import NavAdmin from '../../Nav/NavAdmin';
import './CambiarTurno.css';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { generarUUID } from 'Biblioteca/FuncionesAuxiliares/Funciones';

function CambiarTurno() {

  return (
    <React.Fragment>
        <NavAdmin/>
        <h1 className='tituloCambiarTurno'>Turno del Empleado Seleccionado</h1>
        <section className='sectionPequenyo sectionCambiarTurno'>
          <Form key={generarUUID()} id="anyadir">
              <div className='divContenedorCampo'>
                <p>Tipo Usuario</p>
                  <Form.Select className='selectCambiarTurno' aria-label="Default select example">
                        <option value="Lunes-Viernes Media Jornada">Lunes-Viernes Media Jornada</option>
                        <option value="Lunes-Viernes Nocturno">Lunes-Viernes Nocturno</option>
                  </Form.Select>
              </div>
          </Form>
        </section>

        <div className='botonAnyadirTurnoDiv'>
          <Link className="anyadirTurnoBoton" to='/verTurnoCliente'>
            Cambiar Turno
          </Link>
        </div>
        <div className='ContenedorBajarFooter'>
          <div className='BajarFooter'>
            <PiePagina/>
          </div>
        </div>
    </React.Fragment>
  );
}

export default CambiarTurno;
