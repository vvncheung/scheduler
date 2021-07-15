import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData(props) {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // update spots:
  const updateSpots = (incomingState, day) => {
    const state = {...incomingState};
    const currentDay = day || state.day;

    //find day in obj
    const currentDayObj = state.days.find(dayObj => dayObj.name === currentDay);
    const currentDayIndex = state.days.findIndex(dayObj => dayObj.name === currentDay);

    // find the appt id array
    const listOfAppointments = currentDayObj.appointments;

    // look for null interviews in each appt from the array and add to new array
    const arrayOfNullAppointments = listOfAppointments.filter(id => !state.appointments[id].interview);
    // number of spots = lenth of new array
    const spots = arrayOfNullAppointments.length;

    // update the updateeo f key 'spots' in the day with new calculated num of spots
    const updatedDayObj = {...currentDayObj, spots};

    state.days = [...incomingState.days];
    state.days[currentDayIndex] = updatedDayObj;

    return state;
  }


  // books new interview
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res => {
      console.log(res)
      setState(prevState => {
        const newState = {...prevState, appointments};
        const newNewState = updateSpots(newState);
        return newNewState;
      })
    })
  };

  // cancel interview by id
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState(prevState => {
        const newState = {...prevState, appointments};
        const newNewState = updateSpots(newState);
        return newNewState;
      })
    })
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((state) => ({
          ...state,
          days: [...all[0].data],
          appointments: { ...all[1].data },
          interviewers: { ...all[2].data },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {setDay, bookInterview, cancelInterview, state}
}