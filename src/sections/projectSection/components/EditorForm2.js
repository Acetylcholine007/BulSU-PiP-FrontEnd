import {
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  GridList,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";

function EditorForm2({ form2Data, setForm2Data }) {
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
    paper: {
      padding: 50,
    },
  }));

  const classes = useStyles();

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, projectLocation: e.target.value })
            }
            className={classes.field}
            label="Project Location"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.projectLocation}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Categorization</FormLabel>
            <GridList cols={2} spacing={0} cellHeight="auto">
              <RadioGroup
                aria-label="new"
                name="cat1"
                value={form2Data.categorization.new ? "new" : "expanded"}
                onChange={(e) =>
                  setForm2Data(() => {
                    if (e.target.value === "new") {
                      form2Data.categorization.new = true;
                      form2Data.categorization.expanded = false;
                    } else {
                      form2Data.categorization.new = false;
                      form2Data.categorization.expanded = true;
                    }
                    return { ...form2Data };
                  })
                }
              >
                <FormControlLabel value="new" control={<Radio />} label="New" />
                <FormControlLabel
                  value="expanded"
                  control={<Radio />}
                  label="Expanded/Revised"
                />
              </RadioGroup>
              <RadioGroup
                aria-label="infrastructure"
                name="cat2"
                value={
                  form2Data.categorization.infrastructure
                    ? "infrastructure"
                    : "nonInfrastructure"
                }
                onChange={(e) =>
                  setForm2Data(() => {
                    if (e.target.value === "infrastructure") {
                      form2Data.categorization.infrastructure = true;
                      form2Data.categorization.nonInfrastructure = false;
                    } else {
                      form2Data.categorization.infrastructure = false;
                      form2Data.categorization.nonInfrastructure = true;
                    }
                    return { ...form2Data };
                  })
                }
              >
                <FormControlLabel
                  value="infrastructure"
                  control={<Radio />}
                  label="Infrastructure"
                />
                <FormControlLabel
                  value="nonInfrastructure"
                  control={<Radio />}
                  label="Non-Infrastructure"
                />
              </RadioGroup>
            </GridList>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, description: e.target.value })
            }
            className={classes.field}
            label="Description"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.description}
            helperText={false ? "Error Password" : null}
            multiline
            minRows={5}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, purpose: e.target.value })
            }
            className={classes.field}
            label="Purpose"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.purpose}
            helperText={false ? "Error Password" : null}
            multiline
            minRows={5}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, beneficiary: e.target.value })
            }
            className={classes.field}
            label="Beneficiary"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.beneficiary}
            helperText={false ? "Error Password" : null}
            multiline
            minRows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" display="inline">
            Proposed Project Cost
          </Typography>
        </Grid>
        {form2Data.proposedProjectCost.map((item, index) => (
          <Grid item xs={4}>
            <Card>
              <DatePicker
                autoOk
                fullWidth
                variant="inline"
                inputVariant="outlined"
                className={classes.field}
                views={["year"]}
                label={`Year ${index + 1}`}
                value={item.year}
                onChange={(e) => {
                  setForm2Data(() => {
                    form2Data.proposedProjectCost[index].year = e
                      .getFullYear()
                      .toString();
                    return {
                      ...form2Data,
                    };
                  });
                }}
              />
              <TextField
                onChange={(e) => {
                  setForm2Data(() => {
                    form2Data.proposedProjectCost[index].cost = e.target.value;
                    return {
                      ...form2Data,
                    };
                  });
                }}
                className={classes.field}
                label="Value"
                variant="outlined"
                color="primary"
                fullWidth
                error={false}
                value={item.cost}
                helperText={false ? "Error Password" : null}
              />
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" display="inline">
            Proponent Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                proponentName: {
                  ...form2Data.proponentName,
                  surname: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Proponent Surname"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.proponentName.surname}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                proponentName: {
                  ...form2Data.proponentName,
                  firstName: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Proponent First Name"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.proponentName.firstName}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                proponentName: {
                  ...form2Data.proponentName,
                  middleInitial: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Proponent Middle Initial"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.proponentName.middleInitial}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, designation: e.target.value })
            }
            className={classes.field}
            label="Designation"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.designation}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {
                  ...form2Data.contactInformation,
                  telNumber: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Telephone Number"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.contactInformation.telNumber}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {
                  ...form2Data.contactInformation,
                  email: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Email Address"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.contactInformation.email}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {
                  ...form2Data.contactInformation,
                  phoneNumber: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Phone Number"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.contactInformation.phoneNumber}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {
                  ...form2Data.contactInformation,
                  others: e.target.value,
                },
              })
            }
            className={classes.field}
            label="Other contacts"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form2Data.contactInformation.others}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={6} align="center">
          <Typography variant="h5" align="left">
            Attatched Files
          </Typography>
          <Paper className={classes.paper}>
            <input
              style={{ display: "none" }}
              id="fileUpload"
              multiple
              type="file"
            />
            <label htmlFor="fileUpload">
              <Button
                variant="contained"
                component="span"
                startIcon={<AddCircleOutline />}
              >
                Upload Files
              </Button>
            </label>
          </Paper>
        </Grid>
        <Grid item xs={6} align="center">
          <Typography variant="h5" align="left">
            Signature
          </Typography>
          <Paper className={classes.paper}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="userSignature"
              multiple
              type="file"
            />
            <label htmlFor="userSignature">
              <Button
                variant="contained"
                component="span"
                startIcon={<AddCircleOutline />}
              >
                Upload Signature
              </Button>
            </label>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export default EditorForm2;
