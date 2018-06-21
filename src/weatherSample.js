function getWeather(){
	var weatherData = new XMLHttpRequest();
	weatherData.open("GET", "https://api.darksky.net/forecast/API_KEY/49.241722,-123.112812?exclude=hourly,flags,daily&units=si", false);
	weatherData.send(null);
	weatherData = JSON.parse(weatherData.responseText);
	console.log("Current Apparent Temp: " + weatherData.currently.apparentTemperature);
	return weatherData.currently.apparentTemperature + "°C "; //weatherData.currently.summary;
}


