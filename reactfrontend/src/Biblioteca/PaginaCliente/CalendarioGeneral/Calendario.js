//Importamos los estilos CSS del pie de página.
import React, {useRef, useState, useEffect} from 'react';
import "./Calendario.css";
import Calendar from 'react-calendar';
import Modal from 'react-modal';

function Calendario(){
    //     const [date, setDate] = useState(new Date());
    //     const [eventText, setEventText] = useState('');
    //     const [events, setEvents] = useState({});
    //     const [modalIsOpen, setModalIsOpen] = useState(false);
      
    //     const handleDateClick = (date) => {
    //       setDate(date);
    //       setModalIsOpen(true);
    //     };
      
    //     const handleEventTextChange = (event) => {
    //       setEventText(event.target.value);
    //     };
      
    //     const handleModalSubmit = (event) => {
    //       event.preventDefault();
    //       setEvents({ ...events, [date.toDateString()]: eventText });
    //       setEventText('');
    //       setModalIsOpen(false);
    //     };
      
    //     const handleModalClose = () => {
    //       setModalIsOpen(false);
    //     };

    // return(
    //     <React.Fragment>
    //         <div className='calendario'>
    //             <Calendar
    //                 value={date}
    //                 onClickDay={handleDateClick}
    //                 locale="es-ES"
    //             />
    //             <Modal
    //                 isOpen={modalIsOpen}
    //                 onRequestClose={handleModalClose}
    //             >
    //                 <h2>Evento para el {date.toLocaleDateString()}</h2>
    //                 <form onSubmit={handleModalSubmit}>
    //                 <label htmlFor="eventText">Texto del evento:</label>
    //                 <input
    //                     type="text"
    //                     id="eventText"
    //                     value={eventText}
    //                     onChange={handleEventTextChange}
    //                 />
    //                 <button type="submit">Crear evento</button>
    //                 </form>
    //             </Modal>
    //             {/* <h2>Eventos</h2>
    //             {Object.keys(events).map((key) => (
    //                 <p key={key}>{key}: {events[key]}</p>
    //             ))} */}
    //         </div>
    //     </React.Fragment>
    // );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const handleDateClick = (date) => {
    const eventText = prompt('Agregar un evento');
    if (eventText !== null && eventText !== '') {
      const dateKey = date.toDateString();
      setEvents({ ...events, [dateKey]: eventText });
    }
  }

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = [];

  for (let i = 1; i <= firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="empty-day"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dateKey = date.toDateString();
    const event = events[dateKey];

    days.push(
      <div key={dateKey} className="day" onClick={() => handleDateClick(date)}>
        <div className="day-number">{i}</div>
        <div className="event">{event}</div>
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="header">
        <div className="month-year">{currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</div>
      </div>
      <div className="days">
        <div className="day-label">Lun</div>
        <div className="day-label">Mar</div>
        <div className="day-label">Mié</div>
        <div className="day-label">Jue</div>
        <div className="day-label">Vie</div>
        <div className="day-label">Sáb</div>
        <div className="day-label">Dom</div>
        {days}
      </div>
    </div>
  );
}
export default Calendario;
