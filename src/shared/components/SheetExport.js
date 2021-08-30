import { Button } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import React from "react";
import ReactExport from "react-export-excel";
import { statuses } from "../../utils/constants";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function SheetExport({ institutes, filename, buttonLabel }) {
  return (
    <ExcelFile
      element={
        <Button
          variant="contained"
          startIcon={<GetApp />}
          style={{ marginLeft: 10 }}
        >
          {buttonLabel}
        </Button>
      }
      filename={filename}
    >
      {institutes.map((institute) => {
        var sortedProjects = institute.priority.map((projectId) =>
          institute.projects.find((project) => project.id == projectId)
        );

        var newProjects = sortedProjects.map((project, index) => ({
          priority: index + 1,
          title: project.title,
          goals: project.GSP.map((goal, index) =>
            goal != null ? `${index + 1}, ` : ""
          ).reduce((a, b) => a + b),
          subgoals: project.GSP.map((goal, goalIndex) => {
            if (goal) {
              return goal
                .map((subgoal, subgoalIndex) =>
                  subgoal != null
                    ? `${goalIndex + 1}.${subgoalIndex + 1}, `
                    : ""
                )
                .reduce((a, b) => a + b);
            } else {
              return "";
            }
          }).reduce((a, b) => a + b),
          indicators: project.GSP.map((goal, goalIndex) => {
            if (goal) {
              return goal
                .map((subgoal, subgoalIndex) => {
                  if (subgoal) {
                    return subgoal
                      .map((indicator, indicatorIndex) =>
                        indicator
                          ? `${goalIndex + 1}.${subgoalIndex + 1}.${
                              indicatorIndex + 1
                            }, `
                          : ""
                      )
                      .reduce((a, b) => a + b);
                  } else {
                    return "";
                  }
                })
                .reduce((a, b) => a + b);
            } else {
              return "";
            }
          }).reduce((a, b) => a + b),
          obligationType: project.obligationType,
          proponent: project.proponent,
          totalEstimatedCost: project.investmentReq
            .map((item) => parseFloat(item.value))
            .reduce((a, b) => a + b),
          year1: project.investmentReq[0].value,
          year2: project.investmentReq[1].value,
          year3: project.investmentReq[2].value,
          year4: project.investmentReq[3].value,
          year5: project.investmentReq[4].value,
          implementationPeriod: `${new Date(
            project.implementationPeriod.start
          ).toDateString()} - ${new Date(
            project.implementationPeriod.end
          ).toDateString()}`,
          PAPLevel: project.PAPLevel,
          readiness: project.readiness,
          status: statuses[project.status].label,
        }));

        console.log(newProjects);

        return (
          <ExcelSheet data={newProjects} name={institute.id}>
            <ExcelColumn label="Priority" value="priority" />
            <ExcelColumn label="Title" value="title" />
            <ExcelColumn label="Goals" value="goals" />
            <ExcelColumn label="Subgoals" value="subgoals" />
            <ExcelColumn label="Performance Indicators" value="indicators" />
            <ExcelColumn label="Type of Obligation" value="obligationType" />
            <ExcelColumn label="Proponent" value="proponent" />
            <ExcelColumn
              label="Total Estimated Cost"
              value="totalEstimatedCost"
            />
            <ExcelColumn label="1st Year" value="year1" />
            <ExcelColumn label="2nd Year" value="year2" />
            <ExcelColumn label="3rd Year" value="year3" />
            <ExcelColumn label="4th Year" value="year4" />
            <ExcelColumn label="5th Year" value="year5" />
            <ExcelColumn
              label="Implementation Period"
              value="implementationPeriod"
            />
            <ExcelColumn label="Level of PAP Need" value="PAPLevel" />
            <ExcelColumn label="Level of Readiness" value="readiness" />
            <ExcelColumn label="Status of Implementation" value="status" />
          </ExcelSheet>
        );
      })}
    </ExcelFile>
  );
}

export default SheetExport;
