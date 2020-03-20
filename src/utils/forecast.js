const request = require('request')


const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2f128b451f89d838ede8ff0c4b6f0bb7/'+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)
    request({url, json: true}, (error,{body}) =>{
    if(error){
        callback('unable to connect to network!', undefined)
    }else if(body.error){
        callback('wrong address provided!', undefined)
    }else{
            callback(undefined, `It is currently ${body.currently.temperature} fahrenheit out. There is a ${body.currently.precipProbability}% probability of rain`)
    }
    })
}

module.exports = forecast