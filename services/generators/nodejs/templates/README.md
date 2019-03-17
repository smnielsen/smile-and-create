# <%= name %>

## Development

### Get up and running

```bash
# clean up old state and start a local dev environment
make clean dev
# > ... much output ...

# the service is now up and running,
# you can now trigger tests
make test

# to spawn a test container:
make attach
# inside the container to run knex
yarn run test
# exit the container
exit

# cleanup everything again
make clean
```

#### working with knex migrations

```bash
# spawn a new test container
make attach
# within the container:
yarn run knex -- migrate:make hello-world
```

### Troubleshooting

**Q: I get an error when running `make dev`**

_A:_ Check if any other docker containers are running and using the same ports
`make clean`.

### Environment variables

- checkout `./src/config.js`; it's the centralized place for environment variables
