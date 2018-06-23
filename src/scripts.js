function getWeather(){
	var weatherAPIKey = config.WEATHER_API_KEY;
	var weatherURL = "https://api.darksky.net/forecast/" + weatherAPIKey + "/49.241722,-123.112812?exclude=hourly,flags,daily&units=si";
	// $.ajax({
	// 	url: weatherURL,
	// 	dataType: "jsonp",
	// 	async: false,
	// 	success: function(data){
	// 		console.log(data);
	// 		console.log(data.currently.apparentTemperature + "°C " + data.currently.summary);
	// 		setWeatherIcon(data.currently.icon);
	// 		document.getElementById('weatherText').innerHTML = data.currently.apparentTemperature + "°C ";
	// 	}
	// });
}

function setWeatherIcon(string){
	var skycons = new Skycons({"color": "black"});
	skycons.add("weatherIcon", string);
}

function getBusesTime(){
	//Jansen, if you figured out a better way in the future, please do let me know
	//translink url: http://api.translink.ca/rttiapi/v1/stops/[STOP NO]/estimates?apikey=[API]&count=3&timeframe=120&routeNo=[ROUTE NO]
	var busURL = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Fapi.translink.ca%2Frttiapi%2Fv1%2Fstops%2F${config.PRIMARY_BUS_STOP_ID}%2Festimates%3Fapikey%3D${config.TRANSLINK_API_KEY}%26count%3D4%26timeframe%3D120%26routeNo%3D${config.PRIMARY_BUS_ROUTE}'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
	$.ajax({
		url: busURL,
		dataType: "jsonp",
		async: false,
		success: function(data){
			//Jansen, if you figured out a better way in the future, please do let me know
			console.log(busURL);
			console.log(data);
			data = data.query.results.NextBuses.NextBus;
			console.log(data.Schedules.Schedule[0].ExpectedCountdown);
			document.getElementById('primaryBusText').innerHTML = 'Bus #' + data.RouteNo + ' in: ' + getBusArrivals(data) + " mins";
			console.log(data.RouteNo + " " + data.Schedules.Schedule); 
		}
	})
}

function getBusArrivals(data){
	var result = [];
	for (var i = 0; i < data.Schedules.Schedule.length; i++){
		result.push(data.Schedules.Schedule[i].ExpectedCountdown);
	}
	return result;
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


