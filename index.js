// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
const iss = require('./iss');

iss.fetchMyIP((error, ip) => {
  if (error) {
    console.log("Error fetching IP:  " , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  iss.fetchCoordsByIP(ip, (error, coord) => {
    if (error) {
      console.log("Error fetching coordinates:  " , error);
      return;
    }
  
    console.log('It worked! Returned coordinates:' , coord);
    iss.fetchISSFlyOverTimes(coord, (error, data) => {
      if (error) {
        console.log("Error fetching flyover times:  " , error);
        return;
      }
    
      console.log('It worked! Returned flyover times:' , data);
    
    });
  
  });
});
