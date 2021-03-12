const request = require('request');
const ipPageName = `https://api.ipify.org?format=json`;
const coordPageName = "https://freegeoip.app/json/";

const fetchMyIP = function(callback) {
  request(ipPageName, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(coordPageName + ip, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    // const { latitude, longitude } = JSON.parse(body);  //potentially better way to do this?
    const data = JSON.parse(body);
    const coord = {"lat": data.latitude, "lng": data.longitude};
    // console.log("data: ", data);
    callback(null, coord);
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  // console.log("latitude: ", coords);
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lng}`, (error, response, body) => {
    
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    // const { latitude, longitude } = JSON.parse(body);  //potentially better way to do this?
    const data = JSON.parse(body);
    callback(null, data["response"][0]);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes  }; //,



//Unused test code
/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

// console.log('error:', error); // Print the error if one occurred
// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// console.log('body:', body); // Print the HTML for the Google homepage.
