import React, { useRef, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { TimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import Form from "react-bootstrap/Form";
import { URL_API } from "services/http/const";
import { convertirFechaISO, peticionGetAuth } from "Biblioteca/FuncionesAuxiliares/Funciones";


require("moment/locale/es.js");
const localizer = momentLocalizer(moment);

const Calendario = () => {

  // Recolección datos.

  const [ausencias, setAusencias] = useState([{}]);

  const recoleccionDatos = async () => {
    const header = {
      headers: {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("tipoToken")} ${localStorage.getItem("token")}`,
      },
    };
    let datosAusencia = undefined;
      if(`${localStorage.getItem('tipoUsuario')}` === "Administrador"){
          datosAusencia = await peticionGetAuth(URL_API + "ausenciasEmpleados/" + `${localStorage.getItem("idEmpleadoAdmin")}`, header);
      }else{
        datosAusencia = await peticionGetAuth(URL_API + "ausenciasEmpleados/" + `${localStorage.getItem("id")}`, header);
      }
    console.log(datosAusencia)
    if(datosAusencia !== undefined){
      if (datosAusencia.data.ausencias !== 0 && datosAusencia.data.message !== "El empleado no tiene ausencias") {
          var todosDatosAusencia = datosAusencia.data.ausencias.map((dia)=>{
            var newTurno = {
              //id: dia.id,
              'title': dia.descripcionAusencia,
              'descripcion': dia.descripcion,
              'tipoAusencia': dia.tipo,
              'justificada': dia.justificada,
              'start': convertirFechaISO(validacionFechaNula(dia.fechaInicio)),
              'end': convertirFechaISO(validacionFechaNula(dia.fechaFin)),
              'allDay': true,
            };
            if(newTurno !== undefined){
              return newTurno;
            }
          });
          if(todosDatosAusencia !== undefined){
            setAusencias(todosDatosAusencia);
          }
      }
    }
  };

  const validacionFechaNula = (fecha) =>{
    if(fecha === null){
      const fechaActual = new Date(); // Obtener la fecha actual
      const año = fechaActual.getFullYear(); // Obtener el año actual
      const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Obtener el mes actual (se suma 1 ya que los meses se indexan desde 0)
      const dia = String(fechaActual.getDate()).padStart(2, '0'); // Obtener el día actual

      const fechaFormateada = `${año}-${mes}-${dia}`; // Formatear la fecha
      return fechaFormateada;

    }else{
      return fecha;
    }
  }

  useEffect(() => {
    recoleccionDatos();
}, []);


    //Creación del estado que contiene los datos que recogerá el formulario.
    const [form, setForm] = useState({
      fechaInicio: "",
      fechaFin:"",
      title:""
    });
  const tituloEditar = useRef(null);
  const tituloBorrar = useRef(null);
  // const fechaInicioBorrar = useRef(null);
  // const fechaFinBorrar = useRef(null);
  const [open, setOpen] = useState(false);
  // const [open2, setOpen2] = useState(false);
  // const [open3, setOpen3] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent({});
  };

  // const handleClose2 = () => {
  //   setOpen2(false);
  //   setSelectedEvent({});
  // };

  // const handleClose3 = () => {
  //   setOpen3(false);
  //   setSelectedEvent({});
  // };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setStartDate(event.start);
    setEndDate(event.end);
    setOpen(true);
  };

  // const crearEvento = (event) => {
  //   setOpen2(true);
  // };

  // const borrarEvento = (event) => {
  //   setOpen3(true);
  // };

  // const handleEventSubmit = () => {
  //   setEvents(events.map((evento)=>{
  //     if(evento.title === tituloEditar.current.children[1].firstChild.defaultValue){
  //       return {
  //         ...evento,
  //         title: selectedEvent.title
  //       }; 
  //     }
  //     return evento;
  //   }))

  //   // Handle form submit here
  //   handleClose();
  // };

  // const handleEventSubmit2 = () =>{
  //   const newEvent = {
  //         'title': form.title,
  //         'start': convertirFecha(form.fechaInicio),
  //         'end': convertirFecha(form.fechaFin)
  //     }
    
  //   console.log(newEvent)
  //   setEvents([...events, newEvent])
  //   handleClose2();
  // }

  // const handleEventSubmit3 = () => {
  //   const filteredEvents = events.filter(event =>event.title !== tituloBorrar.current.children[1].firstChild.value);
  //   console.log(filteredEvents)
  //   setEvents(filteredEvents)
  //   // Handle form submit here
  //   handleClose3();
  // };

  return (
    <>
      {/* <div className='contenedorBotonCrearCorreo divFlexFichar'>
          <button type="button" onClick={crearEvento} className='crearCorreoBoton'>Añadir Evento</button>
          <button type="button" onClick={borrarEvento} className='crearCorreoBoton'>Eliminar Evento</button>
      </div> */}
      <Calendar
        localizer={localizer}
        events={ausencias}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleSelectEvent}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Datos Evento</DialogTitle>
        <DialogContent>
          {/* <TextField
            label="Título"
            fullWidth
            defaultValue={selectedEvent.title}
            variant="outlined"
            margin="normal"
            ref={tituloEditar}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value})}
          /> */}
          <h4>Descripción: {selectedEvent.title}</h4>
          <h4>Tipo: {selectedEvent.tipoAusencia}</h4>
          <h4>Descripción ausencia: {selectedEvent.descripcion}</h4>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar evento</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            fullWidth
            defaultValue={selectedEvent.title}
            variant="outlined"
            margin="normal"
            ref={tituloEditar}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleEventSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog> */}
      {/* <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Crear evento</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            fullWidth
            defaultValue={selectedEvent.title}
            variant="outlined"
            margin="normal"
            onChange={(e) => setForm({ ...form, title: e.target.value})}
          />
          <div className="divContenedorCampo">
              <p className="letrapequenya">Fecha de inicio</p>
              <Form.Group className="grupoInputPequenyo">
                <Form.Control
                  size="lg"
                  type="date"
                  onChange={(e) => setForm({ ...form, fechaInicio: e.target.value.trim() })}
                  defaultValue={form.fechaInicio}
                />
              </Form.Group>
            </div>
            <div className="divContenedorCampo">
              <p className="letrapequenya">Fecha de fin</p>
              <Form.Group className="grupoInputPequenyo">
                <Form.Control
                  size="lg"
                  type="date"
                  onChange={(e) => setForm({ ...form, fechaFin: e.target.value.trim() })}
                  defaultValue={form.fechaFin}
                />
              </Form.Group>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancelar</Button>
          <Button onClick={handleEventSubmit2}>Guardar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open3} onClose={handleClose3}>
        <DialogTitle>Crear evento</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            fullWidth
            defaultValue={selectedEvent.title}
            variant="outlined"
            margin="normal"
            ref={tituloBorrar}
            onChange={(e) => setForm({ ...form, title: e.target.value})}
          />
          <div className="divContenedorCampo">
              <p className="letrapequenya">Fecha de inicio</p>
              <Form.Group className="grupoInputPequenyo">
                <Form.Control
                  size="lg"
                  type="date"
                  onChange={(e) => setForm({ ...form, fechaInicio: e.target.value.trim() })}
                  defaultValue={form.fechaInicio}
                  ref={fechaInicioBorrar}
                />
              </Form.Group>
            </div>
            <div className="divContenedorCampo">
              <p className="letrapequenya">Fecha de fin</p>
              <Form.Group className="grupoInputPequenyo">
                <Form.Control
                  size="lg"
                  type="date"
                  onChange={(e) => setForm({ ...form, fechaFin: e.target.value.trim() })}
                  defaultValue={form.fechaFin}
                  ref={fechaFinBorrar}
                />
              </Form.Group>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Cancelar</Button>
          <Button onClick={handleEventSubmit3}>Guardar</Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default Calendario;
