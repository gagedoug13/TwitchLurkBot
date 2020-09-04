const request = require('request')
require('dotenv').config()

const { MongoClient } = require('mongodb')
const { get } = require('request')

const uri = process.env.DB_URL
const client = new MongoClient(uri)

let userCollection = null

const streamer = "nation_live"

let exampleData = "example"


client.connect().then(() => {
  userCollection = client.db("lurkBase").collection("lurkData");
  console.log("connected")
 
})

const createStreamObject = async (streamer) => {
    userCollection.findOneAndUpdate({userName:streamer}
      , {$set: {stream:["basketball", "john", "Kumar", "fresh prince"]}}
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

const getUser = async (streamerDetails) => {
  return streamerDetails.chatters.broadcaster
}



const addScreenShot = (streamObject) => {
//  ADD THE SCREENSHOT TO THE USER'S CURRENTSTREAM OBJECT
  const timeStamp = new Date();
    
  const timeStampAndViewers = [{"timeStamp": timeStamp}]
    
  timeStampAndViewers.push({'allChatters': body})
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
  createStreamObject(streamer)
  // getStreamerDetails()
  // .then(response => getUser(response))
  // .then(response => console.log(response))


  }, 1000)






// MONGO METHODS  -

// const user = await userCollection.find({userName: "nation_live"}).limit(1)


// userCollection.drop(function(err, reply) {
//    deletes userCollection database
// })
