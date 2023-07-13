// const https = require("https");
// const keyman = require(__dirname + "/API Keys.js");
// const transportkey = keyman.keylord.transportationkey;
// const options = {
//     method : "POST",
//     auth: "FOLBEN:" + transportkey,
//   };
// var url = "https://us21.api.mailchimp.com/3.0/lists/d81f8f184e";
//  module.exports.transportRequest = function transportRequest() {
//   const req = https.request(url, options, function(response){
//     if(response.statusCode === 200){
//       res.sendFile( __dirname + "/public/Transportation-success.html")
//     }
//     else{
//       res.sendFile( __dirname + "/public/Transportation-failure.html")
//     }
//     response.on("data", function(data){
//       console.log(JSON.parse(data));
//       var mol = JSON.parse(data);
//     });
//   })
//   return req;
// }