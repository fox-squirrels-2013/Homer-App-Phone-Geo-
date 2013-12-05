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
      		Titanium.Geolocation.getCurrentPosition(this.setLocation)
    }
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

var queryParser = {
	api_url: "http://sanfran-beer-finder.herokuapp.com/?",
	url: function(lat, lon){
		return queryParser.api_url + queryParser.api(lat, lon)
	},
	api: function(lat, lon){
		return "latitude=" + lat + "&longitude=" + lon;
	},
	google: function(lat, lon){
		return "https://maps.google.com/maps?q=" + lat + ",+" + lon;
	}
}


var sendGeocode = {
	xhr: Ti.Network.createHTTPClient(),
	sendLocation: function(phoneLatitude, phoneLongitude) {
		sendGeocode.xhr.open('GET', queryParser.url(phoneLatitude, phoneLongitude));
		sendGeocode.xhr.send();
	  sendGeocode.xhr.onload = function(e) {
			var self = this
			 geocodeData.responseData(self)}
	  sendGeocode.xhr.onerror = function(e) {
	   alert("There will be errors!");
	  };
	}
};

//geocodeData
//formatting the response of a succesful xhr request
//Receiving the response
//pushing the values into rows
//inserting the rows into the dealTable
//handling the on error request and passing an alert
var geocodeData = {
   response: "0",
   responseData: function(self){
   	console.log("test for getting responseData")
	 var serverData = JSON.parse(self.responseText);
	 geocodeData.response = serverData
	 displayDeals.test()
	}
};


displayDeals = {
		test: function(){
			var rows = []
			geocodeData.response.results.forEach(function(result){
			 	rows.push(Alloy.createController('row', {
			 		mapUrl: queryParser.google(result.coordinate[0], result.coordinate[1]),
			 		name: result.name,
					product: result.product,
					price: result.price,
					address: result.address,
					discount: result.discount
				}).getView());
			})
		$.dealTable.setData(rows);
	}
}

$.index.open();