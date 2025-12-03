import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UnpaidDuesChart = ({ unpaid_dues }) => {
  // Extract client names and amounts dynamically
  const labels = unpaid_dues.map(d => d.client.name);
  const amounts = unpaid_dues.map(d => d.due_amount);

  const chartData = {
    labels: labels.length ? labels : ["No Clients"],
    datasets: [
      {
        label: "Unpaid Dues",
        data: amounts.length ? amounts : [0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Unpaid Dues by Client" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} style={{ height: "300px" }} />;
};

export default UnpaidDuesChart;
