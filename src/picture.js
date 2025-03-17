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

export default findImg;
