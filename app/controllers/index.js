	function doClick(e) {
		deviceLocation.getLocation();
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
						deviceLocation.lastLocation.longitude = e.coords.longitude;
						deviceLocation.lastLocation.latitude = e.coords.latitude;
					}
				});
			} else {
				alert('Please enable location services');
			}
		},
		fakeLocation : {
			"latitude" : 37.7923852,
			"longitude" : -122.4024346
		}
	};

	var sendGeocode = {
		api_url : "http://sanfran-beer-finder.herokuapp.com/?",
		xhr : Ti.Network.createHTTPClient(),
		queryParser: function(lat, long){
			return "latitude=" + lat + "&longitude=" + long;
		},
		sendLocation : function(phoneLatitude, phoneLongitude) {
			queryString = sendGeocode.queryParser(phoneLatitude, phoneLongitude);
			url = sendGeocode.api_url + queryString;
			sendGeocode.xhr.open('GET', url);
			sendGeocode.xhr.send({
				// latitude : phoneLatitude,
				// longitude : phoneLongitude  ####Commented out to test whether the query was using these coords or the ones in the query string
			});
			geocodeData.responseData();
		}
	};
	var geocodeData = {
	   responseString: "0",
	   responseData: function(){
	     sendGeocode.xhr.onload = function(e) {
		   var response = JSON.parse(this.responseText);

		   var rows = [];
			 response.results.forEach(function(result){
			 	rows.push(Alloy.createController('row', {
			 		name: result.name,
					product: result.product,
					price: result.price,
					address: result.address,
					discount: result.discount
			 	}).getView());
			 });

			 $.dealTable.setData(rows);

		 };
	     sendGeocode.xhr.onerror = function(e) {
		   alert("There will be errors!");
		};
		}
	};
	var displayData = {

	};

	$.index.open();