# RentRoll

A Node.js platform for managing rental processes, seed data, and more, built with TypeScript, PostgreSQL, and modern tooling.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Seeding Data](#seeding-data)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- TypeScript-first Node.js backend
- PostgreSQL integration with the `pg` library
- Environment variable management via `dotenv`
- Easy database seeding scripts
- Modular project structure

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/MutieCharles/RENTFLOW-PLATFORM.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Copy and configure environment variables:**
    ```bash
    cp .env.example .env
    # Edit .env with your PostgreSQL credentials and other settings
    ```

4. **Build the project:**
    ```bash
    npm run build
    ```

5. **Run the project in development mode:**
    ```bash
    npm run dev
    ```

6. **Start the compiled server:**
    ```bash
    npm start
    ```

## Scripts

- `npm run dev` – Start server in TypeScript using ts-node (development)
- `npm run build` – Compile TypeScript to JavaScript in the `dist` directory
- `npm start` – Start server from compiled JS
- `npm run seed:rooms` – Seed the database with room data
- `npm run seed:all` – Seed the database with all initial data

## Project Structure

```
.
├── server/
│   ├── index.ts                  # Entry point (server bootstrap)
│   ├── app.ts                    # Express app configuration
│   │
│   ├── config/                   # Configuration (DB, env, etc.)
│   │   ├── db.ts                 # Database connection (Postgres or Mongo)
│   │   └── env.ts                # Load and validate environment variables
│   │
│   ├── routes/                   # Route definitions
│   │   ├── auth.routes.ts
│   │   ├── tenant.routes.ts
│   │   ├── room.routes.ts
│   │   └── index.ts              # Combines all routes
│   │
│   ├── controllers/              # Handle requests/responses
│   │   ├── auth.controller.ts
│   │   ├── tenant.controller.ts
│   │   └── room.controller.ts
│   │
│   ├── services/                 # Business logic (independent of Express)
│   │   ├── auth.service.ts
│   │   ├── tenant.service.ts
│   │   └── room.service.ts
│   │
│   ├── models/                   # Database models / schemas
│   │   ├── tenant.model.ts
│   │   ├── room.model.ts
│   │   └── index.ts
│   │
│   ├── middleware/               # Express middleware
│   │   ├── auth.middleware.ts    # JWT or session validation
│   │   ├── error.middleware.ts   # Centralized error handling
│   │   └── validate.middleware.ts # (Optional) for request validation
│   │
│   ├── utils/                    # Helpers/utilities
│   │   ├── logger.ts             # Winston or pino logger
│   │   └── response.ts           # Standardized API responses
│   │
│   ├── db/                       # Database seeders/migrations
│   │   ├── seedRooms.ts
│   │   ├── seedTenants.ts
│   │   └── seedAll.ts
│   │
│   └── types/                    # Global TypeScript types/interfaces
│       ├── express.d.ts
│       └── index.d.ts
│
├── dist/                         # Compiled JS output
│
├── package.json
├── tsconfig.json
├── .env                          # Environment variables
└── README.md

```

## Environment Variables

Create a `.env` file in the root directory. Example:

```
DATABASE_URL=postgres://username:password@localhost:5432/yourdb
PORT=3000
```

_See `.env.example` for a full list of variables required._

## Database Setup

1. Create a PostgreSQL database locally (e.g., `rentroll_dev`).
2. Update your `.env` file with the correct `DATABASE_URL`.
3. Use the provided seeding scripts to populate tables.

## Seeding Data

- Seed rooms:
    ```bash
    npm run seed:rooms
    ```
- Seed all (recommended first run):
    ```bash
    npm run seed:all
    ```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

## License

This project is licensed under the ISC License. See [LICENSE](LICENSE) for details.

---

**Happy Renting!**
