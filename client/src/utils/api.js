// const yelp = require('yelp-fusion');
const CORS = "https://cors-anywhere.herokuapp.com/"

// Yelp needed cors-anywhere until deployed. Can update after deployment
// cors addded

// add .env to client folder to hide API key
// todo cors change
export const searchYelpApi = (query) => {
  console.log('hitAPI')
    return fetch(`${CORS}https://api.yelp.com/v3/businesses/search?term=dogs_allowed&location=${query}`, {
      method: 'GET',
      headers: {
        authorization: process.env.REACT_APP_API_KEY,
      }
    });
  };

