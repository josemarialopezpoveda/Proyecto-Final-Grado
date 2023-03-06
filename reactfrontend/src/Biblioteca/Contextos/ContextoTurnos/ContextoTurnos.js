import React, { useState, createContext } from "react";
// Se crea el contexto general.
const contexto = createContext();

    const ContextoTurno = (props) =>{
        const [dias, setDias] = useState([]);

        const anyadirDia = (valor) =>{
            if (dias.indexOf(valor) === -1) {
                setDias((array) => array.includes(valor) ? [...array] : [...array, valor]);
            }else{
                setDias((array) => array.filter((item) => item !== valor));
            }
        }

        const datos =  {
            dias,
            anyadirDia,
            setDias,
        };

        return (
            // Se crea el proveedor del contexto a través del children.
            <contexto.Provider value={datos}>
            {props.children}
            </contexto.Provider>
        );
    }

export default ContextoTurno;

export { contexto };