//const { url } = require("inspector");

/* Global Variables */
const btnGenerator=document.getElementById('generate');
const feelings = document.getElementById('feelings');
const  zipKey=document.getElementById('zip');
const url = "/fakeWeatherData";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//functions
// async post
const postData= async (url='',data={})=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error",error);
    }
}
//async get
const getData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    const allData = await request.json()
    console.log(allData);
    }
    catch(error) {
      console.log("error", error);
    }
};
// get data
function getWeather(event) {
    event.preventDefault();
}
// Events
btnGenerator.addEventListener('click',getWeather);