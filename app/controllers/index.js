function doClick(e) {
	locationModule.getLocation();
	// alert(locationModule.fakeLocation);
	// sendGeocode.sendLocation(locationModule.fakeLocation.latitude, locationModule.fakeLocation.longitude)
	alert(locationModule.lastLocation.latitude)
	sendGeocode.sendLocation(locationModule.lastLocation.latitude, locationModule.lastLocation.longitude)
};

locationModule = {
	lastLocation: {
		"latitude" : 0,
		"longitude" : 0,
		"speed" : 0,
		"timestamp" : 1385426498331
	},
	getLocation : function() {
		if (Ti.Geolocation.locationServicesEnabled) {
			Titanium.Geolocation.purpose = 'Get Current Location';
			Titanium.Geolocation.getCurrentPosition(function(e) {
				if (e.error) {
					Ti.API.error('Error: ' + e.error);
				}
				else {
					lastLocation.longitude = e.coords.longitude
					lastLocation.latitude = e.coords.latitude
					alert(e.coords);
				}
			})
		} else {
			alert('Please enable location services')
		}
	},
	fakeLocation : {
		"accuracy" : 30,
		"altitude" : 0,
		"altitudeAccuracy" : null,
		"heading" : 0,
		"latitude" : 37.7923852,
		"longitude" : -122.4024346,
		"speed" : 0,
		"timestamp" : 1385426498331
	}
};

var locationHelper = {
	queryParser: function(lat, long){
		return "latitude=" + lat + "&longitude=" + long;
	}
}

var sendGeocode = {
	xhr : Ti.Network.createHTTPClient(),
	api_url : "http://sanfran-beer-finder.herokuapp.com/stores.json?",
	sendLocation : function(phoneLatitude, phoneLongitude) {
		queryString = locationHelper.queryParser(phoneLatitude, phoneLongitude)
		url = sendGeocode.api_url + queryString
		sendGeocode.xhr.open('GET', url);
		sendGeocode.xhr.send({
			latitude : phoneLatitude,
			longitude : phoneLongitude
		});
		sendGeocode.xhr.onload = function(e) {
			alert(this.responseText);
		};
		sendGeocode.xhr.onerror = function(e) {
			alert("There be errors!")
		};
	}
};


$.index.open();