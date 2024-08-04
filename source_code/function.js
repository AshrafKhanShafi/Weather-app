const apiKey = "3f849c6d5776ccc386b8faf8eb4babdf"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const searchInput = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")

const checkWeather = async (cityName) => {
    try {
        const fecthData = await fetch(apiURL + `&q=${cityName}` + `&appid=${apiKey}`)

        if (fecthData.status === 404) {
            document.querySelector(".error").style.display = "block"
            document.querySelector(".weather").style.display = "none"

        } else {
            document.querySelector(".error").style.display = "none"

        }
        if (!fecthData.ok) {
            throw new Error(`HTTP error! status: ${fecthData.status}`)
        }
        let data = await fecthData.json()
        console.log(data)
        if (data.weather[0].main.toLowerCase() == "clouds") {
            document.querySelector(".weather-image img").src = "clouds.png"
        } else if (data.weather[0].main.toLowerCase() == "clear") {
            document.querySelector(".weather-image img").src = "clear.png"
        } else if (data.weather[0].main.toLowerCase() == "drizzle") {
            document.querySelector(".weather-image img").src = "drizzle.png"
        } else if (data.weather[0].main.toLowerCase() == "mist") {
            document.querySelector(".weather-image img").src = "mist.png"
        } else if (data.weather[0].main.toLowerCase() == "snow") {
            document.querySelector(".weather-image img").src = "snow.png"
        } else if (data.weather[0].main.toLowerCase() == "rain") {
            document.querySelector(".weather-image img").src = "rain.png"
        } else {
            console.error(`weather data in not available`)
        }



        document.querySelector("#degree").innerHTML = Math.round(data.main.temp) + "&deg;C"
        document.querySelector("#location").innerHTML = data.name
        document.querySelector(".humidity-text-p1").innerHTML = data.main.humidity + "%"
        document.querySelector(".windspeed-text-p1").innerHTML = data.wind.speed + "km/h"
        document.querySelector(".weather").style.display = "block"
    } catch (error) {
        console.error(`error fetching weather data`, error)
    }
}

searchbtn.addEventListener("click", () => {
    checkWeather(searchInput.value)
})

searchInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        event.preventDefault
        searchbtn.click()
    }
})

checkWeather()