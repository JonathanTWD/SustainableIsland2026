# SustainableIsland2026

## Backend + PostgreSQL (Docker)

1. Go to the backend folder:

	```bash
	cd backend
	```

2. Ensure environment variables are set in `.env` (example in `.env.example`):

	- `PORT=3000`
	- `PGHOST=localhost`
	- `PGPORT=5432`
	- `PGUSER=postgres`
	- `PGPASSWORD=postgres`
	- `PGDATABASE=sustainable_island`

3. Start PostgreSQL with Docker Compose:

	```bash
	npm run db:up
	```

4. Start the backend:

	```bash
	npm run dev
	```

5. Verify database connection:

	- `GET http://localhost:3000/health/db`

### Useful scripts

- `npm run db:up` → starts PostgreSQL
- `npm run db:down` → stops PostgreSQL
- `npm run db:logs` → real-time logs
