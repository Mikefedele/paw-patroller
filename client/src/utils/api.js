// const yelp = require('yelp-fusion');
const CORS = "https://evening-mesa-85661.herokuapp.com/"

// Yelp needed cors-anywhere until deployed. Can update after deployment
// cors addded

// add .env to client folder to hide API key
// todo cors changed to cors-cure server set it to const for read-ability
export const searchYelpApi = (query) => {
  console.log('hitAPI')
    return fetch(`https://private-cors-server.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=dogs_allowed&location=${query}`, {
      method: 'GET',
      headers: {
        authorization: process.env.REACT_APP_API_KEY,
      }
    });
  };

