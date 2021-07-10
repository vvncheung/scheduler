const getAppointmentsForDay = function(state, day) {
 
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
};

const getInterviewersForDay = function(state, day) {
 
  let interviewersThatDay = [];
  if(state.days.length  === 0) {
    return interviewersThatDay;
  }

  const currentDay = state.days.filter((dayObj) => {
    if (day === dayObj.name) {
      return true;
    }
    return false; 
  });

  if(currentDay.length  === 0) {
    return interviewersThatDay;
  }

  interviewersThatDay = currentDay[0].interviewers.map((id) => {
    if (id === state.interviewers[id].id) {
      return state.interviewers[id];
    }
  })

  return interviewersThatDay;
};

const getInterview = function(state, interview) {
 
  if (!interview) {
    return null;
  }

  const interviewerObj = state.interviewers[interview.interviewer];
  
  return {
    student: interview.student,
    interviewer: interviewerObj
  }

}

module.exports = {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview
}
