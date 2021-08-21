import {
  makeStyles,
  Switch,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import { GSPs } from "../../../utils/constants";

function GSPTab({ index }) {
  const useStyles = makeStyles(() => ({
    card: {
      margin: "10px 0px 10px 0px",
    },
    cardHeader: {
      backgroundColor: "#d3d3d3",
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={GSPs[index].value}
        className={classes.cardHeader}
        action={
          <Switch
            checked={true}
            onChange={() => {}}
            name={`Goal${index + 1}`}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        }
      />
      {
        <CardContent>
          {GSPs[index].contents.map((subgoal) => (
            <Card style={{ margin: "5px 0px 5px 0px" }}>
              <CardHeader
                title={subgoal.value}
                action={
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    name={`Goal${index + 1}`}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
              />
              {<CardContent>
                {subgoal.contents.map((indicator) => (
                  <Typography variant = 'h6'>{indicator}</Typography>
                ))}
              </CardContent>}
            </Card>
          ))}
        </CardContent>
      }
    </Card>
  );
}

export default GSPTab;
