Welcome to GameShelf by Thomas Littmann.

This project is a work in progress, and will be changed significantly as time goes on. A decription of the intended functionality of the project can be found in gameShelfDesign.md.

Currently, the requirements to use the software are that one must have Node in order to get the packages, a MySQL database set up, and an account with Twitch.tv in order to create the API key for the API that this project uses. A .env file will need to be set up using the .env.template found in the root of the project.
In theory, a user would not need to create this API key on there own from Twitch.tv, and would be provided one, but the project is not in that stage.

This project uses Typescript, and the middleware functionality is contained in app.ts.  This app calls functions from the server.ts in order to communicate with the MySQL server, and the server.ts file makes use of queries.ts to reference MySQL query strings.  Finally, the igdb.service.ts is a file that handles the API calls from igdb itself, so the other files do not need to worry about them.

The current plan for the front end is to use Angular, but as of this commit, has not been started yet.