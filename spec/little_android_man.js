  describe("lastLocation", function() {
    it ("returns object with lat, long, speed and timestamp", function() { 
      expect(Object.keys(deviceLocation.lastLocation)).toEqual(["latitude", "longitude", "speed"])
    })
  })
