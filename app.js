const request = require('request')

require('dotenv').config()

let db = null
let userCollection = null
let chatCollection = null


const { MongoClient } = require('mongodb')
const uri = process.env.DB_URL

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
});




request('https://tmi.twitch.tv/group/user/nylume/chatters', function (error, response, body) {

    const timeStamp = new Date();
    
    const timeStampAndViewers = [{"timeStamp": timeStamp}]
    
    timeStampAndViewers.push({'allChatters': body})
    
  //  collection.push(timeStampAndViewers)
    
  



})
// require('dotenv').config()
// fetch("tmi.twitch.tv/groups/user/nylume/chatters") 
//     .then(response => response.json())
//     .then(data => console.log(data))
    

// const client = new tmi.client(opts)