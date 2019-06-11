const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGdoZWJyZW0iLCJhIjoiY2p3a3NyeTh4MG8yeTRicDZjczBvZGNiaCJ9.JVQ_7jwgT-8LxZuIinLx-A&limit=1`;
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Not able to connect to location server.', undefined);
        } else if(response.body.features.length === 0) {
            callback('Not able to find location.', undefined);
        } else {
            const {center, place_name:location} = response.body.features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            });
        }
    });
};

module.exports = geocode;