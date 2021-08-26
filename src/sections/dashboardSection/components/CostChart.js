import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Pie } from "react-chartjs-2";
import { statuses } from "../../../utils/constants";

function CostChart({ rawInvestmentCost, rawProjectCost }) {
  const investmentCost = {
    labels: rawInvestmentCost.map((item) => item.label),
    datasets: [
      {
        label: "Investment Cost Tally",
        data: rawInvestmentCost.map((item) => item.value),
        backgroundColor: statuses.map((status) => status.color),
      },
    ],
  };

  const projectCost = {
    labels: rawProjectCost.map((item) => item.label),
    datasets: [
      {
        label: "Project Cost Tally",
        data: rawProjectCost.map((item) => item.value),
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
