import React, { useEffect, useRef } from "react";
import moment from "moment/moment";
import {Chart,ChartConfiguration,LineController,CategoryScale,LineElement,PointElement,LinearScale,Title} from "chart.js";
// import {Line} from "react-chartjs-2"
// import "chartjs-adapter=moment"
// import HumidityInfo from "./Humidity";

// Chart.register(...registerables)
Chart.register(LineController,CategoryScale,
LineElement,PointElement,LinearScale,Title)
// interface HourlyWeatherProps {
//     hourlyTemperatureData:Array<{time:number;temperature:number}>
// }
// type uniqueData={
//     times:string[]
//     temperatures:number[]
// }
const HourlyWeather = ({ hourlyTemperatureData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        const createChart = () => {
            const uniqueData = hourlyTemperatureData.reduce((acc, entry) => {
                const time = moment.unix(entry.time).format("H A");
                if (!acc.times.includes(time)) {
                    acc.times.push(time);
                    acc.temperatures.push(entry.temperature);

                }
                return acc;
            },
                { times: [], temperatures: [] }
            )
            const chartConfig :ChartConfiguration= {
                type: "line",
                data: {
                    labels: uniqueData.times,
                    datasets: [
                        {
                            label: "Temperature(°C)",
                            data: uniqueData.temperatures,
                            fill: false,
                            borderColor: "rgb(75,192,192)",
                            tension: 0.1,
                        },
                    ],
                },
            }
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current?.getContext("2d");
            if (ctx) {
                chartInstance.current = new Chart(ctx, chartConfig);
            }
        };
        if (hourlyTemperatureData.length > 0) {
            createChart();
        }
    }, [hourlyTemperatureData]);

    return (
        <div className="bg-gray-900 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Hourly Weather</h2>
            <canvas ref={chartRef} width="400" height="200"></canvas>

        </div>
    )
};
export default HourlyWeather;