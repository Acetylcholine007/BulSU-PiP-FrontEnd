import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import InstituteViewer from "../pages/InstituteViewer";

function ClientInstituteViewer() {
  const { user } = useContext(AuthContext);
  return <InstituteViewer type={user.type} instituteId={user.institute.abbv} />;
}

export default ClientInstituteViewer;
