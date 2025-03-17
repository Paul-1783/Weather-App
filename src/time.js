let allThingsTimeRelated = (function () {
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

  let setStoredHours = (newHours) => {
    localStorage.setItem("hours", JSON.stringify(newHours));
  };

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
  function clearHourEntries(hourEntries) {
    hourEntries.innerHTML = "";
  }

  function clearDayEntries(dayEntries) {
    dayEntries.innerHTML = "";
  }

  return {
    clearDayEntries,
    clearHourEntries,
    deleteStoredHourIndex,
    setStoredHourIndex,
    retrieveStoredHourIndex,
    deleteStoredHours,
    setStoredHours,
    retrieveStoredHours,
    deleteStoredDayIndex,
    setStoredDayIndex,
    retrieveStoredDayIndex,
    deleteStoredDays,
    setStoredDays,
    retrieveStoredDays,
    deleteStoredAddress,
    setStoredAddress,
    retrieveStoredAddress,
    deleteStoredNewDay,
    setStoredNewDay,
    retrieveStoredNewDay,
    checkForExistenceNewDay,
    retrieveLocalTime,
    saveLocalTime,
  };
})();

export default allThingsTimeRelated;
