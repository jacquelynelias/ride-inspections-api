'use strict';
const mysql = require('mysql2');
const fs = require('fs');

module.exports.handler = (event, context, callback) => {
  const options = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
  const conx = mysql.createConnection(options);

  var response = {};
  var data = [];

  let queryParams = event.queryStringParameters
  console.log(event.queryStringParameters)

  //Get string query parameters
  var wh = '';
  if (queryParams) {
    if (queryParams.type) {
        var type = ''
        if (queryParams.type == '1') {
            type = 'Amusement'
        } else if (queryParams.type == '2') {
            type = 'Carnival'
        }
        if (wh) {
            wh = wh + ' AND type LIKE "%' + type +'%"'
        } else {
            wh = 'type LIKE "%' + type +'%"'
        }

    } 
    if (queryParams.city) {
        if (wh) {
            wh = wh + ' AND city LIKE "%' + queryParams.city +'%"'
        } else {
            wh = 'city LIKE "%' + queryParams.city +'%"'
        }      
        
    } 
    if (queryParams.name) {
        if (wh) {
            wh = wh + ' AND company_name LIKE "%' + queryParams.name +'%"'
        } else {
            wh = 'company_name LIKE "%' + queryParams.name +'%"'
        }
    }
    if (queryParams.county) {
        if (wh) {
            wh = wh + ' AND county LIKE "%' + queryParams.county +'%"'
        } else {
            wh = 'county LIKE "%' + queryParams.county +'%"'
        }
    } 
    if (queryParams.zipcode) {
        if (wh) {
            wh = wh + ' AND zipcode LIKE "%' + queryParams.zipcode +'%"'
        } else {
            wh = 'zipcode LIKE "%' + queryParams.zipcode +'%"'
        }
    }
  } 
  var query = '';
  if (wh) {
    query = 'SELECT page_num, park_id as id, company_name, street, city, state, zipcode, county FROM ride_inspections WHERE  '+ wh +' GROUP BY park_id ';

  } else {
    query = 'SELECT page_num, park_id as id, company_name, street, city, state, zipcode, county FROM ride_inspections GROUP BY park_id ';
  }
  
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
