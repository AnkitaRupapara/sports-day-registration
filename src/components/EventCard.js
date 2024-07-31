import React from 'react';
import { format } from 'date-fns';
import './EventCard.css';

const EventCard = ({ event, onSelect, isSelected }) => {
  const formatTime = (time) => format(new Date(time), 'h aa');
  const initial = event.event_category.charAt(0).toUpperCase();

  return (
    <div className={`event-card ${isSelected ? 'selected' : ''}`}>
      <div className="event-initial">{initial}</div>
      <div className="event-details">
        <h3>{event.event_name}</h3>
        <p>{event.event_category}</p>
        <p>{formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
        <button onClick={onSelect} disabled={isSelected}>
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
