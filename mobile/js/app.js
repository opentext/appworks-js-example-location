var self = this;
var mLocation = null;
var mWatchId = null;;

/**
 * We only want a single instance of AWLocation
 * All access to the AWLocation instance should come through this function
 */
function getLocationInstance() {
  if(self.mLocation == null) {
    self.mLocation = new Appworks.AWLocation(
      function(position) {
        var string = "";
        string += "Latitude: "          + position.coords.latitude          + "<br/>";
        string += "Longitude: "         + position.coords.longitude         + "<br/>";
        string += "Altitude: "          + position.coords.altitude          + "<br/>";
        string += "Accuracy: "          + position.coords.accuracy          + "<br/>";
        string += "Altitude Accuracy: " + position.coords.altitudeAccuracy  + "<br/>";
        string += "Heading: "           + position.coords.heading           + "<br/>";
        string += "Speed: "             + position.coords.speed             + "<br/>";
        string += "Timestamp: "         + position.timestamp;
        out(string);
      }, function(error) {
        var string = "";
        string += "Code: " + error.code + "<br/>";
        string += "Message: " + error.message;
        out(error);
    });
  }

  return self.mLocation;
}

/**
 * Get the current position
 */
function getLocation() {
  var location = getLocationInstance();
  location.getCurrentPosition({ timeout: 5000 });
}

/**
 * Continually retrieve the location position
 * Pass in a options:
 * timeout - (int) for the interval (milliseconds) in which position should return
 * enableHighAccuracy - (bool) true: Use high accuracy (slower and more intensive), false: Low accuracy, quicker and easier on the battery
 * maximumAge - (int) Accept a cached position whose age is no greater than the specified time in milliseconds.
 * Keep track of the watch ID, so we can turn it off.
 */
function watchLocation() {
  var location = getLocationInstance();
  self.mWatchId = location.watchPosition({ timeout: 5000 }); // update every 3 seconds
}

/**
 * Use the watch ID obtained when setting a location watch to clear it.
 */
function clearLocation() {
  var location = getLocationInstance();
  location.clearWatch(mWatchId);
}

function out(message) {
  console.log(message);
  if(typeof(message) == "object") {
    getObject("result").innerHTML = JSON.stringify(message);
  } else {
    getObject("result").innerHTML = message;
  }
}

function getObject(name) {
  return document.getElementById(name);
}
