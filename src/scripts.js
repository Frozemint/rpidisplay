
function getWeather(){
	getWeatherData(config.PRIMARY_WEATHER_LAT, config.PRIMARY_WEATHER_LON, 'weatherText', 'weatherIcon');
	getWeatherData(config.SECONDARY_WEATHER_LAT, config.SECONDARY_WEATHER_LON, 'secondaryWeatherText', 'secondaryWeatherIcon');
}

function getWeatherData(lat, lon, textElementID, iconID){
	var weatherAPIKey = config.WEATHER_API_KEY;
	var weatherURL = `https://api.darksky.net/forecast/${weatherAPIKey}/${lat},${lon}?exclude=hourly,flags,daily&units=si`;
	$.ajax({
		url: weatherURL,
		dataType: "jsonp",
		async: false,
		success: function(data){
			console.log(data);
			console.log(data.currently.apparentTemperature + "°C " + data.currently.summary);
			setWeatherIcon(data.currently.icon, iconID);
			document.getElementById(textElementID).innerHTML = data.currently.apparentTemperature + "°C ";
		}
	});
}

function setWeatherIcon(string, iconID){
	var skycons = new Skycons({"color": "black"});
	skycons.add(iconID, string);
}

function getBusesTime(){
	getBusJSON(config.PRIMARY_BUS_STOP_ID, config.PRIMARY_BUS_ROUTE, 'primaryBusText');
	getBusJSON(config.SECONDARY_BUS_STOP_ID, config.SECONDARY_BUS_ROUTE, 'secondaryBusText');
}

function getBusJSON(stopID, busRoute, textElementID){
	//Jansen, if you figured out a better way in the future, please do let me know
	//translink url: http://api.translink.ca/rttiapi/v1/stops/[STOP NO]/estimates?apikey=[API]&count=3&timeframe=120&routeNo=[ROUTE NO]
	var busURL = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Fapi.translink.ca%2Frttiapi%2Fv1%2Fstops%2F${stopID}%2Festimates%3Fapikey%3D${config.TRANSLINK_API_KEY}%26count%3D4%26timeframe%3D120%26routeNo%3D${busRoute}'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
	$.ajax({
		url: busURL,
		dataType: "jsonp",
		async: false,
		success: function(data){
			//Jansen, if you figured out a better way in the future, please do let me know
			console.log(busURL);
			try {
				data = data.query.results.NextBuses.NextBus;
				document.getElementById(textElementID).innerHTML = 'Bus #' + data.RouteNo + ' in: ' + getBusArrivals(data) + " min";
				console.log(data.RouteNo + " " + data.Schedules.Schedule); 
			} catch (e){
				document.getElementById(textElementID).innerHTML = "Can't get #" + busRoute + " bus info!";
			}
		}
	});
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


