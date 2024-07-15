import React from "react";
import moment from "moment/moment"
import {
    FaCloud,
    FaSun,
    FaCloudRain,
    FaSnowflake,
    FaSmog,
} from "react-icons/fa";
// import { format } from "path";

const Weather = ({ currentWeather }) => {
    const formatDateTime = (timestamp) => {
        return moment.unix(timestamp).format("MMM D,ddd HH:mm")
    }
    const getWeatherIcon = (weatherDescription) => {
        switch (weatherDescription.toLowerCase()) {
            case "clear sky":
                return <FaSun />;
            case "few clouds":
            case "scattered clouds":
            case "broken clouds":
                return <FaCloud />;
            case "shower rain":
            case "rain":
                return <FaCloudRain />;
            case "snow":
                return <FaSnowflake />;
            case "mist":
            case "smoke":
            case "haze":
            case "dust":
            case "fog":
            case "sand":
            case "ash":
            case "squall":
            case "tornado":
                return <FaSmog />;
            default:
                return null;
        }
    };

return (
    <div className="bg-gray-900 p-8 rounded-lg mb-3">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold mb-2">{currentWeather.name}</h2>
                <p className="text-lg mb-2">
                    {moment.unix(currentWeather.dt).format("dddd")}
                </p>
            </div>
            <p className="text-lg mb-2">{formatDateTime(currentWeather.dt)}</p>
        </div>
        <p className="text-5xl mb-4 mt-4 font-bold">{currentWeather.main.temp}°C</p>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">{getWeatherIcon(currentWeather.weather[0].description)}

            <p className="text-lg ml-2">
                {currentWeather.weather[0].description}
            </p>

            </div>
            <div>
                <p className="text-sm">High:{currentWeather.main.temp_max}°C
                </p>
                <p className="text-sm ">Low:{currentWeather.main.temp_min}°C
                </p>
            </div>
        </div>
    </div>
)
};

export default Weather
