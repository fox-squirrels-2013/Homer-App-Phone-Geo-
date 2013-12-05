describe("Setting test scope", function() {
  var Alloy = require("alloy");
  var $;
  beforeEach(function() {
     // create the index controller before executing the
     // "can create and destroy" test suite.
     $ = Alloy.createController("index");
  });

  describe("find alec", function(){
    it("alec connects", function(){
      test.findalec();
      expect(test.findalec).toHaveBeenCalled()
    });
  });  

  describe("sendGeocode works", function(){
    it("has got a send Location function", function(){
      sendGeocode.sendLocation();
      expect(sendGeocode.sendLocation).toHaveBeenCalled()
    });
  });

  describe("doClick function updates last location to current location ", function() { 
    xit("lat which is different from 0", function() { 
      spyOn(deviceLocation, "getLocation");
      spyOn(sendGeocode, "sendLocation");
      spyOn(deviceLocation.fakeLocation).andReturn({
        longitude: 2,
        latitude: 3
      });
      doClick();
      expect(deviceLocation.getLocation).toHaveBeenCalled();
      expect(deviceLocation.sendLocation).toHaveBeenCalledWith(deviceLocation.fakeLocation.latitude, deviceLocation.fakeLocation.longitude);
    });
      
  });
});  