// Lots of DOUBTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('request')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()
const port=process.env.PORT || 3000

// Define Path for Express Config
const publicDirPath=Path.join(__dirname,'../public')
const viewsPath=Path.join(__dirname,'../templates/views')
const partialsPath=Path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'NKK'
    })
})

app.get('/about',(req,res)=>{                   //////////////// res.render r kaam ki?
    res.render('about',{
        title:'All about the builder',
        name:'NKK'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'NKK'
    })
})

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:'Address not found!'
       })
   }
    geocode(req.query.address,(error,{longitude,lattitude,place}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,lattitude,(error1,{time,temperature,description,feel}={})=>{
            if(error1){
                return res.send({error})
            }
            res.send({
                place,
                time,
                temperature,
                description,
                feel
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        type: 'Help article not found!',
        name:'NKK'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        type:'Page not fond',
        name:'NKK'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
}) 


