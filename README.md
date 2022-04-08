# OmitPlastic

This full-stack app is designed to help people reduce plastic consumption by purchasing products with less plastic content.

## Technology

* TypeScript - strongly typed programming language
* ReactJS - user interface library
* NextJS - React framework for production
* Tailwind CSS - CSS framework
* PostgreSQL - relational database management system
* Prisma - database toolkit for PostgreSQL
* SWR - React hooks for data fetching
* Vercel - platform for deploying and hosting

## Setup

* Clone this repository to your local computer.
* Install the dependencies for the project: `npm install` or `yarn install`
* Create a free PostgreSQL database on Heroku. [Follow these steps.](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1)
* Bootstrap a basic Prisma setup: `npx prisma init`
* Open the `.env` file and replace the dummy connection UL with the connection UL of your PostgreSQL database.
* Create the tables in the database using Prisma: `npx prisma db push`
* Run the application locally: `npm run dev` or `yarn dev`
* Open `http://localhost:3000/` in your browser.
