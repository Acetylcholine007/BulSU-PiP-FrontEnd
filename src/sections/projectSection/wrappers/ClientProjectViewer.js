import React from "react";
import { useParams } from "react-router-dom";
import ProjectViewer from "../pages/ProjectViewer";

function ClientProjectViewer() {
  const { id } = useParams();
  return <ProjectViewer instituteId={""} projectId={id} />;
}

export default ClientProjectViewer;
