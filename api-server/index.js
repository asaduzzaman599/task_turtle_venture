const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

//firebase endpoint authentications
const admin = require("firebase-admin");

var serviceAccount = require("./service.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        const authResponse = await admin.auth().createUser({
            email, password, emailVerified: false, disabled: false
        })
        res.send(authResponse)
    }

})
app.get('/', (req, res) => {
    res.send(`server running port at : ${port} `)
})

app.listen(port, () => console.log(`server running port at : ${port}`))