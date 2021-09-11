import React from "react";
import { Bar } from "react-chartjs-2";
import { statuses } from "../../../utils/constants";

function ClientProjectChart({ rawData, title }) {
  const data = {
    labels: statuses.map((status) => status.label),
    datasets: [
      {
        data: rawData.tally,
        backgroundColor: statuses.map((status) => status.color),
      },
    ],
  };

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
      legend: {
        display: false,
      },
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

export default ClientProjectChart;
