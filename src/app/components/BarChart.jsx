"use client";

import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});
    let userLabels = [];

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                for (const dataObj of data) {
                    if (!userLabels.includes(dataObj.name))
                        userLabels.push(dataObj.name)
                }
                setChartData({
                    labels: userLabels,
                    datasets: [
                        {
                            label: 'cantidad de posteos',
                            //solo hardcodeamos la data para efectos visuales, la cantidad de posts se debe traer de la api al igual que los nombres de usuario
                            data: [10, 5, 6, 9, 3, 6, 5, 11, 7, 10],
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgb(53, 162, 235, 0.4',
                        },
                    ]
                })
                setChartOptions({
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'User posts'
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true
                })
            });
    }, []);

    return (
        <>
            <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </>
    );
};

export default BarChart;