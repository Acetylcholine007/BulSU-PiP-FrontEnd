import { Card, Grid, makeStyles, TextField } from "@material-ui/core";

function Form1({ form1Data, setForm1Data }) {
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
            onChange={(e) => setForm1Data({...form1Data, title: e.target.value})}
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
          <TextField
            onChange={(e) => setForm1Data({...form1Data, GSP: e.target.value})}
            className={classes.field}
            label="GSP"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form1Data.GSP}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setForm1Data({...form1Data, obligationType: e.target.value})}
            className={classes.field}
            label="Obligation Type"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form1Data.obligationType}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setForm1Data({...form1Data, proponent: e.target.value})}
            className={classes.field}
            label="Proponent"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form1Data.proponent}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setForm1Data({...form1Data, investmentReq: e.target.value})}
            className={classes.field}
            label="Investment Request"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form1Data.investmentReq}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setForm1Data({...form1Data, implementationPeriod: e.target.value})}
            className={classes.field}
            label="Implementation Period"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form1Data.implementationPeriod}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setForm1Data({...form1Data, PAPLevel: e.target.value})}
            className={classes.field}
            label="PAP Level"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form1Data.PAPLevel}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setForm1Data({...form1Data, readiness: e.target.value})}
            className={classes.field}
            label="Readiness"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form1Data.readiness}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setForm1Data({...form1Data, status: e.target.value})}
            className={classes.field}
            label="Status"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            value={form1Data.status}
            helperText={false ? "Error Password" : null}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => setForm1Data({...form1Data, remarks: e.target.value})}
            className={classes.field}
            label="Remarks"
            variant="outlined"
            color="primary"
            fullWidth
            error={false}
            multiline
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
