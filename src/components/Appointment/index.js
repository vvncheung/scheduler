import React from 'react';

import './styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  }

  const remove = function() {
    if (mode === SHOW) {
      transition(CONFIRM);
    } 
    else {
      transition(DELETING, true);
      props.cancelInterview(props.id)
      .then(()=> {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })
    }
  };

  const edit = function() {
    transition(EDIT);
  }
  
  const exitError = () =>{
    back();
  }
    

  return (
    <article className="appointment">

      <Header time={props.time}/>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={edit}
        onCancel={remove}
      />)} 

      {mode === SAVING && 
      <Status message="Saving"/>}

      {mode === DELETING &&
      <Status message="Deleting"/>}

      {mode === CONFIRM &&
      <Confirm
      message="Are you sure you would like to delete?"
      onCancel={back}
      onConfirm={remove}/>}

      {mode === CREATE && 
      <Form 
        interviewers={props.interviewers} 
        onCancel={back} 
        onSave={save}
      />}

      {mode === EDIT && 
      <Form 
      name={props.name ? props.name : props.interview.student}
      value={props.value ? props.value: props.interview.interviewer.id}
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
      />
      }

      {mode === ERROR_SAVE &&
      <Error
        message="Error attempting to save appointment"
        onClose={exitError}
      />

      }
      {mode === ERROR_DELETE &&
      <Error
      message="Error attempting to delete appointment"
      onClose={exitError}
      />
      }


    </article>
  )
}