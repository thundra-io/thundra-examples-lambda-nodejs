const thundra = require('@thundra/core');

const express = require('express');

const app = express();

app.use(require('body-parser').raw({ type: '*/*' }));

app.get('/users', (req, res) => {
    thundra.InvocationSupport.setTag('path', req.path);

    res.json([{id: 1,  name: 'Joe'}, 
              {id: 2, name: 'Jane'}]);
});

app.get('/teams', (req, res) => {
    thundra.InvocationSupport.setTag('path', req.path);

    res.json([{id: 1,  name: 'team1'}, 
              {id: 2, name: 'team2'}]);
});   

module.exports = app;
