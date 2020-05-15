const request=require('request')

const forecast=(latti,longi,callbacks)=>{
    url='http://api.weatherstack.com/current?access_key=fba68d7316e8807a9804b5a25805545a&query='+encodeURIComponent(latti)+','+encodeURIComponent(longi)
    request({url:url,json:true},(error,response)=>{
        if(error){
            callbacks('Unable to connect!',undefined)
        }else if(response.body.error){
            callbacks('Error!',undefined)
        }else{
            callbacks(undefined,{
                time:response.body.current.observation_time,
                temperature:response.body.current.temperature,
                description:response.body.current.weather_descriptions[0],
                feel:response.body.current.feelslike
            })
        }
    })
}

module.exports=forecast

// DEMO USE

// forecast(26.350,92.667,(error,data)=>{
//     if(error){
//         console.log(error)
//     }else{
//         console.log('Time: '+data.time)
//         console.log('Temperature: '+data.temperature)
//         console.log('Descb: '+data.description)
//         console.log('Apparant: '+data.feel)
//     }
// })