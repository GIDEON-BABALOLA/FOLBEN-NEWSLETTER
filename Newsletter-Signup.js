const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const keyman = require(__dirname + "/API Keys.js");
const { subscribe } = require("diagnostics_channel");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(request, response){
  response.sendFile(__dirname + "/public/Newsletter-Signup.html");
});

app.post("/", function(request, res){
    const firstName = request.body.nametransportation;
  const lastName = request.body.lastnametransportation;
  const email = request.body.emailtransportation;
  const phoneNumber = request.body.phonenumbertransportation;
  console.log(firstName);
  const deta = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName,
          PHONE : phoneNumber
        }
      }
    ]
  }
  const jData = JSON.stringify(deta);
  var url = "https://us21.api.mailchimp.com/3.0/lists/d81f8f184e";
  const transportkey = keyman.keylord.transportationkey;
  const options = {
    method : "POST",
    auth: "FOLBEN:" + transportkey,
  };
 
  const req = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile( __dirname + "/public/Transportation-success.html")
    }
    else{
      res.sendFile( __dirname + "/public/Transportation-failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
      var mol = JSON.parse(data);
    });
  })
 
  req.write(jData);
  req.end();
})

app.get("/logistics", function(request, response){
  response.sendFile(__dirname + "/public/Logistics-Signup.html")
})
app.post("/logistics", function(request, res){
  const firstName1 = request.body.namelogistics;
  const lastName1 = request.body.lastnamelogistics;
  const email1 = request.body.emaillogistics;
  const phoneNumber1 = request.body.emaillogistics;
  console.log(email1);
  const detar = {
    members: [
      {
        email_address : email1,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName1,
          LNAME : lastName1,
          PHONE : phoneNumber1
        }
      }
    ]
  }
  const jDatar = JSON.stringify(detar);
  var urle = "https://us21.api.mailchimp.com/3.0/lists/6edd1ccc18";
  const logiskey = keyman.keylord.logisticskey;
  const optionso = {
    method : "POST",
    auth: "LOGISTICS:" +logiskey,
  };
 
  const req = https.request(urle, optionso, function(response){
    if(response.statusCode === 200){
      res.sendFile( __dirname + "/public/Logistics-success.html");
    }
    else{
      res.sendFile(__dirname + "/public/Logistics-failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  req.write(jDatar);
  req.end();
})
app.post("/failure-transportation", function(request, response){
  response.redirect("/");
});
app.post("/failure-logistics", function(request, response){
  response.redirect("/logistics");
});
  
// Handling non matching request from the client
// app.use((req, res, next) => {
//   res.status(404).sendFile(
//       __dirname + "/ErrorPage.html");
// })
app.use( function(request, response, next){
  response.status(404).sendFile(__dirname + "/public/ErrorPage.html");
})
app.listen(process.env.PORT || 1000, function(){
  console.log("server is running on port 1000")
})