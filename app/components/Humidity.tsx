// import exp from "constants";
import React from "react";

const HumidityInfo =({humidity})=>{
    let humidityDescription ="Humidity Levels";
    if(humidity < 30){
        humidityDescription="Low humidity. Consider staying hydrated.";
    } else if(humidity >70){
        humidityDescription = "High humidity. Be prepared for moisture.";
    }else{
        humidityDescription = "Normal humidity levels.";
    }

    return(
        <div className="bg-gray-900 p-8 rounded-lg mb-3">
            <h2 className="text-2xl font-bold mb-4">Humidity</h2>
            <p className="text-xl mb-2 font-bold">{humidity}%</p>
            <p className="text-lg">{humidityDescription}</p>
        </div>
    )
}
export default HumidityInfo