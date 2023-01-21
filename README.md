# Quick Quiz backend

## Set up dev

1. install `docker` and `docker-compose`

2. `make build && make start`

3. Create a database by your own.

4. Do `cp .env.example .env` and fill all env variables

5. `make migrate_up`


// curl -X POST http://localhost:3000/answer -H 'Content-Type: application/json' -d '{"quiz_uuid": "c2cd6a3f-9777-41b1-be4b-0a6d897f4512", "lang": "en", "slides":[{"a":"b"},{"foo":"bar"}]}'

