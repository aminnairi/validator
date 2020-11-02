.PHONY: start stop restart build install

DOCKER_COMPOSE_EXEC_OPTIONS=

ifeq (${CI},true)
	DOCKER_COMPOSE_EXEC_OPTIONS=--user root -T
endif

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

build:
	docker-compose exec $(DOCKER_COMPOSE_EXEC_OPTIONS) node npm run build

install:
	docker-compose exec $(DOCKER_COMPOSE_EXEC_OPTIONS) node npm install

test:
	docker-compose exec $(DOCKER_COMPOSE_EXEC_OPTIONS) node npm run test
