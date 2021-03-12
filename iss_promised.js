// const request = require('request');
const request = require('request-promise-native');
const ipPageName = `https://api.ipify.org?format=json`;
// const coordPageName = "https://freegeoip.app/json/";

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(formatResults);
  // .then(body => console.log(body));
  // .then((data) => {
  //   const { response } = JSON.parse(data);
  //   return response;
  // });
};


const fetchMyIP = function() {
  return request(ipPageName);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};


const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body);
  const coord = {"lat": data.latitude, "lng": data.longitude};
  // const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coord.lat}&lon=${coord.lng}`;
  return request(url);
};

const formatResults = function(body) {
  const data = JSON.parse(body);
  let message = [];
  // console.log("format:  ", data["response"]);
  for (const pass of data["response"]) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    message.push(`Next pass at ${datetime} for ${duration} seconds!`);
  }
  console.log(message);
};

module.exports = { nextISSTimesForMyLocation };
