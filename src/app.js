const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory~
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pallav Laddha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pallav Laddha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        helpText: 'This is some helpful text.',
        name: 'Pallav Laddha'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
       return res.send('Please provide an address');
    }

    geocode(req.query.address, (error, {latitude, longitude, name} = {}) => {
        if(error){
            return res.send({ error })
        }
       

        forecast(latitude, longitude, (error, forecastData) =>{

            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: name,
                address: req.query.address
            })
        })

    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404 help',
        name: 'Pallav Laddha',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404 help',
        name: 'Pallav Laddha',
        errorMessage: 'page not found'
    })
})



app.listen(port, () => {
    console.log('Server is up on port.'+port)
})