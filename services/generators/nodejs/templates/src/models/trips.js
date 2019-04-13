const _ = require('lodash');
const debug = require('debug')('::model/trips');

const { omitEmpty } = require('../util/helpers');
const { knex, POSTGRES_ERRORS } = require('../util/knexHelpers');
const { createError } = require('../util/httpErrors');
const { momentDate, momentToDateString } = require('../util/momentHelpers');
/**
 * @typedef {{ name: string, destination: string, description: string, mapsLink?: URL, travelDate: string, returnDate: string }} Trip
 * @typedef {{ name: string, destination: string, description: string, maps_link?: URL, travel_date: string, return_date: string, created_at?: string, updated_at? string }} TripDbRow
 */

/**
 *
 * @param {Trip} param0
 * @returns {TripDbRow}
 */
const createTripDbRow = ({
  name,
  destination,
  description,
  mapsLink,
  travelDate,
  returnDate,
}) =>
  omitEmpty({
    name,
    destination,
    description,
    maps_link: mapsLink,
    travel_date: travelDate ? momentDate(travelDate) : null,
    return_date: returnDate ? momentDate(returnDate) : null,
  });
exports.createTripDbRow = createTripDbRow;

/**
 *
 * @param {TripDbRow} row
 * @param {object} overrides
 * @returns {Trip}
 */
const mapDbRowToModel = (row, overrides = {}) => ({
  id: row.id,
  name: row.name,
  destination: row.destination,
  description: row.description,
  mapsLink: row.maps_link,
  travelDate: momentToDateString(row.travel_date),
  returnDate: momentToDateString(row.return_date),
  createdAt: new Date(row.created_at).toISOString(),
  updatedAt: new Date(row.updated_at).toISOString(),
  ...overrides,
});

const assertNoDuplicateModel = err => {
  if (err.code === POSTGRES_ERRORS.UNIQUE_VIOLATION) {
    throw createError('Trip already exist', {
      statusCode: 409,
    });
  }
};

/**
 * `create` will create a new trip
 * Requires a Unique name
 *
 * @param {{ Trip }} trip
 * @returns {Promise<Trip>}
 */
exports.create = async trip => {
  let rows;
  try {
    rows = await knex('trips')
      .returning(['id', 'created_at', 'updated_at'])
      .insert(createTripDbRow(trip));
  } catch (err) {
    assertNoDuplicateModel(err);
    throw createError(`Could not create trip cause ${err.message}`, {
      statusCode: 400,
    });
  }

  const result = mapDbRowToModel(rows[0], trip);
  debug(`Created trip ${result.name}: %o`, result);
  return result;
};

/**
 * `update` will update one trip
 *
 * @param {Trip} param0
 * @param {{ where: { id: string } }} param1
 * @returns {Promise<Trip>}
 */
exports.update = async (trip, { where: { id } }) => {
  try {
    await knex('trips')
      .where({ id })
      .update({
        ...createTripDbRow(trip),
        updated_at: new Date(),
      });
  } catch (err) {
    assertNoDuplicateModel(err);
    throw err;
  }

  const updatedTrip = await exports.get({ where: { id } });
  debug(`Updated ${updatedTrip.name} with: %o`, trip, updatedTrip);
  return updatedTrip;
};

/**
 * `list` all trips available
 *
 * @param {{ where: { id: string } }} param0
 * @returns {Promise<(Model|null)>}
 */
exports.list = async ({ sort, page, pageSize }) => {
  const rows = await knex('trips')
    .select()
    .offset(page * pageSize)
    .limit(pageSize);

  debug(`Listed ${rows.length} trips`);

  const trips = rows.map(mapDbRowToModel);
  if (sort) {
    return _.sortBy(trips, 'travelDate');
  }
  return trips;
};

/**
 * get details for one trip
 *
 * @param {{ where: { id: string } }} param0
 * @returns {Promise<(Model|null)>}
 */
exports.get = async ({ where: { id } }) => {
  const rows = await knex('trips')
    .select()
    .where({ id });

  if (!rows.length) {
    throw createError(`Could not find trip with id ${id}`, {
      statusCode: 404,
    });
  }

  return mapDbRowToModel(rows[0]);
};

/**
 * delete a trip
 *
 * @param {{ where: { id: string } }} param0
 * @returns {Promise<void>}
 */
exports.delete = async ({ where: { id } }) => {
  const rows = await exports.get({ where: { id } });

  if (rows.length) {
    debug(`Deleting trip ${rows[0].name}`);
  }

  try {
    await knex('trips')
      .del()
      .where({ id });
  } catch (err) {
    debug(`ERROR: DB error on deletion ${err.message}`);
  }
};
