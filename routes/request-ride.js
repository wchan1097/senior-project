const express = require("express");
const router = express.Router();

router.get('/', function(req, res){
  res.render('request');
})

router.post("/", function (req, res, next) {
  const ticket = req.body;
  ticket.status = "upcoming";
  ticket.driverName = "";
  ticket.driverRating = "";
  ticket.driverModel = "";
  ticket.driverLocation = "";
  
  res.redirect("dashboard");
})

module.exports = router;