import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";

function Form2({ form2Data, setForm2Data }) {
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

  const classes = useStyles();

  return (
    <Card className={classes.card}>
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
              <FormGroup>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form2Data.categorization.new}
                          onChange={(e) =>
                            setForm2Data({
                              ...form2Data,
                              categorization: {
                                ...form2Data.categorization,
                                new: e.target.checked,
                              },
                            })
                          }
                          name="New"
                        />
                      }
                      label="New"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form2Data.categorization.infrastructure}
                          onChange={(e) =>
                            setForm2Data({
                              ...form2Data,
                              categorization: {
                                ...form2Data.categorization,
                                infrastructure: e.target.checked,
                              },
                            })}
                          name="Infrastructure"
                        />
                      }
                      label="Infrastructure"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form2Data.expanded}
                          onChange={(e) =>
                            setForm2Data({
                              ...form2Data,
                              categorization: {
                                ...form2Data.categorization,
                                expanded: e.target.checked,
                              },
                            })}
                          name="Expanded/Revised"
                        />
                      }
                      label="Expanded/Revised"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form2Data.nonInfrastructure}
                          onChange={(e) =>
                            setForm2Data({
                              ...form2Data,
                              categorization: {
                                ...form2Data.categorization,
                                nonInfrastructure: e.target.checked,
                              },
                            })}
                          name="Non-Infrastructure"
                        />
                      }
                      label="Non-Infrastructure"
                    />
                  </Grid>
                </Grid>
              </FormGroup>
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
          <Grid item xs={12} md={3}>
            <TextField
              onChange={(e) =>
                setForm2Data({ ...form2Data, proponentName: e.target.value })
              }
              className={classes.field}
              label="Proponent Surname"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.proponentName}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              onChange={(e) =>
                setForm2Data({ ...form2Data, proponentName: e.target.value })
              }
              className={classes.field}
              label="Proponent First Name"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.proponentName}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              onChange={(e) =>
                setForm2Data({ ...form2Data, proponentName: e.target.value })
              }
              className={classes.field}
              label="Proponent Middle Initial"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.proponentName}
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
                  contactInformation: e.target.value,
                })
              }
              className={classes.field}
              label="Telephone Number"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.contactInformation}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) =>
                setForm2Data({
                  ...form2Data,
                  contactInformation: e.target.value,
                })
              }
              className={classes.field}
              label="Email Address"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.contactInformation}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) =>
                setForm2Data({
                  ...form2Data,
                  contactInformation: e.target.value,
                })
              }
              className={classes.field}
              label="Phone Number"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.contactInformation}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={(e) =>
                setForm2Data({
                  ...form2Data,
                  contactInformation: e.target.value,
                })
              }
              className={classes.field}
              label="Other contacts"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.contactInformation}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default Form2;
