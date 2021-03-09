const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://BrandonDotson:Kelapo290@cluster0.6ikkz.mongodb.net/transportation_health_app?retryWrites=true&w=majority'
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
	app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
	app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
	app.use(express.static(__dirname));
	app.use(bodyParser.urlencoded({ extended: true }))
	const db = client.db('transportation_health_app')
	const custinfoCollection = db.collection('customerinfo')
	
	app.listen(3000, function(){
			console.log('listening on 3000');
	})
	
	app.get('/', function(req, res){
			res.sendFile(__dirname + '/src/dashboard.html');
	})
	app.get('/ride-request.html', function(req, res){
			res.sendFile(__dirname + '/src/ride-request.html');
	})
	app.post('/test', (req, res) => {
		custinfoCollection.insertOne(req.body)
		.then(() => {
			res.redirect('/')
		})
		.catch(error => console.error(error))
	})
})

async function createListing(client, newListing){
    const result = await client.db("transportation_health_app").collection("customerinfo").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}
await createListing(client,
	{
		name: "Brandon Dotson",
		telephone: "972971188",
		organixzation: "University of Texas at Dallas",
		fileNumber "12221"
		tripdirection: "on"
		appointmenttype:"Test"
		arrivalAddress:"Test 123 Boulevard"
		destinationAddress:"1474 Lakeview Dr."
		notesForDriver:"No Notes Available"

	}
);
async function createMultipleListings(client, newListings){
    const result = await client.db("transportation_health_app").collection("customerinfo").insertMany(newListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}
await createMultipleListings(client, [
    {
        name: "Joe Smartson",
		telephone: "9271982983",
		organixzation: "University of Arkansas",
		filenum "82901"
		tripdirection: "on"
		appointmenttype:"Injury"
		arrivalAddress:"1490 Lakeview"
		destinationAddress:"Hospital LN"
		notesForDriver:"Random notes for Testing"

    },
    
async function findListingsWithMinimumCustomersRidesAndMostRecentReviews(client, {
    minimumNumberOfCustomers = 0,
    minimumNumberOfRides = 2,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("transportation_health_app").collection("customerinfo").find(
                            {
                                customers: { $gte: minimumNumberOfCustomers },
                                rides: { $gte: minimumNumberOfRides }
                            }
                            ).sort({ last_review: -1 })
                            .limit(maximumNumberOfResults);
    const results = await cursor.toArray();
 	
}

{

} if (results.length > 0) {
	console.log(`Found listing(s) with at least ${minimumNumberOfCustomers} bedrooms and ${minimumNumberOfRides} bathrooms:`);
	results.forEach((result, i) => {
		date = new Date(result.last_review).toDateString();
		console.log();
		console.log(`${i + 1}. name: ${result.name}`);
		console.log(`   _id: ${result._id}`);
		console.log(`   customers: ${result.customers}`);
		console.log(`   rides: ${result.rides}`);
		console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
	});
}  else {
	console.log(`No listings found with at least ${minimumNumberOfCustomers} customers and ${minimumNumberOfRides} rides`);
}

await findListingsWithMinimumCustomersRidesAndMostRecentReviews(client, {
    minimumNumberOfCustomers: 2,
    minimumNumberOfRides: 3,
    maximumNumberOfResults: 5
});

async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("transportation_health_app").collection(" customerinfo")
                        .updateOne({ name: nameOfListing }, { $set: updatedListing });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);

}

await upsertListingByName(client, "customerinfo", { name: "Brandon Dotson", customers: 2, rides: 1 });
async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("transportation_health_app").collection("customerinfo")
            .deleteOne({ name: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);

	await deleteListingByName(client, "Brandon Dotson");

}

async function deleteListingsScrapedBeforeDate(client, date) {
    const result = await client.db("transportation_health_app").collection("customerinfo")
        .deleteMany({ "last_scraped": { $lt: date } });

		console.log(`${result.deletedCount} document(s) was/were deleted.`);
		
		await deleteListingsScrapedBeforeDate(client, new Date("2021-03-24"));
	}
