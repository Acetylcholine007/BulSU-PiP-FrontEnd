import React, { useEffect, useState } from "react";
import ErrorComponent from "../../../shared/components/ErrorComponent";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account, Admin } from "../../../utils/bulsupis_mw";
import { institutes } from "../../../utils/constants";
import AdminDashboardPage from "../pages/AdminDashboardPage";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    Admin.Institutes.getAll()
      .then(({ simple, full }) => {
        if (simple) {
          let projects = [];
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

          simple.data.slice(0, simple.data.length - 3).forEach((institute) => {
            let instituteTally = {
              institute: institutes.find(
                (item) => item.institute === institute.institute
              ).abbv,
              tally: [0, 0, 0, 0, 0, 0],
            };

            institute.project_list.forEach((project) => {
              switch (project.status) {
                case 0:
                  instituteTally.tally[0] += 1;
                  costs[0].value[0] += project.investment_req
                    .map((item) => parseFloat(item.value))
                    .reduce((a, b) => a + b);
                  break;
                case 1:
                  instituteTally.tally[1] += 1;
                  costs[1].value[0] += project.investment_req
                    .map((item) => parseFloat(item.value))
                    .reduce((a, b) => a + b);
                  break;
                case 2:
                  instituteTally.tally[2] += 1;
                  costs[2].value[0] += project.investment_req
                    .map((item) => parseFloat(item.value))
                    .reduce((a, b) => a + b);
                  break;
                case 3:
                  instituteTally.tally[3] += 1;
                  costs[3].value[0] += project.investment_req
                    .map((item) => parseFloat(item.value))
                    .reduce((a, b) => a + b);
                  break;
                case 4:
                  instituteTally.tally[4] += 1;
                  costs[4].value[0] += project.investment_req
                    .map((item) => parseFloat(item.value))
                    .reduce((a, b) => a + b);
                  break;
                  case 5:
                  instituteTally.tally[5] += 1;
                  costs[5].value[0] += project.investment_req
                    .map((item) => parseFloat(item.value))
                    .reduce((a, b) => a + b);
                  break;
              }
            });
            projects.push(instituteTally);
          });
          setData({
            projects: projects,
            costs: costs,
          });
        } else {
          setData(simple);
          setDataError(full);
        }
      })
      .then(() => {
        Account.getInfo()
          .then(({simple, full}) => {
            if(simple) {
              setUser(simple.data);
            } else {
              setUser(simple);
              setUserError(full);
            }
          })
          .catch((err) => {
            setUserError(err.message);
          });
      })
      .catch((err) => {
        setDataError(err.message);
      });
  }, []);

  return (
    <React.Fragment>
      {(data == null || user == null) && <LoadingComponent />}
      {(dataError || userError) && <ErrorComponent message={`${dataError}\n${userError}`} />}
      {data && user && !(dataError || userError) && <AdminDashboardPage data={data} user={user} />}
    </React.Fragment>
  );
}

export default AdminDashboard;
