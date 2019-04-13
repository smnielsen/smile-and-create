export SERVICE_NAME=holidays-app

all:
	@echo "Available targets:"
	@echo "------------------"
	@echo "  * dev     - Setup a local development environment for $(SERVICE_NAME)"
	@echo "  * test    - Run tests for $(SERVICE_NAME)"
	@echo "  * attach  - Spawn a test container for $(SERVICE_NAME)"
	@echo "  * clean   - clean up docker related setup"
	@echo "  * prune   - clean up docker related setup and remove all temporary files"

####################
# local devlopment #
####################

install-node-modules:
	@echo ">> installing node_modules with docker"
	docker-compose run --rm node-tests yarn install

dev: install-node-modules
	@echo ">> starting all services"
	@docker-compose up --build -d --remove-orphans
	@docker-compose rm -fsv node-tests

.PHONY: test
test:
	@docker-compose run --rm node-tests npm test

attach:
	@docker-compose run --rm node-tests bash

clean:
	@docker-compose down --remove-orphans --volumes

##
## DEVELOPMENT HELPERS
##
seed:
	@docker-compose run --rm node-tests yarn run knex seed:run
