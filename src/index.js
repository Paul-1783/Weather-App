import "./style.css";

import allThingsTimeRelated from "./time";
import { format } from "date-fns";
import findImg from "./picture";
import someMath from "./math";

const weatherAppComplete = document.querySelector(".weatherAppComplete");

const dustbin = document.querySelector(".dustbin");
const inputField = document.querySelector(".inputField");
const submitButton = document.querySelector(".submitButton");

const hourEntries = document.querySelector(".hourEntries");
const hourArrowLeft = document.querySelector(".arrowLeft");
const hourArrowRight = document.querySelector(".arrowRight");

const dayEntries = document.querySelector(".dayEntries");
const daysArrowLeft = document.querySelector(".dayLeft");
const daysArrowRight = document.querySelector(".dayRight");

const rainfall = document.querySelector(".rainfall");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".windSpeed");
const todaysDate = document.querySelector(".todaysDate");
const weatherLocation = document.querySelector(".location");
const timeNow = document.querySelector(".timeNow");
const currentWeather = document.querySelector(".currentWeather");
const temperatureHeader = document.querySelector(".temperatureHeader");

const toggleCheckbox = document.querySelector(".toggle-checkbox");

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
      setBackgroundImage(result.currentConditions);
      allThingsTimeRelated.setStoredHours(result.days[0].hours);
      allThingsTimeRelated.setStoredDays(result.days);
      allThingsTimeRelated.setStoredNewDay(result.days[0]);
      allThingsTimeRelated.setStoredAddress(result.resolvedAddress);
      allThingsTimeRelated.saveLocalTime(result.currentConditions.datetime);
      fillTodayContainer(result.days[0]);
      addHourlyPreviewElements();
      addDailyPreviewElements();
    })
    .catch((err) => {
      console.log("ERROR during fetch request: ", err);
    });
}

toggleCheckbox.addEventListener("change", () => {
  if (allThingsTimeRelated.checkForExistenceNewDay()) {
    fillTodayContainer(allThingsTimeRelated.retrieveStoredNewDay());
  } else {
    fillTodayContainer(allThingsTimeRelated.retrieveStoredDays()[0]);
  }
  addHourlyPreviewElements();
  addDailyPreviewElements();
});

function ifToggledChange(elem) {
  return toggleCheckbox.checked
    ? `${someMath.roundToOneDecimal(someMath.fahrenheitToCelsius(elem.temp))}°`
    : `°${someMath.roundToOneDecimal(elem.temp)}`;
}

function ifToggledChangeMin(elem) {
  return toggleCheckbox.checked
    ? `${someMath.roundToOneDecimal(
        someMath.fahrenheitToCelsius(elem.tempmin)
      )}°`
    : `°${someMath.roundToOneDecimal(elem.tempmin)}`;
}

function ifToggledChangeMax(elem) {
  return toggleCheckbox.checked
    ? `${someMath.roundToOneDecimal(
        someMath.fahrenheitToCelsius(elem.tempmax)
      )}°`
    : `°${someMath.roundToOneDecimal(elem.tempmax)}`;
}

function fillTodayContainer(day) {
  let resolvedAddress = allThingsTimeRelated.retrieveStoredAddress();
  currentWeather.src = findImg(day, "nope");
  currentWeather.style.display = "inline-block";
  rainfall.textContent = `Rainfall: ${day.precipprob}%`;
  humidity.textContent = `Humidity: ${day.humidity}%`;
  windSpeed.textContent = `WindSpeed: ${day.windspeed} mph`;
  temperatureHeader.textContent = `${ifToggledChange(day)}`;
  todaysDate.textContent = formattedDate(day.datetime);
  weatherLocation.textContent = resolvedAddress;
  timeNow.textContent = `Time of Day: ${allThingsTimeRelated
    .retrieveLocalTime()
    .substring(0, 5)}`;
}

hourArrowLeft.addEventListener("click", () => {
  let storedHourIndex = allThingsTimeRelated.retrieveStoredHourIndex();
  if (storedHourIndex === 0) {
    allThingsTimeRelated.setStoredHourIndex(23);
  } else {
    allThingsTimeRelated.setStoredHourIndex(storedHourIndex - 1);
  }
  addHourlyPreviewElements();
});

hourArrowRight.addEventListener("click", () => {
  allThingsTimeRelated.setStoredHourIndex(
    allThingsTimeRelated.retrieveStoredHourIndex() + 1
  );
  addHourlyPreviewElements();
});

function addHourlyPreviewElements() {
  allThingsTimeRelated.clearHourEntries(hourEntries);

  let index =
    allThingsTimeRelated.retrieveStoredHourIndex() > -1
      ? allThingsTimeRelated.retrieveStoredHourIndex()
      : 0;
  let max = index + 7;
  let hours = allThingsTimeRelated.retrieveStoredHours();
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
  let storedDayIndex = allThingsTimeRelated.retrieveStoredDayIndex();
  if (storedDayIndex === 0) {
    allThingsTimeRelated.setStoredDayIndex(14);
  } else {
    allThingsTimeRelated.setStoredDayIndex(storedDayIndex - 1);
  }
  addDailyPreviewElements();
});

daysArrowRight.addEventListener("click", () => {
  allThingsTimeRelated.setStoredDayIndex(
    allThingsTimeRelated.retrieveStoredDayIndex() + 1
  );
  addDailyPreviewElements();
});

function addDailyPreviewElements() {
  allThingsTimeRelated.clearDayEntries(dayEntries);

  let index =
    allThingsTimeRelated.retrieveStoredDayIndex() > -1
      ? allThingsTimeRelated.retrieveStoredDayIndex()
      : 0;
  let max = index + 2;
  let days = allThingsTimeRelated.retrieveStoredDays();
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
    allThingsTimeRelated.setStoredNewDay(day);
    allThingsTimeRelated.setStoredHours(day.hours);
    addHourlyPreviewElements();
    fillTodayContainer(day);
  });
  return dailyPreviewElem;
}
