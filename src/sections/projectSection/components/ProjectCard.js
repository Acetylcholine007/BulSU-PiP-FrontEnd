import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

function ProjectCard({ project, instituteId }) {
  const { user } = useContext(AuthContext);
  const getRoute = () => {
    switch (user.type) {
      case 0:
        return `/projects/${project.id}`;
      case 1:
        return `/institutes/${instituteId}/${project.id}`;
      default:
        return '*'
    }
  };
  
  return (
    <Link underline="none" component={RouterLink} to={getRoute()}>
      <Card style={{ margin: 10 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">{project.title}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}

export default ProjectCard;
