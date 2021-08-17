import {
  Card,
  Typography,
  makeStyles,
  Grid,
  Container,
} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";

function DashboardProjectCard({ title, count, color }) {
  const useStyles = makeStyles({
    crd: {
      marginTop: 10,
      marginBottom: 10,
      border: 1,
      borderStyle: "Solid",
      outlineColor: { color },
      borderRadius: "20px 20px 20px 20px"
    },
    dot: {
      color,
      textAlign: "Right",
    },
    padTop: {
      marginTop: 10
    },
    padBot: {
      marginBottom: 5
    },

  });

  const classes = useStyles();

  return (
    <Card className={classes.crd} variant="outlined">
      <Container>
        <Grid className={classes.padTop} container>
          <Grid item xs={11}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item xs={1}>
            <FiberManualRecordIcon className={classes.dot} />
          </Grid>
        </Grid>

        <Grid className={classes.padBot} item xs={12}>
          <Typography variant="h3">{count}</Typography>
        </Grid>
      </Container>
    </Card>
  );
}

export default DashboardProjectCard;
