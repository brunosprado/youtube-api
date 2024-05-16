require('dotenv').config({ path: '../../.env' })
const { google } = require('googleapis')
const apiKey = process.env.API_KEY
const youtube = google.youtube({
    version: "v3",
    auth: apiKey
})

module.exports = youtube;