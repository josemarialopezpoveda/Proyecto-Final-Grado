import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import NavCliente from '../PaginaCliente/Nav/NavCliente';
import PiePagina from '../PaginaPrincipal/Footer/PiePagina';
import './Calendar.css';
import esLocale from '@fullcalendar/core/locales/es';

export default class Calendar extends React.Component {
  render() {
    return (
        <React.Fragment>
            <NavCliente/>
            <div className='contenedorCalendario'>
                <FullCalendar
                    locales={esLocale}
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={[
                        { title: 'event 1', date: '2023-01-' },
                        { title: 'event 2', date: '2023-01-11' }
                    ]}
                />
            </div>
            <PiePagina/>
        </React.Fragment>
    )
  }
}
