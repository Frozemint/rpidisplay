function getWeather(){
	var url = "https://api.darksky.net/forecast//49.241722,-123.112812?exclude=hourly,flags,daily&units=si";
	// $.ajax({
	// 	url: url,
	// 	dataType: "jsonp",
	// 	async: false,
	// 	success: function(data){
	// 		console.log(data);
	// 		console.log(data.currently.apparentTemperature + "°C " + data.currently.summary);
	// 		setWeatherIcon(data.currently.icon);
	// 		document.getElementById('weatherText').innerHTML = data.currently.apparentTemperature + "°C ";
	// 	}
	// });
	setWeatherIcon("partly-cloudy-day");
	document.getElementById('weatherText').innerHTML = "18.54" + "°C";
	// return weatherData.currently.apparentTemperature + "°C "; //weatherData.currently.summary;
}

function setWeatherIcon(string){
	var skycons = new Skycons({"color": "black"});
	skycons.add("weatherIcon", string);
}

function startTime() {
    var vancouverTime = new Date();
    var h = vancouverTime.getHours();
    var m = vancouverTime.getMinutes();
    var s = vancouverTime.getSeconds();
	//UTC = GMT, and HK time GMT+8 (no daylight savings)
	// var hongKongHours = (vancouverTime.getUTCHours() + 8) % 24;
	// var londonHours = (vancouverTime.getHours() + 8) % 24;
	// londonHours = checkTime(londonHours);
	// hongKongHours = checkTime(hongKongHours);
    m = checkTime(m);
    s = checkTime(s);
    return (h + ":" + m + ":" + s).bold();
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
		//Adding leading zero for time
    return i;
}


