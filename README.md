# TaskLine

## Description

TaskLine is a simple and intuitive task management application that visualizes your tasks on a timeline. It allows you to create, edit, and delete tasks, set their start and end dates, assign colors, and view them clearly laid out across a monthly calendar. It supports optional Google authentication, allowing authenticated users to persist their tasks in a database, while unauthenticated users can continue to use the app with local storage. You can easily navigate between months and export your task data.

## Tech Stack

- Next.js (React)
- TypeScript
- Tailwind CSS
- NextAuth.js (for authentication)
- Prisma (ORM)
- PostgreSQL (database)
- Lucide React (for icons)
- Sonner (for toasts)
- ExcelJS (for Excel export)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Environment Variables

Create a `.env` file in the root of the project based on the `.env.example` file. You will need to provide the following:

- `DATABASE_URL`: Your PostgreSQL database connection string.
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID (from Google Cloud Console).
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret (from Google Cloud Console).
- `NEXTAUTH_SECRET`: A long, random string used to encrypt NextAuth.js sessions. You can generate one using `openssl rand -base64 32`.

### Database Setup

Once your `DATABASE_URL` is configured in the `.env` file, run the Prisma migrations to create the necessary database tables:

```bash
npx prisma migrate dev --name init
```

### Running the Application

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Note

This application was "vibe coded" as a test with the [Google Gemini CLI](https://github.com/google-gemini/gemini-cli).
