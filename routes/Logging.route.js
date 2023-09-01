const express = require('express');
const fs = require('fs');
const { LoggingModel } = require('../model/Logging.model');

const LoggingRoute = express.Router();


LoggingRoute.post('/post', async (req, res) => {

    try {
        // Create a new instance of the LoggingModel using the request body
        const data = new LoggingModel(req.body);

        // Save the data to the database
        const savedData = await data.save();

        // Fetch the saved data from the database by its _id
        const retrievedData = await LoggingModel.findById(savedData._id);

        console.log('Retrieved data:', retrievedData.toObject());


        // Create a text file and append data to it
        const filePath = 'data.txt';
        const fileData = JSON.stringify(retrievedData.toObject(), null, 2);  // Convert data to nicely formatted JSON

        fs.appendFileSync(filePath, fileData + '\n'); // Append data with a newline separator

        res.send({ "msg": "Logging has been added", "success": true });

    } catch (err) {
        res.send({ "msg": "Logging has not been added", "success": false });
        console.log(err);
    }
});




LoggingRoute.get('/read', (req, res) => {
    try {
        const filePath = 'data.txt';
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.trim().split('\n');

        let jsonDataArray = [];
        let currentObject = {};

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine === '{') {
                currentObject = {};
            } else if (trimmedLine === '}') {
                jsonDataArray.push(currentObject);
            } else {
                const [key, value] = trimmedLine.split(':').map(part => part.replace(/"/g, '').trim());
                currentObject[key] = value;
            }
        }

        res.send({ "loggs": jsonDataArray, "success": true });
    } catch (err) {
        res.send({ "msg": "Error reading file", "success": false });
        console.log(err);
    }
});




module.exports = {
    LoggingRoute
}