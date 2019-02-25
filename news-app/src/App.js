import React, { Component } from 'react';
import './App.css';
import Display from './display'
import Weather from './weather'
import BreakingNews from './news/breaking'
import Searched from './news/searched'

const appid = process.env.REACT_APP_WEATHER_KEY
const apiKey = process.env.REACT_APP_NEWS_KEY

class App extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      count: 0,
      show24Hour: false,
      weatherData: {},
      forecastData: {},
      locationError: "Please enable location settings",
      forecastError: null,
      weatherError: null,
      currentWeatherIsLoaded: false,
      forecastIsLoaded: false,
      dayOfTheWeek: new Date(),
      breakingNewsData: {},
      bNewsIsLoaded: false,
      searchQuery: "",
      searchedNewsData: {},
      sNewsIsLoaded: false
    }

    this.increase = this.increase.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.getTime = this.getTime.bind(this)
    this.showTime = this.showTime.bind(this)
    this.toggle24Hour = this.toggle24Hour.bind(this)
    this.getWeatherData = this.getWeatherData.bind(this)
    this.getPosition = this.getPosition.bind(this)
    this.getBreakingNewsData = this.getBreakingNewsData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() { 
    this.showTime();
    this.getWeatherData();
    this.getBreakingNewsData();
  }

  increase() {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  start() {
    if (this.startClock)
    {
      clearInterval(this.startClock)
      this.setState({count: -1})
    }
    
    this.increase()
    this.startTimer = setInterval(this.increase, 1000)
  }


  stop() {
    clearInterval(this.startTimer)
  }

  getTime() {
    const time = new Date()
    let hr = time.getHours()
    let min = time.getMinutes()
    let sec = time.getSeconds()
    let meridiem = 'AM'; //To tell you if am or pm

    if(!this.state.show24Hour)
    {
      if(hr > 12)
      {
        hr -= 12
        meridiem = 'PM'
      }
      else if (hr === 0)
      {
        hr = 12
      }
    }

    hr = (hr>9) ? hr: '0'+hr
    min = (min>9) ? min: '0'+min
    sec = (sec>9) ? sec: '0'+sec

    let currentTime = hr + ':' + min + ':' + sec + (this.state.show24Hour ? ' ': meridiem)
    this.setState({count: currentTime})
  }

  showTime() {
    clearInterval(this.startTimer)
    this.getTime() //Ensures time is displayed instantly, then repeats on the next line
    this.startClock = setInterval(this.getTime, 1000)
  }

  toggle24Hour(event) {
    this.setState(prevState => ({show24Hour: !prevState.show24Hour}))
  }

  getPosition() {
    if (navigator.geolocation) 
    {
      return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
    }
    else {
      console.log("Please enable location settings")
      return this.state.locationError
    }
  }

  getWeatherData() {
    this.getPosition().then(position => {
      // Fetch the current temperature
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${appid}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            weatherData: result,
            currentWeatherIsLoaded: true
          })
        },
        (error) => {
          this.setState({
            weatherError: error
          })
        }
      )
      // Fetch the five day forecast
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${appid}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            forecastData: result,
            forecastIsLoaded: true
          })
        },
        (error) => {
          this.setState({
            forecastError: error
          })
        }
      )
    })
  }

  getBreakingNewsData() {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
    .then(res => res.json())
    .then((result) => {
      this.setState({breakingNewsData: result, bNewsIsLoaded: true})
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSearch(event) {
    event.preventDefault();
    fetch(`https://newsapi.org/v2/everything?q=${this.state.searchQuery}&${this.state.dayOfTheWeek.toJSON().substr(0,10)}&sortBy=popularity&apiKey=${apiKey}`)
    .then(res => res.json())
    .then((result) => {
      this.setState({searchedNewsData: result, sNewsIsLoaded: true})
    })
  }

  render() {
      return (
        <div className="App">
          <div className="hud">
            <Display
            increase={this.increase}
            start={this.start}
            stop={this.stop}
            showTime={this.showTime}
            toggle24Hour={this.toggle24Hour}
            count={this.state.count}
            />

            <Weather
            weatherData={this.state.weatherData}
            forecastData={this.state.forecastData}
            weatherLoaded={this.state.currentWeatherIsLoaded}
            forecastLoaded={this.state.forecastIsLoaded}
            day={this.state.dayOfTheWeek}
            />
          </div>

          <Searched
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
          searchLoaded={this.state.sNewsIsLoaded}
          searchData={this.state.searchedNewsData}
          />
          <h1>Breaking News</h1>
          <BreakingNews
          b_newsData={this.state.breakingNewsData}
          breakingLoaded={this.state.bNewsIsLoaded}/>
        </div>
      );
    }
  }

export default App; 