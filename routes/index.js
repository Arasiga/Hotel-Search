var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var Sequelize = require('sequelize');
var sequelize = new Sequlize('DMZ', 'alex', 'password')
var pgp = require("pg-promise");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/searchHotels', function(req, res){
  //INSERT API KEY HERE
  var APIKEY = '';

  console.log("hello");

  var city = req.body.city;
  var checkIn = req.body.checkIn;
  var checkOut = req.body.checkOut;
  var ip = '10.16.231.218';

  var data = APICall(city, checkIn, checkOut);
  console.log(data);
  
  request({
    url: 'http://hotelscombined.com/api/1.0/hotels/basic?destination=place:' + city + '&checkin=' + checkIn + '&checkout=' + checkOut + '&rooms=2&apiKey=' + APIKEY + '&sessionID=' + 1, 
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'}
  }, function(error,  response){
    if(error){
      res.send(error);
    }else {

      // console.log(response.body);
      var body = JSON.parse(response.body);
      var resultsArray = body.results;
      var length = resultsArray.length;

      var arrayOf_1_Star_Hotels = [];
      var arrayOf_2_Star_Hotels = [];
      var arrayOf_3_Star_Hotels = [];
      var arrayOf_4_Star_Hotels = [];
      var arrayOf_5_Star_Hotels = [];

      var arrayOf_Hotel_Arrays = [];

      for(var i = 0; i < length; i++){
        if(resultsArray[i].starRating === 1){
          arrayOf_1_Star_Hotels.push(resultsArray[i]);
        }else if(resultsArray[i].starRating === 2){
          arrayOf_2_Star_Hotels.push(resultsArray[i]);
        }else if(resultsArray[i].starRating === 3){
          arrayOf_3_Star_Hotels.push(resultsArray[i]);
        }else if(resultsArray[i].starRating === 4){
          arrayOf_4_Star_Hotels.push(resultsArray[i]);
        }else if(resultsArray[i].starRating === 5){
          arrayOf_5_Star_Hotels.push(resultsArray[i]);
        }
      }

      arrayOf_Hotel_Arrays.push(arrayOf_1_Star_Hotels);
      arrayOf_Hotel_Arrays.push(arrayOf_2_Star_Hotels);
      arrayOf_Hotel_Arrays.push(arrayOf_3_Star_Hotels);
      arrayOf_Hotel_Arrays.push(arrayOf_4_Star_Hotels);
      arrayOf_Hotel_Arrays.push(arrayOf_5_Star_Hotels);

      var sort = function(array){
        var new_array = array.sort(function(a, b) {
          return parseFloat(a.lowestRate) - parseFloat(b.lowestRate);
        });

        return new_array
      }

      var html = '';

      for(var x = 0; x < arrayOf_Hotel_Arrays.length; x++){
        if (arrayOf_Hotel_Arrays[x].length === 0){
          console.log("There are no hotels in that area with " + (x+1) + " stars!")
        } else if (arrayOf_Hotel_Arrays[x].length <= 3) {
          arrayOf_Hotel_Arrays[x].forEach(function(element, index){
            html += "<tr>";
            html += "<td><img src='" + element.image.large + "' height='100' width='100'/></td>";
            html += "<td>" + element.name + "</td>";
            html += "<td class='guestRating'>" + element.guestRating + "</td>";
            html += "<td class='starRating'>" + element.starRating + "</td>";
            html += "<td class='price'>" + element.lowestRate + "</td>";
            html += "<tr>";
          })
        } else {
          var array_to_be_sorted = [];
          for(var y = 0; y < arrayOf_Hotel_Arrays[x].length; y++){
            array_to_be_sorted.push(arrayOf_Hotel_Arrays[x][y]);
          }
          var sortedArray = sort(array_to_be_sorted);
          for (var z = 0; z < 3; z++){
            html += "<tr>";
            html += "<td><img src='" + sortedArray[z].image.large + "' height='100' width='100' /></td>";
            html += "<td>" + sortedArray[z].name + "</td>";
            html += "<td>" + sortedArray[z].guestRating + "</td>";
            html += "<td>" + sortedArray[z].starRating + "</td>";
            html += "<td>" + sortedArray[z].lowestRate + "</td>";
            html += "<tr>";
          }
        }
    }

    res.send(html);

    }
  });

});

router.post('/autoComplete', function(req, res){

  var searchPrompt = req.body.prompt;

  request({
    url: 'http://www.hotelscombined.com/AutoUniversal.ashx?search=' + searchPrompt,
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'}
  }, function(error, response){
    if(error){
      res.send(error);
    }else {
      res.send(response);
    }
  });

});

module.exports = router;


function APICall(city, checkIn, checkOut){

  console.log(city);
  console.log(checkIn);
  console.log(checkOut);

  var data = {
    city: city,
    checkIn: checkIn,
    checkOut: checkOut
  }

  return data;

}








