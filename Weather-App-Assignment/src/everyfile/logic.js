import { DateTime } from "luxon";

const API_key = "d47d6bbc03d6a88c2e14a08565223bb1";

const main_Url = "https://api.openweathermap.org/data/2.5";

// Function to fetch weather data from OpenWeatherMap API
const weatherData = (info, query) => {
    // Construct the URL for the API request
    const url = new URL(main_Url + "/" + info);
    url.search = new URLSearchParams({ ...query, appid: API_key });
    console.log("Request URL:", url.toString());

    // Fetch data from the constructed URL
    return fetch(url)
        .then(res => {
            // Check if the response is successful
            if (!res.ok) {
                throw new Error(`API request failed with status ${res.status}`);
            }
            // Return the JSON data from the response
            return res.json();
        });
};

// Function to format the fetched weather data
const formattedCurrentweather = (data) => {
    console.log("raw weather data:", data);

    // Check if the received data has the expected format
    if (!data || !data.coord || !data.main || !data.wind || !data.sys || !data.weather || !data.weather[0]) {
        throw new Error("Invalid data format received from weather API");
    }

    // Extract relevant information from the data
    const timezone = data.timezone;
    const {
        coord: { lat, lon },
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { country, sunrise, sunset },
        name,
        dt,
        weather,
    } = data;
    const {
        description, icon
    } = weather[0];

    // Return the formatted weather data
    return {
        lat, lon, temp, feels_like, humidity,
        speed, country, sunrise, sunset, name, dt, description, icon,
        timezone
    };
};

// Function to fetch weather data for a given search query
const getWeatherData = async (searchParams) => {
    try {
        // Fetch raw weather data from the API
        const rawWeatherData = await weatherData('weather', searchParams);
        // Format the fetched weather data
        const formattedWeatherData = formattedCurrentweather(rawWeatherData);
        console.log("formatted current weather data:", formattedWeatherData);
        // Return the formatted weather data
        return { ...formattedWeatherData };
    } catch (error) {
        // Log and throw any errors that occur during fetching or formatting
        console.error("error fetching weather data", error);
        throw error;
    }
};

// Function to convert UNIX timestamp to local time in a specified format
const localTime = (secs, zone, format = "cccc, dd LLL yyyy 'Local time:' hh:mm a") => {
    return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

// Function to generate the URL for weather icons
const iconfromurl = (icons) => `https://openweathermap.org/img/wn/{code}@2x.png`;

// Log the URL for weather icons
console.log("this is icons:", iconfromurl);

// Export the getWeatherData function as default and localTime and iconfromurl functions as named exports
export default getWeatherData;
export { localTime, iconfromurl };
