// Setup empty JS object to act as endpoint for all routes
projectData = [{ date : 'Mon Jun 28 2021 13:11:09 GMT+0200 (Eastern European Standard Time)',
    temp: 'Very Hot',
    content: 'bla bla bla bla bla bla',
    feelings: '',
}];

// Require Express to run server and routes
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=3000;
const server=app.listen(port,listening);
function listening(){
    console.log(`running on localhost: ${port}`);
}
// Server Routes 
app.get('/fakeWeatherData',sendData);
app.post('/fakeWeatherData',insertData);
app.get('/all',sendData);
function sendData(request,response) {
    response.send(projectData);
    console.log(`this data has been sent ${ projectData}`);
}
function insertData(request,response) {
    let newEntry={
        date : request.body.date,
    temp: request.body.temp,
    content: request.body.content,
    feelings: request.body.feelings,
    }
    
    projectData.push(newEntry);
    response.send(projectData);
    
}