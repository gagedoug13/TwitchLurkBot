const request = require('request')

require('dotenv').config()

let db = null
let userCollection = null


const { MongoClient } = require('mongodb')
const uri = process.env.DB_URL

const client = new MongoClient(uri)

client.connect().then(() => {
  userCollection = client.db("lurkBase").collection("lurkData");
  // perform actions on the collection 
 
  console.log("connected")
})



const addRecordToCollection = setInterval(() => {
  request('https://tmi.twitch.tv/group/user/nylume/chatters', function (error, response, body) {

    const timeStamp = new Date();
    
    const timeStampAndViewers = [{"timeStamp": timeStamp}]
    
    timeStampAndViewers.push({'allChatters': body})
    
  //  collection.push(timeStampAndViewers)
    userCollection.insertOne({timeStampAndViewers}) 

})}, 60000)





