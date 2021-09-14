import { Grid } from "@material-ui/core";
import React from "react";
import { Pie } from "react-chartjs-2";
import { statuses } from "../../../utils/constants";

function CostChart({ costs }) {
  const investmentCost = {
    labels: costs.map((item) => item.label),
    datasets: [
      {
        label: "Investment Cost Tally",
        data: costs.map((item) => item.value[0]),
        backgroundColor: statuses.map((status) => status.color),
      },
    ],
  };

  const options1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {legend: {
      position: 'bottom',
      align: 'center'
    },
      title: {
        display: true,
        text: "Total Investment Costs Distribution",
        fullSize: true,
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12}>
        <Pie data={investmentCost} options={options1} />
      </Grid>
    </Grid>
  );
}
export default CostChart;
