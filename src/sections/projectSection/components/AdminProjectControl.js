import { Button, Card, Divider, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

function AdminProjectControl() {
  const useStyles = makeStyles(() => ({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    },
    button: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    },
    card: {
        padding: 10
    },
    divider: {
        margin: '20px 0px 20px 0px'
    }
  }));
  const [comment, setComment] = useState('');
  const classes = useStyles();

  return (
    <Card className = {classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Actions</Typography>
          <Button variant="contained">Approve</Button>
          <Button variant="contained">Reject</Button>
          <Divider className = {classes.divider}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Fund Allotment</Typography>
          <Divider className = {classes.divider}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Comment</Typography>
          <TextField
            onChange={(e) => setComment(e.target.value)}
            className={classes.field}
            label="Comment"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={comment}
            helperText={false ? "Too Long" : null}
            minRows={3}
            multiline={true}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default AdminProjectControl;
