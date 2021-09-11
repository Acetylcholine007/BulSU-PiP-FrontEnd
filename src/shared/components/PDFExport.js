import React from "react";
import { Button } from "@material-ui/core";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { months } from "../../utils/constants";
import { GetApp } from "@material-ui/icons";

function PDFExport({ projects, filename, institute }) {
  const exportPDF = () => {
    const unit = "in";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 0.5;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(10);
    doc.deletePage(1);

    projects.forEach((project, index) => {
      if (project !== undefined) {
        let startDate = new Date(project.implementationPeriod.start);
        let endDate = new Date(project.implementationPeriod.end);
        let total = project.proposedProjectCost
          .map((item) => parseFloat(item.cost))
          .reduce((a, b) => a + b);

        doc.addPage("a4", "p");
        doc.text(
          "PRIORITY PROJECTS, ACTIVITIES AND PROGRAMS (PAPs) FOR FY___",
          marginLeft,
          1
        );
        doc.text("Table 1 - TO BE ACCOMPLISHED BY PROPONENT", marginLeft, 1.5);
        doc.autoTable({
          headStyles: { fontSize: 10 },
          bodyStyles: { fontSize: 8, fontStyle: "normal" },

          head: [["No.", "Item", { content: "Particulars", colSpan: 4 }]],
          body: [
            [
              "1",
              "Name of SUC",
              { content: "Bulacan State University", colSpan: 4 },
            ],
            ["2", "College/Campus/Office", { content: institute, colSpan: 4 }],
            ["3", "Address", { content: project.address, colSpan: 4 }],
            ["4", "Project Title", { content: project.title, colSpan: 4 }],
            [
              "5",
              "Location of Project",
              { content: project.projectLocation, colSpan: 4 },
            ],
            ["6", "Priority Ranking", { content: index + 1, colSpan: 4 }],
            [
              { content: "7", rowSpan: 2 },
              { content: "Categorization", rowSpan: 2 },
              "New",
              project.categorization.new,
              "Infrastructure",
              project.categorization.infrastructure,
            ],
            [
              "Expanded/Revised",
              project.categorization.expanded,
              "Non-infrastructure",
              project.categorization.nonInfrastructure,
            ],
            ["8", "Description", { content: project.description, colSpan: 4 }],
            ["9", "Purpose", { content: project.purpose, colSpan: 4 }],
            [
              "10",
              "Beneficiaries",
              { content: project.beneficiaries, colSpan: 4 },
            ],
            [
              { content: "11", rowSpan: 2 },
              { content: "Implementation Period", rowSpan: 2 },
              "Start Date",
              months[startDate.getMonth()],
              startDate.getDate(),
              startDate.getFullYear(),
            ],
            [
              "Finished Date",
              months[endDate.getMonth()],
              endDate.getDate(),
              endDate.getFullYear(),
            ],
            [
              { content: "12", rowSpan: 2 },
              { content: "Proposed Project Cost", rowSpan: 2 },
              `FY ${project.proposedProjectCost[0].year}`,
              `FY ${project.proposedProjectCost[1].year}`,
              `FY ${project.proposedProjectCost[2].year}`,
              "TOTAL",
            ],
            [
              `${project.proposedProjectCost[0].cost}`,
              `${project.proposedProjectCost[1].cost}`,
              `${project.proposedProjectCost[2].cost}`,
              `${total}`,
            ],
          ],
          startY: 1.6,
        });
        doc.text(
          "Table 2 - TO BE ACCOMPLISHED BY PROPONENT",
          marginLeft,
          doc.lastAutoTable.finalY + 0.5
        );
        doc.autoTable({
          headStyles: { fontSize: 10 },
          bodyStyles: { fontSize: 8 },

          body: [
            [
              "Name of Proponent",
              project.proponentName.surname,
              project.proponentName.firstName,
              project.proponentName.middleInitial,
            ],
            ["Designation", { content: project.designation, colSpan: 3 }],
            [
              { content: "Contact Information", rowSpan: 2 },
              project.contactInformation.telNumber,
              project.contactInformation.email,
            ],
            [
              project.contactInformation.phoneNumber,
              project.contactInformation.others,
            ],
            [
              "Date Accomplished",
              new Date(project.dateAccomplished).toDateString(),
              { content: "Signature", colSpan: 2 },
            ],
          ],
          startY: doc.lastAutoTable.finalY + 0.6,
        });
        doc.addPage("a4", "p");
        doc.text(
          "Table 3 - TO BE ACCOMPLISHED BY PDO PERSONNEL",
          marginLeft,
          1
        );
        doc.autoTable({
          headStyles: { fontSize: 10 },
          bodyStyles: { fontSize: 8 },

          body: [
            ["Recieved by", project.recievedBy],
            ["Designation", project.recieverDesignation],
            [
              "Date Recieved",
              new Date(project.dateRecieved).toDateString(),
              "Signature",
            ],
          ],
          startY: 1.1,
        });
        doc.text(
          "GENERAL INSTRUCTIONS ON ACCOMPLISHING PAP FORM",
          marginLeft,
          doc.lastAutoTable.finalY + 0.5
        );
        doc.autoTable({
          headStyles: { fontSize: 10 },
          bodyStyles: { fontSize: 8 },

          head: [["Item No.", "INSTRUCTIONS"]],
          body: [
            ["1", "This is already provided."],
            ["2", "Complete name of the requesting office/college/campus."],
            ["3", "Complete address of the requested PAP."],
            [
              "4",
              "Program/Activity/Project name as identified by the requesting office/college/campus.",
            ],
            [
              "5",
              "The location can also be the same address as written in Item No. 3 but this still has to be filled in. " +
                "If the PAP is in the main campus, indicate which one – Campus 1 or Campus 2.",
            ],
            [
              "6",
              "Please provide the numerical value of requested PAP based on priority ranking, 1 being the highest.",
            ],
            [
              "7",
              "Check the box of the category appropriate for your request. " +
                "The proposed PAP can be New or Expansion or Revision of an existing or on-going project. " +
                "The proposed project can be an infrastructure or non-infrastructure project.",
            ],
            [
              "8",
              "The description of the project includes details such as what the PAP is all about, " +
                "what are the undertakings or activities to be done, why it has to be implemented, " +
                "how the project will be implemented and the estimated time of implementation. " +
                "Other highlights or important details can also be included.",
            ],
            [
              "9",
              "Give specific objectives/purposes/goals of the requested PAP.",
            ],
            [
              "10",
              "Identify the direct beneficiaries of the requested PAP. Indirect beneficiaries can also be stated.",
            ],
            [
              "11",
              "Provide the implementation period within the project must be completed, " +
                "specifying the day, month and year of the start and completion of the project. " +
                "(Infrastructure projects that cannot be completed within FY 2022 shall be enrolled " +
                "in the Three-year Rolling Infrastructure Program (TRIP).",
            ],
            [
              "12",
              "Provide the cost needed to complete your project in FY 202_. " +
                "For TRIP, kindly provide the cost of the project for FYs __________. " +
                "(Please note that for the initial evaluation, the project cost does not need " +
                "to contain the detailed estimate, but this amount will be the basis for funding. " +
                "In addition, include costs considered as Capital Outlay only on your proposal, " +
                "PS and MOOE are not included here).",
            ],
          ],
          startY: doc.lastAutoTable.finalY + 0.6,
        });
      }
    });

    doc.save(`${filename} - PAPs Form.pdf`);
  };

  return (
    <Button
      variant="contained"
      onClick={exportPDF}
      style={{ marginLeft: 10 }}
      startIcon={<GetApp />}
    >
      Download Prep Form
    </Button>
  );
}

export default PDFExport;
