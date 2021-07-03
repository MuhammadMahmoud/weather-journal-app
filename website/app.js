//const { url } = require("inspector");

/* Global Variables */
//the const that we will build event click on
const btnGenerator = document.getElementById('generate');
//zip code that will get data with
const zipKey = document.getElementById('zip'); // 21917 for testing
// the feeling that will be inculde with the api data on the local server
let feeling = document.getElementById('feelings');
let entryHolder = document.getElementById('entryHolder');
// post data for local server
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');
let currentFeelings = document.getElementById('currentFeelings');
//build the url
let appId = "&appid=";
const apiKey = "a48a0bbb0342c0230fb8267b21c220be";
const cred="&units=imperial";
appId += apiKey + cred;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
//functions
// async post
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        //return data for the promise chain 
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}
//async get
const getData = async (url = '') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        return allData;
    } catch (error) {
        console.log("error", error);
    }
};
// update the ui after we post the data
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        date.innerHTML = allData.date;
        temp.innerHTML = allData.temp;
        content.innerHTML = allData.content;
        currentFeelings.innerHTML = allData.feelings;

    } catch (error) {
        alert("Error : "+ error)
    }
}
// get data
function getWeather(event) {
    //event.preventDefault();
    if(!zipKey.value){
        alert("Please Enter Zip Code")
    }
    else{
    // get the data from the weather website
    getData(baseUrl + zipKey.value + appId)
        // save it on our local server
        .then(function(allData) {
            postData('/fakeWeatherData', {
                date: newDate,
                temp: allData.main.temp,
                content: allData.weather[0].description,
                feelings: feeling.value
            })
        })
        //make sure to return from the second promise for accurate excution & to show on the website
        .then(function(newData) {
            updateUI()

        })
    }
}
// Events
btnGenerator.addEventListener('click', getWeather);