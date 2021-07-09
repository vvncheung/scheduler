import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js"
import Appointment from "components/Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Laurence Li",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "10am",
    interview: {
      student: "Moogle Li",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "11am",
    interview: {
      student: "Laurence Li",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
];


export default function Application(props) {
  
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  // const state = { day: "Monday", days: [] };
  // setState(Object.assign({}, state, { day: "Tuesday" });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
  });
  

  useEffect(() => {
    axios.get("/api/days").then(response => setDays(response.data));
  }, []);


  const mapOverAppointmentsArray = appointments.map((appointment) => {
    return ( 
      <Appointment key={appointment.id} {...appointment} />
    )}
  )

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

        <DayList days={state.days} day={state.day} setDay={setDay} />

        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      
        </section>
      <section className="schedule">
        {mapOverAppointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
