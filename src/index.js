import "./styles.css";
import snow from "./images/snow.jpg";
import rain from "./images/rain.jpg";
import fog from "./images/fog.jpg";
import wind from "./images/wind.jpg";
import cloudy from "./images/cloudy.jpg";
import clear from "./images/clear.jpg";

const body = document.querySelector("body");
const container = document.querySelector(".container");

const address = document.querySelector(".address");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windspeed = document.querySelector(".windspeed");
const description = document.querySelector(".description");

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.toLowerCase()}?unitGroup=metric&key=JSZ9X24E2898KKB5RUURCM65H&contentType=json`
    );
    const weatherData = await response.json();
    console.log(weatherData);

    renderInfo(weatherData);
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Something went wrong... Please, refresh";
    errorMessage.classList.add("error");

    container.innerHTML = "";
    container.appendChild(errorMessage);
  }
}

function renderInfo(data) {
  address.textContent = data.address.toUpperCase();
  temp.textContent = `${data.currentConditions.temp}° C`;
  humidity.textContent = `${data.currentConditions.humidity} %`;
  windspeed.textContent = `${data.currentConditions.windspeed} m/s`;
  description.textContent = data.description;

  let currentBg;
  switch (data.currentConditions.icon) {
    case "snow":
      currentBg = snow;
      break;
    case "rain":
      currentBg = rain;
      break;
    case "fog":
      currentBg = fog;
      break;
    case "wind":
      currentBg = wind;
    case "cloudy":
    case "partly-cloudy-day":
    case "partly-cloudy-night":
      currentBg = cloudy;
      break;
    case "clear-day":
    case "clear-night":
    default:
      currentBg = clear;
      break;
  }

  body.style.background = `url(${currentBg})`;
  body.style.backgroundPosition = "center center";
}

getWeatherData("london");

const form = document.querySelector("form");
const input = document.querySelector("#locationInput");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  getWeatherData(input.value);

  input.value = "";
});
