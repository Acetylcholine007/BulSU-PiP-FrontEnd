import {
  Card,
  Chip,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  MenuItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { FunctionsRounded } from "@material-ui/icons";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import {
  obligationTypes,
  papLevels,
  institutes,
  readinessLevels,
} from "../../../utils/constants";
import GSPPicker from "./GSPPicker";

function EditorForm1({ form1Data, setForm1Data, checkerForm1 }) {
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
    investmentBox: {
      justifyContent: "center",
      padding: 10,
      margin: "5px 0px 5px 0px",
    },
  }));

  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const getSum = () => {
    var sum = 0;
    form1Data.investmentReq.forEach(
      (item) => (sum += parseFloat(item.value === "" ? "0" : item.value))
    );
    return `Php ${sum.toFixed(2)}`;
  };

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
            error={checkerForm1.title.error}
            value={form1Data.title}
            helperText={
              checkerForm1.title.error ? checkerForm1.title.messages[0] : null
            }
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
          <GSPPicker
            index={tabIndex}
            form1Data={form1Data}
            setForm1Data={setForm1Data}
          />
        </Grid>
        <Grid item xs ={12} md={6}>
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
            error={checkerForm1.obligationType.error}
            className={classes.field}
            helperText={
              checkerForm1.obligationType.error
                ? checkerForm1.obligationType.messages[0]
                : null
            }
          >
            {obligationTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs ={12} md={6}>
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
            error={checkerForm1.proponent.error}
            className={classes.field}
            helperText={
              checkerForm1.proponent.error
                ? checkerForm1.proponent.messages[0]
                : null
            }
          >
            {institutes
              .find((institute) => institute.abbv === user.institute.abbv)
              .proponents.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs ={12} md={6}>
          <KeyboardDatePicker
            fullWidth
            autoOk
            variant="inline"
            inputVariant="outlined"
            className={classes.field}
            label="Implementation Start Year"
            error={checkerForm1.startYear.error}
            helperText={
              checkerForm1.startYear.error
                ? checkerForm1.startYear.messages[0]
                : null
            }
            value={form1Data.implementationPeriod.start}
            onChange={(e) =>
              setForm1Data({
                ...form1Data,
                implementationPeriod: {
                  ...form1Data.implementationPeriod,
                  start: e,
                },
              })
            }
            format="MM/dd/yyyy"
          />
        </Grid>
        <Grid item xs ={12} md={6}>
          <KeyboardDatePicker
            fullWidth
            autoOk
            variant="inline"
            inputVariant="outlined"
            className={classes.field}
            label="Implementation End Year"
            error={checkerForm1.endYear.error}
            helperText={
              checkerForm1.endYear.error
                ? checkerForm1.endYear.messages[0]
                : null
            }
            value={form1Data.implementationPeriod.end}
            onChange={(e) =>
              setForm1Data({
                ...form1Data,
                implementationPeriod: {
                  ...form1Data.implementationPeriod,
                  end: e,
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
          <Toolbar style={{padding: 0}}>
            <Typography variant="h5">Investment Requirement</Typography>
            <Chip
              label={<Typography variant="h6">{`${getSum()}`}</Typography>}
              color="primary"
              icon={<FunctionsRounded />}
              style={{ marginLeft: "1em" }}
            />
          </Toolbar>
        </Grid>
        <Hidden mdUp>
          <Grid item xs={12}>
            <Grid container>
              {form1Data.investmentReq.map((investment, index) => (
                <Grid
                  item
                  xs={12}
                  className={classes.investmentBox}
                  component={Card}
                >
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
                    error={checkerForm1.investmentReq[index].error}
                    value={investment.value}
                    helperText={
                      checkerForm1.investmentReq[index].error
                        ? checkerForm1.investmentReq[index].messages[0]
                        : null
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid item xs={12}>
            <Table>
              <TableBody>
                <TableRow>
                  {form1Data.investmentReq.map((investment, index) => (
                    <TableCell style={{ borderBottom: "none", padding: 10 }}>
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
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {form1Data.investmentReq.map((investment, index) => (
                    <TableCell style={{ borderBottom: "none", padding: 10 }}>
                      <TextField
                        onChange={(e) => {
                          setForm1Data(() => {
                            form1Data.investmentReq[index].value =
                              e.target.value;
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
                        error={checkerForm1.investmentReq[index].error}
                        value={investment.value}
                        helperText={
                          checkerForm1.investmentReq[index].error
                            ? checkerForm1.investmentReq[index].messages[0]
                            : null
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Hidden>
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

export default EditorForm1;
