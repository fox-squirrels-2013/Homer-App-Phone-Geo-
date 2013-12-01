function Controller() {
    function doClick() {
        locationModule.getLocation();
        alert("locationmodule " + locationModule.lastLocation.latitude);
        sendGeocode.sendLocation(locationModule.lastLocation.latitude, locationModule.lastLocation.longitude);
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
    locationModule = {
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
                        locationModule.lastLocation.longitude = e.coords.longitude;
                        locationModule.lastLocation.latitude = e.coords.latitude;
                        alert("e.coords: " + e.coords);
                    }
                });
            } else alert("Please enable location services");
        },
        fakeLocation: {
            accuracy: 30,
            altitude: 0,
            altitudeAccuracy: null,
            heading: 0,
            latitude: 37.7923852,
            longitude: -122.4024346,
            speed: 0,
            timestamp: 1385426498331
        }
    };
    var locationHelper = {
        queryParser: function(lat, long) {
            return "latitude=" + lat + "&longitude=" + long;
        }
    };
    var sendGeocode = {
        xhr: Ti.Network.createHTTPClient(),
        api_url: "http://sanfran-beer-finder.herokuapp.com/stores.json?",
        sendLocation: function(phoneLatitude, phoneLongitude) {
            queryString = locationHelper.queryParser(phoneLatitude, phoneLongitude);
            url = sendGeocode.api_url + queryString;
            sendGeocode.xhr.open("GET", url);
            sendGeocode.xhr.send({
                latitude: phoneLatitude,
                longitude: phoneLongitude
            });
            sendGeocode.xhr.onload = function() {
                alert(this.responseText);
            };
            sendGeocode.xhr.onerror = function() {
                alert("There be errors!");
            };
        }
    };
    $.index.open();
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;