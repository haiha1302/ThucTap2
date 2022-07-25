const { MongoClient } = require('mongodb')
const dotenv = require('dotenv').config()

const url = process.env.DATABASE_URL
const client = new MongoClient(url)

const DB = {}

const connectToMongo = async () => {
    try {
        await client.connect()
        console.log('DB connected!!!');

        const databaseUsers = client.db('Users')
        const databasePosts = client.db('Posts')

        DB.users = databaseUsers.collection('users')
        DB.profiles = databaseUsers.collection('profiles')
        DB.otps = databaseUsers.collection('otps')

        DB.posts = databasePosts.collection('posts')
    } catch (error) {
        console.log('Cannot connect to DB');
    }
}

module.exports = { connectToMongo, DB }

