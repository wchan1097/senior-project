const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://BrandonDotson:Kelapo290@cluster0.6ikkz.mongodb.net/transportation_health_app?retryWrites=true&w=majority";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    app.set("view engine", "pug");
    app.set("views", "./views");
    //app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    //app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
    app.use(express.static(__dirname));
    app.use(bodyParser.urlencoded({ extended: true }));
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

    app.get("/", function (req, res) {
	  var arr = [];
	  var fileActive = "active";
	  var fileUpcoming = "upcoming";
	  var fileCompleted = "completed";
	  var numActive;
	  var numUpcoming;
	  var numCompleted;
	  custinfoCollection.find({status: fileActive}).count(function (err, result) {
		  if (err){
			console.log(err);
		  } else {
			numActive = result;
			console.log(numActive);
			custinfoCollection.find({status: fileUpcoming}).count(function (err, result) {
		        if (err){
			    console.log(err);
		        } else {
			      numUpcoming = result;
			      console.log(numUpcoming);
		          custinfoCollection.find({status: fileCompleted}).count(function (err, result) {
		              if (err){
			          console.log(err);
		              } else {
			            numCompleted = result;
			            console.log(numCompleted);
						custinfoCollection.find({}).limit(5).toArray(function (err, customerinfo){
							if (err){
								console.log(err);
							} else {
								console.log(customerinfo);
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

    app.get("/scheduled", function (req, res) {
      var arr = [];
      custinfoCollection.find({}).toArray(function (err, customerinfoR) {
        if (err) {
          console.log(err);
        } else {
          arr = customerinfoR;
          var result_from_mongodb = [];
          custinfoCollection.countDocuments().then((count) => {
            result_from_mongodb.push(count);
            res.render("scheduled", {
              result: result_from_mongodb,
              customerinfo: customerinfoR,
              length: count,
            });
          });
          //res.redirect('/');
        }
        // console.log(
        //   "this is a print form the screen 2" + JSON.stringify(customerinfoR)
        // );
      });
      // get count
    });

    app.get("/active-ride", function (req, res) {
      res.render("active-rides");
    });

  })
  .catch((error) => console.error(error));
