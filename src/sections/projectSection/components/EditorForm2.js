import {
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
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

function EditorForm2({ form2Data, setForm2Data, checkerForm2, index }) {
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
            error={checkerForm2.projectLocation[index].error}
            value={form2Data.projectLocation}
            helperText={checkerForm2.projectLocation[index].error ? checkerForm2.projectProposalCost[index].messages[0] : null}
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
                onChange={(e) => setForm2Data(() => {
                  if(e.target.value === "new") {
                    form2Data.categorization.new = true;
                    form2Data.categorization.expanded = false
                  } else {
                    form2Data.categorization.new = false;
                    form2Data.categorization.expanded = true
                  }
                  return {...form2Data}
                })}
              >
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="New"
                />
                <FormControlLabel
                  value="expanded"
                  control={<Radio />}
                  label="Expanded/Revised"
                />
              </RadioGroup>
              <RadioGroup
                aria-label="infrastructure"
                name="cat2"
                value={form2Data.categorization.infrastructure ? "infrastructure" : "nonInfrastructure"}
                onChange={(e) => setForm2Data(() => {
                  if(e.target.value === "infrastructure") {
                    form2Data.categorization.infrastructure = true;
                    form2Data.categorization.nonInfrastructure = false
                  } else {
                    form2Data.categorization.infrastructure = false;
                    form2Data.categorization.nonInfrastructure = true
                  }
                  return {...form2Data}
                })}
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
            error={checkerForm2.description[index].error}
            value={form2Data.description}
            helperText={checkerForm2.description[index].error ? checkerForm2.description[index].messages[0] : null}
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
            error={checkerForm2.purpose[index].error}
            value={form2Data.purpose}
            helperText={checkerForm2.purpose[index].error ? checkerForm2.purpose[index].messages[0] : null}
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
            error={checkerForm2.beneficiary[index].error}
            value={form2Data.beneficiary}
            helperText={checkerForm2.beneficiary[index].error ? checkerForm2.beneficiary[index].messages[0] : null}
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
                error={checkerForm2.proposedProjectCost[index].error}
                value={item.cost}
                helperText={checkerForm2.proposedProjectCost[index].error ? checkerForm2.proposedProjectCost[index].messages[0] : null}
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
              setForm2Data({ ...form2Data, proponentName: {...form2Data.proponentName, surname: e.target.value}})
            }
            className={classes.field}
            label="Proponent Surname"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.proponentName.surname[index].error}
            value={form2Data.proponentName.surname}
            helperText={checkerForm2.proponentName.surname[index].error ? checkerForm2.proponentName.surname[index].messages[0] : null}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, proponentName: {...form2Data.proponentName, firstName: e.target.value}})
            }
            className={classes.field}
            label="Proponent First Name"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.proponentName.firstName[index].error}
            value={form2Data.proponentName.firstName}
            helperText={checkerForm2.proponentName.firstName[index].error ? checkerForm2.proponentName.firstName[index].messages[0] : null}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            onChange={(e) =>
              setForm2Data({ ...form2Data, proponentName: {...form2Data.proponentName, middleInitial: e.target.value}})
            }
            className={classes.field}
            label="Proponent Middle Initial"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.proponentName.middleInitial[index].error}
            value={form2Data.proponentName.middleInitial}
            helperText={checkerForm2.proponentName.middleInitial[index].error ? checkerForm2.proponentName.middleInitial[index].messages[0] : null}
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
            error={checkerForm2.designation[index].error}
            value={form2Data.designation}
            helperText={checkerForm2.designation[index].error ? checkerForm2.designation[index].messages[0] : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {...form2Data.contactInformation, telNumber: e.target.value},
              })
            }
            className={classes.field}
            label="Telephone Number"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.telephoneNumber[index].error}
            value={form2Data.contactInformation.telNumber}
            helperText={checkerForm2.telephoneNumber[index].error ? checkerForm2.telephoneNumber[index].messages[0] : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {...form2Data.contactInformation, email: e.target.value},
              })
            }
            className={classes.field}
            label="Email Address"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.email[index].error}
            value={form2Data.contactInformation.email}
            helperText={checkerForm2.email[index].error ? checkerForm2.email[index].messages[0] : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {...form2Data.contactInformation, phoneNumber: e.target.value},
              })
            }
            className={classes.field}
            label="Phone Number"
            variant="outlined"
            color="primary"
            fullWidth
            error={checkerForm2.phoneNumber[index].error}
            value={form2Data.contactInformation.phoneNumber}
            helperText={checkerForm2.phoneNumber[index].error ? checkerForm2.phoneNumber[index].messages[0] : null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) =>
              setForm2Data({
                ...form2Data,
                contactInformation: {...form2Data.contactInformation, others: e.target.value},
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
      </Grid>
    </form>
  );
}

export default EditorForm2;
