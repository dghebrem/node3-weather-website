const request = require('request');

const weather = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/463a04bf6bdd5b55ea7dea50fefa2ffa/${latitude},${longitude}?units=si`;
    request({url: url, json: true}, (error, response)=>{
        if (error) {
            callback('Not able to connect to weather server', undefined);
        } else if (response.body.error) {
            callback(response.body.error, undefined);
        } else {
            const {temperature, precipProbability} = response.body.currently;
            const {summary} = response.body.hourly;
            callback(undefined, {
                forecast: summary,
                temperature,
                precipProbability
            });
        };
    });
};

module.exports = weather;
