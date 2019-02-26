import React from 'react'
import './weather.css'
import icons from './weather-icons'

const week = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thurs",
    5: "Fri",
    6: "Sat"
}

let Kelvin, Celsius, Fahr = null;

function changeUnit(event) {
    // console.log(event.target.textContent)
    let temps = document.querySelectorAll(".day-temp");
    let prevTemp
    switch(event.target.textContent)
    {
        case "C":
            prevTemp = document.querySelector(".current-unit").textContent
            // console.log(typeof document.querySelector(".current-unit").textContent)
            console.log(prevTemp)
            document.querySelector(".current-temp").innerHTML = Celsius
            document.querySelector(".current-unit").innerHTML = "&#8451"
            if (prevTemp === "K")
            {
                temps.forEach(temp => {
                    temp.innerHTML =  Math.round(temp.innerHTML-273.15)// + "&#8451"
                })
            } else if (prevTemp === "&#8457")
            {
                temps.forEach(temp => {
                    temp.innerHTML =  Math.round((5/9) * (temp.innerHTML-32))// + "&#8451"
                })
            }
            else {
                console.log("something wrong")
            }
            break
        case "K":
            prevTemp = document.querySelector(".current-unit").textContent
            document.querySelector(".current-temp").innerHTML = Kelvin
            document.querySelector(".current-unit").innerHTML = "K"
            if (prevTemp === '&#8451')
            {
                temps.forEach(temp => {
                    temp.innerHTML =  Math.round(temp.innerHTML+273.15)// + "K"
                })
            }
            else if (prevTemp === '&#8457')
            {
                temps.forEach(temp => {
                    temp.innerHTML =  Math.round((5/9) * (temp.innerHTML-32))// + "K"
                })
            }
            else {
                console.log("something wrong")
            }
            break
        case "F":
            prevTemp = document.querySelector(".current-unit").textContent
            document.querySelector(".current-temp").innerHTML = Fahr
            document.querySelector(".current-unit").innerHTML = "&#8457"
            if (prevTemp === '&#8451')
            {
                temps.forEach(temp => {
                    temp.innerHTML =  Math.round((9/5) * (temp.innerHTML) + 32)// + "&#8457"
                })
            }
            else if (prevTemp === 'K')
            {
                temps.forEach(temp => {
                    temp.innerHTML =  Math.round((9/5) * (temp.innerHTML-273.15) + 32) //+ "&#8457"
                })
            }
            else {
                console.log("something wrong")
            }
            break
        default:
            console.log("error");
            break;
    }
}

function Weather(props) {
    if (props.weatherLoaded && props.forecastLoaded) {
        Kelvin = Math.round(props.weatherData.main.temp)
        Celsius = Math.round(props.weatherData.main.temp - 273.15)
        Fahr = Math.round((9/5) * (props.weatherData.main.temp - 273.15) + 32)
        return (
            <div className="weather-widget">
                <h2>{props.weatherData.name}</h2>
                <hr></hr>
                <div className="container-current">
                    <div className="current">
                    <div className="current-weather">
                        {props.weatherData.weather[0].description}
                    </div>
                    <span className="current-temp">{Math.round(props.weatherData.main.temp)}</span><span className="current-unit">K</span>
                    <button onClick={changeUnit}>K</button>
                    <button onClick={changeUnit}>C</button>
                    <button onClick={changeUnit}>F</button>
    
                    </div>
                    <div className="weather-icon">
                        <img src={icons[props.weatherData.weather[0].icon]} alt=""/>
                    </div>
                </div>
                
                <div className="five-day-container">
                    <div className="five-day">
                        <div className="day">
                            <span className="day-name">{week[props.day.getDay()]}</span>
                            <div className="day-icon"></div>
                            <div className="temp-span">
                                <img src={icons[props.forecastData.list[0].weather[0].icon]} alt="" className="forecast-icon"/>
                                <span className="day-temp">{props.forecastData.list[0].main.temp}</span>
                            </div>
                        </div>
                        <div className="day">
                            <span className="day-name">{week[(props.day.getDay()+1)%7]}</span>
                            <div className="day-icon"></div>
                            <div className="temp-span">
                                <img src={icons[props.forecastData.list[8].weather[0].icon]} alt="" className="forecast-icon"/>
                                <span className="day-temp">{props.forecastData.list[8].main.temp}</span>
                            </div>
                        </div>
                        <div className="day">
                            <span className="day-name">{week[(props.day.getDay()+2)%7]}</span>
                            <div className="day-icon"></div>
                            <div className="temp-span">
                                <img src={icons[props.forecastData.list[16].weather[0].icon]} alt="" className="forecast-icon"/>
                                <span className="day-temp">{props.forecastData.list[16].main.temp}</span>
                            </div>
                        </div>
                        <div className="day">
                            <span className="day-name">{week[(props.day.getDay()+3)%7]}</span>
                            <div className="day-icon"></div>
                            <div className="temp-span">
                                <img src={icons[props.forecastData.list[24].weather[0].icon]} alt="" className="forecast-icon"/>
                                <span className="day-temp">{props.forecastData.list[24].main.temp}</span>
                            </div>
                        </div>
                        <div className="day">
                            <span className="day-name">{week[(props.day.getDay()+4)%7]}</span>
                            <div className="day-icon"></div>
                            <div className="temp-span">
                                <img src={icons[props.forecastData.list[32].weather[0].icon]} alt="" className="forecast-icon"/>
                                <span className="day-temp">{props.forecastData.list[32].main.temp}</span>
                            </div>
                        </div>
                    </div>
                    <footer className="temp-unit"></footer>
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default Weather