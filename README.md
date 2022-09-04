# OSENI_20220903

Welcome to the API for video upload

## Setup instructions

- Clone the repo to your computer by either https or ssh.
- Create a copy of the `.env.example` file and name it `.env`
- `cd` into `video folder` and run the npm command `npm install` to fetch all the required packages.
- Create your prefer database name and add the `uri` as an environmental variable using the `.env.example` file
- To run all migrations, run `npm run db:migrate`
- To undo the last migration, run `npm run db:unmigrate:last`
- To rollover all migrations, run `npm run db:unmigrate:all`
- To seed data into the database, run `npm run db:seed`

There are some dependent packages installed globally, you should install them separately incase the `npm install` command didn't get them.

- knex
