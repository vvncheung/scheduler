import {useState} from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory(history => [newMode, ...history]);
    } else {
      setHistory(history => [newMode, ...history.slice(1)]);
    }
  }

  const back = () => {
    setHistory(history => history.length > 1 ? history.slice(1) : history)
  }

  return { mode: history[0], transition, back };
}