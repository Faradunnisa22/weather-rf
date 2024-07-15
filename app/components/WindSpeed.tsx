import React from "react";
import { FaWind } from "react-icons/fa";

const WindSpeed =({windSpeed}) =>{
    return(
        <div className="bg-gray-900 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Wind Speed</h2>
            <div className="flex items-center justify-center">
                <FaWind className="mr-2"/>
                <p className="text-lg">{windSpeed} m/s</p>

            </div>
        </div>
    )
}
export default WindSpeed;