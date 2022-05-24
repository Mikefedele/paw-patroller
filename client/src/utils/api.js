const yelp = require('yelp-fusion');

const apiKey = 'sFDrQ2pCQos8PDSDDwhIcVDKCUPVRHBWQf8OUcjX3PKW-d6e0S_uxIlVXXbHGFf96nF8w-VqDPw_2ZzSU-5-ievJLv_YlGpOQkamfNYe3l5k3b0BnlP2gTXQ5ZyLYnYx';

export const searchYelp = {
  term:'dogs_allowed',
  location: '19440'
};

const client = yelp.client(apiKey);

client.search(searchYelp).then(response => {
  const firstResult = response.jsonBody.businesses;
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});




// GET https://api.yelp.com/v3/businesses/search?term=dogs_allowed&location=${query}
export const searchYelpApi = (query) => {
  return fetch(`https://api.yelp.com/v3/businesses/search?term=dogs_allowed&location=${query}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
};