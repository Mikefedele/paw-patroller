const yelp = require('yelp-fusion');
const CORS = "https://cors-anywhere.herokuapp.com/"
// const apiKey = process.env.REACT_APP_API_KEY
// 'Bearer sFDrQ2pCQos8PDSDDwhIcVDKCUPVRHBWQf8OUcjX3PKW-d6e0S_uxIlVXXbHGFf96nF8w-VqDPw_2ZzSU-5-ievJLv_YlGpOQkamfNYe3l5k3b0BnlP2gTXQ5ZyLYnYx';
// console.log(apiKey);
        // process.env.REACT_APP_API_KEY,

        
// Yelp needed cors-anywhere until deployed. Can update after deployment
export const searchYelpApi = (query) => {
  console.log('hitAPI')
    return fetch(`${CORS}https://api.yelp.com/v3/businesses/search?term=dogs_allowed&location=${query}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer sFDrQ2pCQos8PDSDDwhIcVDKCUPVRHBWQf8OUcjX3PKW-d6e0S_uxIlVXXbHGFf96nF8w-VqDPw_2ZzSU-5-ievJLv_YlGpOQkamfNYe3l5k3b0BnlP2gTXQ5ZyLYnYx'

      }
    });
  };