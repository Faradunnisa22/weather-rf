import React from "react";
import moment from "moment/moment";

const SunriseSunset = ({sunrise,sunset})=>{
    return(
        <div className="bg-gray-900 p-8 rounded-lg mb-4">
            <h2 className="text-2xl font-bold mb-4">Sunrise and Sunset</h2>
            <p className="text-lg mb-2">
                Sunrise: {moment.unix(sunrise).format("HH:mm")}
            </p>
            <p className="text-lg">Sunset:{moment.unix(sunset).format("HH:mm")}</p>
        </div>
    )
}
export default SunriseSunset