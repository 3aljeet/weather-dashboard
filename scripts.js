
const apiKey = 'd118763e9d5abf86d4999ca0364a8e00';

$(document).ready(function () {
  $("#searchButton").click(function () {
    const city = $("#cityInput").val();
    getCurrentWeather(city);
  });

  // Add click event for history items
  $(document).on('click', '#searchHistoryList li', function () {
    const city = $(this).text();
    getCurrentWeather(city);
    get5DayForecast(city);
  });
  $('#clearSearchHistoryBtn').on('click', function () {
    // Your code to clear the search history goes here
    $('#searchHistoryList').empty(); 
  });
});

function getCurrentWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
      get5DayForecast(city); // Move 5-day forecast call here to ensure it's only called after current weather is fetched
      addToSearchHistory(city);
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
    });
}

function displayCurrentWeather(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const wind = data.wind.speed;
  const humidity = data.main.humidity;

  $('#currentWeatherCity').text(`Weather in ${cityName}:`);
  $('#currentTemperature').text(`Temperature: ${temperature}°C`);
  $('#currentIcon').text(`Description: ${description}`);
  $('#currentWindSpeed').text(`Wind Speed: ${wind} km/h`);
  $('#currentHumidity').text(`Humidity: ${humidity}%`);
}


function get5DayForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`; // Updated the API URL

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            display5DayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
        });
}

function display5DayForecast(data) {
    const forecastList = $('#forecastList');
    forecastList.empty(); // Clear previous forecast data
  
    if (!data.list || data.list.length === 0) {
      console.log('No 5-day forecast data available.');
      return;
    }
  
    const city = data.city.name;
    console.log(`5-Day Forecast for ${city}:`);
  
    let daysDisplayed = 0;
  
    data.list.forEach(item => {
      if (daysDisplayed < 5) {
        const timestamp = new Date(item.dt * 1000);
        
        const temperature = item.main.temp;
        const description = item.weather[0].description;
        const wind = item.wind.speed;
        const humidity = item.main.humidity;

        const forecastDay = $('<div class="forecastDay"></div>');
        forecastDay.append(`<p>Date: ${timestamp.toDateString()}</p>`);
        forecastDay.append(`<p>Temperature: ${temperature}°C</p>`);
        forecastDay.append(`<p>Description: ${description}</p>`);
        forecastDay.append(`<p>Wind Speed: ${wind}m/s</p>`);
        forecastDay.append(`<p>Humidity: ${humidity}%</p>`);
  
        forecastList.append(forecastDay);
        
        daysDisplayed++;
      } else {
        // Exit the loop once 5 days are displayed
        return false;
      }
    });
  }
  
function addToSearchHistory(city) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistory.push(city);

    const maxHistoryItems = 10;
    if (searchHistory.length > maxHistoryItems) {
        searchHistory = searchHistory.slice(-maxHistoryItems);
    }

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    displaySearchHistory(searchHistory);
}

function displaySearchHistory(searchHistory) {
    const historyList = document.getElementById('searchHistoryList');

    historyList.innerHTML = '';

    searchHistory.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        listItem.addEventListener('click', () => {
            getCurrentWeather(city);
            get5DayForecast(city);
        });

        historyList.appendChild(listItem);
    });
}
