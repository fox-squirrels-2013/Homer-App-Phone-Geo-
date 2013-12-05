	function doClick(e) {
		deviceLocation.getLocation();
		// sendGeocode.sendLocation(deviceLocation.lastLocation.latitude, deviceLocation.lastLocation.longitude)
	    sendGeocode.sendLocation(deviceLocation.fakeLocation.latitude, deviceLocation.fakeLocation.longitude);
	}

	test = {
		findalec: function(){
			return 1;
		};
	};

	sendGeocode = {
		api_url: "http://sanfran-beer-finder.herokuapp.com/?",
		xhr: Ti.Network.createHTTPClient(),
		apiQueryParser: function(lat, lon){
			return "latitude=" + lat + "&longitude=" + lon;
		},
		googleQueryParser: function(lat, lon){
			return "https://maps.google.com/maps?q=" + lat + ",+" + lon;
		},
		sendLocation: function(phoneLatitude, phoneLongitude) {
			queryString = sendGeocode.apiQueryParser(phoneLatitude, phoneLongitude)
			url = sendGeocode.api_url + queryString
			sendGeocode.xhr.open('GET', url);
			sendGeocode.xhr.send();
			geocodeData.responseData();
		}
	};

	function openMap(e){
		var url = (e.row.mapUrl)
		var webview = Ti.UI.createWebView()
		webview.setUrl(url)
		var win = Ti.UI.createWindow()
		win.add(webview)
		win.open({modal:true})
	}


	deviceLocation = {
		lastLocation: {
			"latitude" : 0,
			"longitude" : 0,
			"speed" : 0,
			"timestamp" : 1385426498331
		},
		getLocation: function() {
			if (Ti.Geolocation.locationServicesEnabled) {
				Titanium.Geolocation.purpose = 'Get Current Location';
				Titanium.Geolocation.getCurrentPosition(this.setLocation)
			} else {
				alert('Please enable location services');
			}
		},
		setLocation: function(e) {
			if (e.error) {
				Ti.API.error('Error' + e.error)
			}
			else {
				deviceLocation.lastLocation.longitude = e.coords.longitude
				deviceLocation.lastLocation.longitude = e.coords.longitude	
			}
		},		
		fakeLocation : {
			"latitude" : 37.7923852,
			"longitude" : -122.4024346
		};
	};


	
	var geocodeData = {
	   responseString: "0",
	   responseData: function(){
	     sendGeocode.xhr.onload = function(e) {
		   var response = JSON.parse(this.responseText);

		   var rows = [];
			 response.results.forEach(function(result){
			 	rows.push(Alloy.createController('row', {
			 		mapUrl: sendGeocode.googleQueryParser(result.coordinate[0], result.coordinate[1]),
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