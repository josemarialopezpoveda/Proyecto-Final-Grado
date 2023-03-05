import React, { useState, createContext } from "react";
// Se crea el contexto general.
const contexto = createContext();

    const ContextoTurno = (props) =>{
        const [horaEntradaM, setHoraEntradaM] = useState('-');
        const [horaSalidaM, setHoraSalidaM] = useState('-');
        const [horaEntradaT, setHoraEntradaT] = useState('-');
        const [horaSalidaT, setHoraSalidaT] = useState('-');
        const [horaEntradaN, setHoraEntradaN] = useState('-');
        const [horaSalidaN, setHoraSalidaN] = useState('-');

        const [form, setForm] = useState({
            descripcion: "",
            dias: [
                    /* "diaSemana": null,
                    "horaInicioM": "07:00:00",
                    "horaFinM": "15:00:00",
                    "horaInicioT": null,
                    "horaFinT": null,
                    "horaInicioN": null,
                    "horaFinN": null, */  
            ],
        });

        const datos =  {
            horaEntradaM,
            horaEntradaN,
            horaEntradaT,
            horaSalidaM,
            horaSalidaN,
            horaSalidaT,
            form,
            setForm,
            setHoraEntradaM,
            setHoraEntradaN,
            setHoraEntradaT,
            setHoraSalidaM,
            setHoraSalidaN,
            setHoraSalidaT,
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