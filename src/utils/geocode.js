const request=require('request')

const geocode=(address,callbacks)=>{
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmlsYW01NDQzOCIsImEiOiJjazlyNXl3cG4wNm14M2VycjR3ZTNnZDlpIn0.lpDWGJKbR2Vrjg2O2-QiTQ&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callbacks('Unable to connect!',undefined)
        }else if( response.body.features.length===0 ){
            callbacks('Place Not Found!',undefined)
        }else{
            const lattitude=response.body.features[0].center[0]
            const longitude=response.body.features[0].center[1]
            const places=response.body.features[0].place_name
            callbacks(undefined,{
                lattitude:lattitude,
                longitude:longitude,
                place:places
            })
        }
    })
}

module.exports=geocode

// DEMO USE
// geocode('Nagaon',(error,data)=>{
//     if(error){
//         console.log(error)
//     }else{
//         console.log('Place: '+data.place)
//         console.log('Longitude: '+data.longitude)
//         console.log('Lattitude: '+data.lattitude)
//     }
// })