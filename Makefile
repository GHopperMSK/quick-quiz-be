SHELL=/bin/bash

build:
	docker-compose build

ps: 
	docker-compose ps

start:
	docker-compose up -d

stop:
	docker-compose down

restart: stop start

run:
	docker-compose run ${service} bash

logs:
	docker-compose logs --follow ${service}

migrate_new:
	docker run --rm -it --network=host -v ${shell pwd}/migrations:/migrations amacneil/dbmate --migrations-dir ./migrations new ${name}

migrate_up:
	docker run --rm -it --network=host -e DATABASE_URL="postgres://postgres:postgres@localhost/quickquiz?sslmode=disable" \
		-v ${shell pwd}/migrations:/migrations amacneil/dbmate --migrations-dir /migrations up

migrate_down:
	docker run --rm -it --network=host -e DATABASE_URL="postgres://postgres:postgres@localhost/quickquiz?sslmode=disable" \
		-v ${shell pwd}/migrations:/migrations amacneil/dbmate --migrations-dir /migrations down	