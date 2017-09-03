# SENG3150 Frontend
Note: please have the backend running before carrying out these steps, so the backend can provide the data from the database.

1. In the root folder with windows cmd or powershell run: "npm install", this will install all of the required node_modules
2. In the src/assets folder, run "bower install" this will install the bootstap and jquery dependecies
3. Open up the Services/data.service.ts file in your chosen editor. There will be a variable: apiUrl. Change this to your backend url. Its default is localhost:8080
4. Back to the root, run "npm start"
   4.1 Note this will not open up the browser
   4.2 Open up your browser and navigate to localhost:4200