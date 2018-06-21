function startTime() {
    var vancouverTime = new Date();
    var h = vancouverTime.getHours();
    var m = vancouverTime.getMinutes();
    var s = vancouverTime.getSeconds();
		//UTC = GMT, and HK time GMT+8 (no daylight savings)
		var hongKongHours = (vancouverTime.getUTCHours() + 8) % 24;
		var londonHours = (vancouverTime.getHours() + 8) % 24;
		londonHours = checkTime(londonHours);
		hongKongHours = checkTime(hongKongHours);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('timeText').innerHTML =
    "YVR" + h + ":" + m + ":" + s + "   HK" + hongKongHours + ":" + m + "|" + londonHours;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
		//Adding leading zero for time
    return i;
}
