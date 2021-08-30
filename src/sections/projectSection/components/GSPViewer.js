import { Container, Typography } from "@material-ui/core";
import React from "react";
import { GSPs } from "../../../utils/constants";

function GSPViewer({ GSP }) {
  return (
    <Container>
      {GSP.map((goal, goalIndex) => {
        if (goal) {
          return (
            <React.Fragment>
              <Typography variant="h6">{`${goalIndex + 1}. ${
                GSPs[goalIndex].value
              }`}</Typography>
              {goal.map((subgoal, subgoalIndex) => {
                if (subgoal) {
                  return (
                    <React.Fragment>
                      <Typography variant="body1">{`${goalIndex + 1}.${
                        subgoalIndex + 1
                      }. ${
                        GSPs[goalIndex].contents[subgoalIndex].value
                      }`}</Typography>
                      {subgoal.map((indicator, indicatorIndex) => {
                        if (indicator) {
                          return (
                            <Typography variant="body2">{`${goalIndex + 1}.${
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
