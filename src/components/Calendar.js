import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default function Calendar() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings()
    });

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const events = trainings.map((training) => {
        return {
            id: training.id,
            title: training.activity,
            start: new Date(training.date),
            end: new Date(training.date),
            allDay: false
        }
    })
    
    return (
        <div className='calendar'>
        <FullCalendar
        contentHeight={600}
          defaultView="dayGridWeek"
          headerToolbar={{
            start: 'today,prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={events}
          nowIndicator
        />
        </div>
      );
    }
