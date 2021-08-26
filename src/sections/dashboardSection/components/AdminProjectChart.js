import React from "react";
import { Bar } from "react-chartjs-2";
import { statuses } from "../../../utils/constants";

function AdminProjectChart({rawData}) {
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
  };

  return <Bar data={data} options={options} />;
}

export default AdminProjectChart;
