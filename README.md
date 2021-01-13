# Wandir 
  [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

  ![wandir](./src/assets/logo_2.png)
  ## Description 
  Technologies Used:
  - Bulma - CSS Framework
  - React - Create app
  - Express
  - Sequelize ORM
  - Mentions \ Leaflet \ Cloudinary
  
   AS a traveler, I want a concise place to organize my wanderings based on geography
   SO I can share with friends and family, and keep my memories organized
   WHEN I travel I want to be able to keep a journal
   FOR that journal I want many geolocations to be associated to each post OR many post can belong to a single geography
   ALSO I need to be able to organize my photos. These photos will be tagged to post/geographies they belong to.

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  * [Contributions](#contributing)
  * [Tests](#tests)
  
  ## Installation 
  - ```git clone``` the repo. 
  - ```npm install``` to get the dependencies. 
  - ```mysql source``` the schema to instantiate the database, or run in mysql workbench.
  -  update confige/config.json to contain any relevant db changes such as name, password user etc.
  - create .env file at the root level containing SESSION_SECRET=password (password being a password you want to use for your session secret)
  -Upon first run, you will want to make sure the bottom of server.js file has ```force:true``` and ```seedModels()``` for your first sever start (this will build your models and seed the data)  
  - ```npm start``` or ```node server.js``` to start the server running on localhost://3000
  -At this time you should probably set ```force:false``` and comment out ```seedModels()```
  
  ## Usage
  Check out the live version here - [Wandir](https://wandir-front.herokuapp.com/) -  
  OR With the server running, navigate to localhost://3000 in your browser. 
  
  
  Add photos, delete photos, add geolocations, journal entries or view others journal entries/photos in a non-editable screen. You will have your own login to save all of your travels! 

  ## Credits
  The dream team! 
  - Hilary Valencia-Walsh |  [hilaryvalenciawalsh](https://github.com/hilaryvalenciawalsh) 
  - Chris Asmar | [asmarcd](https://github.com/asmarcd)  
  - Jonny Kemp  | [clubkemp](https://github.com/clubkemp)
  - Sean Morgan | [insideseanshead] (https://github.com/insideseanshead)
  
  ## License
  MIT
  
  ## Contributing
  Reach out if you would like to contribute
  
  ## Questions
  Have quesitons about this repo? Please reach out to any of us via github or via email
  * kempj2.jk@gmail.com
  * hilaryvalenciawalsh@gmail.com
