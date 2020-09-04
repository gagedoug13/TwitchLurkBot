const request = require('request')
require('dotenv').config()

const { MongoClient } = require('mongodb')
const { get } = require('request')

const uri = process.env.DB_URL
const client = new MongoClient(uri)

let userCollection = null
let streamCounter = 1
const streamer = "nation_live"



client.connect().then(() => {
  userCollection = client.db("lurkBase").collection("lurkData");
  console.log("connected")
  createStreamObject(streamer)
})

const createStreamObject = async (streamer) => {
    const time = new Date();
    userCollection.findOneAndUpdate({userName:streamer}
      , {$set: {streamObjects: []}}
      , {
            projection: {b:1, d:1}
          , sort: {a:1}
          , returnOriginal: false
          , upsert: true
        }
      , function(err, r) {
        
    });
  // console.log(user)
}




const createScreenShot = (streamerDetails) => {
  const viewerList = streamerDetails.chatters.viewers
  const time = new Date();
  const timeStamp = {timeStamp: time}
  timeStamp["viewerList"] = viewerList
 
  return timeStamp
}



const addScreenShot = (streamObject) => {
//  ADD THE SCREENSHOT TO THE USER'S CURRENTSTREAM OBJECT
  // const date = new Date;
  userCollection.findOneAndUpdate({userName:streamer}
    , {$set: {streamObjects: [{stream1: streamObject}]}}
    , {
          projection: {b:1, d:1}
        , sort: {a:1}
        , returnOriginal: false
        , upsert: true
      }
    , function(err, r) {
      
  });
 
}

const getStreamerDetails = async () => {
  const firstPromise = new Promise((resolve, reject) => {
    request({url: 'https://tmi.twitch.tv/group/user/nylume/chatters', json: true}, function (error, response, body) {
    
      if (error) {
        return console.log("couldnt get streamer details")
      }

      resolve(body)
    })
  })
  
  return await firstPromise
  
}


const addRecordToCollection = setInterval(() => {
 
  getStreamerDetails()
  .then(data => createScreenShot(data))
  .then(data => addScreenShot(data))
  // .then(response => console.log(response))
  streamCounter++

  }, 1000)






// MONGO METHODS  -

// const user = await userCollection.find({userName: "nation_live"}).limit(1)


// userCollection.drop(function(err, reply) {
//    deletes userCollection database
// })
