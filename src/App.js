import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import EventCard from './components/EventCard';
import SelectedEventCard from './components/SelectedEventCard';
import eventService from './services/eventService';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(() => {
    const savedEvents = localStorage.getItem('selectedEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    eventService.getEvents().then(data => {
      setEvents(data);
    });
  }, []);

  useEffect(() => {
    if (selectedEvents.length === 4) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [selectedEvents]);

  const isEventSelected = (eventId) => selectedEvents.some(event => event.id === eventId);

  const handleSelectEvent = (event) => {
    if (selectedEvents.length >= 3) {
      setError('You can only select up to 3 events.');
      return;
    }

    if (isConflict(event)) {
      setError('Selected event conflicts with existing events.');
      return;
    }

    setSelectedEvents(prev => {
      const updatedSelectedEvents = [...prev, event];
      localStorage.setItem('selectedEvents', JSON.stringify(updatedSelectedEvents));
      return updatedSelectedEvents;
    });
    setError('');
  };

  const handleDeselectEvent = (eventId) => {
    setSelectedEvents(prev => {
      const updatedSelectedEvents = prev.filter(event => event.id !== eventId);
      localStorage.setItem('selectedEvents', JSON.stringify(updatedSelectedEvents));
      return updatedSelectedEvents;
    });
    setError('');
  };

  const isConflict = (newEvent) => {
    return selectedEvents.some(event => 
      (newEvent.start_time < event.end_time && newEvent.end_time > event.start_time)
    );
  };

  return (
    <Routes>
      <Route path="/events" element={
        <div className="app-container">
          <div className="card-wrapper">
            <div className="event-list">
              <h2>Available Events</h2>
              {events.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onSelect={() => handleSelectEvent(event)}
                  isSelected={isEventSelected(event.id)}
                />
              ))}
            </div>
            <div className="selected-events-list">
              <h2>Selected Events</h2>
              {selectedEvents.map(event => (
                <SelectedEventCard 
                  key={event.id} 
                  event={event} 
                  onDeselect={() => handleDeselectEvent(event.id)}
                />
              ))}
              {showPopup && (
                <div className="popup">
                  <p>You have selected 4 events!</p>
                </div>
              )}
              {error && (
                <div className="popup error-popup">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      } />
      <Route path="/" element={<Navigate to="/events" />} />
    </Routes>
  );
};

export default App;
