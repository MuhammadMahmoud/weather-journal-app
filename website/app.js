//const { url } = require("inspector");

/* Global Variables */
const btnGenerator=document.getElementById('generate');
const  zipKey=document.getElementById('zip');
let feeling = document.getElementById('feelings');
let entryHolder = document.getElementById('entryHolder');
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');
//const baseUrl = "http://localhost:3000/?";
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
    return allData;
    }
    catch(error) {
      console.log("error", error);
    }
};
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      console.log(allData);
      date.innerHTML = allData.date;
      temp.innerHTML = allData.temp;
      content.innerHTML = allData.content;
  
    }catch(error){
      console.log("error", error);
    }
  }
// get data
function getWeather(event) {
    event.preventDefault();
    getData('/fakeWeatherData')
    .then(function (allData) {
        postData('/fakeWeatherData',{ date : allData.date, 
            temp: allData.temp, content:allData.content, feelings: feeling.value })     
    })
    .then(
        updateUI()
    )
}
// Events
btnGenerator.addEventListener('click',getWeather);