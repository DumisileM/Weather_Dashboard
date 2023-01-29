

var searchBtn = $('.search-button');
var historyDiv = $('#history');



var lat;
var long;

function getLatLon(){
    var latLong = {
        
    };
    var searchCity = $('#search-input').val();
    if (searchCity){

        console.log(searchCity)
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=d465fadd5a597a5801dffa0651fba644"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
            latLong["lat"] = response.city.coord.lat;
            latLong["lon"] = response.city.coord.lon;

        localStorage.setItem("latAndLong",JSON.stringify(latLong))

            
        });
        console.log(latLong)
    
    
    }



    
   
  
};

function showWeather(response){
    // this function displays the weather on the side 
    // must be called when search button is clicked or when when history buttons are clicked

};

function getCityWeather(){
    searchBtn.click(function(event){
        event.preventDefault();
        getLatLon();
        var latLon = JSON.parse(localStorage.getItem("latAndLong"));
        console.log(latLon)
        var lat = latLon.lat;
        var lon = latLon.lon;
        var cityWeather = {}
        
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon="+lon+"&appid=d465fadd5a597a5801dffa0651fba644"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
       
        });
        


    });


};
getCityWeather()
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + searchCity + "&appid=d465fadd5a597a5801dffa0651fba644";



// grab search value #search-input
//when user clicks on search button, save seacrh value to local storage and show the forecast in that city
// append it to  #history div as a button
// when that button is click call the api to get city's weather forecast


