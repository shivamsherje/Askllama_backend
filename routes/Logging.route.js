const express = require('express');
const fs = require('fs');
const { LoggingModel } = require('../model/Logging.model');

const LoggingRoute = express.Router();

LoggingRoute.post('/post', async (req, res) => {

    try {
        // Create a new instance of the LoggingModel using the request body
        const data = new LoggingModel(req.body);

        // Save the data to the database
        // const savedData = await data.save();

        // Fetch the saved data from the database by its _id
        // const retrievedData = await LoggingModel.findById(savedData._id);

        // console.log('Retrieved data:', retrievedData.toObject());


        // Create a text file and append data to it
        const filePath = 'data.txt';
        const fileData = JSON.stringify(data.toObject(), null, 2);  // Convert data to nicely formatted JSON

        fs.appendFileSync(filePath, fileData + '\n'); // Append data with a newline separator

        res.send({ "msg": "Logging has been added", "success": true });

    } catch (err) {
        res.send({ "msg": "Logging has not been added", "success": false });
        console.log(err);
    }
});




LoggingRoute.get('/', async (req, res) => {
    const data = await LoggingModel.find()
    res.send(data)
})



module.exports = {
    LoggingRoute
}