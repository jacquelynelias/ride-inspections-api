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