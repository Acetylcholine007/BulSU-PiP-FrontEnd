import { Card, Grid, makeStyles, TextField } from "@material-ui/core";

function Form2({ form2Data, setForm2Data }) {
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
        padding: 20,
        margin: 20
    }
  }));

  const classes = useStyles();

  return (
    <Card className = {classes.card}>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, address: e.target.value})}
              className={classes.field}
              label="Address"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.address}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, projectLocation: e.target.value})}
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
            <TextField
              onChange={(e) => setForm2Data({...form2Data, categorization: e.target.value})}
              className={classes.field}
              label="Categorization"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.categorization}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, description: e.target.value})}
              className={classes.field}
              label="Description"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.description}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, purpose: e.target.value})}
              className={classes.field}
              label="Purpose"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.purpose}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, beneficiary: e.target.value})}
              className={classes.field}
              label="Beneficiary"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.beneficiary}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, proponentName: e.target.value})}
              className={classes.field}
              label="Proponent Name"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.proponentName}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, designation: e.target.value})}
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
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, contactInformation: e.target.value})}
              className={classes.field}
              label="Contact Information"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.contactInformation}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setForm2Data({...form2Data, dateAccomplished: e.target.value})}
              className={classes.field}
              label="Date Accomplished"
              variant="outlined"
              color="primary"
              fullWidth
              error={false}
              value={form2Data.dateAccomplished}
              helperText={false ? "Error Password" : null}
            />
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}

export default Form2;
