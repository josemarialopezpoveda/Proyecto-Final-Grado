//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import { generarUUID } from '../../../../FuncionesAuxiliares/Funciones';
import {Link} from 'react-router-dom';

function VerInfoAusencia(props) {

    let datos = [
        {
            desc: "Caída de una escalera en el trabajo",
            fecIni: "1/1/2023",
            fecFin:"1/2/2023",
            justificada: "SI",
            tipoAusencia: "Accidente",
        },
        {
            desc: "Ha tenido un hijo",
            fecIni: "1/1/2023",
            fecFin:"1/1/2024",
            justificada: "SI",
            tipoAusencia: "Maternidad",
        },
    ]

  return (datos.map((option)=> {
        return(<tr key={generarUUID()}>
                <td>{option.desc}</td>
                <td className='campoOpcional'>{option.fecIni}</td>
                <td className='campoOpcional'>{option.fecFin}</td>
                <td className='campoOpcional'>{option.justificada}</td>
                <td className='campoOpcional'>{option.tipoAusencia}</td>
                <td>
                    <Link to={props.link}>
                        <img title='Boton Modificar' className='imagenFotoGestionUsuarios' src={require('../../../../../img/modify-foto.png')} alt="imagen Foto Modificar"/>
                    </Link>
                    <Link to='/'>
                        <img title='Boton Borrar' className='imagenFotoGestionUsuarios' src={require('../../../../../img/delete-foto.png')} alt="imagen Foto Borrar"/>
                    </Link>
                </td>
            </tr>)
        }
    )
  )
}

export default VerInfoAusencia;
