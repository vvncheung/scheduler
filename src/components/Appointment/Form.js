import React, { useEffect, useState } from 'react';
import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form(props){
  
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [saveDisabled, setDisabled] = useState(true);

  useEffect(()=> { 
    name && interviewer && setDisabled(false);
  }, [name, interviewer])

  const reset = () => {
    setName("");
    setInterviewer('null');
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            onChange={(event) => {
              setName(event.target.value)}}
            value={name}
            placeholder="Enter Student Name"
            onSubmit={event => event.preventDefault()}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={(event)=> props.onSave(name, interviewer)} disabled={saveDisabled}>Save</Button>        </section>
      </section>
    </main>
  )
}

