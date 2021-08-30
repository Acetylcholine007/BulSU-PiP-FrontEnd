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
  Slider,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { statuses } from "../../../utils/constants";

function ProjectFilterDialog({ open, setOpen, filter, setFilter }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Project List Filter</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid item xs={11}>
            <DialogContentText>
              Total Investment Requirement Range (per 100,000)
            </DialogContentText>
          </Grid>
          <Grid item xs={1}>
            <Switch
              checked={filter.investmentReq.enabled}
              onChange={(e) =>
                setFilter(() => {
                  var newFilter = { ...filter };
                  newFilter.investmentReq.enabled = e.target.checked;
                  return newFilter;
                })
              }
            ></Switch>
          </Grid>
          <Grid item xs={12}>
            <Slider
              value={filter.investmentReq.value}
              onChange={(e, val) =>
                setFilter(() => {
                  var newFilter = { ...filter };
                  newFilter.investmentReq.value = val;
                  return newFilter;
                })
              }
              disabled={!filter.investmentReq.enabled}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
          </Grid>
          <Grid item xs={11}>
            <DialogContentText>
              Total Project Cost Range (per 100,000)
            </DialogContentText>
          </Grid>
          <Grid item xs={1}>
            <Switch
              checked={filter.projectCost.enabled}
              onChange={(e) =>
                setFilter(() => {
                  var newFilter = { ...filter };
                  newFilter.projectCost.enabled = e.target.checked;
                  return newFilter;
                })
              }
            ></Switch>
          </Grid>
          <Grid item xs={12}>
            <Slider
              value={filter.projectCost.value}
              onChange={(e, val) =>
                setFilter(() => {
                  var newFilter = { ...filter };
                  newFilter.projectCost.value = val;
                  return newFilter;
                })
              }
              disabled={!filter.projectCost.enabled}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
          </Grid>
          <Grid item xs={11}>
            <DialogContentText>Status</DialogContentText>
          </Grid>
          <Grid item xs={1}>
            <Switch
              checked={filter.status.enabled}
              onChange={(e) =>
                setFilter(() => {
                  var newFilter = { ...filter };
                  newFilter.status.enabled = e.target.checked;
                  return newFilter;
                })
              }
            ></Switch>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              {statuses.map((status, index) => (
                <FormControlLabel
                  key={status.value}
                  control={
                    <Checkbox
                      checked={filter.status.values[index]}
                      onChange={() =>
                        setFilter(() => {
                          var newFilter = { ...filter };
                          newFilter.status.values[index] =
                            !newFilter.status.values[index];
                          return newFilter;
                        })
                      }
                      name={status.label}
                      disabled={!filter.status.enabled}
                    />
                  }
                  label={status.label}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
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

export default ProjectFilterDialog;
