import React from 'react';
import { format } from 'date-fns';
import './SelectedEventCard.css';

const SelectedEventCard = ({ event, onDeselect }) => {
  const formatTime = (time) => format(new Date(time), 'h aa');
  const initial = event.event_category.charAt(0).toUpperCase();

  return (
    <div className="selected-event-card">
      <div className="event-initial">{initial}</div>
      <div className="event-details">
        <h3>{event.event_name}</h3>
        <p>{event.event_category}</p>
        <p>{formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
        <button onClick={onDeselect}>Remove</button>
      </div>
    </div>
  );
};

export default SelectedEventCard;
