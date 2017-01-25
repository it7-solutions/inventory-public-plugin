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
            {id: '8', article_id: '1', quantity: 10, total: 333, total_formatted: '3.33' }
        ],
        wishes_total: 99900,
        wishes_total_formatted: '999.00',
        orders: [
            // {
            //     id: '17',
            //     status: 'new',
            //     download_invoice_url: 'http://google.com',
            //     download_receipt_url: 'http://yahoo.com',
            //     total: 6100,
            //     total_formatted: '61.00',
            //     order_status_formatted: "Open",
            //     invoice_status_formatted: "Not issued"
            // }
        ],
        order_items: [
            // {
            //     id: '1',
            //     article_id: '1',
            //     article_name: 'Table (OI)',
            //     price_formatted: "0.10",
            //     order_id: '17',
            //     quantity: 1,
            //     total: 100,
            //     total_formatted: '1.00'
            // },
            // {
            //     id: '10',
            //     article_id: '20',
            //     article_name: 'TV (OI)',
            //     price_formatted: "9.00",
            //     order_id: '17',
            //     quantity: 6,
            //     total: 6000,
            //     total_formatted: '60.00'
            // },
            // {
            //     id: '15',
            //     type: 'custom',
            //     article_name: 'Custom article name',
            //     price_formatted: "100.00",
            //     article_id: null,
            //     order_id: '17',
            //     quantity: 1,
            //     total: 10000,
            //     total_formatted: '100.00'
            // },
            // {
            //     id: '17',
            //     type: 'article',
            //     article_name: 'A-la hidden article',
            //     price_formatted: "300.00",
            //     article_id: '999999',
            //     order_id: '17',
            //     quantity: 2,
            //     total: 60000,
            //     total_formatted: '600.00'
            // },
            // {
            //     id: '18',
            //     type: 'article',
            //     article_name: 'For Limited article',
            //     price_formatted: "1.25",
            //     article_id: '23',
            //     order_id: '17',
            //     quantity: 2,
            //     total: 250,
            //     total_formatted: '2.50'
            // }
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