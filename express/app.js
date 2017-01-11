'use strict';

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// HardCode
var requestAnswer = {
    error: 0,
    errorMessage: '',
    data: {
        wishes: [
            {id: '8', article_id: '1', quantity: 10}
        ],
        orders: [
            {id: '17', status: 'new', download_invoice_url: 'http://google.com', download_receipt_url: 'http://yahoo.com'}
        ],
        order_items: [
            {id: '1', article_id: '1', order_id: '17', quantity: 1},
            {id: '10', article_id: '20', order_id: '17', quantity: 6}
        ]
    }
};


//
// HTTP-request methods
//
app.post('/getData', function(req, res) {
    res.status(200).send(JSON.stringify(requestAnswer));
});

app.post('/changeWish', function(req, res) {
    var data = req.body.data && JSON.parse(req.body.data);
    req.body.data && console.log('req.body', JSON.parse(req.body.data));

    if(data && data.article_id) {
        requestAnswer.data.wishes = requestAnswer.data.wishes.filter(function(w){ return data.article_id !== w.article_id});
        requestAnswer.data.wishes.push({id: '1', article_id: data.article_id, quantity: parseInt(data.quantity)})
    }

    res.status(200).send(JSON.stringify(requestAnswer));
});

//
// HTTP-static
//
app.use(express.static('./'));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log('App listening on port ' + PORT);
    console.log('Press Ctrl+C to quit.');
});