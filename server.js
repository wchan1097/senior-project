const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://BrandonDotson:Kelapo290@cluster0.6ikkz.mongodb.net/transportation_health_app?retryWrites=true&w=majority";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Creating variables for current date, and tomorrow date

/**
 * Creating a date one day ahead of current date for the purpose of determining 
 * whether a trip is onTrack or not. This string will maintain leadin zeros for days and months.
 */

var currentDate = new Date();
var tomorrowDateString, todayDateString;
currentDate.setDate(currentDate.getDate() + 1);
tomorrowDateString = (currentDate.getFullYear() + "-" + ("0" + currentDate.getMonth() + 1)).slice(-2) +
  "-" + ("0" + currentDate.getDate()).slice(-2);

/**
 * creating a variable 'todayDateString' in which current date is stored in a way that 
 * the leading zeros of days and months are mainted.
 */

currentDate.setDate(currentDate.getDate());
todayDateString = (currentDate.getFullYear() + "-" + ("0" + currentDate.getMonth() + 1)).slice(-2) +
  "-" + ("0" + currentDate.getDate()).slice(-2);
//connect mongodb
MongoClient.connect(url, {
    useUnifiedTopology: true
  })
  .then((client) => {
    console.log("Connected to Database");
    app.set("view engine", "pug");
    app.set("views", "./views");
    //app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    //app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
    app.use(express.static(__dirname));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    const db = client.db("transportation_health_app");
    const custinfoCollection = db.collection("customerinfo");
    app.use(express.static("public"));
    var port = 3000;
    app.listen(port);

    app.get("/request-ride", function (req, res) {
      res.render("request");
    });

    app.post("/request-ride", function (req, res, next) {
      const ticket = req.body;
      ticket.status = "upcoming";
      ticket.driverName = "";
      ticket.driverRating = "";
      ticket.driverModel = "";
      ticket.driverLocation = "";
      custinfoCollection
        .insertOne(ticket)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });
    /** Dashboard page wherein the count of trips are displayed separately according to theier status
     *In addition to that it displays the trips that are on track or not. The criteria for being on track
      is an active status
    */
    app.get("/", function (req, res) {
      var arr = [];
      var fileActive = "active";
      var fileUpcoming = "upcoming";
      var fileCompleted = "completed";
      var numActive;
      var numUpcoming;
      var numCompleted;
      custinfoCollection.find({
        status: fileActive
      }).count(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          numActive = result;
          console.log(numActive);
          custinfoCollection.find({
            status: fileUpcoming
          }).count(function (err, result) {
            if (err) {
              console.log(err);
            } else {
              numUpcoming = result;
              custinfoCollection.find({
                status: fileCompleted
              }).count(function (err, result) {
                if (err) {} else {
                  numCompleted = result;
                  custinfoCollection.find({}).limit(5).toArray(function (err, customerinfo) {
                    if (err) {
                      console.log(err);
                    } else {
                      res.render("dashboard", {
                        active: numActive,
                        upcoming: numUpcoming,
                        completed: numCompleted,
                        custInfo: customerinfo
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
    /** Scheduled Appointments page wherein all the appointments regardless of their status are
     *meant to be displayed as default. Options for filtering has been emplaced but not implemented
     * Here a status filter (upcoming) has explicitly been made.
     */
    app.get("/scheduled", function (req, res) {
      var arr = [];
      custinfoCollection.find({}).toArray(function (err, customerinfoR) {
        if (err) {
          console.log(err);
        } else {
          arr = customerinfoR;
          var result_from_mongodb = [];
          custinfoCollection.find({
            status: 'upcoming'
          }).count().then((count) => {
            result_from_mongodb.push(count);
            res.render("scheduled", {
              result: result_from_mongodb,
              customerinfo: customerinfoR,
              length: customerinfoR.length,
              len: count
            });
          });
        }
      });
    });
    // Active Rides page where only rides whose status is 'active' is displayed
    app.get("/active-rides", function (req, res) {
      custinfoCollection.find({
        status: 'active'
      }).toArray(function (err, customerinfoG) {
        if (err) {
          console.log('Cannot get active-rides page: ' + err);
        } else {
          res.render('active-rides', {
            title: 'Active Rides',
            customerinfo: customerinfoG
          })
        }
      })
    });
  })
  .catch((error) => console.error(error));