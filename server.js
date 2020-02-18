// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid/v4")
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
app.get("/api/notes", (req, res) => {
  return res.json(JSON.parse(fs.readFileSync('./db/db.json', 'utf-8')));
});



app.post("/api/notes", (req, res) => {
  var newNote = ({ id: uuid(), title: req.body.title, text: req.body.text })
  dbs.push(newNote)
  fs.writeFileSync("./db/db.json", JSON.stringify(dbs), ("utf-8"))
  return res.json(true)

})


app.delete('/api/notes/:id', (req, res) => {
  
  const newNotes = dbs.filter(note => note.id !== req.params.id);
  fs.writeFileSync('./db/db.json', JSON.stringify(newNotes) , ("utf-8"));
  res.json(true);
});

// ================================================================================
// Html Routes
// ================================================================================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});





// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
