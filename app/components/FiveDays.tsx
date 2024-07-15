import React,{useRef,useEffect} from "react";
import { Chart,ChartConfiguration } from "chart.js";
import moment from "moment/moment";


 const FiveDaysGraph =({forecastData})=>{
const chartRef=useRef<HTMLCanvasElement>(null);
const chartInstance = useRef<Chart | null>(null);

useEffect(()=>{
const createChart=()=>{
    const uniqueData= forecastData.reduce(
        (acc,forecastDay)=>{
            const date = moment.unix(forecastDay.dt).format("MMMM D");
            if(!acc.dates.includes(date))
            {
                acc.dates.push(date);
                acc.avgTemps.push(
                    (forecastDay.main.temp_max + forecastDay.main.temp_min )/2
                )
            }

            return acc;
        },
        {dates:[],avgTemps:[]}
    )
    const chartConfig  :ChartConfiguration={
        type:"line",
        data:{
            labels:uniqueData.dates,
            datasets:[
                {
                    label:"Average Temperature (°C)",
                    data: uniqueData.avgTemps,
                    fill:false,
                    borderColor:"rgb(75,192,192)",
                    tension:0.1,
                },

            ],
        },
    }

    if (chartInstance.current){
        chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
        chartInstance.current = new Chart(ctx, chartConfig);
    }
}
if(forecastData.length >0){
    createChart();
}
},[forecastData]);

return(
    <div className="bg-gray-900 p-8 rounded-lg text-left">
        <h2 className="text-2xl font-bold mb-4">5-Day Forecast Graph</h2>
        <canvas ref={chartRef} width="400" height="200"></canvas>

    </div>
)
 }
export default FiveDaysGraph
