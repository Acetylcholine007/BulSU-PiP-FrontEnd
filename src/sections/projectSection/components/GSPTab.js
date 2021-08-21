import {
  makeStyles,
  Switch,
  Card,
  CardHeader,
  CardContent,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import { GSPs } from "../../../utils/constants";

function GSPTab({ index, form1Data, setForm1Data }) {
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
            checked={form1Data.GSP[index]}
            onChange={(e) => {
              setForm1Data(() => {
                form1Data.GSP[index] = e.target.checked
                  ? new Array(GSPs[index].contents.length).fill(null)
                  : null;
                return { ...form1Data };
              });
            }}
            name={`Goal${index + 1}`}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        }
      />
      {form1Data.GSP[index] && (
        <CardContent>
          {GSPs[index].contents.map((subgoal, subgoalIndex) => (
            <Card style={{ margin: "5px 0px 5px 0px" }}>
              <CardHeader
                title={subgoal.value}
                action={
                  <Switch
                    checked={form1Data.GSP[index][subgoalIndex]}
                    onChange={(e) => {
                      setForm1Data(() => {
                        form1Data.GSP[index][subgoalIndex] = e.target.checked
                          ? new Array(
                              GSPs[index].contents[subgoalIndex].contents.length
                            ).fill(false)
                          : null;
                        return { ...form1Data };
                      });
                    }}
                    name={`Goal${index + 1}`}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                }
              />
              {form1Data.GSP[index][subgoalIndex] && (
                <CardContent>
                  <FormGroup>
                    {subgoal.contents.map((indicator, indicatorIndex) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              form1Data.GSP[index][subgoalIndex][indicatorIndex]
                            }
                            onChange={(e) => {
                              setForm1Data(() => {
                                form1Data.GSP[index][subgoalIndex][indicatorIndex] = e.target.checked
                                return { ...form1Data };
                              });
                            }}
                            name="checkedA"
                          />
                        }
                        label={indicator}
                      />
                    ))}
                  </FormGroup>
                </CardContent>
              )}
            </Card>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

export default GSPTab;
