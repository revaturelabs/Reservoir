# Data Microservice Endpoints

[Associate Endpoints](#associate-endpoints)

[Batch Endpoints](#batch-endpoints)

## Associate Endpoints


### Get all associates
Method: GET

URI: `/data/associates`

Params: None



### Get all active associates
Method: GET

URI: `/data/associates/get-active`

Params: None


### Get associate by ID
Method: GET

URI: `/data/associates/:id`

Params: None


### Get fixed number of associates with minimum exam score
Method: GET

URI: `/data/associates/:minscore/score/:capacity/capacity`

Params: None


### Update associate
Method: PATCH

URI: `/data/associates`

Body:







## Batch Endpoints






### Get all batches
Method: GET

URI: `/data/batches/`

Params: None



### Get batch by ID
Method: GET

URI: `/data/batches/:id`

Params: None



### Get unconfirmed batches
Method: GET

URI: `/data/batches/unconfirmed`

Params: None



### Get batches by curriculum
Method: GET

URI: `/data/batches/curricula/:curriculumID`

Params: None



### Get batches by client demand
Method: GET

URI: `/data/batches/clients/:clientDemand`

Params: None


### Get batches in progress on specified date
Method: GET

URI: `/data/batches/date/:date`

Params: None


### Confirm batch
Method: GET

URI: `/data/batches/:id/confirm`

Params: None


### Create new unconfirmed batch
Method: POST

URI: `/data/batches`

Body: 


### Delete batch by ID
Method: DELETE

URI: `/data/batches/:id`

Body: None


### Update batch by ID
Method: PATCH

URI: `/data/batches/:id`

Body:


### Get batch state by ID
Method: GET

URI: `/data/batches/batch-states/:id`

Params: None


### Update batch trainer(s)
Method: POST

URI: `/data/batches/trainer`

Body:









## Client Endpoints








### Get all clients
Method: GET

URI: `/data/clients`

Params: None


### Get client by ID
Method: GET

URI: `/data/clients/:id`

Params: None


### Get all client demands
Method: GET

URI: `/data/client-demand`

Params: None


### Get all client demands having deadline after date
Method: GET

URI: `/data/client-demand/:date`

Params: None









## Curriculum Endpoints






### Get all curricula
Method: GET

URI: `/data/curricula`

Params: None



### Get curriculum by ID
Method: GET

URI: `/data/curricula/:id`

Params: None







## Location Endpoints








### Get all locations
Method: GET

URI: `/data/location`

Params: None


### Get (detailed) location by ID
Method: GET

URI: `/data/location/:id`

Params: None


### Create new location
Method: POST

URI: `/data/location`

Body:


### Update location
Method: PATCH

URI: `/data/location`

Body:







## Supply and Demand Endpoints






### Get unconfirmed batch supply metrics
Method: GET

URI: `/data/batches/:id/unconfirmed`

Params: None


### Get all supply and demand metrics
Method: GET

URI: `/data/skillsets/matrix`

Params:
- `skillsetid` (optional)
- `clientid` (optional)




## Skill Endpoints

## Trainer Endpoints
