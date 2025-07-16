require("dotenv").config()
const mongoose = require("mongoose")

const db_url = process.env.MONGODB_URL

const connecton = async () => {
    try {
        mongoose.connect(db_url)
        console.log("db connected")
    } catch (error) {
        console.log("error while connecting to db", error)
    }
}

module.exports = connecton