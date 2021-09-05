import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import AccountFilterDialog from "../components/AccountFilterDialog";
import AccountList from "../components/AccountList";

function AccountPage({ serverUsers, setDataChanged }) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(serverUsers);
  const [filter, setFilter] = useState({
    search: "",
    verified: { enabled: false, value: 1 },
  });

  const useStyles = makeStyles({
    pageTitle: {
      flexGrow: 11,
    },
    divider: {
      marginBottom: 15,
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          User Account List
        </Typography>
      </Toolbar>
      <Divider classes={{ root: classes.divider }} />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <AccountList
              users={users}
              setUsers={setUsers}
              filter={filter}
              setFilter={setFilter}
              setOpen={setOpen}
              setDataChanged={setDataChanged}
            />
          </Grid>
        </Grid>
        <AccountFilterDialog
          open={open}
          setOpen={setOpen}
          filter={filter}
          setFilter={setFilter}
        />
      </Container>
    </React.Fragment>
  );
}

export default AccountPage;
