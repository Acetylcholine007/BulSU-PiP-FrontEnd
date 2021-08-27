import {
  Container,
  Divider,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";
import React, { useState } from "react";

import InstituteList from "../components/InstituteList";

function InstitutePage() {
  const [filter, setFilter] = useState({ search: "" });

  const useStyles = makeStyles({
    divider: {
      marginBottom: 15
    }
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4">
          {"Institute List"}
        </Typography>
      </Toolbar>
      <Divider classes={{root: classes.divider}}/>
      <Container>
        <InstituteList filter={filter} setFilter={setFilter} />
      </Container>
    </React.Fragment>
  );
}

export default InstitutePage;
