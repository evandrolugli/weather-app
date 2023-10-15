const appElements = (() => {
    /**
     * Factory function to get the HTML elements
     */

    //Title section
    const updated = document.getElementById("updated");
    const temperature = document.getElementById("current-temperature");
    const cityName = document.getElementById("location");
    const condition = document.getElementById("condition");
    const description = document.getElementById("condition-desc");

    //Temperature details
    const feelsLike = document.getElementById("feels-like");
    const minTemp = document.getElementById("min-temp");
    const maxTemp = document.getElementById("max-temp");

    //Weather variables and details
    const humidity = document.getElementById("humidity");
    const visibility = document.getElementById("visibility");
    const wind = document.getElementById("wind");
    const windGust = document.getElementById("wind-gust");
    const rain1h = document.getElementById("rain-one-h");
    const rain3h = document.getElementById("rain-three-h");
    const clouds = document.getElementById("clouds");
    const pressure = document.getElementById("pressure");
    const sunrise = document.getElementById("sunrise");
    const sunset = document.getElementById("sunset");

    //Getters
    const getCityName = () => cityName.textContent;
    const getTemperature = () => temperature.textContent;
    const getCondition = () => condition.textContent;
    const getDescription = () => description.textContent;

    //Setters
    //Title section
    const setUpdated = (newDate) => (updated.textContent = newDate);
    const setCityName = (locationName) => (cityName.textContent = locationName);
    const setTemperature = (tempUpdated) =>
        (temperature.textContent = tempUpdated + " °C");
    const setCondition = (conditionUpdated) =>
        (condition.textContent = conditionUpdated);
    const setDescription = (descriptionUpdated) =>
        (description.textContent = descriptionUpdated);

    //Temperature details
    const setFeelsLike = (temp) => (feelsLike.textContent = temp + " °C");
    const setMinTemp = (temp) => (minTemp.textContent = temp + " °C");
    const setMaxTemp = (temp) => (maxTemp.textContent = temp + " °C");

    //Weather variables and details
    const setHumidity = (newHumidity) => (humidity.textContent = newHumidity + "%");
    const setVisibility = (newVisibility) =>
        (visibility.textContent = (newVisibility / 1000) + "Km");
    const setWind = (newWind) => (wind.textContent = newWind + "m/s"); //NEEDS A CALC TO SHOW THE WIND DIRECTION
    const setWindGust = (newWindGust) => (windGust.textContent = newWindGust + "m/s");
    const setRain1h = (newRain1h) => (rain1h.textContent = newRain1h);
    const setRain3h = (newRain3h) => (rain3h.textContent = newRain3h);
    const setClouds = (newClouds) => (clouds.textContent = newClouds + "%");
    const setPressure = (newPressure) => (pressure.textContent = newPressure + "hPa");
    const setSunrise = (newSunrise) => (sunrise.textContent = newSunrise);
    const setSunset = (newSunset) => (sunset.textContent = newSunset);

    return {
        getCityName,
        getTemperature,
        getCondition,
        getDescription,
        setUpdated,
        setCityName,
        setTemperature,
        setCondition,
        setDescription,
        setFeelsLike,
        setMinTemp,
        setMaxTemp,
        setHumidity,
        setVisibility,
        setWind,
        setWindGust,
        setRain1h,
        setRain3h,
        setClouds,
        setPressure,
        setSunrise,
        setSunset,
    };
})();

/**
 * EventListener to work with a search bar (user input) and get the desire location
 * 'input' is a constant variable representing the input field (text)
 */
// input.onsubmit = (e) => {
//     e.preventDefault();
//     weatherUpdate(city.value);
//     city.value = "";
// };

const APIUtilities = () => {
    const updateWeather = (location, units = "metric") => {
        /**
         * API Key from nico9506 user, Openweathermap
         * string 'location' --> {city name},{state code},{country code}
         * string 'units' --> standard, metric and imperial
         * Documentation: https://openweathermap.org/current#one
         */
        const xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=243eecaa621a7c5bbe4b86f7bc268e9e&units=${units}`
            //URL has to be changed to receive the function parameters
        );

        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 404) {
                console.log("Place not found!");
            } else {
                let data = JSON.parse(xhr.response);

                //Updates title section
                searchCity(data.coord.lat, data.coord.lon);
                appElements.setUpdated(Date());
                appElements.setTemperature(data.main.temp);
                appElements.setCondition(data.weather[0].main);
                appElements.setDescription(data.weather[0].description);

                //Updates temperature details
                appElements.setFeelsLike(data.main.feels_like);
                appElements.setMinTemp(data.main.temp_min);
                appElements.setMaxTemp(data.main.temp_max);

                //Update Weather variables and details
                appElements.setHumidity(data.main.humidity);
                appElements.setVisibility(data.visibility);
                appElements.setWind(data.wind.speed);
                appElements.setWindGust(data.wind.gust);
                // appElements.setRain1h(data.rain.1h);
                // appElements.setRain3h(data.rain.3h);
                appElements.setClouds(data.clouds.all);
                appElements.setPressure(data.main.pressure);
                appElements.setSunrise(data.sys.sunrise);
                appElements.setSunset(data.sys.sunset);

                //Image source --- It must be tested
                //image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            }
        };
    };

    const searchCity = (lat, lon) => {
        /**
         * API Key from nico9506 user, Openweathermap
         * 'lat' --> latitude
         * 'lon' --> longitude
         * Documentation: https://openweathermap.org/api/geocoding-api
         *
         * Change the 'location' HTML for a string compound by the city and country names.
         */

        const xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=243eecaa621a7c5bbe4b86f7bc268e9e`
        );

        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 404) {
                console.log("Place not found!");
            } else {
                let data = JSON.parse(xhr.response);
                appElements.setCityName(
                    String(data[0].name) + ", " + String(data[0].country)
                );
            }
        };
    };

    return { updateWeather };
};

printWeather = () => {
    /**
     * For testing purposes only
     */
    console.log(appElements.getCityName(), appElements.getTemperature());
};
