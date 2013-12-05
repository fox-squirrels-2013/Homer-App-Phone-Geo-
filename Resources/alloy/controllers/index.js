function Controller() {
    function doClick() {
        deviceLocation.getLocation();
        sendGeocode.sendLocation(deviceLocation.fakeLocation.latitude, deviceLocation.fakeLocation.longitude);
    }
    function openMap(e) {
        var url = e.row.mapUrl;
        var webview = Ti.UI.createWebView();
        webview.setUrl(url);
        var win = Ti.UI.createWindow();
        win.add(webview);
        win.open({
            modal: true
        });
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
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "220dp",
        backgroundColor: "#CCCCCC",
        id: "dealTable"
    });
    $.__views.index.add($.__views.dealTable);
    openMap ? $.__views.dealTable.addEventListener("click", openMap) : __defers["$.__views.dealTable!click!openMap"] = true;
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
                Titanium.Geolocation.getCurrentPosition(this.setLocation);
            } else alert("Please enable location services");
        },
        setLocation: function(e) {
            if (e.error) Ti.API.error("Error" + e.error); else {
                deviceLocation.lastLocation.longitude = e.coords.longitude;
                deviceLocation.lastLocation.longitude = e.coords.longitude;
            }
        },
        fakeLocation: {
            latitude: 37.7923852,
            longitude: -122.4024346
        }
    };
    var sendGeocode = {
        api_url: "http://sanfran-beer-finder.herokuapp.com/?",
        xhr: Ti.Network.createHTTPClient(),
        apiQueryParser: function(lat, lon) {
            return "latitude=" + lat + "&longitude=" + lon;
        },
        googleQueryParser: function(lat, lon) {
            return "https://maps.google.com/maps?q=" + lat + ",+" + lon;
        },
        sendLocation: function(phoneLatitude, phoneLongitude) {
            queryString = sendGeocode.apiQueryParser(phoneLatitude, phoneLongitude);
            url = sendGeocode.api_url + queryString;
            sendGeocode.xhr.open("GET", url);
            sendGeocode.xhr.send();
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
            sendGeocode.xhr.onerror = function() {
                alert("There will be errors!");
            };
        }
    };
    $.index.open();
    __defers["$.__views.Button!click!doClick"] && $.__views.Button.addEventListener("click", doClick);
    __defers["$.__views.dealTable!click!openMap"] && $.__views.dealTable.addEventListener("click", openMap);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;