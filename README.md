# Get best Seats!
This is to get the best seats.
I over baked this...Had too much fun with the init setup for what I wanted.
I could've solved all of this on time with less things involved but...I had too much fun starting it off.
There is some code refactoring I would want to do.

List of things missing that I want to add:

 - Request body checks via express-validator
 - Ui client for changing the venue size as well as seat availability

## Install
`npm install`

# Commands
`npm start` - starts server and client
`npm run server` - runs only the server
`npm run build` - builds the project
`npm test` - runs jest tests

#	Routes
`GET: api/v1/` - gets Data object
`PUT: api/v1/` - Sets Data object
expects: json structure of:

    {
    "venue": {
    	"layout": {
    		"rows":  10,
    		"columns":  50
    	}
    },
    "seats": {
    	"a1": {
    		"id":  "a1",
    		"row":  "a",
    		"column":  1,
    		"status":  "AVAILABLE"
    	},
    	"b5": {
    		"id":  "b5",
    		"row":  "b",
    		"column":  5,
    		"status":  "AVAILABLE"
    	},
    	"h7": {
    		"id":  "h7",
    		"row":  "h",
    		"column":  7,
    		"status":  "UNAVAILABLE"
    	}
	  }
	}

`PUT: /venue` -  updates the venue size

    {
    	"layout": {
    		"rows":  10,
    		"columns":  50
    	}
    }
