import React from "react";
import { Doughnut } from "react-chartjs-2";

/* eslint-disable */
const DonutChart = ({ getAverageRating }) => {
  const chartData = {
    labels: ["Average Rating"],
    datasets: [
      {
        data: [getAverageRating(), 5 - getAverageRating()], // Asuming the rating scale is from 0 to 5
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(0, 0, 0, 0.1)"],
      },
    ],
  };

  const chartOptions = {
    cutout: "65%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h3 className="pt-4 pb-4">Average Rating : {getAverageRating()}</h3>
      <div>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DonutChart;
