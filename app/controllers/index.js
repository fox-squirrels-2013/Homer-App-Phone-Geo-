function doClick(e) {
	// locationModule.getLocation();
	alert(locationModule.fakeLocation);
	sendGeocode.sendLocation(locationModule.fakeLocation.latitude, locationModule.fakeLocation.longitude)
};

locationModule = {
	getLocation : function() {
		if (Ti.Geolocation.locationServicesEnabled) {
			Titanium.Geolocation.purpose = 'Get Current Location';
			Titanium.Geolocation.getCurrentPosition(function(e) {
				if (e.error) {
					Ti.API.error('Error: ' + e.error);
				}
				else {
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
		"latitude" : 37.7922852,
		"longitude" : -122.4060012,
		"speed" : 0,
		"timestamp" : 1385426498331
	}
};

var sendGeocode = {
	xhr : Ti.Network.createHTTPClient(),
	api_url : "www.google.com",
	sendLocation : function(phoneLatitude, phoneLongitude) {
		sendGeocode.xhr.open('POST', sendGeocode.api_url);
		sendGeocode.xhr.send({
			latitude : phoneLatitude,
			longitude : phoneLongitude
		});
	}
};

// xhr.onload = function(e) {
// 
// };

$.index.open(); 