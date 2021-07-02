//const { url } = require("inspector");

/* Global Variables */
const btnGenerator=document.getElementById('generate');
const  zipKey=document.getElementById('zip');
let feeling = document.getElementById('feelings');
let entryHolder = document.getElementById('entryHolder');
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');
let currentFeelings=document.getElementById('currentFeelings');
let appId="&appid=";
let apiKey="a48a0bbb0342c0230fb8267b21c220be";
appId+=apiKey;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
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
        console.log(newData);
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
    const request = await fetch('/fakeWeatherData');
    try{
      const allData = await request.json();
      console.log(allData);
      date.innerHTML = allData.date;
      temp.innerHTML = allData.temp;
      content.innerHTML = allData.content;
      currentFeelings.innerHTML=allData.feelings;
  
    }catch(error){
      console.log("error", error);
    }
  }
// get data
function getWeather(event) {
    event.preventDefault();
    if(!zipKey.value){
        alert('Please Enter Zip code')
    }
    else{
    getData(baseUrl+zipKey.value+appId)
    .then(function (allData) {
        postData('/fakeWeatherData',{ date : newDate, 
            temp: allData.main.temp, content:allData.weather[0].description, feelings: feeling.value })     
    })
    .then(
        updateUI()
    )
    }
}
// Events
btnGenerator.addEventListener('click',getWeather);