/**
 * These variables have to be obtained from the HTML elements (user input)
 */
const city = "Melbourne"; //It should be possible to change from the user interface

/**
 * Variables to show out values in the user interface
 */
let cityName = "";
let temp = ""; //It should be possible to change from the user interface
let condition = "";
let description = "";
// const image = document.getElementById(""); //Change icon (got from the API)

/**
 * EventListener to work with a search bar (user input) and get the desire location
 * 'input' is a constant variable representing the input field (text)
 */
// input.onsubmit = (e) => {
//     e.preventDefault();
//     weatherUpdate(city.value);
//     city.value = "";
// };

weatherUpdate = (location, units = 'metric') => {
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
            cityName = data.name;
            temp = data.main.temp;
            condition = data.weather[0].main;
            description = data.weather[0].description;

            //Image source --- It must be tested
            //image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        }
    };
};

printWeather = () => {
    /**
     * For testing purposes only
     */
    console.log({ cityName, temp, condition, description });
};
