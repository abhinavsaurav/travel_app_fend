// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server

const port = 3000;
const server = app.listen(port, listening);

app.get("/test", async (req, res) => {
	res.json({ message: "pass!" });
});

function listening() {
	console.log("Server Started");
	console.log(`Sever Running at port:${port}`);
}

app.get("/projData", retProjData);

/**
 *
 * @description Returns the JS endpoint object value
 *
 */

function retProjData(req, res) {
	console.log("returning proj data");
	console.log(projectData);
	res.send(projectData);
}

/**
 *
 * @description Used for adding the data to the JS endpoint object value
 *
 */

app.post("/addToProjData", addToGeoData);
function addToGeoData(req, res) {
	//check the u_response and also do we need to add it to array?
	console.log(req.body);
	projectData = {
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		country: req.body.country,
	};
	console.log(`Inisde Adding ProjData ${projectData}`);
	res.send({ test: "test" });
}

/**
 * @description Server route for adding weather data
 *
 */

let weatherData = {};
app.post("/addWeatherData", addWeatherData);
function addWeatherData(req, res) {
	console.log(req.body);
	projectData["temperature"] = req.body.temperature;
	projectData["description"] = req.body.description;
	projectData["icon"] = req.body.icon;
	console.log(projectData);
	res.send({ test: "test" });
}

/**
 * @description Server route for adding Image data
 *
 */

app.post("/addImageData", addImageData);
function addImageData(req, res) {
	console.log(req.body);
	projectData["imageUrl"] = req.body.imageUrl;
	console.log(projectData);
	res.send({ test: "test" });
}

module.exports = app;
