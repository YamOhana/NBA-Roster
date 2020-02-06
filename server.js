const express = require('express')
const path = require('path')
const moment = require('moment')
const request = require('request')
const app = express()



app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

//--------------------------------------------------DATA REQUEST------------------------------------------------

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}



app.get('/teams/:teamName', function (req, res) {

    let teamName = req.params.teamName

    const url = "http://data.nba.net/10s/prod/v1/2018/players.json"
    request(url, (err, respones, body) => {

        if (err) {
            return console.log(err);
        }
       let teamData =  JSON.parse(respones.body).league.standard

     let newData =   teamData.filter(d => d.teamId === teamToIDs[teamName] && d.isActive)
       .map(d => {
            return {
                firstName:d.firstName ,
                lastName:d.lastName ,
                jersey:d.jersey,
                pos:d.pos
            }
        })   

        console.log(newData);
        
        res.send(newData)

        

    })

//     request('https://nba-players.herokuapp.com/players/', function(err, res){

// let playerPic = JSON.parse(res.body)
// res.send(playerPic)
//     })

})

//--------------------------------------------------PORT---------------------------------------------------

const port = 3000
app.listen(port, function () {
    console.log(`Server is running on ${port}`)
})
