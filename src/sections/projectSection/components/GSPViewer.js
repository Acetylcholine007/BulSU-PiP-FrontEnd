import { Container, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { GSPs } from "../../../utils/constants";

function GSPViewer({ GSP }) {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <React.Fragment>
      <Tabs
        value={tabIndex}
        onChange={(event, index) => setTabIndex(index)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="1st" />
        <Tab label="2nd" />
        <Tab label="3rd" />
        <Tab label="4th" />
        <Tab label="5th" />
      </Tabs>
      <Container>
        {GSP[tabIndex] &&
          GSP[tabIndex].map((subgoal, subgoalIndex) => {
            return subgoal ? (
              <React.Fragment>
                <Typography variant="h6">
                  {GSPs[tabIndex].contents[subgoalIndex].value}
                </Typography>
                {subgoal &&
                  subgoal.map((indicator, indicatorIndex) => {
                    return indicator ? (
                      <Typography variant="body2">
                        {
                          GSPs[tabIndex].contents[subgoalIndex].contents[
                            indicatorIndex
                          ]
                        }
                      </Typography>
                    ) : null;
                  })}
              </React.Fragment>
            ) : null;
          })}
      </Container>
    </React.Fragment>
  );
}

export default GSPViewer;
