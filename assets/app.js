let searchBtn = $('#search-button');
let historyDiv = $('#history');
let todayWeather = $('#today');
let forecast = $('#forecast');
let history = localStorage.getItem("history")
let lat;
let long;



function getWeather(){
    let recentSearch = []
  
    searchBtn.click(function(event){
        event.preventDefault();
        let searchCity = $('#search-input').val();
        let cityWeather = {}
        if (searchCity){

            console.log(searchCity)
            recentSearch.push(searchCity)
            let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=15b165a624a11fe326633135320af3d9"
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
           
                let lat = response.city.coord.lat;
                 let lon= response.city.coord.lon;
                
                let queryURLForecast = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+lon+"&units=imperial&appid=15b165a624a11fe326633135320af3d9"
                

                $.ajax({
                    url: queryURLForecast,
                    method: "GET"
                }).then(function(response){
                    console.log(response)
                    let currCity = response.name;
                    let currentDate = moment.unix(response.dt).format("DD-MMM-YYYY");
                    let icon =`https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
                    let temperature = response.main.temp;
                    let windSpeed = response.wind.speed;
                    let humidity = response.main.humidity;
                    cityWeather["date"]= currentDate;
                    cityWeather["city"]= currCity;
                    cityWeather["icon"]= icon;
                    cityWeather["temp"]= temperature;
                    cityWeather["humidity"]= humidity;
                    cityWeather["windSpeed"]= windSpeed;

                    $("#city-heading").text(`${currCity} (${currentDate})`);
                    $("#weather-icon").attr({"src":icon, alt:"weather icon"});
                    $("#today-temp").text(`Temp: ${temperature}`);
                    $("#today-wind").text(`Wind: ${windSpeed}`);
                    $("#today-humidity").text(`Humidity: ${humidity}`);

                 

                    localStorage.setItem("history",recentSearch);

        });
                
            });

        };
    
    });
    
    

   
  
};

getWeather()





// let queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + searchCity + "&appid=d465fadd5a597a5801dffa0651fba644";



// grab search value #search-input
//when user clicks on search button, save seacrh value to local storage and show the forecast in that city
// append it to  #history div as a button
// when that button is click call the api to get city's weather forecast


