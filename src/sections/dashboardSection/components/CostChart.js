import { Grid, Typography } from "@material-ui/core";
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

  const projectCost = {
    labels: costs.map((item) => item.label),
    datasets: [
      {
        label: "Project Cost Tally",
        data: costs.map((item) => item.value[1]),
        backgroundColor: statuses.map((status) => status.color),
      },
    ],
  };

  return (
    <Grid container>
      <Grid item xs={6} align='center'>
        <Typography variant = 'body1'>Total Investment Costs Distribution</Typography>
        <Pie data={investmentCost} />
      </Grid>
      <Grid item xs={6} align='center'>
        <Typography variant = 'body1'>Total Project Costs Distribution</Typography>
        <Pie data={projectCost} />
      </Grid>
    </Grid>
  );
}
export default CostChart;
