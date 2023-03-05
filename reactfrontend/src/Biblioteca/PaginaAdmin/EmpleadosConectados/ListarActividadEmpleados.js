//Importamos todos los .js que necesitamos para esta práctica.
import React from 'react';
import { generarUUID } from '../../FuncionesAuxiliares/Funciones';

function ListarActividadEmpleados() {
    var datos = [
        {
            nombre:"José María",
            apellidos: "López Poveda",
            dni:"23456789Z",
            correo: "josemarialopez.alu@iespacomolla.es",
            telefono: "123456789",
            valor: "ONLINE"
        },
        {
            nombre:"Víctor Joaquín",
            apellidos: "Montoya Calpena",
            dni:"98765432C",
            correo: "victorjoaquinmontoya.alu@iespacomolla.es",
            telefono: "987654321",
            valor: "OFFLINE"
        },
    ]
    return datos.map((option)=> {
        if(option.valor === "ONLINE"){
            return(<tr key={generarUUID()}>
                <td>{option.nombre}</td>
                <td className='campoOpcional'>{option.apellidos}</td>
                <td className='campoOpcional'>{option.dni}</td>
                <td className='campoOpcional'>{option.correo}</td>
                <td className='campoOpcional'>{option.telefono}</td>
                <td title={option.valor} className='online'>{option.valor}</td>
            </tr>)
        }else if(option.valor === "OFFLINE"){
            return(<tr key={generarUUID()}>
                <td>{option.nombre}</td>
                <td className='campoOpcional'>{option.apellidos}</td>
                <td className='campoOpcional'>{option.dni}</td>
                <td className='campoOpcional'>{option.correo}</td>
                <td className='campoOpcional'>{option.telefono}</td>
                <td title={option.valor} className='offline'>{option.valor}</td>
            </tr>)
        }
    });
}

export default ListarActividadEmpleados;
