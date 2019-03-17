const { createTripDbRow } = require('../models/trips');

const trips = [
  createTripDbRow({
    name: 'Going on a trip',
    destination: 'Somewhere, someplace',
    description: 'My trip description',
    travelDate: '2019-06-06',
    returnDate: '2019-06-09',
  }),
];

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('trips').del();

  // Insert some initial trips
  await knex('trips').insert(trips);
};
