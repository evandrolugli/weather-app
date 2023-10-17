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
    const setHumidity = (newHumidity) =>
        (humidity.textContent = newHumidity + "%");
    const setVisibility = (newVisibility) =>
        (visibility.textContent = newVisibility / 1000 + " Km");
    const setWind = (newWind) => (wind.textContent = newWind + " m/s"); //NEEDS A CALC TO SHOW THE WIND DIRECTION
    const setWindGust = (newWindGust) =>
        (windGust.textContent = newWindGust + " m/s");
    const setRain1h = (newRain1h) => (rain1h.textContent = newRain1h);
    const setRain3h = (newRain3h) => (rain3h.textContent = newRain3h);
    const setClouds = (newClouds) => (clouds.textContent = newClouds + " %");
    const setPressure = (newPressure) =>
        (pressure.textContent = newPressure + " hPa");
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
                console.log(data);

                //Updates title section
                searchCity(data.coord.lat, data.coord.lon, data.name);
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
                appElements.setWind(
                    degreesToDirection(data.wind.deg) + " " + data.wind.speed
                );
                appElements.setWindGust(
                    data.wind.gust == undefined ? "-" : data.wind.gust
                );
                appElements.setRain1h(
                    data.rain == undefined ? "-" : data.rain["1h"]
                );
                appElements.setRain3h(
                    data.rain == undefined ? "-" : data.rain["3h"]
                );
                appElements.setClouds(data.clouds.all);
                appElements.setPressure(data.main.pressure);
                appElements.setSunrise(unixToDate(data.sys.sunrise));
                appElements.setSunset(unixToDate(data.sys.sunset));
                
                //Image source --- It must be tested
                //image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            }
        };
    };

    const searchCity = (lat, lon, cityName) => {
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
                    String(cityName + ", " + data[0].name + ", " + data[0].country)
                );
            }
        };
    };

    const unixToDate = (unixTimestamp) => {
        /**
         * Converts an UNIX timestamp to a readable date format
         */
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds
        const date = new Date(unixTimestamp * 1000);

        // Hours part from the timestamp
        const hours = date.getHours();

        // Minutes part from the timestamp
        const minutes = "0" + date.getMinutes();

        // Seconds part from the timestamp
        const seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        const formattedTime =
            hours + ":" + minutes.slice(-2) + ":" + seconds.slice(-2);

        return formattedTime;
    };

    const degreesToDirection = (degrees) => {
        /**
         * Converts degrees (meteorological) to wind direction
         * Returns a String
         */
        if (degrees >= 345 && degrees <= 360 && degrees < 15) return "N";
        if (degrees >= 15 && degrees < 35) return "N/NE";
        if (degrees >= 35 && degrees < 55) return "NE";
        if (degrees >= 55 && degrees < 75) return "E/NE";
        if (degrees >= 75 && degrees < 105) return "E";
        if (degrees >= 105 && degrees < 125) return "E/SE";
        if (degrees >= 125 && degrees < 145) return "SE";
        if (degrees >= 145 && degrees < 165) return "S/SE";
        if (degrees >= 165 && degrees < 195) return "S";
        if (degrees >= 195 && degrees < 215) return "S/SW";
        if (degrees >= 215 && degrees < 235) return "SW";
        if (degrees >= 235 && degrees < 255) return "W/SW";
        if (degrees >= 255 && degrees < 285) return "W";
        if (degrees >= 285 && degrees < 305) return "W/NW";
        if (degrees >= 305 && degrees < 325) return "NW";
        if (degrees >= 325 && degrees < 345) return "N/NW";

        return "";
    };

    return { updateWeather };
};

/**
 * For testing purposes only
 */
printWeather = () => {
    console.log(appElements.getCityName(), appElements.getTemperature());
};

//First call to display info. Should be change to user current location
APIUtilities().updateWeather("Melbourne, AU");
///////////////////////////
