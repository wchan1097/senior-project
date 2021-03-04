app.get('/blocks', function( request, response){
var blocks = ['Fixed','Movable', 'Rotating'];    
response.json(blocks);                  // Can use .send or.json which give same result (Output)
});

// The Send function converts stringds to HTML
// can use the code below and it showa the same result as above but just as a string nothing else. 

// var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>';
// response.send(blocks);
//};

// response.redirect('/parts');  -- The redirect function sets the response headers 

// response.redirect(301,'/parts');