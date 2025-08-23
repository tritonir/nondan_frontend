import { useState } from 'react';
import { mockEvents, mockClubs, mockUsers } from '../data/mockData';

export const useEvents = () => {
  const [events] = useState(mockEvents);
  return { events, loading: false, error: null };
};

export const useEvent = (eventId) => {
  const { events } = useEvents();
  const event = events.find(e => e.id === eventId);
  return { event, loading: false, error: event ? null : 'Event not found' };
};

export const useClubs = () => {
  const [clubs] = useState(mockClubs);
  return { clubs, loading: false, error: null };
};

export const useUsers = () => {
  const [users] = useState(mockUsers);
  return { users, loading: false, error: null };
};

