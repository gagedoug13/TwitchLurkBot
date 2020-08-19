const tmi = require('tmi.js')
const fs = require('fs')
const request = require('request')

let collection = []
request('https://tmi.twitch.tv/group/user/nylume/chatters', function (error, response, body) {

    const timeStamp = new Date();
    
    const timeStampAndViewers = [{"timeStamp": timeStamp}]
    
    timeStampAndViewers.push({'allChatters': body})
    
    collection.push(timeStampAndViewers)
    
    console.log(collection)



})
// require('dotenv').config()
// fetch("tmi.twitch.tv/groups/user/nylume/chatters") 
//     .then(response => response.json())
//     .then(data => console.log(data))
    

// const client = new tmi.client(opts)