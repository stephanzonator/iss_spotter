const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  // .then(console.log("success! monkeyfuzz"))
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

