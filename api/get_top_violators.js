'use strict';
const mysql = require('mysql2');
const fs = require('fs');

module.exports.handler = (event, context, callback) => {
  const options = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
  const conx = mysql.createConnection(options);

  var response = {};
  var data = [];
  console.log(event.pathParameters);
  const query = `SELECT page_num, park_id as id, company_name, street, city, state, zipcode, county, count(*) as count FROM ride_inspections WHERE cond_num != '15' GROUP BY park_id ORDER BY count(*) DESC LIMIT 20`;
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
