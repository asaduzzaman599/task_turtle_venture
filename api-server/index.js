const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())


//firebase endpoint authentications use your service
var serviceAccount = require("./service.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//mongoDB

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.sfale.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//creating user with email and password
app.post('/signup', async (req, res) => {
    const body = req.body
    console.log(body)
    const { email, password } = body
    if (email && password) {
        const authResponse = await admin.auth().createUser({
            email, password, emailVerified: false, disabled: false
        })
        res.send(authResponse)
    }

})


//signup and sent access token 
app.post('/login', async (req, res) => {
    const body = req.body
    const email = body?.email
    if (email) {
        const user = await admin.auth().getUserByEmail(email)
        {
            const token = await admin.auth().createCustomToken(email)
            res.send(token)
        }

    }

})

//verify access token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    console.log(token)
    admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            req.uid = uid;
            const uid = decodedToken?.uid;
            next()
        })
        .catch((error) => {

            console.log('error')
            return res.send({ message: "forbidden access" })

        });
}

(async () => {
    try {

        await client.connect()
        console.log("DB Connected")

        const stationCollection = client.db("stationDB").collection("station");

        //insert station
        app.post('/station', /* verifyToken, */ async (req, res) => {
            const station = req.body
            if (station.name && station.channel && station.other) {
                const result = await stationCollection.insertOne(station)
                if (result.insertedId) {
                    res.send({ success: true, result })
                } else {
                    res.send({ success: false, message: "Not Inserted" })
                }
            }
            res.send({ status: false, message: "Provide all info" })
        })

        //get all and pass as response
        app.get('/station', /* verifyToken, */ async (req, res) => {
            const result = await stationCollection.find({}).toArray()
            res.send(result)
        })


        //get a station
        app.delete('/station/:id', /* verifyToken, */ async (req, res) => {
            const { id } = req.params
            const query = {
                _id: ObjectId(id)
            }
            const result = await stationCollection.deleteOne(query)
            if (result.deletedCount) {
                res.send({ success: true, result })
            } else {
                res.send({ success: false, message: "Something is Wrong" })
            }
        })


        //update a station
        app.put('/station/:id', /* verifyToken, */ async (req, res) => {
            const { id } = req.params
            const body = req.body;
            const filter = {
                _id: ObjectId(id)
            }
            const options = { upsert: true };
            const updateDoc = {
                $set: body,
            }
            const result = await stationCollection.updateOne(filter, updateDoc, options)
            if (result.modifiedCount) {
                res.send({ success: true, result })
            } else {
                res.send({ success: false, message: "Something is Wrong" })
            }
        })

    } finally { }
})().catch(console.dir)

app.get('/', (req, res) => {
    res.send(`server running port at : ${port} `)
})

app.listen(port, () => console.log(`server running port at : ${port}`))