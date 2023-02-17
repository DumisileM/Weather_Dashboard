let searchBtn = $( "#search-button" );
let historyDiv = $('#history');
let forecast = $('#forecast');





function appendBtn(e){
    // function to create button elements with text value of cities we have searched for previouls that have been
    //stored in local stroage. 
    //each city is passed as an arg to this function and a button element is created and appended to the html.
 
        if(e.length >0){
        let newBtn = $("<button class= history-search-button>").text(e).addClass("search-button")
        historyDiv.append(newBtn)
 
        }
        $(".history-search-button").click(function(event){
            event.preventDefault();
            let value = $(event.target).text();
            
            
            
            getLatAndLon(value)
        });
    }



function getForecast(arr){
    //this function gets the 5 day forecast of a given city
    //takes an array as an arg which consists of two elems:lat and lon
    //lat and lon are then used in the api query below
    forecast.empty();

    let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=" + arr[0] + "&lon="+arr[1]+"&units=metric&appid=15b165a624a11fe326633135320af3d9"
    
    
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response){

       
        
        for (let i=1; i < response.list.length;){
            let windSpeed = response.list[i].wind.speed

            let date = moment(response.list[i].dt_txt).format("DD/MM/YYYY");
            
            
            let icon =`https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`;
            let temperature = response.list[i].main.temp;
            let humidity = response.list[i].main.humidity;
           
            let forecastCard = $("<div class=col-md-6>").attr("id","forecast-card").addClass("col-lg-4");
            forecast.append(forecastCard);

            let dateHeading =$("<h2>").text(date).addClass("card-content");
           
            forecastCard.append(dateHeading);
            let iconImg = $("<img>").attr("src", icon).addClass("card-content");
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
}

function getWeather(arr){
    //takes in an array with two elements: lat and lonn which are use in the api call below
    //this functions makes an api call to get the current weather
    //this function grabs values from the response of the api query and appends them to index.html file
 
    const queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?lat=" + arr[0] + "&lon="+arr[1]+"&units=metric&appid=15b165a624a11fe326633135320af3d9"
   

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
   

        $("#city-heading").text(`${currCity} (${currentDate})`);
        $("#weather-icon").attr({"src":icon, alt:"weather icon"});
        $("#today-temp").text(`Temp: ${temperature}`);
        $("#today-wind").text(`Wind: ${windSpeed} KPH`);
        $("#today-humidity").text(`Humidity: ${humidity}%`);
        

    });           

}
function getLatAndLon(searchCity){
    //this function takes a city as in put and runs an api query to get the latitude and longitude values 
    //which are used in the subsequent api calls to get he weather and forecast of that city

        
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&&appid=15b165a624a11fe326633135320af3d9&cnt=5"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            
            let lat = response.city.coord.lat;
            let lon= response.city.coord.lon;
            getForecast([lat,lon]);
            getWeather([lat,lon]);
            


            
        })
    }

//click events and save previously searched to local storage
function searchWeather(){
    let searchedItems = []//array to save cities that have been searched for
    
 
    searchBtn.click(function(event){ //when search btn is clicked

    event.preventDefault();
    let searchCity = $('#search-input').val().toLowerCase(); //grab the value of text input
    if(searchCity){
        
        if (!searchedItems.includes(searchCity)){ //check that the city is not in the array before appending it the array
            searchedItems.push(searchCity);
            
        }
        getLatAndLon(searchCity) //call the function to get the weather and forcast for city in question i.e. the vlaue of text input
        localStorage.setItem("history", searchedItems)//save the array of cities we ahve searched for into local storage
    

    }
    let citiesSearched = localStorage.getItem("history").split(",")//grab the array in local storage
    citiesSearched.forEach(function(e){
        if(e==searchCity){
            
            appendBtn(e)// for each city in local storage make button element and append it to the history div

        }


    });


    });

 
 
}



searchWeather()

    








