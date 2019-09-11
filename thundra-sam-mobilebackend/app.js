const express = require('express');
const app = express();
app.use(require('body-parser').raw({ type: '*/*' }));
const uuidv1 = require('uuid/v1');
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

app.post('/teams', (req, res) => {
    let item = JSON.parse(req.body);
    item.id = uuidv1();

    let params = {
        TableName: process.env.TEAM_TABLE_NAME,
        Item: item
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add team. Error JSON:", JSON.stringify(err, null, 2));
            return res.sendStatus(500).end();
        } else {
            console.log("Added team:", JSON.stringify(data, null, 2));
            return res.json({ success: true });
        }
    });
});

app.get('/teams', (req, res) => {
    let params = {
        TableName: process.env.TEAM_TABLE_NAME
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to list teams. Error JSON:", JSON.stringify(err, null, 2));
            return res.sendStatus(500).end();
        } else {
            console.log("Listed teams:", JSON.stringify(data, null, 2));
            return res.json({ success: true , data: data.Items});
        }
    });
});

app.get('/teams/:id', (req, res) => {
    let params = {
        TableName: process.env.TEAM_TABLE_NAME,
        Key:{
            "id": req.params.id
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to get team. Error JSON:", JSON.stringify(err, null, 2));
            return res.sendStatus(500).end();
        } else {
            if (!data.Item) {
                return res.sendStatus(404).end();
            }
            console.log("Got team:", JSON.stringify(data, null, 2));
            return res.json({ success: true , data: data.Item});
        }
    });
});

app.delete('/teams/:id', (req, res) => {
    let params = {
        TableName: process.env.TEAM_TABLE_NAME,
        Key:{
            "id": req.params.id
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to get team. Error JSON:", JSON.stringify(err, null, 2));
            return es.sendStatus(500).end();
        } else {
            if (!data.Item) {
                return res.sendStatus(404).end();
            }
            console.log("Got team:", JSON.stringify(data, null, 2));
            docClient.delete(params, function(err, data) {
                if (err) {
                    console.error("Unable to delete team. Error JSON:", JSON.stringify(err, null, 2));
                    return res.sendStatus(500).end();
                } else {
                    console.log("Deleted team:", JSON.stringify(data, null, 2));
                    return res.json({ success: true , data});
                }
            });
        }
    });
});

app.put('/teams/:id', (req, res) => {
    let item = JSON.parse(req.body);
    let params = {
        TableName: process.env.TEAM_TABLE_NAME,
        Key:{
            "id": req.params.id,
        },
        UpdateExpression: "set teamName = :n, description = :d",
        ExpressionAttributeValues:{
            ":n": item.teamName,
            ":d": item.description
        },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to get team. Error JSON:", JSON.stringify(err, null, 2));
            return es.sendStatus(500).end();
        } else {
            if (!data.Item) {
                return res.sendStatus(404).end();
            }
            console.log("Got team:", JSON.stringify(data, null, 2));
            docClient.update(params, function(err, data) {
                if (err) {
                    console.error("Unable to update team. Error JSON:", JSON.stringify(err, null, 2));
                    return res.sendStatus(500).end();
                } else {
                    console.log("UpdateTeam succeeded:", JSON.stringify(data, null, 2));
                    return res.json({ success: true , data});
                }
            });
        }
    });
});

module.exports = app;