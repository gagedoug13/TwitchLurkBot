const request = require('request')
require('dotenv').config()
require('request')

const { MongoClient } = require('mongodb')

const uri = process.env.DB_URL
const client = new MongoClient(uri)

let userCollection = null
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
}




const createScreenShot = (streamerDetails) => {
  const viewerList = streamerDetails.chatters.viewers
  const time = new Date();
  const screenShot = {timeStamp: time}
  screenShot["viewerList"] = viewerList
 
  return screenShot
}



const addScreenShot = (screenShot) => {

  userCollection.findOneAndUpdate({userName:streamer}
    , {$set: {streamObjects: [{stream1: screenShot}]}}
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

  }, 1000)
