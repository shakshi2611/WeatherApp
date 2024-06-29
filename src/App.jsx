
import axios from 'axios'
import { useState } from 'react'
import './App.css'
import {Oval} from 'react-loader-spinner'

function App() {
  const[input, setInput] = useState("")
  const[weather, setweather] = useState({
    loading: false,
    data: {},
    error: false
  })

  const toDate = () => {
    const months = [
      "january", "February", "March", "April", "May", "june", "July", "August", "September", "October", "November", "December",
    ];
    const currentDate = new Date();
    const date = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  }

  const search = (event) => {
    if(event.key === "Enter") {
      setInput('')
      setweather({...weather, loading: true})
      axios.get('https://api.openweathermap.org/data/2.5/weather',{
        params:{
          q: input,
          units:"metric",
          appid: "d1156ff8c36009a5dc0ba3c86837fe89"
        }
      }).then(res => {
        console.log(res)
        setweather({data: res.data, loading:false, error:false})
      }).catch(err => {
        setweather({...weather, data: {}, error: true})
      })
    }
  }

  const resetWeather = () => {
    setweather({
      loading: false,
      data: {},
      error: false
    });
  };
  
  return (
    <div className='App'>
      <div className='weather-app'>
        {/* <img src='https://www.pixelstalk.net/wp-content/uploads/2016/03/Clouds-Wallpaper-Free-Download.jpg' alt='Weather Icon' className='weather-icon' /> */}
        <h1 className='app-title'>Weather App</h1>
        <div className='city-search'>
          <input type="text" 
          className='city' 
          placeholder='Enter City Name ...' 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={search}
          />
        </div>
        {
          weather.loading && (
            <Oval type="Oval" color='green' height={70} width={70} ></Oval>
          )
        }
        {
          weather.error && (
            <div className='error-message'>
              <span>City Not Found</span>
            </div>
          )
        }
        {
          weather && weather.data && weather.data.main && (
          <div>
            <div className='city-name'>
              <h2>{weather.data.name}, 
              <span>
                {weather.data.sys.country}
              </span>
              </h2>
            </div>
            <div className='date'>
              <span>{toDate()}</span>
            </div>
            <div className='icon-temp'>
              <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt=""/>
              {Math.round(weather.data.main.temp)}
              <sup className='deg'>°C</sup>
            </div>
            <div className='des-wind'>
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>wind Speed: {weather.data.wind.speed}</p>
            </div>
            <button className='reset-button' onClick={resetWeather}>Reset</button>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default App
