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
    const setCityName = (locationName) => (cityName.textContent = locationName);
    const setTemperature = (tempUpdated) =>
        (temperature.textContent = tempUpdated);
    const setCondition = (conditionUpdated) =>
        (condition.textContent = conditionUpdated);
    const setDescription = (descriptionUpdated) =>
        (description.textContent = descriptionUpdated);

    return {
        getCityName,
        getTemperature,
        getCondition,
        getDescription,
        setCityName,
        setTemperature,
        setCondition,
        setDescription,
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

weatherUpdate = (location, units = "metric") => {
    /**
     * API Key from nico9506 user, Openweathermap
     * string 'location' --> {city name},{state code},{country code}
     * string 'units' --> standard, metric and imperial
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
            appElements.setCityName(data.name);
            appElements.setTemperature(data.main.temp);
            appElements.setCondition(data.weather[0].main);
            appElements.setDescription(data.weather[0].description);

            //Image source --- It must be tested
            //image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        }
    };
};

printWeather = () => {
    /**
     * For testing purposes only
     */
    console.log(appElements.getCityName(), appElements.getTemperature());
};
