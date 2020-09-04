const request = require('request')
require('dotenv').config()

const { MongoClient } = require('mongodb')

const uri = process.env.DB_URL
const client = new MongoClient(uri)

let userCollection = null
let currentStream = null
const streamer = null

let exampleData = "example"


client.connect().then(() => {
  userCollection = client.db("lurkBase").collection("lurkData");
  console.log("connected")
})

const findCurrentStream = async (streamer) => {

  // if (!currentStream) {
  //    create a new stream object in the user's streams. 
  //    currentStream = true
  //    RETURN THE STREAM OBJECT FOR NEXT FUNCTION
  // } else {
  //    FIND AND RETURN THE STREAM OBJECT
  // }

  
}


const addScreenShot = (streamObject) => {
//  ADD THE SCREENSHOT TO THE USER'S CURRENTSTREAM OBJECT
  const timeStamp = new Date();
    
  const timeStampAndViewers = [{"timeStamp": timeStamp}]
    
  timeStampAndViewers.push({'allChatters': body})
}

const getStreamerDetails = async () => {
  let firstPromise = new Promise((resolve, reject) => {
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
  
  getStreamerDetails().then(response => console.log(response, "addRecordToCollection"))


  }, 1000)






// MONGO METHODS  -

// const user = await userCollection.find({userName: "nation_live"}).limit(1)


// userCollection.drop(function(err, reply) {
//    deletes userCollection database
// })
