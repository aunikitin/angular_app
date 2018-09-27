const express = require('express');
const pg = require('pg');
const router = express.Router();
const clientModel = require('./../models/clientModel');
const VulnerabilityModel = require('./../models/vulnerabilityModel');
const path = require('path');

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/api/getDB', (req, res) => {
  const results = [];
  const client = new pg.Client(clientModel);
  // Get a Postgres client from the connection pool
  client.connect((err, clientTest) => {
    // Handle connection errors
    if(err) {
      console.log(err);
      return res.status(500).json({success: false, data: err.stack});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM test limit 1000');
    query.then(result=>{
      for(const row of result.rows){
        const data = new VulnerabilityModel(row);
        results.push(data);
      }
      const json = JSON.stringify(results);
      res.render('index', { title: json });
      //return json;
    })
    .catch(e=>{
      console.error(e.stack);
    })
    .then(()=>client.end());
  });
});

module.exports = router;
