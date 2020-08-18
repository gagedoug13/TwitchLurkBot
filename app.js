const tmi = require('tmi.js')
const fs = require('fs')

require('dotenv').config()

const opts = {
    identity: {
        username: process.env.BOT_CHANNEL,
        password: process.env.PASS,
    }, 
    channels: [
        process.env.MY_CHANNEL
    ]
}

const client = new tmi.client(opts)