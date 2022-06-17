const request=require("request");


const forecast=(longitude,latitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=3b98e8d6ae5224778da2ea57443671f7&query="+latitude+","+longitude+"&units=m";
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect weather service",undefined)
        }else if(response.body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,`It is<strong> ${response.body.current.weather_descriptions[0]}</strong>
              and it is currently <strong>${response.body.current.temperature} ℃ </strong>out .
             It feels like ${response.body.current.feelslike} ℃  and wind speed is 
             ${response.body.current.wind_speed} km/hours`)
        }
    })
}


module.exports=forecast