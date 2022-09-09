# OSENI_20220903

Welcome to the API for video upload

## Setup instructions

- Clone the repo to your computer by either https or ssh.
- Create a copy of the `.env.example` in both the client and video folder and name it `.env`
- Use the temporary Cloudinary credentials attached to the email
- `cd` into `video folder` and run the npm command `npm install` to fetch all the required packages.
- `cd` into `client folder` and run the npm command `npm install` to fetch all the required packages.
- Create your prefer database name and add the `uri` as an environmental variable using the `.env.example` file
- To run all migrations, run `npm run db:migrate`
- To undo the last migration, run `npm run db:unmigrate:last`
- To rollover all migrations, run `npm run db:unmigrate:all`

The following api are available at the backend

```
Get all categories: GET /api/v1/categories
Generate Thumbnail: POST /api/v1/:videoId
Get Thumbnail: GET /api/v1/:videoId
Get Videos: GE T/api/v1/videos
Upload Videos: POST /api/v1/videos
```

There are some dependent packages installed globally, you should install them separately incase the `npm install` command didn't get them.

- knex

Note:

```
Cloudinary only allows file uploads up to 100MB for free accounts
```
