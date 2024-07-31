import mockData from '../mockData.json';  // This path is relative to the services folder

const getEvents = async () => {
  return mockData;
};

export default {
  getEvents,
};
