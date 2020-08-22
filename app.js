const request = require('request')
require('dotenv').config()

const { MongoClient } = require('mongodb')

const uri = process.env.DB_URL
const client = new MongoClient(uri)

let db = null
let userCollection = null


client.connect().then(() => {
  userCollection = client.db("lurkBase").collection("lurkData");
  console.log("connected")
})

const lookForUser = async () => {
  const userRecord = await userCollection.findOne({userName: "nation_live"}, {}, function(err, doc) {
    return doc
  })
  if (userRecord) {
    console.log("nation found") 
  } else {
    console.log("no user found")
  }
}


const addRecordToCollection = setInterval(() => {
  request({url: 'https://tmi.twitch.tv/group/user/nylume/chatters', json: true}, function (error, response, body) {

    lookForUser()
  
    const timeStamp = new Date();
    
    const timeStampAndViewers = [{"timeStamp": timeStamp}]
    
    timeStampAndViewers.push({'allChatters': body})
    const streamer = timeStampAndViewers[1].allChatters.chatters.broadcaster[0]
    // console.log(timeStampAndViewers)
    // userCollection.insertOne({timeStampAndViewers}, function(err, r) {
     
    // });
    // console.log(timeStampAndViewers)

    // userCollection.insertOne({timeStampAndViewers}) 

    // userCollection.drop(function(err, reply) {
    //   // deletes userCollection database
    // })

})}, 1000)
