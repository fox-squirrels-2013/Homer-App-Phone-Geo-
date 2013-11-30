function doClick(e) {
		// locationModule.getLocation();
		locationModule.fakeLocation();
};

var locationModule = {
	getLocation: function(){
	  if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	            alert(e.coords);
	        }
	    });
	}
	else {alert('Please enable location services')}
	},
	fakeLocation: {
    "accuracy": 30,
    "altitude": 0,
    "altitudeAccuracy": null,
    "heading": 0,
    "latitude": 37.7922852,
    "longitude": -122.4060012,
    "speed": 0,
    "timestamp": 1385426498331
}
}
                                          
$.index.open();