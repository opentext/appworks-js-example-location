# AppWorks Example - AWLocation

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the AWLocation plugin is to provide the current GPS location of your device.

## Usage

#### getCurrentPosition

```javascript
Appworks.AWLocation(onSuccess, onError)
getCurrentPosition(options: any)
```

Create an instance of AWLocation with success and error handlers and call the getCurrentPosition(options) function to get the current GPS location of the device.

+ __onSuccess__: this will be called upon success with a position object
 + __position__: this is a JSON object which contains x, y, z and timestamp properties
  + __coords.latitude__: the current latitude
  + __coords.longitude__:  the current longitude
  + __coords.altitude__:  the current altitude
  + __coords.accuracy__:  the current accuracy
  + __coords.altitudeAccuracy__:  the current altitude accuracy
  + __coords.heading__:  the current heading
  + __coords.speed__:  the current speed
  + __timestamp__:  the current timestamp
+ __onError__: this will be called upon error with an error object
 + __error__: this is a JSON object which contains code and message properties

Examples
```javascript
var onSuccess = function(position) {
  var string = "";
  string += "Latitude: "          + position.coords.latitude          + "\n";
  string += "Longitude: "         + position.coords.longitude         + "\n";
  string += "Altitude: "          + position.coords.altitude          + "\n";
  string += "Accuracy: "          + position.coords.accuracy          + "\n";
  string += "Altitude Accuracy: " + position.coords.altitudeAccuracy  + "\n";
  string += "Heading: "           + position.coords.heading           + "\n";
  string += "Speed: "             + position.coords.speed             + "\n";
  string += "Timestamp: "         + position.timestamp;
  alert(string);
};

function onError(error) {
  var string = "";
  string += "Code: " + error.code + "\n";
  string += "Message: " + error.message;
  alert(error);
}

var location = new Appworks.AWLocation(onSuccess, onError);
location.getCurrentPosition({ timeout: 5000 });
```

#### watchPosition

```javascript
Appworks.AWLocation(onSuccess, onError)
watchPosition()
```

Create an instance of AWLocation with success and error handlers and call the watchPosition function to get the current GPS position of the device continuously.

Refer to getCurrentPosition for property listing

Examples
```javascript
var onSuccess = function(position) {
  var string = "";
  string += "Latitude: "          + position.coords.latitude          + "\n";
  string += "Longitude: "         + position.coords.longitude         + "\n";
  string += "Altitude: "          + position.coords.altitude          + "\n";
  string += "Accuracy: "          + position.coords.accuracy          + "\n";
  string += "Altitude Accuracy: " + position.coords.altitudeAccuracy  + "\n";
  string += "Heading: "           + position.coords.heading           + "\n";
  string += "Speed: "             + position.coords.speed             + "\n";
  string += "Timestamp: "         + position.timestamp;
  alert(string);
};

function onError(error) {
  var string = "";
  string += "Code: " + error.code + "\n";
  string += "Message: " + error.message;
  alert(error);
}

var location = new Appworks.AWLocation(onSuccess, onError);
var watchID = location.watchPosition({ timeout: 5000 });
```

#### clearWatch

```javascript
clearWatch(watchId: number)
```

Create an instance of AWLocation with success and error handlers and call the watchPosition function to get the current device rotation continuously.

+ __watchId__: when invoking AWLocation.watchPosition, you will receive a watchId, pass it in here to disable your AWLocation.watchPosition.

Examples
```javascript
// Refer to previous examples for the onSuccess and on onError functions
var location = new Appworks.AWLocation(onSuccess, onError);

// Keep note of watchId
var watchID = location.watchPosition({ timeout: 5000 });

// later on

location.clearWatch(watchId);
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
