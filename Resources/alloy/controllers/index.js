function Controller() {
    function doClick() {
        deviceLocation.getLocation();
        alert("deviceLocation " + deviceLocation.lastLocation.latitude);
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
        backgroundColor: "#BDBDBD",
        navBarHidden: true,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.header = Ti.UI.createView({
        width: "500dp",
        height: "35dp",
        top: "0dp",
        backgroundColor: "white",
        id: "header"
    });
    $.__views.index.add($.__views.header);
    $.__views.middleframe = Ti.UI.createView({
        width: "500dp",
        height: "180dp",
        top: "35dp",
        backgroundColor: "white",
        id: "middleframe"
    });
    $.__views.index.add($.__views.middleframe);
    $.__views.image = Ti.UI.createImageView({
        top: "0dp",
        width: "320dp",
        height: "150dp",
        id: "image",
        image: "/images/beerscreen.png"
    });
    $.__views.middleframe.add($.__views.image);
    $.__views.Personalized = Ti.UI.createLabel({
        width: "300dp",
        top: "160dp",
        left: "100dp",
        text: "YOUR PERSONALIZED DEALS:",
        id: "Personalized",
        textAlign: "TI.UI.TEXT_ALIGNMENT_LEFT"
    });
    $.__views.middleframe.add($.__views.Personalized);
    $.__views.Button = Ti.UI.createImageView({
        right: "100dp",
        width: "30dp",
        top: "150dp",
        height: "30dp",
        id: "Button",
        image: "/images/refresh.png"
    });
    $.__views.middleframe.add($.__views.Button);
    doClick ? $.__views.Button.addEventListener("click", doClick) : __defers["$.__views.Button!click!doClick"] = true;
    $.__views.dealTable = Ti.UI.createTableView({
        width: "300dp",
        height: "65dp",
        top: "220dp",
        backgroundColor: "#CCCCCC",
        id: "dealTable"
    });
    $.__views.index.add($.__views.dealTable);
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
        api_url: "http://sanfran-beer-finder.herokuapp.com/?",
        xhr: Ti.Network.createHTTPClient(),
        queryParser: function(lat, long) {
            return "latitude=" + lat + "&longitude=" + long;
        },
        sendLocation: function(phoneLatitude, phoneLongitude) {
            queryString = sendGeocode.queryParser(phoneLatitude, phoneLongitude);
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
        responseString: "0",
        responseData: function() {
            sendGeocode.xhr.onload = function() {
                var response = JSON.parse(this.responseText);
                var rows = [];
                response.results.forEach(function(result) {
                    rows.push(Alloy.createController("row", {
                        name: result.name,
                        product: result.product,
                        price: result.price,
                        address: result.address,
                        discount: result.discount
                    }).getView());
                });
                $.dealTable.setData(rows);
            };
            sendGeocode.xhr.onerror = function() {
                alert("There will be errors!");
            };
        }
    };
    $.index.open();
    __defers["$.__views.Button!click!doClick"] && $.__views.Button.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;