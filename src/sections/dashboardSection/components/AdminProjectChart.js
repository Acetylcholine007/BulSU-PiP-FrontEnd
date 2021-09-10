import React from "react";
import { Bar } from "react-chartjs-2";
import { statuses } from "../../../utils/constants";

function AdminProjectChart({rawData, title}) {
  const data = {
      labels: rawData.map((data) => data.institute),
      datasets: statuses.map((status, index) => ({
          label: status.label,
          data: rawData.map((data) => (data.tally[index])),
          backgroundColor: status.color
      }))
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: title,
        fullSize: true,
        font: {
          size: 18,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
}

export default AdminProjectChart;
