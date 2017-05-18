'use strict'

//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//and create our instances
const app = express();
const router = express.Router();

//set our port to either a predetermined port number if you have set 
//it up, or 3001
const port = process.env.API_PORT || 3001;

const FormData = require('./model/form_data');


//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.get('/:id', function(req, res) {
  console.log('router.get /:id req.params:', req.params, 'req.body', req.body);
  FormData.findById(req.params.id, function(err, singleFormData) {
    console.log('FormData.findById(_id:',req.params.id,').singleFormData: ',singleFormData);
    if(err) res.send(err);

    res.json(singleFormData);
  });
});

router.post('/', function(req, res) {
  console.log("router.post[/] (", req.body, ")");
  const singleFormData = new FormData();
  if(req.body._id) {
    singleFormData._id = req.body._id;
  }
  singleFormData.name = req.body.name;
  singleFormData.company = req.body.company;
  singleFormData.termsAccepted = req.body.termsAccepted;
  if(!singleFormData._id) {
    singleFormData.save(function(err, dBResponse) {
      if(err) { res.send(err); return; }
      console.log("insert.dbResponse: ", dBResponse);
      res.json(dBResponse);
    });
  } else {
    FormData.update({ name: singleFormData.name, 
      company: singleFormData.company, 
      termsAccepted: singleFormData.termsAccepted}, {
        _id: singleFormData._id
      }, function(err, dBResponse) {
        if(err) { res.send(err); return; }
        console.log('update.dbResponse: ', dBResponse);
        res.send(singleFormData);
      });
  }
});

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});

//db config
var connectionAddress = process.env.IP || 'localhost';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+connectionAddress+'/db');