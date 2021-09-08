import {
  Container,
  Divider,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";

import SheetExport from "../../../shared/components/SheetExport";
import InstituteList from "../components/InstituteList";
import { institutesTranslator } from "../../../utils/translators";

function InstitutePage({institutes}) {
  const [filter, setFilter] = useState({ search: "" });

  const useStyles = makeStyles({
    divider: {
      marginBottom: 15,
    },
    pageTitle: {
      flexGrow: 11,
    },
    button: {
      marginLeft: 10,
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          {"Institute List"}
        </Typography>
        <SheetExport
          institutes={institutesTranslator(institutes)}
          filename={"BulSU"}
          buttonLabel="Download Investment Sheet"
        />
      </Toolbar>
      <Divider classes={{ root: classes.divider }} />
      <Container>
        <InstituteList filter={filter} setFilter={setFilter} institutes={institutes}/>
      </Container>
    </React.Fragment>
  );
}

export default InstitutePage;
