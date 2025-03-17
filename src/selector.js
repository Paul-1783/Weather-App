const allSelectors = (() => {
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

  return {
    weatherAppComplete,
    dustbin,
    inputField,
    submitButton,
    hourEntries,
    hourArrowLeft,
    hourArrowRight,
    dayEntries,
    daysArrowLeft,
    daysArrowRight,
    rainfall,
    humidity,
    windSpeed,
    todaysDate,
    weatherLocation,
    timeNow,
    currentWeather,
    temperatureHeader,
    toggleCheckbox,
  };
})();

export default allSelectors;
