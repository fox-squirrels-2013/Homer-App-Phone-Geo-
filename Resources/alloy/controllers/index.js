function Controller() {
    function doClick() {
        alert(locationModule.fakeLocation);
        sendGeocode.sendLocation(locationModule.fakeLocation.latitude, locationModule.fakeLocation.longitude);
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
        getLocation: function() {
            if (Ti.Geolocation.locationServicesEnabled) {
                Titanium.Geolocation.purpose = "Get Current Location";
                Titanium.Geolocation.getCurrentPosition(function(e) {
                    e.error ? Ti.API.error("Error: " + e.error) : alert(e.coords);
                });
            } else alert("Please enable location services");
        },
        fakeLocation: {
            accuracy: 30,
            altitude: 0,
            altitudeAccuracy: null,
            heading: 0,
            latitude: 37.7922852,
            longitude: -122.4060012,
            speed: 0,
            timestamp: 1385426498331
        }
    };
    var sendGeocode = {
        xhr: Ti.Network.createHTTPClient(),
        api_url: "www.google.com",
        sendLocation: function(phoneLatitude, phoneLongitude) {
            sendGeocode.xhr.open("POST", sendGeocode.api_url);
            sendGeocode.xhr.send({
                latitude: phoneLatitude,
                longitude: phoneLongitude
            });
        }
    };
    $.index.open();
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;