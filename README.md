#Installation 

##Install serverless
##Set up access to AWS credentials

#Setup:
##cd datawarehouse-api
##npm install
#Test local code:
##sls invoke local -f <functionName> -p <path/to/event.json>
#Test remote code:
##sls invoke -f <functionName> -p <path/to/event.json>
#Deploy to AWS:
##sls deploy
##or to deply a single function:

##sls deploy function -f <functionName>

##API Functions

###GET getTopViolators:
Returns 20 parks with the most number of violations
Path: api/top
Sample Return: 

###GET getViolationByMonth:
Returns the number of violations by month
Path: api/violations/{year}

###GET getInspectionByMonth:
Returns the number of inspections by month
Path: api/inspection/{year}

###GET getParkRides:
Returns all the inspections for a certain park_id
Path: api/park/{id}/rides

###GET getNearbyParks:
Returns parks within a certain county, excluding the park_id given
Path: api/nearby/{county}/{id}
 
###GET getParksLocation:
Returns the parks within a certain city, county, or zipcode
Path: api/parks/location/{location}
      
###GET getConditionsLegend:
Path: api/parks/conditions

###GET getParksName:
Path: api/parks/name/{name}

###GET getParkNum:
Path: api/park/{id}/num      