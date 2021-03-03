const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://BrandonDotson:Kelapo290@cluster0.6ikkz.mongodb.net/transportation_health_app?retryWrites=true&w=majority'
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
	app.set('view engine', 'pug');
	app.set('views','./views');
	//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
	//app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
	app.use(express.static(__dirname));
	app.use(bodyParser.urlencoded({ extended: true }))
	const db = client.db('transportation_health_app')
	const custinfoCollection = db.collection('customerinfo')
	app.use(express.static("public"))
	
	app.listen(3000, function(){
			console.log('listening on 3000');
	})
	
	app.get('/', function(req, res){
			res.render('active-rides');
	})
	app.get('/ride-request.html', function(req, res){
			res.sendFile(__dirname + '/src/ride-request.html');
	})
	app.post('/test', (req, res) => {
		custinfoCollection.insertOne(req.body)
		.then(result => {
			res.redirect('/')
		})
		.catch(error => console.error(error))
	})
})
.catch(error => console.error(error))

