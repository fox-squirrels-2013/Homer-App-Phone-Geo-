	function doClick(e) {
		deviceLocation.getLocation();
		// sendGeocode.sendLocation(locationValues.lastLocation.latitude, locationValues.lastLocation.longitude)
	    sendGeocode.sendLocation(locationValues.fakeLocation.latitude, locationValues.fakeLocation.longitude);
	}

	function openMap(e){
		var url = (e.row.mapUrl)
		var webview = Ti.UI.createWebView()
		webview.setUrl(url)
		var win = Ti.UI.createWindow()
		win.add(webview)
		win.open({modal:true})
	}

//deviceLocation
// sets the last location
// instatiates the location values
// stores a fake location
// get the current location
// Setlocation is setting the values to lastLocation


	var locationValues = {
		lastLocation: {
			"latitude" : 0,
			"longitude" : 0
		},
		fakeLocation : {
			"latitude" : 37.7923852,
			"longitude" : -122.4024346
		}
	}
	var deviceLocation = {
		getLocation: function() {
			if (Ti.Geolocation.locationServicesEnabled) {
				Titanium.Geolocation.purpose = 'Get Current Location';
        		Titanium.Geolocation.getCurrentPosition(this.setLocation)}
			else {
				alert('Please enable location services');
			}
		},
		setLocation: function(e) {
			if (e.error) {
				Ti.API.error('Error' + e.error)
			}
			else {
				locationValues.lastLocation.longitude = e.coords.longitude
				locationValues.lastLocation.longitude = e.coords.longitude
			}
		},
	};


//sendGeocode
// sets the url to use for  our api call
//creates an HHTP request
//formats the query string
//formatting the googlequery string for the map
//concatenating the url with query string
//sending the client
//calling the response data



	var sendGeocode = {
		api_url : "http://sanfran-beer-finder.herokuapp.com/?",
		xhr : Ti.Network.createHTTPClient(),
		apiQueryParser: function(lat, lon){
			return "latitude=" + lat + "&longitude=" + lon;
		},
		googleQueryParser: function(lat, lon){
			return "https://maps.google.com/maps?q=" + lat + ",+" + lon;
		},
		sendLocation : function(phoneLatitude, phoneLongitude) {
			queryString = sendGeocode.apiQueryParser(phoneLatitude, phoneLongitude)
			url = sendGeocode.api_url + queryString
			sendGeocode.xhr.open('GET', url);
			sendGeocode.xhr.send();
			geocodeData.responseData();
		}
	};

	//geocodeData
	//formatting the response of a succesful xhr request
	//Receiving the response
	//pushing the values into rows
	//inserting the rows into the dealTable
	//handling the on error request and passing an alert
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

	$.index.open();