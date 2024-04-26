This file describes the structure and purpose of the GameShelf app.

The goal of this project is to create an web application using a single table which can be queried in different ways to display the info differently.
The user will be able to create new entries in the table.
At present, there are no plans to implement a user system using a server, but this could change in the future.

The goal of GameShelf is to create an app that the user can use to keep track of video games that they have played, rate them, and share them by exporting the data to a spreadsheet.
Using an API to fill database entries would be ideal. The current API to use in mind is the IGDB API.

In the current model, the Shelf will be split into 3 tabs: Plan to play, Playing, Finished.  These attributes will be store as a single column in the databased as "Status."
Rating can potentially be split up into several attributes like "music rating," "gameplay rating," etc. instead of just an overall rating.
Month and year can be separate attributes for sorting purposes.

Items can be displayed using SELECT queries.  Depending on the status (which tab we are under), we can display different tables using the where clause.
Queries can also be filtered further by date (year, month+year), or all can be displayed perhaps under its own tab.
After inserting, items can also be edited, usually in order to change their status or rating.  There are two ways to tackle this: Editing an existing entry, or delete an entry and re create it.
