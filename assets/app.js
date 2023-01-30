var searchBtn = $('.search-button');
var historyDiv = $('#history');
var todayWeather = $('#today');
var forecast = $('#forecast');
var lat;
var long;

function getLatLon(){
    var latLong = {
        
    };
    var searchCity = $('#search-input').val();
    if (searchCity){

        console.log(searchCity)
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid="
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
       
            latLong["lat"] = response.city.coord.lat;
            latLong["lon"] = response.city.coord.lon;

        localStorage.setItem("latAndLong",JSON.stringify(latLong))

            
        });
        console.log(latLong)
    
    
    }



    
   
  
};

function showWeather(response){
    //on click search button show weather by calling the get weather funtions 
   

};

function getTodayWeather(){
    searchBtn.click(function(event){
        event.preventDefault();
        getLatLon();
        var latLon = JSON.parse(localStorage.getItem("latAndLong"));
        console.log(latLon)
        var lat = latLon.lat;
        var lon = latLon.lon;
        var cityWeather = {}
        
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+lon+"&units=imperial&appid="

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
            cityWeather["city"]= response.name;
            cityWeather["date"]=moment.unix(response.dt).format("DD-MMM-YYYY");
            cityWeather["icon"]=  "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png";
            cityWeather["temp"]= response.main.temp;
            cityWeather["humidity"]= response.main.humidity;
            cityWeather["windSpeed"]= response.wind.speed;
            console.log(cityWeather)
            
          

       
        });
        


    });


};
getTodayWeather()
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + searchCity + "&appid=d465fadd5a597a5801dffa0651fba644";



// grab search value #search-input
//when user clicks on search button, save seacrh value to local storage and show the forecast in that city
// append it to  #history div as a button
// when that button is click call the api to get city's weather forecast


