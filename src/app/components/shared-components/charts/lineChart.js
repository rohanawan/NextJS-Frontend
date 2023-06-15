import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { generateCategoryColors } from "@/app/utils/generateRandomColor";
import LoadButton from "../button/LoadButton";

/* eslint-disable */
const LineChart = ({
  getProductsByCategory,
  getAverageRatingOfCategory,
  getAverageRating,
  handleSeeMore,
}) => {
  Chart.register(CategoryScale);
  const categories = Object.keys(getProductsByCategory());
  const colors = generateCategoryColors(categories);

  const chartData = {
    labels: Object.keys(getProductsByCategory()),
    datasets: [
      {
        label: "Product Count",
        data: Object.values(getAverageRatingOfCategory()),
        backgroundColor: colors,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Categories",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return (
    <div>
      <h3>Average Rating: {getAverageRating() || 0}</h3>
      <div className="flex justify-start">
        <LoadButton handleClick={handleSeeMore} text={"Load More Products"} />
      </div>
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LineChart;
