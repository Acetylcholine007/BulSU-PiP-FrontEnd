import { Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { GSPs } from "../../../utils/constants";

function GSPViewer({ GSP }) {
    const useStyles = makeStyles(() => ({
      textone:{
        color: 'white',
        fontStyle: 'Bold',
      },
      texttwo:{
        color: 'white',
        textIndent: 30,
      },
      textthree:{
        color: 'white',
        textIndent: 60,
        fontStyle: 'Italic'
      },
    }));
    const classes = useStyles();

  return (
    <Container>
      {GSP.map((goal, goalIndex) => {
        if (goal) {
          return (
            <React.Fragment>
              <Typography className={classes.textone} variant="h5">{`${goalIndex + 1}. ${
                GSPs[goalIndex].value
              }`}</Typography>
              {goal.map((subgoal, subgoalIndex) => {
                if (subgoal) {
                  return (
                    <React.Fragment>
                      <Typography className={classes.texttwo} variant="h6">{`${goalIndex + 1}.${
                        subgoalIndex + 1
                      }. ${
                        GSPs[goalIndex].contents[subgoalIndex].value
                      }`}</Typography>
                      {subgoal.map((indicator, indicatorIndex) => {
                        if (indicator) {
                          return (
                            <Typography className={classes.textthree} variant="body1">{`${goalIndex + 1}.${
                              subgoalIndex + 1
                            }.${indicatorIndex + 1}. ${
                              GSPs[goalIndex].contents[subgoalIndex].contents[
                                indicatorIndex
                              ]
                            }`}</Typography>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </React.Fragment>
                  );
                } else {
                  return null;
                }
              })}
            </React.Fragment>
          );
        } else {
          return null;
        }
      })}
    </Container>
  );
}

export default GSPViewer;
