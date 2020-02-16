// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var path = require("path");
var fs = require("fs");
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));



//Reading from json file 
var db = fs.readFileSync("./db/db.json")
var dbs = JSON.parse(db)


//Api Routes 
app.get("/api/notes", (req, res) =>  {
  return res.json(dbs);
});



 app.post("/api/notes", (req ,res) => {
  var newNote = req.body  
  newNote.id = 1 
  dbs.push( newNote)
  fs.writeFileSync("./db/db.json" ,JSON.stringify(dbs), ("utf-8") )
  res.json(true)

}) 


app.delete("/api/notes/:id", (req ,res) =>{
    var remove = dbs.filter(parseFloat(req.params.id))
     
    for (var i = 0; i < dbs.length; i++) {
    
      if (remove ===  db[i].routeName) {
         res.json(true)
      }
    }
  })

    
// ================================================================================
// Html Routes
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
app.get("/notes", (req, res)=> {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  



// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
