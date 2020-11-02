.PHONY: start stop restart build install

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

build:
	docker-compose exec node npm run build

install:
	docker-compose exec node npm install

test:
	docker-compose exec node npm run test
