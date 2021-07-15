import React from 'react';
import './DayListItem.scss';
var classNames = require('classnames');

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  })

  const formatSpots = function (props) {
    if (props.spots === 0) {
      return "no spots";
    }
    else if (props.spots === 1) {      
      return props.spots + " spot";
    }
    else if (props.spots > 1) {
      return props.spots + " spots";
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)} remaining</h3>
    </li>
  );
}
