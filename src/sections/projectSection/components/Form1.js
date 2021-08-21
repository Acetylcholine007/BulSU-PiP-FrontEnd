import {
  Card,
  FormLabel,
  Grid,
  makeStyles,
  MenuItem,
  Slider,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

import { useState } from "react";
import { obligationTypes, papLevels, readinessLevels } from "../../../utils/constants";
import GSPTab from "./GSPTab";

function Form1({ form1Data, setForm1Data }) {
  const useStyles = makeStyles(() => ({
    field: {
      marginTop: 10,
      marginBottom: 10,
      display: "block",
    },
    button: {
      marginTop: 20,
      marginBottom: 20,
      display: "block",
    },
    card: {
      padding: 20,
      margin: 20,
    },
  }));

  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) =>
                setForm1Data({ ...form1Data, title: e.target.value })
              }
              className={classes.field}
              label="Title"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form1Data.title}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <Tabs
              value={tabIndex}
              onChange={(event, index) => setTabIndex(index)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="1st" />
              <Tab label="2nd" />
              <Tab label="3rd" />
              <Tab label="4th" />
              <Tab label="5th" />
            </Tabs>
            <GSPTab index={tabIndex} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="primary"
              fullWidth
              select
              value={form1Data.obligationType}
              onChange={(e) =>
                setForm1Data({ ...form1Data, obligationType: e.target.value })
              }
              variant="outlined"
              label="Obligation Type"
              error={false}
              className={classes.field}
              helperText={false ? "Error Password" : null}
            >
              {obligationTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) =>
                setForm1Data({ ...form1Data, investmentReq: e.target.value })
              }
              className={classes.field}
              label="Investment Requirement"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form1Data.investmentReq}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              fullWidth
              variant="inline"
              inputVariant="outlined"
              className={classes.field}
              views={["year"]}
              label="Implementation Start Year"
              value={form1Data.implementationPeriod.start}
              onChange={(e, value) =>
                setForm1Data({
                  ...form1Data,
                  implementationPeriod: {...form1Data.implementationPeriod, start: value},
                })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              fullWidth
              variant="inline"
              inputVariant="outlined"
              className={classes.field}
              views={["year"]}
              label="Implementation End Year"
              value={form1Data.implementationPeriod.end}
              onChange={(e, value) =>
                setForm1Data({
                  ...form1Data,
                  implementationPeriod: {...form1Data.implementationPeriod, end: value},
                })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel component="legend">Readiness Level</FormLabel>
            <Slider
              value = {form1Data.readiness}
              onChange={(e, value) =>
                setForm1Data({ ...form1Data, readiness: value })
              }
              getAriaValueText={(value) => `Level ${value}`}
              aria-labelledby="discrete-slider-custom"
              valueLabelDisplay="auto"
              marks={readinessLevels}
              min={1}
              step={1}
              max={readinessLevels.length}
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel component="legend">PAP Level</FormLabel>
            <Slider
              value = {form1Data.PAPLevel}
              onChange={(e, value) =>
                setForm1Data({ ...form1Data, PAPLevel: value })
              }
              getAriaValueText={(value) => `Level ${value}`}
              aria-labelledby="discrete-slider-custom"
              valueLabelDisplay="auto"
              marks={papLevels}
              min={1}
              step={1}
              max={papLevels.length}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) =>
                setForm1Data({ ...form1Data, remarks: e.target.value })
              }
              className={classes.field}
              label="Remarks"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              multiline
              minRows={5}
              value={form1Data.remarks}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default Form1;
