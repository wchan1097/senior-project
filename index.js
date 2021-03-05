const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const path = require("path");
const { response } = require("express");


mongoose.connect(
  "mongodb://localhost/TransportationApp", 
  {useNewUrlParser: true, useUnifiedTopology: true}
).catch(err => console.log("Error with connection."));

mongoose.connection.once("open", function(){
  console.log("\n------------------------------------------------------");
  
  console.log("\nConnection is good.\n");
  
  console.log("------------------------------------------------------");
});

const driverSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  rating: Number,
  car: String
})

const Driver = mongoose.model("Drivers", driverSchema);
var person;

Driver.find({fname: "William"}, function(err, docs){
  if (err) {
    console.log(err);
  }
  else{
    person = docs;
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("Completed", 
  {title: "Schedule a Ride"});
})

app.listen(process.env.PORT||3000, function () { 
  console.log('Example app listening on port 3000!')
});
