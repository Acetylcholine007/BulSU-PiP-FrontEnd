import React, { useEffect, useState } from "react";
import ErrorComponent from "../../../shared/components/ErrorComponent";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account } from "../../../utils/bulsupis_mw";
import ClientDashboardPage from "../pages/ClientDashboardPage";

function ClientDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    Account.getInfo()
      .then(({ simple, full }) => {
        if (simple) {
          let projects = {
            institute: simple.data.institute.abbv,
            tally: [0, 0, 0, 0, 0, 0],
          };
          let costs = [
            {
              label: "Dropped",
              value: [0],
            },
            {
              label: "Proposed",
              value: [0],
            },
            {
              label: "Revision",
              value: [0],
            },
            {
              label: "Approved",
              value: [0],
            },
            {
              label: "On-going",
              value: [0],
            },
            {
              label: "Completed",
              value: [0],
            },
          ];

          simple.data.projectList.forEach((project, index) => {
            switch (project.status) {
              case 0:
                projects.tally[0] += 1;
                costs[0].value[0] += project.investmentReq
                  .map((item) => parseFloat(item.value))
                  .reduce((a, b) => a + b);
                break;
              case 1:
                projects.tally[1] += 1;
                costs[1].value[0] += project.investmentReq
                  .map((item) => parseFloat(item.value))
                  .reduce((a, b) => a + b);
                break;
              case 2:
                projects.tally[2] += 1;
                costs[2].value[0] += project.investmentReq
                  .map((item) => parseFloat(item.value))
                  .reduce((a, b) => a + b);
                break;
              case 3:
                projects.tally[3] += 1;
                costs[3].value[0] += project.investmentReq
                  .map((item) => parseFloat(item.value))
                  .reduce((a, b) => a + b);
                break;
              case 4:
                projects.tally[4] += 1;
                costs[4].value[0] += project.investmentReq
                  .map((item) => parseFloat(item.value))
                  .reduce((a, b) => a + b);
                break;
              case 5:
                projects.tally[5] += 1;
                costs[5].value[0] += project.investmentReq
                  .map((item) => parseFloat(item.value))
                  .reduce((a, b) => a + b);
                break;
            }
          });
          setData({
            projects: projects,
            costs: costs,
          });
          setUser(simple.data);
        } else {
          setData(simple);
          setUser(simple);
          setDataError(full);
          setUserError(full);
        }
      })
      .catch((err) => {
        console.log(err)
        setDataError(err.message);
        setUserError(err.message);
      });
  }, []);

  return (
    <React.Fragment>
      {(data == null || user == null) && <LoadingComponent />}
      {(dataError || userError) && (
        <ErrorComponent message={`${dataError}\n${userError}`} />
      )}
      {data && user && !(dataError || userError) && (
        <ClientDashboardPage data={data} user={user} />
      )}
    </React.Fragment>
  );
}

export default ClientDashboard;
