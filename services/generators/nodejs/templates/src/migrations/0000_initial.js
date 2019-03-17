exports.up = async knex => {
  // Create Trips Table
  await knex.schema.createTable('trips', t => {
    t.increments('id').primary();
    t.string('name')
      .unique()
      .notNullable();
    t.string('destination').nullable();
    t.text('description').nullable();
    t.text('maps_link').nullable();
    t.date('travel_date').notNullable();
    t.date('return_date').notNullable();
    t.timestamps(true, true);
  });

  // Create booking table
  await knex.schema.createTable('bookings', t => {
    t.increments('id').primary();
    t.integer('trip_id') // the clientId (same as UI)
      .references('id')
      .inTable('trips')
      .notNullable()
      .onDelete('CASCADE');
    t.string('type').notNullable();
    t.text('description');
    t.timestamps(true, true);
  });

  // Create payments table
  await knex.schema.createTable('payments', t => {
    t.increments('id').primary();
    t.integer('booking_id')
      .references('id')
      .inTable('bookings')
      .unique()
      .onDelete('CASCADE');
    t.decimal('amount', 14, 2).notNullable();
    t.string('currency')
      .notNullable()
      .defaultTo('euro');
    t.boolean('paid')
      .notNullable()
      .defaultTo('false');
    t.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('payments');
  await knex.schema.dropTable('bookings');
  await knex.schema.dropTable('trips');
};
