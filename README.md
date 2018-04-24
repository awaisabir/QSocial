# QSocial

A full-stack Javascript app I am creating to help me practice advanced concepts in modern JS technologies. Users will be able to perform CRUD operations on posts, comments, profiles (admins), all together with having their security in mind! This app will be accompanied by a React Native app as well (soon) ...

Tech being used are:

- Express.js
- Passport.js
- SQLite (Sequelize)
- JWT Authorization
- Cloudinary API

- React.js
- React Router
- Redux
- SemanticUI

--------

## Setup
Please ensure you have stable versions of `node`, `sqlite` and `yarn`/`npm` installed

To get set up:

- Insert your environment variables in `.env.example` and rename the file to `.env`.

- Ensure that you have `PRAGMA Foreign_keys=ON;` in your `~/.sqliterc` file, or else there will be no foreign key support for sqlite.

Once you are setup, do the following:

```[bash]
# server
cd/server
yarn install && yarn start
```

```[bash]
# frontend
cd/client
yarn install && yarn start
```

## Current Status :nut_and_bolt: :zap: :hammer:

### Backend

- Need to update to SQL before anything!
- Need to complete the Posts API.
  - Get Like and dislikes working
- Trying to create more endpoints for the API.
- Add Cloudinary API Support for picture uploads.

### Frontend

- Need to add more complexity to the Profile Page.

Created & Maintained by [@awaisabir](https://github.com/awaisabir)