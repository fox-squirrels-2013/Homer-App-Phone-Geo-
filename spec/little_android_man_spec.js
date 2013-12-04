describe("Single Model Test Suite", function() {
  var Alloy = require("alloy");
  var $;
  beforeEach(function() {
     // create the index controller before executing the
     // "can create and destroy" test suite.
     $ = Alloy.createController("index");
  });

  describe("deviceLocation", function() {
    describe("lastLocation", function() {
      it("returns object with lat, long, speed and timestamp", function() { 
        expect(Object.keys(deviceLocation.lastLocation)).toEqual(["latitude", "longitude", "speed", "timestamp"])
      });
    });
  }); 
  }); 