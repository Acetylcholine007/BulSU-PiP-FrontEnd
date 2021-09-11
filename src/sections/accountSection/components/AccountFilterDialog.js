import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Divider,
  Grid,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
  Container,
} from "@material-ui/core";
import React from "react";

function AccountFilterDialog({ open, setOpen, filter, setFilter }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">User List Filter</DialogTitle>
      <Divider />
      <DialogContent>
        <Container>
          <Grid container>
            <Grid item xs={11}>
              <DialogContentText>Account Status</DialogContentText>
            </Grid>
            <Grid item xs={1}>
              <Switch
                checked={filter.verified.enabled}
                onChange={(e) =>
                  setFilter(() => {
                    var newFilter = { ...filter };
                    newFilter.verified.enabled = e.target.checked;
                    return newFilter;
                  })
                }
              ></Switch>
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                name="status"
                value={filter.verified.value}
                onChange={(e) => {
                  setFilter(() => {
                    var newFilter = { ...filter };
                    newFilter.verified.value = e.target.value;
                    return newFilter;
                  });
                }}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Verified"
                  disabled = {!filter.verified.enabled}
                />
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Suspended"
                  disabled = {!filter.verified.enabled}
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountFilterDialog;
