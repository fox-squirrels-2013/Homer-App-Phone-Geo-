	function doClick(e) {
		deviceLocation.getLocation();
		alert("deviceLocation " + deviceLocation.lastLocation.latitude);
		// sendGeocode.sendLocation(deviceLocation.lastLocation.latitude, deviceLocation.lastLocation.longitude)	
	    sendGeocode.sendLocation(deviceLocation.fakeLocation.latitude, deviceLocation.fakeLocation.longitude);
	}
	

	deviceLocation = {
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
						deviceLocation.lastLocation.longitude = e.coords.longitude
						deviceLocation.lastLocation.latitude = e.coords.latitude
	          alert("e.coords: " + e.coords);
					}
				})
			} else {
				alert('Please enable location services')
			}
		},
		fakeLocation : {
			"latitude" : 37.7923852,
			"longitude" : -122.4024346,
		}
	};

	var sendGeocode = {
		api_url : "http://sanfran-beer-finder.herokuapp.com/stores.json?",
		xhr : Ti.Network.createHTTPClient(),
		queryParser: function(lat, long){
			return "latitude=" + lat + "&longitude=" + long;
		},
		sendLocation : function(phoneLatitude, phoneLongitude) {
			queryString = sendGeocode.queryParser(phoneLatitude, phoneLongitude)
			console.log(queryString + "!!!!!!!!!!!!!!!!!!!!!")
			url = sendGeocode.api_url + queryString
			sendGeocode.xhr.open('GET', url);
			sendGeocode.xhr.send({
				latitude : phoneLatitude,
				longitude : phoneLongitude
			});
			geocodeData.responseData()
		}
	};
	var geocodeData = {
		responseString: "F ",
	   responseData: function(){
	     sendGeocode.xhr.onload = function(e) {
	     	console.log("response String hit!!!!!!!!!!!!!!!!!!!")
		   geocodeData.responseString = JSON.parse(this.responseText);
		   console.log(geocodeData.responseString)
		   $.label1.text = geocodeData.responseString
		   
		 };
	     sendGeocode.xhr.onerror = function(e) {
		   alert("There will be errors!");
		};
		}
	}
	var displayData = {

	 }



	$.index.open();