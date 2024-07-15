"use client"
import React ,{ useState,useEffect } from "react";
import Weather from "./components/Weather";
import SunriseSunset from "./components/SunriseSunset"
import WindSpeed from "./components/WindSpeed";
import HourlyWeather from "./components/HourlyWeather";
import FeelsLike from "./components/FeelsLike";
import HumidityInfo from "./components/Humidity";
import VisibilityInfo from "./components/Visibility";
import FiveDaysGraph from "./components/FiveDays";
import PressureInfo from "./components/Pressure";
import RainInfo from "./components/Rain";

export default function Home(){
  const [city, setCity]= useState("");
  const [currentWeather,setCurrentWeather]= useState<any | null>(null);
  const [forecastData,setForecastData]= useState(null);
  const [hourlyTemperatureData,setHourlyTemperatureData]=useState<any |null>(null);
  const [errorAlert,setErrorAlert]=useState<any |null>(null);


  const fetchWeatherData = async()=>{
    const apikey="1c6048063538455d3658f5ff12172238";
    const commonUrl =`https://api.openweathermap.org/data/2.5`;
    const weatherUrl =`${commonUrl}/weather?q=${city}&appid=${apikey}&units=metric`;
    const forecastUrl =`${commonUrl}/forecast?q=${city}&appid=${apikey}&units=metric`;

    try{
      const[weatherResponse, forecastResponse, hourlyResponse]=
      await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl),
        fetch(forecastUrl),
      ])

      if(weatherResponse.ok && forecastResponse.ok && hourlyResponse.ok){
        const weatherData = await weatherResponse.json();
        setCurrentWeather(weatherData);

        const forecastData = await forecastResponse.json();

        setForecastData(forecastData.list.slice(0,5*8));
        
        const hourlyData = await hourlyResponse.json();
        const hourlyTemperatureData = hourlyData.list.map((hourlyEntry)=>({
          time:hourlyEntry.dt,
          temperature:hourlyEntry.main.temp,
        }))
setHourlyTemperatureData(hourlyTemperatureData);

setErrorAlert(null);

      }else{
        setErrorAlert("Invalid city name. Please try again:");
      }
    }catch(error){
      console.error("Error fetching weather data:",error);
      setErrorAlert("An error occured.Please try again later.");
    
    }
  }
  return(
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <main className="text-center flex-1 w-full">
        <h1 className="text-4xl font-bold mb-8 mt-4">
Welcome to the Weather App!
        </h1>
        <div className="flex items-center justify-center mb-8">
          <input type="text" placeholder="Enter city name" className="p-4 mr-4 bg-gray-700 text-white rounded" value={city}
          onChange={(e)=> setCity(e.target.value)} />
<button className="p-4 bg-blue-500 text-white rounded cursor-pointer"
onClick={fetchWeatherData}>
Search
</button>
        </div>

{errorAlert && <div className="text-red-500 mb-4">{errorAlert}</div>}
{currentWeather && forecastData && hourlyTemperatureData ?.length >  0 && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="md:col-span-2">
  <Weather currentWeather={currentWeather}/>
</div>
<div className="md:col-span-1">
  <SunriseSunset
  sunrise={currentWeather.sys.sunrise}
  sunset={currentWeather.sys.sunrise}
/>
<WindSpeed windSpeed={currentWeather.wind.speed}/>
</div>
{/* <div className="md:col-span-2">
  <Weather currentWeather={currentWeather}/>
</div> */}
<div className="md:col-span-2">
  <HourlyWeather hourlyTemperatureData={hourlyTemperatureData}/>
</div>
<div className="md:col-span-1">
  <FeelsLike
  actualTemperature={currentWeather.main.temp}
  feelsLikeTemperature={currentWeather.main.feels_like}
  />
  <HumidityInfo humidity={currentWeather.main.humidity}/>
  <VisibilityInfo visibility={currentWeather.visibility}/>
</div>
<div className="md:col-span-2">
 <FiveDaysGraph forecastData={forecastData}/>
</div>
<div className="md:col-span-1">
 <PressureInfo pressure={currentWeather.main.pressure}/>
 <RainInfo rainVolumne={currentWeather.rain?.["1h"]|| 0}/>
</div>
  </div>
)}

      </main>
      
    </div>
  )
}