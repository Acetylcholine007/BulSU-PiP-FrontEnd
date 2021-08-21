import {
  Card,
  Divider,
  Grid,
  GridList,
  makeStyles,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  obligationTypes,
  papLevels,
  proponents,
  readinessLevels,
} from "../../../utils/constants";
import GSPTab from "./GSPTab";

function Form1({ form1Data, setForm1Data }) {
  const useStyles = makeStyles((theme) => ({
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
    investmentCard: {
      justifyContent: "center",
      padding: 10,
    },
    divider: {},
  }));

  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
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
          <Divider className={classes.divider} />
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
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <TextField
            color="primary"
            fullWidth
            select
            value={form1Data.proponent}
            onChange={(e) =>
              setForm1Data({ ...form1Data, proponent: e.target.value })
            }
            variant="outlined"
            label="Proponent"
            error={false}
            className={classes.field}
            helperText={false ? "Error Password" : null}
          >
            {proponents
              .filter((proponent) => proponent.institute === user.institute)[0]
              .proponents.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <KeyboardDatePicker
            fullWidth
            autoOk
            variant="inline"
            inputVariant="outlined"
            className={classes.field}
            label="Implementation Start Year"
            value={form1Data.implementationPeriod.start}
            onChange={(e) =>
              setForm1Data({
                ...form1Data,
                implementationPeriod: {
                  ...form1Data.implementationPeriod,
                  start: e.toISOString(),
                },
              })
            }
            format="MM/dd/yyyy"
          />
        </Grid>
        <Grid item xs={6}>
          <KeyboardDatePicker
            fullWidth
            autoOk
            variant="inline"
            inputVariant="outlined"
            className={classes.field}
            label="Implementation End Year"
            value={form1Data.implementationPeriod.end}
            onChange={(e) =>
              setForm1Data({
                ...form1Data,
                implementationPeriod: {
                  ...form1Data.implementationPeriod,
                  end: e.toISOString(),
                },
              })
            }
            format="MM/dd/yyyy"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" display="inline">
            Investment Requirement
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GridList cols={5} cellHeight="auto" spacing={0}>
            {form1Data.investmentReq.map((investment, index) => (
              <Card className={classes.investmentCard}>
                <DatePicker
                  autoOk
                  fullWidth
                  variant="inline"
                  inputVariant="outlined"
                  className={classes.field}
                  views={["year"]}
                  label={`Year ${index + 1}`}
                  value={investment.year}
                  onChange={(e) => {
                    setForm1Data(() => {
                      form1Data.investmentReq[index].year = e
                        .getFullYear()
                        .toString();
                      return {
                        ...form1Data,
                      };
                    });
                  }}
                />
                <TextField
                  onChange={(e) => {
                    setForm1Data(() => {
                      form1Data.investmentReq[index].value = e.target.value;
                      return {
                        ...form1Data,
                      };
                    });
                  }}
                  className={classes.field}
                  label="Value"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  error={false}
                  value={investment.value}
                  helperText={false ? "Error Password" : null}
                />
              </Card>
            ))}
          </GridList>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="primary"
            fullWidth
            select
            value={form1Data.PAPLevel}
            onChange={(e) =>
              setForm1Data({ ...form1Data, PAPLevel: e.target.value })
            }
            variant="outlined"
            label="PAP Level"
            error={false}
            className={classes.field}
            helperText={false ? "Error Password" : null}
          >
            {papLevels.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="primary"
            fullWidth
            select
            value={form1Data.readiness}
            onChange={(e) =>
              setForm1Data({ ...form1Data, readiness: e.target.value })
            }
            variant="outlined"
            label="Readiness Level"
            error={false}
            className={classes.field}
            helperText={false ? "Error Password" : null}
          >
            {readinessLevels.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form1;
