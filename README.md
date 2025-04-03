# Z-Prefix Application

#How to install an run application

- Step 1: Clone down this repository

- Step 2: Get server up and running
Use your terminal to ```cd``` into the server directory

Create a new .env file and add a DB_CONNECTION_STRING to your applicable database

It should look like this "DB_CONNECTION_STRING=`postgres://{postgres username}:{postgres password}@localhost:{database port}/{database name}` replace the items in the curly brackets with your information

- Step 3: Migrate and seed database
While still in the server directory, run ```npx knex migrate:latest``` then ```npx knex seed:run```

- Step 4: Start the Express server
Run ```npm start```

- Step 5: Get client side up and running
Use your terminal to cd into the client directory
Run ```npm install``` to install vite and other applicable node modules
Run ```npm start``` to load client into Chrome browser