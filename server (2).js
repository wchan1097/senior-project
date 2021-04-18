const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://BrandonDotson:Kelapo290@cluster0.6ikkz.mongodb.net/transportation_health_app?retryWrites=true&w=majority'
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();


MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'pug');
        app.set('views', './views');
        //app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
        //app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
        //app.use(express.static(__dirname));
        app.use(express.static(path.join(__dirname, "public")));
        app.use(bodyParser.urlencoded({ extended: true }))
        const db = client.db('transportation_health_app');
        const custinfoCollection = db.collection('customerinfo');
        const port = process.env.PORT || 3000;

        app.listen(port, function() {
            console.log(`Listening on port: ${port}`);
        });
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
            res.render("dashboard");
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

        app.get('/', function(req, res) {
            res.render('dashboard');
        });
        
//---------------------------  End of Willans Code--------------------------------// 

//---------------------------Kiran's Code-----------------------------------------//
        app.get('/active-rides', function(req, res) {
        custinfoCollection.find({status: "active"}).then(result =>{
          console.log(result);
        })
            res.render('active-rides',{name: result});

            app.get('/completed', function(req, res) {
                custinfoCollection.find({}).toArray(function(err, customerinfoR) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('active', {
                            title: 'Active Rides',
                            customerinfo: customerinfoR
    
                        });
                        //res.redirect('/');
    
                    }
                    console.log('this is a print form the screen 2' + JSON.stringify(customerinfo));
    
                });
                // gets the count
                var result_from_mongodb = [];
                custinfoCollection.countDocuments().then((count) => {
                    console.log('number of records: ' + count);
                    result_from_mongodb.push(count);
                    res.render('active', {
                        "result": result_from_mongodb
                    });
                });
    
            });
            app.post('/test', (req, res) => {
                custinfoCollection.insertOne(req.body)
                    .then(result => {
                        res.redirect('/')
                    })
                    .catch(error => console.error(error))
            });
        
//------------------------End of Kirans Code-----------------------------------------------
    });
//------------------------ Start of Mohammeds Code ----------------------------------------      
});
        app.get('/test', function(req, res) {
            res.render('request', { title: 'Request a Ride' });
        });
        app.get('/completed', function(req, res) {
            custinfoCollection.find({}).toArray(function(err, customerinfoR) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('completed', {
                        title: 'Scheduled Appointments',
                        customerinfo: customerinfoR

                    });
                    //res.redirect('/');

                }
                console.log('this is a print form the screen 2' + JSON.stringify(customerinfo));

            });
            // get count
            var result_from_mongodb = [];
            custinfoCollection.countDocuments().then((count) => {
                console.log('number of records: ' + count);
                result_from_mongodb.push(count);
                res.render('completed', {
                    "result": result_from_mongodb
                });
            });

        });
        app.post('/test', (req, res) => {
            custinfoCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        });

        
        //})
        //.catch(error => console.error(error))

let customerinfo = module.exports = MongoClient.collection;

//------------------------------------End of Mohammeds added code------------------------------// 