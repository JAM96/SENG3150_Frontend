# SENG3150 Frontend
## Dependencies steps:
------
1. Download and install [Visual Studio Code](https://code.visualstudio.com/Download).
2. Download and install [Node.JS](https://nodejs.org/en/).
+ Ensure you are downloading v7.10.0 Current
3. Download and install Bower through Node Package Manager (npm):
+ Install bower by opening a command window
+ Type in the following:
+ `npm install -g bower`
+ This will install bower globally to your computer

## Installing Packages
------
1. Go to the root of the SENG3150_Frontend.
2. Open a new command window in this folder.
3. Install the angular node-modules:
+ Type in: `npm install`
+ Note: this may output some errors, but it should be fine
4. Install bower components:
+ Navigate into the "src" folder of SENG3150_Frontend
+ Open a new command window in this folder
+ Use the following command: `bower install`
5. Start the front end client side server, by typing in `npm start` in the command window.
6. The website should load up into your default browser
+ If it doesn't load automatically, there may be some errors, or navigate to your browser and type in `localhost:PORT`
+ where port is the number provided in the output. (should be 3000)
	
Note: You have to have the backend running for the frontend to display the data from the database.