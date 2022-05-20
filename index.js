const functions = require("firebase-functions");
const app=require('express')()
const {admin, db}=require('./utils/admin');

app.use('/auth',require('./services/Authatiction/Controller'))

app.use('/Todos',require('./services/Todos/Controller'))

exports.api=functions.https.onRequest(app)