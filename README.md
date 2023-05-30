# Trip Report

## Description

‘Trip Report’ is a single page react app that invites users to create diary entries of their travels. Users can add titles, descriptions, and images to each entry. This project utilizes Material UI react framework.

This project is intended as a submission for the Flatiron School's Software Engineering phase-2 currculum.

## Features & Usage

[![Video walkthrough of Trip Report app](https://cdn.loom.com/sessions/thumbnails/d98c59ee811546118cb266a68d5c9375-with-play.gif)](https://www.loom.com/share/d98c59ee811546118cb266a68d5c9375)

Key features of the Trip Report web app are:
1. A local database of 3 trip reports
2. An 'album' view allowing users to view all trips
3. A 'new trip' form allowing users to create a new trip report
4. A 'trip detail' view that allows users to edit, delete, and/or like an indiviual trip.

All diary entries and changes to them are persisted to the local database.

## Installation

This web app requires a local JSON server to emulate a database and REST API. Follow these instructions to run the web app locally:
1. Download the codebase from this repository to a local computer
2. Install JSON Server. Instructions can be found here: https://www.npmjs.com/package/json-server
3. Start the JSON Server by navigating to the local directory where this repository is saved and running this command in the terminal: `$ json-server --watch db.json`
4. Verify that JSON Server is using this port `http://localhost:3000/` by navigating to that directory in a web browser.
5. Visit the Trip Report web app here: https://mike-elfassy.github.io/phase-2-project-trip-report/

## Support

Reach out to me via email for any questions, comments, or feedback. 

## Roadmap

1. To-do's
    * Add environment variables
2. Nice-to-haves
    * Add support for dark mode via React Context
    * Add 'like' checkbox to create & edit forms 
3. Stretch-goals
    * Add date picker to create & edit forms
    * Add support for user profiles
    * Deploy app


## Project status

This project is complete as of May 31, 2023 and there are no plans for further development

## Authors and acknowledgment

This project was built using [Material UI](https://mui.com/) framework. Many thanks to the designers and software developers for creating and supporting those tools.

## License

[MIT](https://choosealicense.com/licenses/mit/)