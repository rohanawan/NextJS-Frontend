import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = ({ getAverageRating }) => {
  const chartData = {
    labels: ['Average Rating'],
    datasets: [
      {
        data: [getAverageRating(), 5 - getAverageRating()], // Asuming the rating scale is from 0 to 5
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(0, 0, 0, 0.1)'],
      },
    ],
  };

  const chartOptions = {
    cutout: '65%', 
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="">
        <h3 className='pt-8 pb-8'>Average Rating : {getAverageRating()}</h3>
        <div className="pt-8">
        <Doughnut data={chartData} options={chartOptions} />
        </div>
  </div>
  );
};

export default DonutChart;
