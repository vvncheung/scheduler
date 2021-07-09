export default function getAppointmentsForDay(state, day) {
 
  let appointmentsThatDay = [];
  if(state.days.length  === 0) {
    return appointmentsThatDay;
  }

  const currentDay = state.days.filter((dayObj) => {
    if (day === dayObj.name) {
      return true;
    }
    return false; 
  });

  if(currentDay.length  === 0) {
    return appointmentsThatDay;
  }

  appointmentsThatDay = currentDay[0].appointments.map((id) => {
    if (id === state.appointments[id].id) {
      return state.appointments[id];
    }
  })

  return appointmentsThatDay;
}
