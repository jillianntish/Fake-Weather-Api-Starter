const express = require('express'); // import express
const app = express(); // initialize express

//Step 2A, require the API file
const cors = require('cors');
const fakeData = require('./data.js');


app.use(cors());


//return some JSON when it gets a GET request on the root directory
//GET

/* Step 1
app.get('/', (req, res) => {
  res.send({'hello': 'world'})
})
*/

/* Step 2A
app.get('/', (req, res) => {
  //send the first object in the fake data array to the client
  res.send(fakeData[0])
})
*/


//Step 2B, route to a spec endpoint 
// app.get('/weather', (req, res) => {
//   //if there is no city parameter, handle it with an error message
//   if(!req.query.city){
//     res.send({"status": "error", "message": "Please enter a city name"})
//   } else {
//   //return the first object in the fake data array
//   res.send(fakeData[0]);
//   }
// })

//step 3, iterate through the fake data, compare the client input to the
//the DB and return city if there, undefined if nothing entered, or the approprite
//error if city not in DB
app.get('/weather', (req, res) => {
  const cityName = req.query.city.toLowerCase();
  for(let i = 0; i < fakeData.length; i++){
    if(!cityName){
      res.send({"status": "error", "message": "Please enter a city name"})
    } else if(cityName === fakeData[i].city.toLowerCase()){
      res.send(fakeData[i])
    }
  }
  res.send({"status": "error", "message": "Sorry, that city isnt in our DB"})
})

//Step 4, install and save cors



// Listen on port 3000
app.listen(3000, function() {
  console.log('listening on port 3000...');
})
