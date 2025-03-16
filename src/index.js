import "./style.css";

import sunnyImage from "./icons/sun/sunny.png";
import clearNightImage from "./icons/night/clear_night.png";
import partlyCloudyNight from "./icons/night/partly_cloudy_night.png";
import sunLightCloudsImage from "./icons/sun/sun_light_clouds.png";
import snowImage from "./icons/night/partly_cloudy_night.png";
import rainImage from "./icons/rain/rainy.png";
import cloudyImage from "./icons/cloud/few_clouds.png";
import cloudyNightImage from "./icons/night/cloudy_night.png";
import fogImage from "./icons/cloud/cloudy.png";

import clearSky from "./backgroundPics/cloud/clear_sky.jpg";
import fewClouds from "./backgroundPics/cloud/few_clouds.jpg";
import cloudy from "./backgroundPics/cloud/cloudy.jpg";
import snowy from "./backgroundPics/snow/snow.jpg";
import lightRain from "./backgroundPics/rain/light_rain.jpg";
import foggy from "./backgroundPics/sun/sunny.jpg";
import nightPartiallyCloudy from "./backgroundPics/night/partly_cloudy_night.jpg";
import nightCloudy from "./backgroundPics/night/cloudy_night.jpg";

import { format, constructNow } from "date-fns";

// const { esm } = require("webpack");

const weatherAppComplete = document.querySelector(".weatherAppComplete");

const dustbin = document.querySelector(".dustbin");
const inputField = document.querySelector(".inputField");
const searchbar = document.querySelector(".searchbar");
const submitButton = document.querySelector(".submitButton");

const todayContainer = document.querySelector(".todayContainer");
const hourEntries = document.querySelector(".hourEntries");
const hourArrowLeft = document.querySelector(".arrowLeft");
const hourArrowRight = document.querySelector(".arrowRight");

const dayEntries = document.querySelector(".dayEntries");
const daysArrowLeft = document.querySelector(".dayLeft");
const daysArrowRight = document.querySelector(".dayRight");

const todaysWeather = document.querySelector(".todaysWeather");
const dateAndLocation = document.querySelector(".dateAndLocation");

const sevenDayCarousel = document.querySelector(".oneDayCarousel");

const rainfall = document.querySelector(".rainfall");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const todaysDate = document.querySelector(".todaysDate");
const weatherLocation = document.querySelector(".location");
const timeNow = document.querySelector(".timeNow");
const currentWeather = document.querySelector(".currentWeather");
const temperatureHeader = document.querySelector(".temperatureHeader");

const toggleCheckbox = document.querySelector(".toggle-checkbox");

function findImg(elem, purpose) {
  if (elem.icon === "clear-day") {
    return purpose === "background" ? clearSky : sunnyImage;
  } else if (elem.icon === "clear-night") {
    return purpose === "background" ? nightPartiallyCloudy : clearNightImage;
  } else if (elem.icon === "partly-cloudy-day") {
    return purpose === "background" ? fewClouds : sunLightCloudsImage;
  } else if (elem.icon === "partly-cloudy-night") {
    return purpose === "background" ? nightPartiallyCloudy : partlyCloudyNight;
  } else if (elem.icon === "snow") {
    return purpose === "background" ? snowy : snowImage;
  } else if (elem.icon === "rain") {
    return purpose === "background" ? lightRain : rainImage;
  } else if (elem.icon === "cloudy") {
    return purpose === "background" ? cloudy : cloudyImage;
  } else if (elem.icon === "cloudy-night") {
    return purpose === "background" ? nightCloudy : cloudyNightImage;
  } else if (elem.icon === "fog") {
    return purpose === "background" ? foggy : fogImage;
  }
}

function setBackgroundImage(currentConditions) {
  weatherAppComplete.style.backgroundImage = `url(${findImg(
    currentConditions,
    "background"
  )})`;
}

function formattedDate(dateToBeFormatted) {
  const dates = dateToBeFormatted.split(/:|-/);
  return format(new Date(dates[0], dates[1], dates[2]), "PPPP");
}

function returnCurrentTime() {
  return `${constructNow()}`.split(" ")[4].substring(0, 5);
}

submitButton.addEventListener("click", () => {
  if (inputField.value !== "") {
    const queryString = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputField.value}?unitGroup=us&key=W49LDYR5GRQ8HTKZMYKJY5M8C&contentType=json&key=W49LDYR5GRQ8HTKZMYKJY5M8C`;
    fetchData(queryString);
  }
});

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const queryString = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputField.value}?unitGroup=us&key=W49LDYR5GRQ8HTKZMYKJY5M8C&contentType=json&key=W49LDYR5GRQ8HTKZMYKJY5M8C`;
    fetchData(queryString);
  }
});

window.addEventListener("load", () => {
  const queryString = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Berlin?unitGroup=us&key=W49LDYR5GRQ8HTKZMYKJY5M8C&contentType=json&key=W49LDYR5GRQ8HTKZMYKJY5M8C`;
  fetchData(queryString);
});

dustbin.addEventListener("click", () => {
  inputField.value = "";
});

function fetchData(queryString) {
  fetch(queryString, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      setBackgroundImage(result.currentConditions);
      setStoredHours(result.days[0].hours);
      setStoredDays(result.days);
      setStoredAddress(result.resolvedAddress);
      saveLocalTime(result.currentConditions.datetime);
      fillTodayContainer(result.days[0]);
      addHourlyPreviewElements();
      addDailyPreviewElements();
    })
    .catch((err) => {
      console.log("ERROR during fetch request: ", err);
    });
}

toggleCheckbox.addEventListener("change", () => {
  if (checkForExistenceNewDay()) {
    fillTodayContainer(retrieveStoredNewDay());
  } else {
    fillTodayContainer(retrieveStoredDays()[0]);
  }
  addHourlyPreviewElements();
  addDailyPreviewElements();
});

function celsiusToFahrenheit(temperature) {
  return temperature * 1, 8 + 32;
}

function fahrenheitToCelsius(temperature) {
  return (temperature - 32) / 1.8;
}

function roundToOneDecimal(number) {
  return Math.round(number * 10) / 10;
}

function ifToggledChange(elem) {
  return toggleCheckbox.checked
    ? `${roundToOneDecimal(fahrenheitToCelsius(elem.temp))}°`
    : `°${roundToOneDecimal(elem.temp)}`;
}

function ifToggledChangeMin(elem) {
  return toggleCheckbox.checked
    ? `${roundToOneDecimal(fahrenheitToCelsius(elem.tempmin))}°`
    : `°${roundToOneDecimal(elem.tempmin)}`;
}

function ifToggledChangeMax(elem) {
  return toggleCheckbox.checked
    ? `${roundToOneDecimal(fahrenheitToCelsius(elem.tempmax))}°`
    : `°${roundToOneDecimal(elem.tempmax)}`;
}

function fillTodayContainer(day) {
  let resolvedAddress = retrieveStoredAddress();
  currentWeather.src = findImg(day, "nope");
  currentWeather.style.display = "inline-block";
  rainfall.textContent = `Rainfall: ${day.precipprob}%`;
  humidity.textContent = `Humidity: ${day.humidity}%`;
  windSpeed.textContent = `WindSpeed: ${day.windspeed} mph`;
  temperatureHeader.textContent = `${ifToggledChange(day)}`;
  todaysDate.textContent = formattedDate(day.datetime);
  weatherLocation.textContent = resolvedAddress;
  timeNow.textContent = `Time of Day: ${retrieveLocalTime().substring(0, 5)}`;
}

hourArrowLeft.addEventListener("click", () => {
  let storedHourIndex = retrieveStoredHourIndex();
  if (storedHourIndex === 0) {
    setStoredHourIndex(23);
  } else {
    setStoredHourIndex(storedHourIndex - 1);
  }
  addHourlyPreviewElements();
});

hourArrowRight.addEventListener("click", () => {
  setStoredHourIndex(retrieveStoredHourIndex() + 1);
  addHourlyPreviewElements();
});

function addHourlyPreviewElements() {
  clearHourEntries();

  let index = retrieveStoredHourIndex() > -1 ? retrieveStoredHourIndex() : 0;
  let max = index + 7;
  let hours = retrieveStoredHours();
  for (let i = index; i < max; ++i) {
    const newHourlyPreviewElem = buildHourlyPreviewElem(hours[i % 24]);
    hourEntries.appendChild(newHourlyPreviewElem);
  }
}

function buildHourlyPreviewElem(hour) {
  const imgSrc = findImg(hour, "nope");
  const hourlyPreviewElem = document.createElement("div");
  hourlyPreviewElem.classList.add("hourlyPreviewElem");
  hourlyPreviewElem.insertAdjacentHTML(
    "beforeend",
    `<p class="timeOfDay">${hour.datetime.substring(0, 5)}</p>
        <img class="iconOfHour" src="${imgSrc}">
      <p class="temperatureOfHour">${ifToggledChange(hour)}</p>`
  );
  return hourlyPreviewElem;
}

daysArrowLeft.addEventListener("click", () => {
  let storedDayIndex = retrieveStoredDayIndex();
  if (storedDayIndex === 0) {
    setStoredDayIndex(14);
  } else {
    setStoredDayIndex(storedDayIndex - 1);
  }
  addDailyPreviewElements();
});

daysArrowRight.addEventListener("click", () => {
  setStoredDayIndex(retrieveStoredDayIndex() + 1);
  addDailyPreviewElements();
});

function addDailyPreviewElements() {
  clearDayEntries();

  let index = retrieveStoredDayIndex() > -1 ? retrieveStoredDayIndex() : 0;
  let max = index + 2;
  let days = retrieveStoredDays();
  for (let i = index; i <= max; ++i) {
    const newDailyPreviewElem = buildDailyPreviewElements(days[i % 15]);
    dayEntries.appendChild(newDailyPreviewElem);
  }
}

function buildDailyPreviewElements(day) {
  const imgSrc = findImg(day, "nope");
  const dailyPreviewElem = document.createElement("div");
  dailyPreviewElem.classList.add("dailyPreviewElem");
  dailyPreviewElem.insertAdjacentHTML(
    "beforeend",
    `<p class="dayOfWeek">${formattedDate(day.datetime)}</p>
        <img class="iconOfDay" src="${imgSrc}">
      <p class="temperatureRangeOfDay">${ifToggledChangeMin(
        day
      )} - ${ifToggledChangeMax(day)}</p>
      <span class="dateOfDay">${day.datetime}</span>`
  );
  dailyPreviewElem.addEventListener("click", () => {
    setStoredNewDay(day);
    setStoredHours(day.hours);
    addHourlyPreviewElements();
    fillTodayContainer(day);
  });
  return dailyPreviewElem;
}

function saveLocalTime(localTime) {
  localStorage.setItem("pingedLocalTime", JSON.stringify(localTime));
}

function retrieveLocalTime() {
  return JSON.parse(localStorage.getItem("pingedLocalTime"));
}

function checkForExistenceNewDay() {
  return localStorage.getItem("newDay") !== null;
}

function retrieveStoredNewDay() {
  return JSON.parse(localStorage.getItem("newDay"));
}

function setStoredNewDay(newDay) {
  localStorage.setItem("newDay", JSON.stringify(newDay));
}

function deleteStoredNewDay() {
  localStorage.removeItem("newDay");
}

function retrieveStoredAddress() {
  return JSON.parse(localStorage.getItem("address"));
}

function setStoredAddress(address) {
  localStorage.setItem("address", JSON.stringify(address));
}

function deleteStoredAddress() {
  localStorage.removeItem("address");
}

function retrieveStoredDays() {
  return JSON.parse(localStorage.getItem("days"));
}

function setStoredDays(newDays) {
  localStorage.setItem("days", JSON.stringify(newDays));
}

function deleteStoredDays() {
  localStorage.removeItem("days");
}

function retrieveStoredDayIndex() {
  return JSON.parse(localStorage.getItem("dayIndex"));
}

function setStoredDayIndex(index) {
  localStorage.setItem("dayIndex", JSON.stringify(index));
}

function deleteStoredDayIndex() {
  localStorage.removeItem("dayIndex");
}

function retrieveStoredHours() {
  return JSON.parse(localStorage.getItem("hours"));
}

function setStoredHours(newHours) {
  localStorage.setItem("hours", JSON.stringify(newHours));
}

function deleteStoredHours() {
  localStorage.removeItem("hours");
}

function retrieveStoredHourIndex() {
  return JSON.parse(localStorage.getItem("hourIndex"));
}

function setStoredHourIndex(index) {
  localStorage.setItem("hourIndex", JSON.stringify(index));
}

function deleteStoredHourIndex() {
  localStorage.removeItem("hourIndex");
}

function clearHourEntries() {
  hourEntries.innerHTML = "";
}

function clearDayEntries() {
  dayEntries.innerHTML = "";
}
