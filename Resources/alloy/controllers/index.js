function Controller() {
    function doClick() {
        sendGeocode.sendLocation(deviceLocation.fakeLocation.latitude, deviceLocation.fakeLocation.longitude);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Hello, World",
        id: "label"
    });
    $.__views.index.add($.__views.label);
    doClick ? $.__views.label.addEventListener("click", doClick) : __defers["$.__views.label!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    deviceLocation = {
        lastLocation: {
            latitude: 0,
            longitude: 0,
            speed: 0,
            timestamp: 1385426498331
        },
        getLocation: function() {
            if (Ti.Geolocation.locationServicesEnabled) {
                Titanium.Geolocation.purpose = "Get Current Location";
                Titanium.Geolocation.getCurrentPosition(function(e) {
                    if (e.error) Ti.API.error("Error: " + e.error); else {
                        deviceLocation.lastLocation.longitude = e.coords.longitude;
                        deviceLocation.lastLocation.latitude = e.coords.latitude;
                        alert("e.coords: " + e.coords);
                    }
                });
            } else alert("Please enable location services");
        },
        fakeLocation: {
            latitude: 37.7923852,
            longitude: -122.4024346
        }
    };
    var sendGeocode = {
        api_url: "http://sanfran-beer-finder.herokuapp.com/stores.json?",
        xhr: Ti.Network.createHTTPClient(),
        queryParser: function(lat, long) {
            return "latitude=" + lat + "&longitude=" + long;
        },
        sendLocation: function(phoneLatitude, phoneLongitude) {
            queryString = sendGeocode.queryParser(phoneLatitude, phoneLongitude);
            console.log(queryString + "!!!!!!!!!!!!!!!!!!!!!");
            url = sendGeocode.api_url + queryString;
            sendGeocode.xhr.open("GET", url);
            sendGeocode.xhr.send({
                latitude: phoneLatitude,
                longitude: phoneLongitude
            });
            geocodeData.responseData();
        }
    };
    var geocodeData = {
        responseString: "F ",
        responseData: function() {
            sendGeocode.xhr.onload = function() {
                console.log("response String hit!!!!!!!!!!!!!!!!!!!");
                geocodeData.responseString = JSON.parse(this.responseText);
                console.log(geocodeData.responseString);
            };
            sendGeocode.xhr.onerror = function() {
                alert("There will be errors!");
            };
            alert("This is the last line:  " + geocodeData.responseString);
        }
    };
    $.index.open();
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;