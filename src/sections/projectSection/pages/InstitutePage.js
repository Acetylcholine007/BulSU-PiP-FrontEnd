import {
  Container,
  Divider,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import SheetExport from "../../../shared/components/SheetExport";
import InstituteList from "../components/InstituteList";
import { Admin } from "../../../utils/bulsupis_mw";

function InstitutePage() {
  const [filter, setFilter] = useState({ search: "" });
  const [institutes, setInstitutes] = useState(null);

  useEffect(() => {
    Admin.Institutes.getAll()
    .then((res) => {
      setInstitutes(res.data.slice(0, res.data.length - 1));
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])

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
      {!institutes && <LoadingComponent />}
      {institutes && (
        <React.Fragment>
          <Toolbar>
            <Typography variant="h4" className={classes.pageTitle}>
              {"Institute List"}
            </Typography>
            {/* <SheetExport
              institutes={institutes}
              filename={"BulSU"}
              buttonLabel="Export Investment Sheet"
            /> */}
          </Toolbar>
          <Divider classes={{ root: classes.divider }} />
          <Container>
            <InstituteList filter={filter} setFilter={setFilter} institutes={institutes}/>
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default InstitutePage;
