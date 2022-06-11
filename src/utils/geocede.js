const request=require("request");

const geocode=(address,callback)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?q="+encodeURIComponent(address)+"&appid=8d823ec7b83acae9abc9e5ec200d3fe4"

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to location ",undefined)
        }
        else if((response.body.message)){
            callback("Unable to find location .try again",undefined)
        }
        else{
            callback(undefined,{
                longitude:response.body.coord.lon,
                latitude:response.body.coord.lat,
                location:response.body.sys.country,
                // weatherStatus:response.body.current.weather_descriptions[0]
            })
        }
    })
}
// geocode("Philadelphia",(error,data)=>{
//     console.log("Error",error);
//     console.log("Data",data)
// })


module.exports=geocode