# OmitPlastic

This full-stack app is designed to help people reduce plastic consumption by purchasing products with less plastic content. However, this full-stack e-commerce affiliate app that uses Next.js, Prisma, and MySQL can be adapted for other types of products. The affiliate marketing program used is [Amazon Associates](https://affiliate-program.amazon.com/). 

## Technology

* TypeScript - strongly typed programming language
* ReactJS - user interface library
* NextJS - React framework for production
* Tailwind CSS - CSS framework
* MySQL - relational database management system
* Prisma - Node.js and TypeScript Object Relational Mapper
* Neon - database platform
* SWR - React hooks for data fetching
* Vercel - platform for deploying and hosting
* React Spring - component animations
* Cheerio - library for parsing and manipulating HTML and XML

## Setup

* Clone this repository to your local computer.
* Install the dependencies for the project: `npm install` or `yarn install`
* Create a free account and database on Neon.
* Bootstrap a basic Prisma setup: `npx prisma init`
* Create the tables in the database using Prisma: `npx prisma db push`
* Open the `example.env` file and replace the dummy connection URL `DATABASE_URL` with `'postgresql://<DATABASE_NAME>'`
* Run the application locally: `npm run dev` or `yarn dev`
* Open `http://localhost:3000/` in your browser.
* To deploy to Vercel [read this](https://neon.tech/docs/guides/vercel).

## Data Model Definition - Product
```
model Product {
  id          Int     
  asin        String  
  price       String  
  category    String
  type        String
  name        String 
  slug        String  
  imageUrl    String 
  url         String
  description String? 
  features    String
}
```

## Edit Database Schema

* Open the `schema.prisma` file.
* After you have made your changes, run `npx prisma db push` to update the database.
* Go here for more information about the [Prisma schema file](https://www.prisma.io/docs/concepts/components/prisma-schema).

## Edit Prisma Tables

* Run the command `npx prisma studio`
* This opens [Prisma Studio](https://www.prisma.io/studio).

## Scraping Amazon Web Page For Pricing

* This app checks for and updates the prices for all products by scraping its corresponding Amazon web page.
* To view the Node.js code for this, go to the [`pages/api/price` page](https://github.com/gavinmgrant/omitplastic/blob/main/pages/api/price.ts).
* The Cheerio library is used to parse and traverse markup data to get pricing and availability.
