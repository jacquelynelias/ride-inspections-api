'use strict';
const mysql = require('mysql2');
const fs = require('fs');

module.exports.handler = (event, context, callback) => {
  const options = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
  const conx = mysql.createConnection(options);

  var response = {};
  var data = [];
  const year = decodeURIComponent(event.pathParameters.year)
  const query = `SELECT cond, cond_num, count(*) as num FROM ride_inspections WHERE  cond_num != '15' and YEAR(insp_d8) = "${year}" GROUP BY cond_num ORDER BY cond_num ASC LIMIT 10`;
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
