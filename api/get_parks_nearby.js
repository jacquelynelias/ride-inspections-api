'use strict';
const mysql = require('mysql2');
const fs = require('fs');

module.exports.handler = (event, context, callback) => {
  const options = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
  const conx = mysql.createConnection(options);

  var response = {};
  var data = [];
  console.log(event.pathParameters);
  const county = decodeURIComponent(event.pathParameters.county)
  console.log(county)
  const id = decodeURIComponent(event.pathParameters.id)
  console.log(id)
  const query = `SELECT park_id as id, page_num, company_name, street, city, county, state, zipcode FROM ride_inspections  WHERE county like "%${county}%" AND park_id != "${id}" GROUP BY park_id`;
  conx.query(
    query,
    function(err, results, fields) {
      if (err) throw err;
      results.forEach(function(row) {
        data.push(row)
      });
      response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({data}),
      };
      callback(null, response);
    }
  );
  conx.end();
};
