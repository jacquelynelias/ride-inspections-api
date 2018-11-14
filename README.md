#Backend to rollercoaster app
##Overview
This is the API to the web app that shows rollercoaster, carnival and 

##Links
Scraper: https://bitbucket.org/ajcnewsapp/scrapers_jre/src/master/
Frontend: https://bitbucket.org/ajcnewsapp/rides-inspections-frontend/src/master/

##Setup
1. Install serverless
2. Set up access to AWS credentials

3. Install dependencies
cd datawarehouse-api
npm install

##Serverless commands
Test local code:
sls invoke local -f <functionName> -p <path/to/event.json>

Test remote code:
sls invoke -f <functionName> -p <path/to/event.json>

Deploy to AWS:
sls deploy
or to deply a single function: sls deploy function -f <functionName>

##API Functions
###GET getTopViolators:
Returns 20 parks with the most number of violations
Path: api/top
Sample Return: 

###GET getViolationByMonth:
Returns the number of violations by month for a certain year
Path: api/violations/month/{year}

###GET getInspectionByMonth:
Returns the number of inspections by month for a certain year
Path: api/inspection/{year}

###GET getViolationByType
Returns the number of violations by type for a certain year
Path: api/violations/type/{year}

###GET getParkRides:
Returns all the inspections for a certain park_id
Path: api/park/{id}/rides

###GET getNearbyParks:
Returns parks within a certain county, excluding the park_id given
Path: api/nearby/location/{location}
 
###GET getParksLocation:
Returns the parks within a certain city, county, or zipcode
Path: api/parks/location/{location}
      
###GET getConditionsLegend:
Returns the key for violations based on the id
Path: api/parks/conditions

###GET getParksName:
Return parks after a search by name
Path: api/parks/name/{name}

###GET getParkNum:
Return the number of rides for a park
Path: api/park/{id}/num    

###GET search
The main search function. Takes query string parameters to search by city, county, zip, or name 
Path: api/search
