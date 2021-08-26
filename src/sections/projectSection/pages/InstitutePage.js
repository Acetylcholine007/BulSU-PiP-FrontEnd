import {
  Container,
  Divider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import InstituteList from "../components/InstituteList";

function InstitutePage() {
  const [filter, setFilter] = useState({ search: "" });

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4">
          {"Institute List"}
        </Typography>
      </Toolbar>
      <Divider />
      <Container>
        <InstituteList filter={filter} setFilter={setFilter} />
      </Container>
    </React.Fragment>
  );
}

export default InstitutePage;
