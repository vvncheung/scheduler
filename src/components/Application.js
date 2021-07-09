import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "components/helpers/selectors";




export default function Application(props) {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('api/days')),
      Promise.resolve(axios.get('api/appointments')),
      Promise.resolve(axios.get('api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  const appointmentObjs = getAppointmentsForDay(state, state.day)
  const mapOverAppointmentsArray = appointmentObjs.map((appointment) => {
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
