let searchBtn = $('#search-button');
let historyDiv = $('#history');
let todayWeather = $('#today');
let forecast = $('#forecast');
let history = localStorage.getItem("history")






function getForecast(arr){
    forecast.empty();

    let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + arr[0] + "&lon="+arr[1]+"&units=metric&appid=15b165a624a11fe326633135320af3d9"
    
    
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response){

       
        
        for (let i=1; i < response.list.length;){
            let windSpeed = response.list[i].wind.speed

            let date = moment(response.list[i].dt_txt).format("DD/MM/YYYY");
            console.log(response.list[i])
            
            let icon =`https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`;
            let temperature = response.list[i].main.temp;
            let humidity = response.list[i].main.humidity;
            // cityWeather["date"]= currentDate;
            // cityWeather["city"]= currCity;
            // cityWeather["icon"]= icon;
            // cityWeather["temp"]= temperature;
            // cityWeather["humidity"]= humidity;
            // cityWeather["windSpeed"]= windSpeed;

           
            let forecastCard = $("<div class=col-md-6>").attr("id","forecast-card").addClass("col-lg-3");
            forecast.append(forecastCard);

            let dateHeading =$("<h2>").text(date).addClass("card-content");;
           
            forecastCard.append(dateHeading);
            let iconImg = $("<img>").attr("src", icon).addClass("card-content");;
            forecastCard.append(iconImg)
            let weatherUl= $("<ul>").addClass("card-content");
            forecastCard.append(weatherUl);
            let tempLi = $("<li>").text(`Temp: ${temperature}`);
            let windLi = $("<li>").text(`Wind: ${windSpeed} KPH`);
            let humidityLi = $("<li>").text(`Humidity: ${humidity}%`);

            weatherUl.append(tempLi);
            weatherUl.append(windLi);
            weatherUl.append(humidityLi);
            i+=8;
            

            
           
    
          
           
        


        }

      

});
};

function getWeather(arr){
    

        
    let cityWeather = {}
    let queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + arr[0] + "&lon="+arr[1]+"&units=metric&appid=15b165a624a11fe326633135320af3d9"
            

    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function(response){
        
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
        $("#today-wind").text(`Wind: ${windSpeed} KPH`);
        $("#today-humidity").text(`Humidity: ${humidity}%`);
        localStorage.setItem("history",recentSearch);

    });
                
           

};
function getLatAndLon(){
    let searchCity = $('#search-input').val();
    ;
    if (searchCity){

        console.log(searchCity)
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&&appid=15b165a624a11fe326633135320af3d9&cnt=5"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            
            lat = response.city.coord.lat;
            lon= response.city.coord.lon;
            getForecast([lat,lon]);
            getWeather([lat,lon]);
            
           

             
            
        })
       

    };
};

//function to get details of city clicked in history
    
   

searchBtn.click(function(event){
    event.preventDefault();

   getLatAndLon();
    
    // getWeather(coOrds);
    // getForecast(coOrds);
})






// let queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + searchCity + "&appid=d465fadd5a597a5801dffa0651fba644";



// grab search value #search-input
//when user clicks on search button, save seacrh value to local storage and show the forecast in that city
// append it to  #history div as a button
// when that button is click call the api to get city's weather forecast


