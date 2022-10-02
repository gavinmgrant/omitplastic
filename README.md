# OmitPlastic

This full-stack app is designed to help people reduce plastic consumption by purchasing products with less plastic content. However, this full-stack e-commerce affiliate app that uses Next.js, Prisma, and PostgreSQL can be adapted for other types of products. The affiliate marketing program used is [Amazon Associates](https://affiliate-program.amazon.com/). 

## Technology

* TypeScript - strongly typed programming language
* ReactJS - user interface library
* NextJS - React framework for production
* Tailwind CSS - CSS framework
* PostgreSQL - relational database management system
* Prisma - database toolkit for PostgreSQL
* SWR - React hooks for data fetching
* Vercel - platform for deploying and hosting
* React Spring - component animations

## Setup

* Clone this repository to your local computer.
* Install the dependencies for the project: `npm install` or `yarn install`
* Create a free PostgreSQL database on Heroku. [Follow these steps.](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1)
* Bootstrap a basic Prisma setup: `npx prisma init`
* Open the `example.env` file and replace the dummy connection URL `DATABASE_URL` with the connection URL of your PostgreSQL database.
* After you've added ave it as the `.env` file.
* Create the tables in the database using Prisma: `npx prisma db push`
* Run the application locally: `npm run dev` or `yarn dev`
* Open `http://localhost:3000/` in your browser.

## Edit Database Schema

* Open the `schema.prisma` file.
* After you have made your changes, run `npx prisma db push` to update the database.
* Go here for more information about the [Prisma schema file](https://www.prisma.io/docs/concepts/components/prisma-schema).

## Edit Prisma Tables

* Run the command `npx prisma studio`
* This opens [Prisma Studio](https://www.prisma.io/studio).
