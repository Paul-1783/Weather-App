const someMath = (() => {
  function celsiusToFahrenheit(temperature) {
    return temperature * 1, 8 + 32;
  }

  function fahrenheitToCelsius(temperature) {
    return (temperature - 32) / 1.8;
  }

  function roundToOneDecimal(number) {
    return Math.round(number * 10) / 10;
  }
  return { celsiusToFahrenheit, roundToOneDecimal, fahrenheitToCelsius };
})();

export default someMath;
