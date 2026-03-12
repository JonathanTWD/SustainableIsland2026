# SustainableIsland2026

## Prerequisites

To run this project, you need to have installed:
- **Node.js** (and npm)
- **Docker** (to run the PostgreSQL database using Docker Compose)
- *(Optional but recommended)* A **Database Client** to inspect and manage the PostgreSQL database, such as [DBeaver](https://dbeaver.io/).

## Backend + PostgreSQL (Docker)

1. Go to the backend folder:

	```bash
	cd backend
	```

2. Install project dependencies:

	```bash
	npm install
	```

3. Ensure environment variables are set in a `.env` file (use `.env.example` as a guide):

	- `PORT=3000`
	- `DATABASE_URL=postgresql://postgres:password@localhost:5432/sustainable_island?schema=public`
	- `PGHOST=localhost`
	- `PGPORT=5432`
	- `PGUSER=postgres`
	- `PGPASSWORD=postgres`
	- `PGDATABASE=sustainable_island`

4. Start PostgreSQL with Docker Compose:

	```bash
	npm run db:up
	```

## Prisma Configuration (Client, Migrations, and Seeders)

Once the database is running, you need to prepare Prisma:

1. **Run Migrations:** This will apply the database schema (create the tables).
	```bash
	npx prisma migrate dev
	```

2. **Generate Prisma Client:** Generates the necessary code to interact with the database from TypeScript.
	```bash
	npx prisma generate
	```

3. **Run Seeders:** To populate the database with initial data (make sure you are inside the `backend` folder).
	```bash
	npx prisma db seed
	```

## Running the Server

1. Start the backend:

	```bash
	npm run dev
	```

2. Verify the database connection:

	- `GET http://localhost:3000/health/db`

### Useful scripts

- `npm run db:up` → starts PostgreSQL
- `npm run db:down` → stops PostgreSQL
- `npm run db:logs` → real-time logs
- `npm run prisma:generate` → generates Prisma Client
- `npm run prisma:migrate -- --name init` → creates/applies a migration
- `npm run prisma:studio` → opens Prisma Studio

## Frontend Setup

1. Open a new terminal and go to the frontend folder:

	```bash
	cd frontend
	```

2. Install project dependencies:

	```bash
	npm install
	```

3. Start the development server (powered by Vite):

	```bash
	npm run dev
	```

4. The frontend will typically be running on `http://localhost:5173`. Open this URL in your browser to view the application.


