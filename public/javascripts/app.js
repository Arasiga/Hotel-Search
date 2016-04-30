
var dataList = $('#api_datalist');


var autoComplete = function(query){
  $.post('http://localhost:3000/autoComplete', {prompt: query}, function(data){
    var parse = JSON.parse(data.body);
    console.log(parse[2].p);
    parse.forEach(function(element){
      var option = document.createElement('option');
      option.value = element.p[0];
      
      if (dataList[0].children.length > 9){
        while(dataList[0].hasChildNodes())
          dataList[0].removeChild(dataList[0].lastChild)
      } else {
        dataList[0].appendChild(option);  
      }
    })

  });
};


var searchHotels = function(city, checkIn, checkOut){

  $.post("http://localhost:3000/searchHotels",{city: city, checkIn: checkIn, checkOut: checkOut}, function(data){
    $('#search_results table tbody').append(data);
  });
}


$(document).ready(function(){

  $('#city').on('keyup', function(e){
    e.preventDefault();
    autoComplete($(this).val());
  });

  $('#searchForm').on('submit', function(e){
    e.preventDefault();
    $('#search_results table tbody').html('');
    var city = $('#city').val();
    var checkIn = $('#checkIn').val();
    var checkOut = $('#checkOut').val();
   
    searchHotels(city, checkIn, checkOut);
  });

  $('#userRating').on('click', function(e){
    e.preventDefault();
    debugger;
  });

  $('#starRating').on('click', function(e){
    e.preventDefault();
    
  });

  $('#price').on('click', function(e){
    e.preventDefault();
    
  })


});


