import React, { useEffect, useState } from "react";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account } from "../../../utils/bulsupis_mw";
import DashboardPage from "../pages/DashboardPage";

function ClientDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Account.getInfo()
      .then((res) => {
        let projects = {
          institute: res.data.institute.abbv,
          tally: [0, 0, 0, 0, 0],
        };
        let costs = [
          {
            label: "Dropped",
            value: [0, 0],
          },
          {
            label: "Proposed",
            value: [0, 0],
          },
          {
            label: "Revision",
            value: [0, 0],
          },
          {
            label: "On-going",
            value: [0, 0],
          },
          {
            label: "Completed",
            value: [0, 0],
          },
        ];

        res.data.projectList.forEach((project, index) => {
          switch (project.status) {
            case 0:
              projects.tally[0] += 1;
              costs[0].value[0] += project.investmentReq
                .map((item) => parseFloat(item.value))
                .reduce((a, b) => a + b);
              costs[0].value[1] += project.proposedProjectCost
                .map((item) => parseFloat(item.cost))
                .reduce((a, b) => a + b);
              break;
            case 1:
              projects.tally[1] += 1;
              costs[1].value[0] += project.investmentReq
                .map((item) => parseFloat(item.value))
                .reduce((a, b) => a + b);
              costs[1].value[1] += project.proposedProjectCost
                .map((item) => parseFloat(item.cost))
                .reduce((a, b) => a + b);
              break;
            case 2:
              projects.tally[2] += 1;
              costs[2].value[0] += project.investmentReq
                .map((item) => parseFloat(item.value))
                .reduce((a, b) => a + b);
              costs[2].value[1] += project.proposedProjectCost
                .map((item) => parseFloat(item.cost))
                .reduce((a, b) => a + b);
              break;
            case 3:
              projects.tally[3] += 1;
              costs[3].value[0] += project.investmentReq
                .map((item) => parseFloat(item.value))
                .reduce((a, b) => a + b);
              costs[3].value[1] += project.proposedProjectCost
                .map((item) => parseFloat(item.cost))
                .reduce((a, b) => a + b);
              break;
            case 4:
              projects.tally[4] += 1;
              costs[4].value[0] += project.investmentReq
                .map((item) => parseFloat(item.value))
                .reduce((a, b) => a + b);
              costs[4].value[1] += project.proposedProjectCost
                .map((item) => parseFloat(item.cost))
                .reduce((a, b) => a + b);
              break;
          }
        });
        setData({
          projects: projects,
          costs: costs,
        });
      })
      .then(() => {
        Account.getInfo()
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <React.Fragment>
      {(!data || !user) && <LoadingComponent />}
      {data && user && <DashboardPage data={data} user={user}/>}
    </React.Fragment>
  );
}

export default ClientDashboard;
