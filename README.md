# Husky Coin Tracker

This repository contains the CS4550 final project for Isaac Sadhwani, Bryce Erickson, Harry Allex, Kevin Park and Patrick Buck. Our project is a crypto paper trading and portfolio app with an astro frontend and a go backend. Our database is pocketbase and interacts with our code using CRUD endpoints.  

## How to Run Locally
First, install the necessary node packages with  
```
npm install
```

Next, navigate to `Frontend/husky-coin-tracker` and run the init script to populate the local database  
```
cd Frontend/husky-coin-tracker  
npm run init
```

Run the next script to launch the local database  
```
npm run start-server
```

Now in a seperate terminal window you can start the frontend with command 
``` npm start```

## Page requirements
#### Home page: 
 - Crypto dashboard page

#### Search page 
- Built inside of home page

#### Profile page
- Navigable by clicking the profile icon on the top right of the screen
  
#### Details page
- Coin page, navigable by clicking on any coin on the dashboard
  
#### Login/register page
- Navigable by clicking on the profile icon before logging in




