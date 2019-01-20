
const getTrips = () => {
  // const format = 'YYYY-MM-DD';

  // Add Holiday Trips
  const trips = [{
    name: 'New year',
    booked: true,
    startDate: '2019-01-01',
    endDate: '2019-01-03',
  },
  {
    name: 'St Anton am Ahlberg',
    booked: true,
    startDate: '2019-02-02',
    endDate: '2019-02-09',
  },
  {
    name: 'Birthday Celebration',
    booked: false,
    startDate: '2019-03-07',
    endDate: '2019-03-10',
  },
  {
    name: 'Tanzania Safari',
    booked: false,
    startDate: '2019-06-14',
    endDate: '2019-06-24',
  },
  {
    name: 'Iceland Trip',
    booked: false,
    startDate: '2019-07-04',
    endDate: '2019-07-09',
  },
  {
    name: 'Enköping gänget',
    booked: false,
    startDate: '2019-07-13',
    endDate: '2019-07-20',
  },
  {
    name: 'Tomorrowland',
    booked: false,
    startDate: '2019-07-25',
    endDate: '2019-07-28',
  },
  {
    name: 'Christmas',
    booked: false,
    startDate: '2019-12-21',
    endDate: '2019-12-31',
  }];

  return trips;
};

export default {
  getTrips
};