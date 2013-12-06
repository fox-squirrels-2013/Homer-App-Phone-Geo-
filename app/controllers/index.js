function doClick(e) {
	deviceLocation.getLocation();
	// loaderImage.image = "/images/loaderSequence/frame1.png"
	$.dealTable.add(loaderImage)

	var loaderArrayLength=5;
	var loaderIndex=1;
	
	function loadingAnimation() {
	loaderImage.image = ("/images/loaderSequence/frame" + loaderIndex + ".png");
	loaderIndex++;
	if(loaderIndex===6)loaderIndex=1;
	}
	var loaderAnimate = setInterval(loadingAnimation,80);
	// ************************************
	// var win = Ti.UI.createWindow()
	// var loaderImage = Ti.UI.createImageView({
 //  	width:200,
 //  	height:200
	// });
	// win.add(loaderImage);
	// var loaderArrayLength=5;
	// var loaderIndex=1;
	// function loadingAnimation() {
	// loaderImage.image = "images/loader-sequence/frame" + loaderIndex + ".png";
	// loaderIndex++;
	// if(loaderIndex===6)loaderIndex=1;
	// }
	// var loaderAnimate = setInterval(loadingAnimation,80);
	// win.open();


	// sendGeocode.sendLocation(locationValues.lastLocation.latitude, locationValues.lastLocation.longitude)
    sendGeocode.sendLocation(locationValues.fakeLocation.latitude, locationValues.fakeLocation.longitude);
	

}

var loaderImage = Ti.UI.createImageView({
  	top: "300dp",
  	left: "100dp",
  	width:200,
  	height:200
	});

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
			
      		Titanium.Geolocation.getCurrentPosition(this.setLocation);
      		
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
			 geocodeData.responseData(self)
			 displayDeals.dataToRows()
			}
	  sendGeocode.xhr.onerror = function(e) {
	   alert("There will be errors!");
	  };
	}
};
var geocodeData = {
   response: "0",
   responseData: function(self){
	 var serverData = JSON.parse(self.responseText);
	 geocodeData.response = serverData
	}
};

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'green',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  message: 'Loading...',
  top:50,
  left:100,
  height:Ti.UI.SIZE,
  width:Ti.UI.SIZE
});

var displayDeals = {
		dataToRows: function(){
			var rows = [];
			geocodeData.response.results.forEach(function(result){
			 	rows.push(Alloy.createController('row', {
			 		mapUrl: queryParser.google(result.coordinate[0], result.coordinate[1]),
			 		name: result.name,
					product: result.product,
					price: result.price,
					address: result.address,
					discount: result.discount
				}).getView());
			});
		loaderImage.hide()
		$.dealTable.setData(rows);
		
	}
};

$.index.open();