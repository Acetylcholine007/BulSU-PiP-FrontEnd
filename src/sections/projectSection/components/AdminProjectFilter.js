import { Divider, Grid, makeStyles, TextField } from "@material-ui/core";
import React from "react";

function AdminProjectFilter({ filter, setFilter }) {
  const useStyles = makeStyles(() => ({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    }
  }));
  
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          onChange={(e) => setFilter({...filter, search: e.target.value})}
          className={classes.field}
          label="Search"
          variant="outlined"
          color="primary"
          fullWidth
          value={filter.search}
        />
      </Grid>
      <Divider />
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default AdminProjectFilter;
