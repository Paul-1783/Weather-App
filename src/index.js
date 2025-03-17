import "./style.css";

import allThingsTimeRelated from "./time";
import findImg from "./picture";
import someMath from "./math";
import allSelectors from "./selector";

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

function setBackgroundImage(currentConditions) {
  allSelectors.weatherAppComplete.style.backgroundImage = `url(${findImg(
    currentConditions,
    "background"
  )})`;
}

allSelectors.submitButton.addEventListener("click", () => {
  if (allSelectors.inputField.value !== "") {
    const queryString = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${allSelectors.inputField.value}?unitGroup=us&key=W49LDYR5GRQ8HTKZMYKJY5M8C&contentType=json&key=W49LDYR5GRQ8HTKZMYKJY5M8C`;
    fetchData(queryString);
  }
});

allSelectors.inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const queryString = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${allSelectors.inputField.value}?unitGroup=us&key=W49LDYR5GRQ8HTKZMYKJY5M8C&contentType=json&key=W49LDYR5GRQ8HTKZMYKJY5M8C`;
    fetchData(queryString);
  }
});

window.addEventListener("load", () => {
  const queryString = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Berlin?unitGroup=us&key=W49LDYR5GRQ8HTKZMYKJY5M8C&contentType=json&key=W49LDYR5GRQ8HTKZMYKJY5M8C`;
  fetchData(queryString);
});

allSelectors.dustbin.addEventListener("click", () => {
  allSelectors.inputField.value = "";
});

allSelectors.toggleCheckbox.addEventListener("change", () => {
  if (allThingsTimeRelated.checkForExistenceNewDay()) {
    fillTodayContainer(allThingsTimeRelated.retrieveStoredNewDay());
  } else {
    fillTodayContainer(allThingsTimeRelated.retrieveStoredDays()[0]);
  }
  addHourlyPreviewElements();
  addDailyPreviewElements();
});

function ifToggledChange(elem) {
  return allSelectors.toggleCheckbox.checked
    ? `${someMath.roundToOneDecimal(someMath.fahrenheitToCelsius(elem.temp))}°`
    : `°${someMath.roundToOneDecimal(elem.temp)}`;
}

function ifToggledChangeMin(elem) {
  return allSelectors.toggleCheckbox.checked
    ? `${someMath.roundToOneDecimal(
        someMath.fahrenheitToCelsius(elem.tempmin)
      )}°`
    : `°${someMath.roundToOneDecimal(elem.tempmin)}`;
}

function ifToggledChangeMax(elem) {
  return allSelectors.toggleCheckbox.checked
    ? `${someMath.roundToOneDecimal(
        someMath.fahrenheitToCelsius(elem.tempmax)
      )}°`
    : `°${someMath.roundToOneDecimal(elem.tempmax)}`;
}

function fillTodayContainer(day) {
  let resolvedAddress = allThingsTimeRelated.retrieveStoredAddress();
  allSelectors.currentWeather.src = findImg(day, "nope");
  allSelectors.currentWeather.style.display = "inline-block";
  allSelectors.rainfall.textContent = `Rainfall: ${day.precipprob}%`;
  allSelectors.humidity.textContent = `Humidity: ${day.humidity}%`;
  allSelectors.windSpeed.textContent = `WindSpeed: ${day.windspeed} mph`;
  allSelectors.temperatureHeader.textContent = `${ifToggledChange(day)}`;
  allSelectors.todaysDate.textContent = allThingsTimeRelated.formattedDate(
    day.datetime
  );
  allSelectors.weatherLocation.textContent = resolvedAddress;
  allSelectors.timeNow.textContent = `Time of Day: ${allThingsTimeRelated
    .retrieveLocalTime()
    .substring(0, 5)}`;
}

allSelectors.hourArrowLeft.addEventListener("click", () => {
  let storedHourIndex = allThingsTimeRelated.retrieveStoredHourIndex();
  if (storedHourIndex === 0) {
    allThingsTimeRelated.setStoredHourIndex(23);
  } else {
    allThingsTimeRelated.setStoredHourIndex(storedHourIndex - 1);
  }
  addHourlyPreviewElements();
});

allSelectors.hourArrowRight.addEventListener("click", () => {
  allThingsTimeRelated.setStoredHourIndex(
    allThingsTimeRelated.retrieveStoredHourIndex() + 1
  );
  addHourlyPreviewElements();
});

function addHourlyPreviewElements() {
  allThingsTimeRelated.clearHourEntries(allSelectors.hourEntries);

  let index =
    allThingsTimeRelated.retrieveStoredHourIndex() > -1
      ? allThingsTimeRelated.retrieveStoredHourIndex()
      : 0;
  let max = index + 7;
  let hours = allThingsTimeRelated.retrieveStoredHours();
  for (let i = index; i < max; ++i) {
    const newHourlyPreviewElem = buildHourlyPreviewElem(hours[i % 24]);
    allSelectors.hourEntries.appendChild(newHourlyPreviewElem);
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

allSelectors.daysArrowLeft.addEventListener("click", () => {
  let storedDayIndex = allThingsTimeRelated.retrieveStoredDayIndex();
  if (storedDayIndex === 0) {
    allThingsTimeRelated.setStoredDayIndex(14);
  } else {
    allThingsTimeRelated.setStoredDayIndex(storedDayIndex - 1);
  }
  addDailyPreviewElements();
});

allSelectors.daysArrowRight.addEventListener("click", () => {
  allThingsTimeRelated.setStoredDayIndex(
    allThingsTimeRelated.retrieveStoredDayIndex() + 1
  );
  addDailyPreviewElements();
});

function addDailyPreviewElements() {
  allThingsTimeRelated.clearDayEntries(allSelectors.dayEntries);

  let index =
    allThingsTimeRelated.retrieveStoredDayIndex() > -1
      ? allThingsTimeRelated.retrieveStoredDayIndex()
      : 0;
  let max = index + 2;
  let days = allThingsTimeRelated.retrieveStoredDays();
  for (let i = index; i <= max; ++i) {
    const newDailyPreviewElem = buildDailyPreviewElements(days[i % 15]);
    allSelectors.dayEntries.appendChild(newDailyPreviewElem);
  }
}

function buildDailyPreviewElements(day) {
  const imgSrc = findImg(day, "nope");
  const dailyPreviewElem = document.createElement("div");
  dailyPreviewElem.classList.add("dailyPreviewElem");
  dailyPreviewElem.insertAdjacentHTML(
    "beforeend",
    `<p class="dayOfWeek">${allThingsTimeRelated.formattedDate(
      day.datetime
    )}</p>
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
