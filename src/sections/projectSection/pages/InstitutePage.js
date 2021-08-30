import {
  Container,
  Divider,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";

import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import SheetExport from "../../../shared/components/SheetExport";
import { serverUrl } from "../../../utils/serverUrl";
import InstituteList from "../components/InstituteList";

function InstitutePage() {
  const [filter, setFilter] = useState({ search: "" });

  const {
    error,
    isPending,
    data: institutes,
  } = useFetch(`${serverUrl}institutes`);

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
      {error && <ErrorComponent message="Failed to fetch institutes" />}
      {isPending && <LoadingComponent />}
      {institutes && (
        <React.Fragment>
          <Toolbar>
            <Typography variant="h4" className={classes.pageTitle}>
              {"Institute List"}
            </Typography>
            <SheetExport
              institutes={institutes}
              filename={"BulSU"}
              buttonLabel="Export Investment Sheet"
            />
          </Toolbar>
          <Divider classes={{ root: classes.divider }} />
          <Container>
            <InstituteList filter={filter} setFilter={setFilter} dabaseInstitutes={institutes}/>
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default InstitutePage;
