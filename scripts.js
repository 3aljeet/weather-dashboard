const apiKey = 'd118763e9d5abf86d4999ca0364a8e00';

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    getCurrentWeather(city);
    get5DayForecast(city);
    addToSearchHistory(city);
});

function getCurrentWeather(city) {
    // Implement fetching and displaying current weather data here
    // Use the OpenWeatherMap API with the city name and apiKey
const apiKey = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={d118763e9d5abf86d4999ca0364a8e00}';


    // Define the OpenWeatherMap API endpoint for current weather
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Make an HTTP GET request to the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the current weather data here
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            // You can add error handling here, such as displaying an error message to the user
        });
}

function displayCurrentWeather(data) {
    // Extract and display relevant weather information for the current weather
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    // Display the current weather information in your HTML or console
    document.getElementById('currentWeatherCity').textContent = `Weather in ${cityName}:`;
    document.getElementById('currentTemperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('currentDescription').textContent = `Description: ${description}`;
}

// Example usage
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    getCurrentWeather(city);
    
});


function get5DayForecast(city) {
   
        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

    
        // Define the OpenWeatherMap API endpoint for 5-day forecast
        const apiUrl = `https://openweathermap.org/forecast5#5days`;
    
        // Make an HTTP GET request to the API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Handle the 5-day forecast data here
                display5DayForecast(data);
            })
            .catch(error => {
                console.error('Error fetching 5-day forecast data:', error);
                // You can add error handling here, such as displaying an error message to the user
            });
    
    
    function display5DayForecast(data) {
           // Ensure the forecast list is not empty
    if (!data.list || data.list.length === 0) {
        console.log('No 5-day forecast data available.');
        return;
    }

    // Extract and display relevant weather information for the 5-day forecast
    const city = data.city.name;

    console.log(`5-Day Forecast for ${city}:`);

    // Loop through the forecast list (typically contains data for every 3 hours)
    data.list.forEach(item => {
        // Extract relevant information for each forecast item
        const timestamp = new Date(item.dt * 1000); // Convert timestamp to a readable date
        const temperature = item.main.temp;
        const description = item.weather[0].description;

        // Log or display this information as needed
        console.log('Date:', timestamp.toDateString());
        console.log('Temperature:', temperature + '°C');
        console.log('Description:', description);
        console.log('---------------------------------------');
    });

        console.log('5-Day Forecast Data:', data);
    }
    
    // Example usage
    document.getElementById('searchButton').addEventListener('click', () => {
        const city = document.getElementById('cityInput').value;
        getCurrentWeather(city);
        get5DayForecast(city); // Call the get5DayForecast function when the search button is clicked
        // ... You can also call addToSearchHistory(city) here.
    });
    
}

function addToSearchHistory(city) {
 // Get the existing search history from local storage (if any)
 let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

 // Add the new city to the search history
 searchHistory.push(city);

 // Limit the search history to a certain number of items if needed
 const maxHistoryItems = 10; // Set your desired limit
 if (searchHistory.length > maxHistoryItems) {
     searchHistory = searchHistory.slice(-maxHistoryItems);
 }

 // Update the search history in local storage
 localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

 // Update the display of the search history in the user interface
 displaySearchHistory(searchHistory);
}

function displaySearchHistory(searchHistory) {
 // Assuming you have an HTML element with the ID 'searchHistoryList' to display the search history
 const historyList = document.getElementById('searchHistoryList');

 // Clear the current content
 historyList.innerHTML = '';

 // Create list items for each city in the search history
 searchHistory.forEach(city => {
     const listItem = document.createElement('li');
     listItem.textContent = city;
     listItem.addEventListener('click', () => {
         // Handle click event when a search history item is clicked
         // For example, you can initiate a new search with the clicked city
         getCurrentWeather(city);
         get5DayForecast(city);
     });

     historyList.appendChild(listItem);
 });
}

// Example usage
document.getElementById('searchButton').addEventListener('click', () => {
 const city = document.getElementById('cityInput').value;
 getCurrentWeather(city);
 get5DayForecast(city);
 addToSearchHistory(city); // Add the city to the search history
});


// Additional functions for handling the search history click and error handling
