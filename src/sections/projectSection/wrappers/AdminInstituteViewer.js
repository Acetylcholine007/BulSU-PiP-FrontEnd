import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import InstituteViewer from "../pages/InstituteViewer";

function AdminInstituteViewer() {
  const { instituteId } = useParams();
  const { user } = useContext(AuthContext);

  return <InstituteViewer type={user.type} instituteId={instituteId} />;
}

export default AdminInstituteViewer;
