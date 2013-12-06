function Controller() {
    function doClick() {
        function loadingAnimation() {
            loaderImage.image = "/images/loaderSequence/frame" + loaderIndex + ".png";
            loaderIndex++;
            6 === loaderIndex && (loaderIndex = 1);
        }
        deviceLocation.getLocation();
        $.dealTable.add(loaderImage);
        var loaderIndex = 1;
        setInterval(loadingAnimation, 80);
        sendGeocode.sendLocation(locationValues.fakeLocation.latitude, locationValues.fakeLocation.longitude);
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
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        id: "activityIndicator",
        message: "Loading..."
    });
    $.__views.index.add($.__views.activityIndicator);
    $.__views.dealTable = Ti.UI.createTableView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "220dp",
        backgroundColor: "#CCCCCC",
        id: "dealTable"
    });
    $.__views.index.add($.__views.dealTable);
    openMap ? $.__views.dealTable.addEventListener("click", openMap) : __defers["$.__views.dealTable!click!openMap"] = true;
    $.__views.endFrame = Ti.UI.createView({
        backgroundColor: "#999999",
        width: "100%",
        height: "55dp",
        bottom: "0dp",
        id: "endFrame"
    });
    $.__views.index.add($.__views.endFrame);
    $.__views.Button = Ti.UI.createImageView({
        right: "100dp",
        width: "136dp",
        bottom: "5dp",
        height: "42dp",
        id: "Button",
        image: "/images/beerme.png"
    });
    $.__views.endFrame.add($.__views.Button);
    doClick ? $.__views.Button.addEventListener("click", doClick) : __defers["$.__views.Button!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var loaderImage = Ti.UI.createImageView({
        top: "300dp",
        left: "100dp",
        width: 200,
        height: 200
    });
    var locationValues = {
        lastLocation: {
            latitude: 0,
            longitude: 0
        },
        fakeLocation: {
            latitude: 37.7923852,
            longitude: -122.4024346
        }
    };
    var deviceLocation = {
        getLocation: function() {
            if (Ti.Geolocation.locationServicesEnabled) {
                Titanium.Geolocation.purpose = "Get Current Location";
                Titanium.Geolocation.getCurrentPosition(this.setLocation);
            } else alert("Please enable location services");
        },
        setLocation: function(e) {
            if (e.error) Ti.API.error("Error" + e.error); else {
                locationValues.lastLocation.longitude = e.coords.longitude;
                locationValues.lastLocation.longitude = e.coords.longitude;
            }
        }
    };
    var queryParser = {
        api_url: "http://sanfran-beer-finder.herokuapp.com/?",
        url: function(lat, lon) {
            return queryParser.api_url + queryParser.api(lat, lon);
        },
        api: function(lat, lon) {
            return "latitude=" + lat + "&longitude=" + lon;
        },
        google: function(lat, lon) {
            return "https://maps.google.com/maps?q=" + lat + ",+" + lon;
        }
    };
    var sendGeocode = {
        xhr: Ti.Network.createHTTPClient(),
        sendLocation: function(phoneLatitude, phoneLongitude) {
            sendGeocode.xhr.open("GET", queryParser.url(phoneLatitude, phoneLongitude));
            sendGeocode.xhr.send();
            sendGeocode.xhr.onload = function() {
                var self = this;
                geocodeData.responseData(self);
                displayDeals.dataToRows();
            };
            sendGeocode.xhr.onerror = function() {
                alert("There will be errors!");
            };
        }
    };
    var geocodeData = {
        response: "0",
        responseData: function(self) {
            var serverData = JSON.parse(self.responseText);
            geocodeData.response = serverData;
        }
    };
    Ti.UI.createActivityIndicator({
        color: "green",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        message: "Loading...",
        top: 50,
        left: 100,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    var displayDeals = {
        dataToRows: function() {
            var rows = [];
            geocodeData.response.results.forEach(function(result) {
                rows.push(Alloy.createController("row", {
                    mapUrl: queryParser.google(result.coordinate[0], result.coordinate[1]),
                    name: result.name,
                    product: result.product,
                    price: result.price,
                    address: result.address,
                    discount: result.discount
                }).getView());
            });
            loaderImage.hide();
            $.dealTable.setData(rows);
        }
    };
    $.index.open();
    __defers["$.__views.dealTable!click!openMap"] && $.__views.dealTable.addEventListener("click", openMap);
    __defers["$.__views.Button!click!doClick"] && $.__views.Button.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;